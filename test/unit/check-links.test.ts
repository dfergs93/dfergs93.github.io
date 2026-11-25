import { expect, test } from 'vitest';
import { checkLinks } from '../../scripts/check-links.ts';

const URLS = ['https://a.test/', 'https://b.test/', 'https://c.test/'];

test('a url answering 404 is reported, and only that one', async () => {
  const fetcher = async (url: string) => (url === 'https://b.test/' ? 404 : 200);
  expect(await checkLinks(URLS, fetcher)).toEqual(['https://b.test/']);
});

test('a url that fails once and then answers 200 is not reported', async () => {
  const calls = new Map<string, number>();
  const fetcher = async (url: string) => {
    const n = (calls.get(url) ?? 0) + 1;
    calls.set(url, n);
    if (url === 'https://a.test/' && n === 1) throw new Error('ECONNRESET');
    if (url === 'https://c.test/' && n === 1) return 503;
    return 200;
  };
  expect(await checkLinks(URLS, fetcher)).toEqual([]);
  expect(calls.get('https://a.test/')).toBe(2);
  expect(calls.get('https://b.test/')).toBe(1);
});

test('a url failing twice is reported after exactly one retry', async () => {
  let calls = 0;
  const fetcher = async () => {
    calls += 1;
    throw new Error('timeout');
  };
  expect(await checkLinks(['https://a.test/'], fetcher)).toEqual(['https://a.test/']);
  expect(calls).toBe(2);
});

test('at most 6 requests run at once, and results keep the input order', async () => {
  let inFlight = 0;
  let peak = 0;
  const urls = Array.from({ length: 20 }, (_, i) => `https://x.test/${i}/`);
  const fetcher = async (url: string) => {
    inFlight += 1;
    peak = Math.max(peak, inFlight);
    await new Promise((r) => setTimeout(r, 5));
    inFlight -= 1;
    return url.endsWith('/3/') || url.endsWith('/17/') ? 404 : 200;
  };
  expect(await checkLinks(urls, fetcher)).toEqual(['https://x.test/3/', 'https://x.test/17/']);
  expect(peak).toBe(6);
});
