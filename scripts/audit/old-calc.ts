// Runs calculators for the content audit, three ways (a case file's `mode`):
// - 'url' (the default): the old guidelines site's pages fill their form from the address
//   (?size_mm=7&nodule_type=solid) and submit it, so a case is a URL.
// - 'type': the old cardiac site's pages convert as you type; the runner types each input
//   into its element and reads the output elements back.
// - 'module': the front page's own calculators (shared/calculators/), through `compute`.
// Usage: npm run audit:calc -- docs/audit/batch-1/cases/lung_rads.json
// Writes <case file>.results.md beside the case file.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { z } from 'zod';
import { CALCULATORS } from '../../shared/calculators/index.ts';
import { parseField, type Choices, type Values } from '../../shared/calculators/types.ts';

const text = z.string().min(1);

const caseSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9-]+$/, 'must be lowercase letters, digits and hyphens'),
  inputs: z.record(z.string(), z.string()),
  expected: z.strictObject({
    source: z.strictObject({ source: text, location: text }),
    text,
    category: text.optional(),
  }),
  note: text.optional(),
  /** Module mode: the field just changed, for two-way converters. */
  changed: text.optional(),
});

const common = {
  calculator: z.string().regex(/^[a-z0-9_]+$/),
  params: z.array(text).min(1),
  categoryKey: text.optional(),
  cases: z.array(caseSchema).min(1),
};
const elementIds = z.record(z.string(), text);

const fileSchema = z.preprocess(
  (raw) => (raw && typeof raw === 'object' && !('mode' in raw) ? { mode: 'url', ...raw } : raw),
  z.discriminatedUnion('mode', [
    z.strictObject({ mode: z.literal('url'), pageUrl: z.url(), formId: text, resultId: text, ...common }),
    z.strictObject({ mode: z.literal('type'), pageUrl: z.url(), fields: elementIds, outputs: elementIds, ...common }),
    z.strictObject({ mode: z.literal('module'), module: text, ...common }),
  ]),
);

export type CaseFile = z.infer<typeof fileSchema>;
export type CalcCase = z.infer<typeof caseSchema>;
export type CaseResult = {
  id: string;
  notAccepted: string[];
  recommendation: string;
  specifics: Record<string, string>;
  categoryMatch?: boolean;
};
/** What the page showed for one case: the fields' values after it filled them, and the result. */
export type Observed = { values: Record<string, string>; recommendation: string; specifics: Record<string, string> };

