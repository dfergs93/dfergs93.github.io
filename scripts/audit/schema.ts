// The content audit's record (stage 2): sources, findings per batch, and the gap list.
// The JSON under docs/audit/ is hand-written; these parsers hold it to the audit's rules
// (docs/superpowers/specs/2026-11-25-content-audit-design.md) and report every problem at once.

import { z } from 'zod';
import { RESOURCES } from '../../shared/registry.ts';

export const KINDS = [
  'guideline-threshold',
  'protocol',
  'normal-values',
  'teaching',
  'calculator',
  'troubleshooting',
  'listing', // a front-page row: version label and summary (the new site's, or the old home page's)
  'provenance', // a page's reference box: citation, version, review date, modifications
] as const;

export const VERDICTS = [
  'correct',
  'outdated',
  'wrong',
  'not-lead', // follows a guideline that isn't this topic's lead, and its advice differs
  'unsourced',
  'local-practice',
  'duplicate',
  'drop',
  'source-not-readable',
] as const;

/** Verdicts that may stand without a source: there is none, or the piece is going. */
const SOURCELESS = new Set<string>(['unsourced', 'local-practice', 'drop']);
/** Kinds whose correct verdicts skip the independent re-check (no numbers to get wrong). */
const RECHECK_EXEMPT_KINDS = new Set<string>(['teaching', 'protocol', 'troubleshooting']);

/** Registry ids, plus pages and whole sites that have no front-page row. */
export const PAGE_IDS: ReadonlySet<string> = new Set([
  ...RESOURCES.map((r) => r.id),
  'guidelines-site',
  'guidelines-home',
  'cardiac-site',
  'cardiac-home',
  'cardiac-calculators-index',
  'cmr-protocols-index',
]);

const slug = z.string().regex(/^[a-z0-9-]+$/, 'must be lowercase letters, digits and hyphens');
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');
const text = z.string().min(1);

const sourceSchema = z.strictObject({
  id: slug,
  title: text,
  citation: text,
  version: text,
  year: z.number().int(),
  url: z.url(),
  access: z.enum(['open', 'owner-supplied', 'not-readable']),
  reuse: z.enum(['reproduce', 'restate-and-link', 'unknown']),
  note: text.optional(),
});

const sourceRefSchema = z.strictObject({ source: slug, location: text });

const findingSchema = z.strictObject({
  id: z.string().regex(/^B\d+-[a-z0-9-]+-\d{2}$/, 'must look like B<batch>-<page>-<nn>'),
  page: text,
  piece: text,
  kind: z.enum(KINDS),
  topic: text,
  says: text,
  sources: z.array(sourceRefSchema),
  verdict: z.enum(VERDICTS),
  management: z.boolean(),
  fix: text.optional(),
  question: text.optional(),
  home: text,
  duplicateOf: z.string().optional(),
  recheck: z.strictObject({ agrees: z.boolean(), note: text, resolution: text.optional() }).optional(),
  ruling: z.strictObject({ decision: z.enum(['keep', 'change', 'drop']), note: z.string(), date: day }).optional(),
});

const usabilitySchema = z.strictObject({
  page: text,
  calculator: text,
  wordsBeforeFirstInput: z.number().int().nonnegative(),
  allOptionsVisible: z.boolean(),
  algorithmVisible: z.boolean(),
  notes: text,
});

const batchShellSchema = z.strictObject({
  batch: z.number().int().positive(),
  title: text,
  startedOn: day,
  oldRepoCommits: z.strictObject({ guidelines: text.optional(), cardiac: text.optional() }),
  pages: z.array(z.strictObject({ id: text, url: z.url(), title: text })).min(1),
  findings: z.array(z.unknown()),
  recheckList: z.array(text),
  // One note per calculator against the owner's complaints: wordy, options hidden, algorithm hidden.
  usability: z.array(usabilitySchema).default([]),
});

const gapSchema = z.strictObject({
  id: slug,
  topic: text,
  raisedBy: z.enum(['owner', 'placeholder', 'candidate']),
  lead: text,
  alternatives: z.array(text),
  car: z.enum(['yes', 'no', 'unknown']),
  today: text,
  home: text,
  priority: z.enum(['now', 'soon', 'later', 'no']).optional(),
});

export type Source = z.infer<typeof sourceSchema>;
export type SourceRef = z.infer<typeof sourceRefSchema>;
export type Finding = z.infer<typeof findingSchema>;
export type Batch = Omit<z.infer<typeof batchShellSchema>, 'findings'> & { findings: Finding[] };
export type Gap = z.infer<typeof gapSchema>;
export type UsabilityNote = z.infer<typeof usabilitySchema>;

function labelOf(entry: unknown, index: number, kind: string): string {
  return typeof entry === 'object' && entry !== null && 'id' in entry ? String(entry.id) : `${kind} #${index}`;
}

