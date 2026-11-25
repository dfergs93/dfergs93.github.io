// The committed audit record must follow the audit's rules, and the generated
// Markdown must match its JSON (edit the JSON, then run `npm run audit:render`).

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AUDIT_DIR, renderedFiles } from '../../../scripts/audit/render.ts';

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