export function parseCaseFile(raw: unknown): CaseFile {
  const parsed = fileSchema.safeParse(raw);
  if (!parsed.success) throw new Error(`case file: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  const file = parsed.data;
  const problems: string[] = [];
  const params = new Set(file.params);
  const seen = new Set<string>();
  if (file.mode === 'type') {
    const ids = new Set(Object.keys(file.fields));
    for (const p of file.params) if (!ids.has(p)) problems.push(`param "${p}" has no element id in fields`);
    for (const k of ids) if (!params.has(k)) problems.push(`field "${k}" is not one of the params`);
  }
  if (file.mode === 'module') {
    const calc = CALCULATORS.get(file.module);
    if (!calc) problems.push(`no front-page module "${file.module}"`);
    else {
      const keys = new Set(calc.groups.flatMap((g) => g.fields.map((f) => f.key)));
      for (const p of file.params) if (!keys.has(p)) problems.push(`param "${p}" is not one of ${file.module}'s fields`);
    }
  }
  for (const c of file.cases) {
    if (seen.has(c.id)) problems.push(`${c.id}: duplicate case id`);
    seen.add(c.id);
    for (const name of Object.keys(c.inputs)) {
      if (!params.has(name)) problems.push(`${c.id}: input "${name}" is not one of this calculator's params`);
    }
  }
  if (problems.length) throw new Error(`case file ${file.calculator}:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  return file;
}

/** Runs one case through a front-page module's `compute`, as the quick view would. */
export function runModuleCase(file: CaseFile, c: CalcCase): CaseResult {
  if (file.mode !== 'module') throw new Error(`${file.calculator} is not a module case file`);
  const calc = CALCULATORS.get(file.module)!;
  const fields = calc.groups.flatMap((g) => g.fields);
  const values: Record<string, number | undefined> = {};
  const choices: Record<string, string | undefined> = {};
  const accepted: Record<string, string> = {};
  for (const [key, raw] of Object.entries(c.inputs)) {
    const field = fields.find((f) => f.key === key)!;
    if (field.kind === 'choice') {
      if (field.options.some((o) => o.value === raw)) (choices[key] = raw), (accepted[key] = raw);
    } else {
      const n = parseField(raw);
      if (n !== undefined) (values[key] = n), (accepted[key] = raw);
    }
  }
  const out = calc.compute(values as Values, c.changed, choices as Choices);
  const seen: Observed =
    out.status === 'ok'
      ? {
          values: accepted,
          recommendation: out.headline,
          specifics: { ...(out.label ? { label: out.label } : {}), ...(out.note ? { note: out.note } : {}), ...out.fill },
        }
      : { values: accepted, recommendation: `${out.status}: ${out.message}`, specifics: {} };
  return toCaseResult(file, c, seen);
}

export function caseUrl(pageUrl: string, inputs: Record<string, string>): string {
  const url = new URL(pageUrl);
  for (const [name, value] of Object.entries(inputs)) url.searchParams.set(name, value);
  return url.toString();
}

/** Inputs whose field ended up with a different value: a select without that option reads ''. */
export function notAccepted(requested: Record<string, string>, actual: Record<string, string>): string[] {
  return Object.entries(requested)
    .filter(([name, value]) => actual[name] !== value)
    .map(([name]) => name);
}

export function categoryOf(value: string): string {
  return value.trim().split(/\s+/).pop() ?? '';
}

export function toCaseResult(file: CaseFile, c: CalcCase, seen: Observed): CaseResult {
  const result: CaseResult = { id: c.id, notAccepted: notAccepted(c.inputs, seen.values), recommendation: seen.recommendation, specifics: seen.specifics };
  // A case the form couldn't take as asked was run on other inputs: never compare it.
  if (!result.notAccepted.length && seen.recommendation && c.expected.category && file.categoryKey) {
    result.categoryMatch = categoryOf(seen.specifics[file.categoryKey] ?? '') === c.expected.category;
  }
  return result;
}

const cell = (s: string) => s.replaceAll('|', '\\|').replaceAll('\n', ' ');

function summary(results: CaseResult[]): string {
  const notAcc = results.filter((r) => r.notAccepted.length).length;
  const noResult = results.filter((r) => !r.notAccepted.length && !r.recommendation).length;
  const matched = results.filter((r) => r.categoryMatch === true).length;
  const mismatched = results.filter((r) => r.categoryMatch === false).length;
  const byReading = results.length - notAcc - noResult - matched - mismatched;
  return `${results.length} cases: ${matched} matched, ${mismatched} mismatched, ${byReading} to compare by reading, ${notAcc} input not accepted, ${noResult} no result`;
}

/**
 * Where a case file's results go (`x.json` → `x.results.md`). Refuses to replace an existing
 * results file unless `force`: it is the evidence of the run that made it, and the old pages
 * change. Refuses a case file not ending in `.json`, which its results would overwrite.
 */
export function resultsPath(casePath: string, exists: (path: string) => boolean, force: boolean): string {
  if (!casePath.endsWith('.json')) throw new Error(`case file must end in .json: ${casePath}`);
  const out = casePath.replace(/\.json$/, '.results.md');
  if (exists(out) && !force) {
    throw new Error(`${out} already exists; it is the evidence of an earlier run (pass --force to replace it)`);
  }
  return out;
}

function where(file: CaseFile): string {
  if (file.mode === 'url') return `Page: ${file.pageUrl} · form \`#${file.formId}\``;
  if (file.mode === 'type') return `Page: ${file.pageUrl} · typed into ${Object.values(file.fields).map((id) => `\`#${id}\``).join(', ')}`;
  return `Front-page module \`shared/calculators/${file.module}.ts\`, run through its compute()`;
}