function issuesOf(label: string, error: z.ZodError, problems: string[]): void {
  for (const issue of error.issues) {
    const field = issue.path.length ? issue.path.join('.') : issue.code === 'unrecognized_keys' ? issue.keys.join(', ') : 'entry';
    problems.push(`${label}: ${field}: ${issue.message}`);
  }
}

function fail(what: string, problems: string[]): never {
  throw new Error(`${what} has ${problems.length} problem(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
}

/** Parses a list of entries with one schema, rejecting duplicate ids. */
function parseList<T extends { id: string }>(raw: unknown, schema: z.ZodType<T>, kind: string, problems: string[]): T[] {
  if (!Array.isArray(raw)) {
    problems.push(`expected a list of ${kind}s`);
    return [];
  }
  const seen = new Set<string>();
  const valid: T[] = [];
  raw.forEach((entry, index) => {
    const label = labelOf(entry, index, kind);
    if (seen.has(label)) problems.push(`${label}: duplicate ${kind} id`);
    seen.add(label);
    const parsed = schema.safeParse(entry);
    if (parsed.success) valid.push(parsed.data);
    else issuesOf(label, parsed.error, problems);
  });
  return valid;
}

export function parseSources(raw: unknown): Source[] {
  const problems: string[] = [];
  const sources = parseList(raw, sourceSchema, 'source', problems);
  if (problems.length) fail('sources.json', problems);
  return sources;
}

export function parseGaps(raw: unknown): Gap[] {
  const problems: string[] = [];
  const gaps = parseList(raw, gapSchema, 'gap', problems);
  if (problems.length) fail('gaps.json', problems);
  return gaps;
}

/** The audit's rules for one finding, given the batch's other ids and the sources. */
function findingProblems(f: Finding, ids: Set<string>, sources: Map<string, Source>): string[] {
  const out: string[] = [];
  if (!PAGE_IDS.has(f.page)) out.push(`unknown page "${f.page}"`);
  for (const ref of f.sources) if (!sources.has(ref.source)) out.push(`unknown source "${ref.source}"`);
  if (!f.sources.length && !SOURCELESS.has(f.verdict)) out.push(`verdict ${f.verdict} needs a source`);
  if (f.verdict !== 'correct' && !f.fix) out.push(`verdict ${f.verdict} needs a fix`);
  if (f.management && (f.verdict === 'correct' || f.verdict === 'drop')) {
    out.push(`the management flag can't go on a ${f.verdict} finding`);
  }
  if (f.verdict === 'duplicate' && (!f.duplicateOf || f.duplicateOf === f.id || !ids.has(f.duplicateOf))) {
    out.push('a duplicate needs a duplicateOf naming another finding in this batch');
  }
  const known = f.sources.map((ref) => sources.get(ref.source)).filter((s) => s !== undefined);
  if (f.verdict !== 'source-not-readable' && known.length && known.every((s) => s.access === 'not-readable')) {
    out.push('rests only on sources marked not readable; use verdict source-not-readable until a copy is read');
  }
  return out;
}

export function parseBatch(raw: unknown, sources: Source[]): Batch {
  const problems: string[] = [];
  const shell = batchShellSchema.safeParse(raw);
  if (!shell.success) {
    issuesOf('batch', shell.error, problems);
    fail('batch', problems);
  }
  const b = shell.data;
  for (const page of b.pages) if (!PAGE_IDS.has(page.id)) problems.push(`pages: unknown page "${page.id}"`);
  for (const u of b.usability) if (!PAGE_IDS.has(u.page)) problems.push(`usability: unknown page "${u.page}"`);

  const findings = parseList(b.findings, findingSchema, 'finding', problems);
  const ids = new Set(findings.map((f) => f.id));
  const byId = new Map(sources.map((s) => [s.id, s]));
  for (const f of findings) for (const p of findingProblems(f, ids, byId)) problems.push(`${f.id}: ${p}`);

  if (problems.length) fail(`batch ${b.batch}`, problems);
  return { ...b, findings };
}

/** Whether the independent reviewer must re-check this finding before the owner sees it. */
export function needsRecheck(f: Finding): boolean {
  return !(f.verdict === 'correct' && RECHECK_EXEMPT_KINDS.has(f.kind));
}

/** What still stands between a batch and the owner's review. Empty means ready. */
export function reviewProblems(b: Batch): string[] {
  const out: string[] = [];
  for (const f of b.findings) {
    if (needsRecheck(f) && !f.recheck) out.push(`${f.id}: needs an independent re-check`);
    else if (f.recheck && !f.recheck.agrees && !f.recheck.resolution) out.push(`${f.id}: re-check disagreed; needs a resolution`);
  }
  return out;
}
