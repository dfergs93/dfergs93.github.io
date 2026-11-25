import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { checkDist } from '../../scripts/check-dist.ts';

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'radref-dist-'));
  cpSync('public', dir, { recursive: true });
  mkdirSync(join(dir, 'about'));
  for (const page of ['index.html', 'about/index.html', '404.html']) writeFileSync(join(dir, page), '<!doctype html>');
});

afterEach(() => rmSync(dir, { recursive: true, force: true }));

test('a good build has no problems', () => expect(checkDist(dir)).toEqual([]));

test('one changed byte in an ORCA page is reported', () => {
  const path = join(dir, 'orca-website-docs/privacy-policy.html');
  const bytes = readFileSync(path);
  bytes[100] = bytes[100]! ^ 1;
  writeFileSync(path, bytes);
  const problems = checkDist(dir);
  expect(problems).toHaveLength(1);
  expect(problems[0]).toMatch(/privacy-policy\.html/);
});

test('a missing ORCA page is reported', () => {
  rmSync(join(dir, 'orca-website-docs/orca-usage-guide.html'));
  expect(checkDist(dir)).toEqual([expect.stringMatching(/orca-usage-guide\.html/)]);
});

test('a path that belongs to another repo is reported', () => {
  mkdirSync(join(dir, 'radiology-protocols'));
  expect(checkDist(dir)).toEqual([expect.stringMatching(/radiology-protocols/)]);
});

test('a missing page is reported', () => {
  rmSync(join(dir, 'about/index.html'));
  expect(checkDist(dir)).toEqual([expect.stringMatching(/about\/index\.html/)]);
});
