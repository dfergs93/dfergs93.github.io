// Runs the old guidelines site's calculators through their live forms. Each old page fills
// its form from the address (?size_mm=7&nodule_type=solid) and submits it, so a case is a
// URL. Usage: npm run audit:calc -- docs/audit/batch-1/cases/lung_rads.json
// Writes <case file>.results.md beside the case file.

import { readFileSync, writeFileSync } from 'node:fs';
import { z } from 'zod';

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
});

const fileSchema = z.strictObject({
  calculator: z.string().regex(/^[a-z0-9_]+$/),
  pageUrl: z.url(),
  formId: text,
  resultId: text,
  params: z.array(text).min(1),
  categoryKey: text.optional(),
  cases: z.array(caseSchema).min(1),
});

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
    `Page: ${file.pageUrl} · form \`#${file.formId}\`. Generated by \`npm run audit:calc\`; do not edit.`,
    '',
    summary(results),
    '',
    '| Case | Inputs | Expected (source, location) | The old calculator gave | Match |',
    '|---|---|---|---|---|',
    ...rows,
  ].join('\n') + '\n';
}

async function run(path: string): Promise<void> {
  const { chromium } = await import('@playwright/test');
  const file = parseCaseFile(JSON.parse(readFileSync(path, 'utf8')));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results: CaseResult[] = [];
  try {
    for (const c of file.cases) {
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
  const out = path.replace(/\.json$/, '.results.md');
  writeFileSync(out, renderCaseResults(file, results));
  console.log(`${summary(results)}\nwrote ${out}`);
}

if (import.meta.main) {
  const path = process.argv[2];
  if (!path) {
    console.error('usage: npm run audit:calc -- <case file>');
    process.exit(2);
  }
  await run(path);
}
