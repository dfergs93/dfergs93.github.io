// Renders the audit record (docs/audit/*.json) to Markdown for reading on GitHub, and to
// the data the review page shows the owner. Usage: npm run audit:render

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parseBatch, parseGaps, parseSources, VERDICTS, type Batch, type Finding, type Gap, type Source } from './schema.ts';

export const AUDIT_DIR = new URL('../../docs/audit/', import.meta.url);

/** Findings on pages outside the batch's list (whole-site findings) are grouped under this. */
const ACROSS = 'Across the site';

export type ReviewFinding = {
  id: string;
  page: string;
  pageTitle: string;
  piece: string;
  kind: string;
  topic: string;
  says: string;
  verdict: string;
  management: boolean;
  fix?: string;
  question?: string;
  home: string;
  recheckNote?: string;
  sources: { citation: string; url: string; location: string }[];
};

/** Page sections in the batch's order, then everything else under ACROSS. */
function sections(b: Batch): { title: string; url?: string; findings: Finding[] }[] {
  const listed = b.pages.map((p) => ({ title: p.title, url: p.url, findings: b.findings.filter((f) => f.page === p.id) }));
  const ids = new Set(b.pages.map((p) => p.id));
  const rest = b.findings.filter((f) => !ids.has(f.page));
  return rest.length ? [...listed, { title: ACROSS, findings: rest }] : listed;
}

function pageTitle(b: Batch, page: string): string {
  return b.pages.find((p) => p.id === page)?.title ?? ACROSS;
}

function sourceLines(f: Finding, sources: Map<string, Source>): string[] {
  return f.sources.map((ref) => `${sources.get(ref.source)?.citation ?? ref.source} — ${ref.location}`);
}

function recheckLine(f: Finding): string | undefined {
  if (!f.recheck) return undefined;
  const head = f.recheck.agrees ? `agrees — ${f.recheck.note}` : `disagreed — ${f.recheck.note}`;
  return f.recheck.resolution ? `${head} Resolution: ${f.recheck.resolution}` : head;
}

function renderFinding(f: Finding, sources: Map<string, Source>): string {
  const lines = [`### ${f.id} · ${f.piece}`, ''];
  lines.push(`- **Verdict:** ${f.verdict}${f.management ? ' · **management**' : ''}`);
  lines.push(`- **Kind:** ${f.kind} · **Topic:** ${f.topic}`);
  lines.push(`- **The page says:** ${f.says}`);
  const src = sourceLines(f, sources);
  lines.push(src.length ? `- **Source:** ${src.join('; ')}` : '- **Source:** none found');
  if (f.duplicateOf) lines.push(`- **Duplicate of:** ${f.duplicateOf}`);
  if (f.fix) lines.push(`- **Proposed fix:** ${f.fix}`);
  if (f.question) lines.push(`- **Question for the owner:** ${f.question}`);
  lines.push(`- **Proposed home:** ${f.home}`);
  const recheck = recheckLine(f);
  if (recheck) lines.push(`- **Re-check:** ${recheck}`);
  if (f.ruling) lines.push(`- **Ruling:** ${f.ruling.decision} (${f.ruling.date})${f.ruling.note ? ` — ${f.ruling.note}` : ''}`);
  return lines.join('\n');
}

function counts(b: Batch): string {
  const by = VERDICTS.map((v) => [v, b.findings.filter((f) => f.verdict === v).length] as const).filter(([, n]) => n);
  const management = b.findings.filter((f) => f.management).length;
  return `${b.findings.length} findings: ${by.map(([v, n]) => `${n} ${v}`).join(', ')}. ${management} flagged management.`;
}

export function renderBatch(b: Batch, sourceList: Source[]): string {
  const sources = new Map(sourceList.map((s) => [s.id, s]));
  const commits = Object.entries(b.oldRepoCommits).map(([site, sha]) => `old ${site} site at ${sha}`);
  const out = [
    `# Batch ${b.batch}: ${b.title}`,
    '',
    `Started ${b.startedOn}${commits.length ? ` · ${commits.join(' · ')}` : ''}. Generated from \`batch-${b.batch}.json\`; do not edit.`,
    '',
    counts(b),
  ];
  for (const s of sections(b)) {
    out.push('', `## ${s.title}`, '');
    if (s.url) out.push(s.url, '');
    out.push(s.findings.length ? s.findings.map((f) => renderFinding(f, sources)).join('\n\n') : 'No findings.');
  }
  out.push('', '## Changed after this batch started', '');
  out.push(b.recheckList.length ? b.recheckList.map((r) => `- ${r}`).join('\n') : 'Nothing yet.');
  return out.join('\n') + '\n';
}

const cell = (s: string) => s.replaceAll('|', '\\|');

export function renderGaps(gaps: Gap[]): string {
  const rows = gaps.map((g) =>
    `| ${[g.topic, g.raisedBy, g.lead, g.alternatives.join(', ') || '—', g.car, g.today, g.home, g.priority ?? '—'].map(cell).join(' | ')} |`,
  );
  return [
    '# Gaps',
    '',
    'Generated from `gaps.json`; do not edit.',
    '',
    '| Topic | Raised by | Lead | Alternatives | CAR guidance | Today | Proposed home | Priority |',
    '|---|---|---|---|---|---|---|---|',
    ...rows,
  ].join('\n') + '\n';
}

export function reviewData(b: Batch, sourceList: Source[]): ReviewFinding[] {
  const sources = new Map(sourceList.map((s) => [s.id, s]));
  return b.findings.map((f) => ({
    id: f.id,
    page: f.page,
    pageTitle: pageTitle(b, f.page),
    piece: f.piece,
    kind: f.kind,
    topic: f.topic,
    says: f.says,
    verdict: f.verdict,
    management: f.management,
    ...(f.fix ? { fix: f.fix } : {}),
    ...(f.question ? { question: f.question } : {}),
    home: f.home,
    ...(recheckLine(f) ? { recheckNote: recheckLine(f) } : {}),
    sources: f.sources.map((ref) => {
      const s = sources.get(ref.source);
      return { citation: s?.citation ?? ref.source, url: s?.url ?? '', location: ref.location };
    }),
  }));
}

const readJson = (dir: URL, name: string): unknown => JSON.parse(readFileSync(new URL(name, dir), 'utf8'));

/** Every generated file (path relative to `dir`) with the content it should have. */
export function renderedFiles(dir: URL): { path: string; content: string }[] {
  const sources = parseSources(readJson(dir, 'sources.json'));
  const files = [{ path: 'gaps.md', content: renderGaps(parseGaps(readJson(dir, 'gaps.json'))) }];
  const batchFiles = readdirSync(dir).filter((name) => /^batch-\d+\.json$/.test(name)).sort();
  for (const name of batchFiles) {
    const b = parseBatch(readJson(dir, name), sources);
    files.push({ path: `batch-${b.batch}.md`, content: renderBatch(b, sources) });
    const data = { batch: b.batch, title: b.title, startedOn: b.startedOn, findings: reviewData(b, sources) };
    files.push({ path: `review/batch-${b.batch}.json`, content: JSON.stringify(data, null, 2) + '\n' });
  }
  return files;
}

if (import.meta.main) {
  mkdirSync(new URL('review/', AUDIT_DIR), { recursive: true });
  for (const file of renderedFiles(AUDIT_DIR)) {
    writeFileSync(new URL(file.path, AUDIT_DIR), file.content);
    console.log(`wrote docs/audit/${file.path}`);
  }
}