export function renderCaseResults(file: CaseFile, results: CaseResult[]): string {
  const byId = new Map(file.cases.map((c) => [c.id, c]));
  const rows = results.map((r) => {
    const c = byId.get(r.id)!;
    const inputs = Object.entries(c.inputs).map(([k, v]) => `${k}=${v}`).join(', ');
    const expected = `${c.expected.text}${c.expected.category ? ` [${c.expected.category}]` : ''} (${c.expected.source.source}, ${c.expected.source.location})`;
    let got: string;
    let mark: string;
    if (r.notAccepted.length) {
      got = `input not accepted: ${r.notAccepted.join(', ')}`;
      mark = '—';
    } else if (!r.recommendation) {
      got = 'no result';
      mark = '—';
    } else {
      const specifics = Object.entries(r.specifics).map(([k, v]) => `${k}: ${v}`).join('; ');
      got = specifics ? `${r.recommendation} (${specifics})` : r.recommendation;
      mark = r.categoryMatch === undefined ? 'by reading' : r.categoryMatch ? '✓' : '✗';
    }
    const note = c.note ? ` ${c.note}` : '';
    return `| ${[r.id, inputs, expected + note, got, mark].map(cell).join(' | ')} |`;
  });
  return [
    `# ${file.calculator}: old calculator runs`,
    '',
    `${where(file)}. Generated by \`npm run audit:calc\`; do not edit.`,
    '',
    summary(results),
    '',
    '| Case | Inputs | Expected (source, location) | The old calculator gave | Match |',
    '|---|---|---|---|---|',
    ...rows,
  ].join('\n') + '\n';
}

async function run(path: string, force: boolean): Promise<void> {
  const out = resultsPath(path, existsSync, force);
  const file = parseCaseFile(JSON.parse(readFileSync(path, 'utf8')));
  if (file.mode === 'module') {
    const results = file.cases.map((c) => runModuleCase(file, c));
    writeFileSync(out, renderCaseResults(file, results));
    console.log(`${summary(results)}\nwrote ${out}`);
    return;
  }
  const { chromium } = await import('@playwright/test');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results: CaseResult[] = [];
  try {
    for (const c of file.cases) {
      if (file.mode === 'type') {
        await page.goto(file.pageUrl, { waitUntil: 'load' });
        for (const [name, value] of Object.entries(c.inputs)) {
          const field = page.locator(`#${file.fields[name]}`);
          await field.fill(value); // fires input
          await field.dispatchEvent('change');
        }
        const seen: Observed = await page.evaluate(
          ({ fields, outputs, asked }) => {
            const read = (id: string) => {
              const el = document.getElementById(id);
              if (!el) return '';
              return el instanceof HTMLInputElement || el instanceof HTMLSelectElement ? el.value : (el as HTMLElement).innerText.trim();
            };
            const values: Record<string, string> = {};
            for (const name of asked) values[name] = read(fields[name]!);
            const specifics: Record<string, string> = {};
            for (const [name, id] of Object.entries(outputs)) specifics[name] = read(id);
            const shown = Object.entries(specifics).filter(([name, v]) => v && !asked.includes(name));
            return { values, recommendation: shown.map(([name, v]) => `${name}: ${v}`).join('; '), specifics };
          },
          { fields: file.fields, outputs: file.outputs, asked: Object.keys(c.inputs) },
        );
        results.push(toCaseResult(file, c, seen));
        continue;
      }
      await page.goto(caseUrl(file.pageUrl, c.inputs), { waitUntil: 'load' });
      const shown = await page
        .locator(`#${file.resultId}`)
        .waitFor({ state: 'visible', timeout: 5000 })
        .then(() => true, () => false);
      const seen: Observed = await page.evaluate(
        ({ params, resultId, shown }) => {
          const values: Record<string, string> = {};
          for (const p of params) {
            const el = document.getElementById(`calc-${p}`) as HTMLInputElement | HTMLSelectElement | null;
            if (el) values[p] = el.value;
          }
          const box = document.getElementById(resultId);
          const rec = shown ? (box?.querySelector('.result-recommendation') as HTMLElement | null)?.innerText ?? '' : '';
          const specifics: Record<string, string> = {};
          for (const li of shown ? Array.from(box?.querySelectorAll('.result-inputs li') ?? []) : []) {
            const t = (li as HTMLElement).innerText;
            const at = t.indexOf(': ');
            if (at > 0) specifics[t.slice(0, at)] = t.slice(at + 2);
          }
          return { values, recommendation: rec.replace(/^Recommendation:\s*/, '').trim(), specifics };
        },
        { params: file.params, resultId: file.resultId, shown },
      );
      results.push(toCaseResult(file, c, seen));
    }
  } finally {
    await browser.close();
  }
  writeFileSync(out, renderCaseResults(file, results));
  console.log(`${summary(results)}\nwrote ${out}`);
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const path = args.find((a) => a !== '--force');
  if (!path) {
    console.error('usage: npm run audit:calc -- <case file> [--force]');
    process.exit(2);
  }
  await run(path, force);
}
