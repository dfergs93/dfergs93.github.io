import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const TOKENS = 'src/styles/tokens.css';
const css = readFileSync(TOKENS, 'utf8');

function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`no ${selector} block in ${TOKENS}`);
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries([...body.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test('the contrast helper matches known WCAG values', () => {
  expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5);
  expect(contrast('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
});

const THEMES = { dark: block(':root'), light: block(':root[data-theme="light"]') };
const TEXT = ['ink', 'muted', 'dim', 'accent', 'star'];
const ALL = ['ground', 'panel', 'line', ...TEXT];

describe.each(Object.entries(THEMES))('%s theme', (_name, tokens) => {
  test('defines every token', () => expect(Object.keys(tokens).sort()).toEqual([...ALL].sort()));

  test.each(TEXT.flatMap((t) => [[t, 'ground'], [t, 'panel']]))('--%s on --%s has contrast of at least 4.5:1', (fg, bg) => {
    expect(contrast(tokens[fg]!, tokens[bg]!)).toBeGreaterThanOrEqual(4.5);
  });
});

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const SOURCES = files('src').map((path) => ({ path, text: readFileSync(path, 'utf8') }));

test('raw colours appear only in tokens.css', () => {
  const offenders = SOURCES.filter((f) => f.path !== TOKENS && /#[0-9a-fA-F]{3,8}\b(?![\w-])|\brgba?\(|\bhsla?\(/.test(f.text.replace(/href="#[^"]*"/g, '')));
  expect(offenders.map((f) => f.path)).toEqual([]);
});

test('no gradients, box-shadows or backdrop filters anywhere', () => {
  const offenders = SOURCES.filter((f) => /gradient\(|box-shadow|backdrop-filter/.test(f.text));
  expect(offenders.map((f) => f.path)).toEqual([]);
});

test('the device colour scheme is never consulted (dark for every visitor)', () => {
  const offenders = SOURCES.filter((f) => /prefers-color-scheme/.test(f.text));
  expect(offenders.map((f) => f.path)).toEqual([]);
});
