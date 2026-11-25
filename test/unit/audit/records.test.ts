// The committed audit record must follow the audit's rules, and the generated
// Markdown must match its JSON (edit the JSON, then run `npm run audit:render`).

import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseCaseFile } from '../../../scripts/audit/old-calc.ts';
import { AUDIT_DIR, renderedFiles } from '../../../scripts/audit/render.ts';
import { parseSources } from '../../../scripts/audit/schema.ts';

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
