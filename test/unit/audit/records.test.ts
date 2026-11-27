// The committed audit record must follow the audit's rules, and the generated
// Markdown must match its JSON (edit the JSON, then run `npm run audit:render`).

import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseCaseFile } from '../../../scripts/audit/old-calc.ts';
import { AUDIT_DIR, renderedFiles } from '../../../scripts/audit/render.ts';
import { applyRulings, type SavedRuling } from '../../../scripts/audit/rulings.ts';
import { parseBatch, parseSources, reviewProblems } from '../../../scripts/audit/schema.ts';

describe('the committed audit record', () => {
  const files = renderedFiles(AUDIT_DIR);

  it('includes the gap list', () => {
    expect(files.map((f) => f.path)).toContain('gaps.md');
  });

  it.each(files.map((f) => [f.path, f]))('%s is up to date', (_path, file) => {
    let onDisk = '';
    try {
      onDisk = readFileSync(new URL(file.path, AUDIT_DIR), 'utf8');
    } catch {
      // missing file: reported by the assertion below
    }
    expect(onDisk, `${file.path} is stale or missing: run npm run audit:render`).toBe(file.content);
  });
});

describe('the calculator case files', () => {
  const sourceIds = new Set(parseSources(JSON.parse(readFileSync(new URL('sources.json', AUDIT_DIR), 'utf8'))).map((s) => s.id));
  const caseFiles = readdirSync(AUDIT_DIR, { recursive: true, encoding: 'utf8' }).filter((p) => /^batch-\d+\/cases\/[a-z0-9_]+\.json$/.test(p));

  it.each(caseFiles.length ? caseFiles : ['(none yet)'])('%s is valid and cites known sources', (path) => {
    if (path === '(none yet)') return;
    const file = parseCaseFile(JSON.parse(readFileSync(new URL(path, AUDIT_DIR), 'utf8')));
    const unknown = file.cases.filter((c) => !sourceIds.has(c.expected.source.source)).map((c) => `${c.id}: ${c.expected.source.source}`);
    expect(unknown, 'case sources must be in sources.json').toEqual([]);
  });
});

describe('the committed batches', () => {
  const sources = parseSources(JSON.parse(readFileSync(new URL('sources.json', AUDIT_DIR), 'utf8')));
  const batches = readdirSync(AUDIT_DIR).filter((p) => /^batch-\d+\.json$/.test(p));
  const read = (path: string) => JSON.parse(readFileSync(new URL(path, AUDIT_DIR), 'utf8'));

  it('exist', () => {
    expect(batches.length).toBeGreaterThan(0);
  });

  it.each(batches)('%s has nothing waiting on a re-check', (path) => {
    expect(reviewProblems(parseBatch(read(path), sources))).toEqual([]);
  });

  it.each(batches)("%s: every question carries the owner's own ruling from its rulings file", (path) => {
    const b = parseBatch(read(path), sources);
    const saved: SavedRuling[] = read(path.replace(/\.json$/, '.rulings.json'));
    const owners = new Map(applyRulings(b, saved).findings.map((f) => [f.id, f.ruling]));
    const ruled = new Set(saved.map((r) => r.id));
    const wrong = b.findings
      .filter((f) => f.question)
      .filter((f) => !ruled.has(f.id) || JSON.stringify(f.ruling) !== JSON.stringify(owners.get(f.id)))
      .map((f) => f.id);
    expect(wrong, 'run the rulings through applyRulings, then keepUnquestioned').toEqual([]);
  });
});
