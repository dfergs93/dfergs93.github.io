import { env } from 'cloudflare:test';
import { beforeEach, describe, expect, test } from 'vitest';
import countsSql from '../../worker/sql/counts.sql?raw';
import { handleCount, type CountDeps } from '../../worker/src/count.ts';
import worker from '../../worker/src/index.ts';

const ORIGIN = 'https://dfergs93.github.io';
// A request as the Worker receives it (with Cloudflare's `cf` properties).
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;
const VALID = new Set(['fleischner', 'bosniak']);

type Limiter = { calls: { key: string }[]; limit(o: { key: string }): Promise<{ success: boolean }> };
const limiter = (success: boolean): Limiter => {
  const calls: { key: string }[] = [];
  return { calls, limit: async (o) => { calls.push(o); return { success }; } };
};

const deps = (over: Partial<CountDeps> = {}): CountDeps => ({
  db: env.DB,
  limiter: limiter(true) as unknown as RateLimit,
  allowedOrigins: [ORIGIN],
  validIds: VALID,
  today: () => '2026-11-24',
  ...over,
});

const post = (body: string, headers: Record<string, string> = { Origin: ORIGIN }, path = '/count') =>
  new IncomingRequest(`https://radref.example${path}`, { method: 'POST', body, headers: { 'Content-Type': 'text/plain;charset=UTF-8', ...headers } });

const rows = async () =>
  (await env.DB.prepare('SELECT resource_id, day, n FROM opens ORDER BY resource_id, day').all()).results;

beforeEach(async () => {
  await env.DB.prepare('DELETE FROM opens').run();
});

describe('recording', () => {
  test('two valid opens on the same day leave one row with n = 2', async () => {
    expect((await handleCount(post('fleischner'), deps())).status).toBe(204);
    expect((await handleCount(post('fleischner'), deps())).status).toBe(204);
    expect(await rows()).toEqual([{ resource_id: 'fleischner', day: '2026-11-24', n: 2 }]);
  });

  test('opens on different days and resources are counted apart', async () => {
    await handleCount(post('fleischner'), deps());
    await handleCount(post('fleischner'), deps({ today: () => '2026-11-25' }));
    await handleCount(post('bosniak'), deps());
    expect(await rows()).toEqual([
      { resource_id: 'bosniak', day: '2026-11-24', n: 1 },
      { resource_id: 'fleischner', day: '2026-11-24', n: 1 },
      { resource_id: 'fleischner', day: '2026-11-25', n: 1 },
    ]);
  });

  test('the table holds only a resource id, a day and a count (nothing about the visitor)', async () => {
    const columns = (await env.DB.prepare('PRAGMA table_info(opens)').all<{ name: string }>()).results.map((c: { name: string }) => c.name);
    expect(columns).toEqual(['resource_id', 'day', 'n']);
  });
});

describe('rejected requests record nothing', () => {
  test('an unknown id gives 400', async () => {
    expect((await handleCount(post('gone-id'), deps())).status).toBe(400);
    expect(await rows()).toEqual([]);
  });

  test('a body over 100 bytes gives 400', async () => {
    expect((await handleCount(post('f'.repeat(101)), deps())).status).toBe(400);
    expect(await rows()).toEqual([]);
  });

  test('a disallowed or missing Origin gives 403', async () => {
    expect((await handleCount(post('fleischner', { Origin: 'https://evil.example' }), deps())).status).toBe(403);
    expect((await handleCount(post('fleischner', {}), deps())).status).toBe(403);
    expect(await rows()).toEqual([]);
  });

  test('GET /count gives 405 and another path gives 404', async () => {
    expect((await handleCount(new Request('https://radref.example/count', { headers: { Origin: ORIGIN } }), deps())).status).toBe(405);
    expect((await handleCount(post('fleischner', { Origin: ORIGIN }, '/other'), deps())).status).toBe(404);
    expect(await rows()).toEqual([]);
  });
});

describe('rate limit', () => {
  test('a limiter saying no gives 429 and records nothing', async () => {
    expect((await handleCount(post('fleischner'), deps({ limiter: limiter(false) as unknown as RateLimit }))).status).toBe(429);
    expect(await rows()).toEqual([]);
  });

  test('the limiter is keyed by the connecting address, which is not stored', async () => {
    const l = limiter(true);
    await handleCount(post('fleischner', { Origin: ORIGIN, 'CF-Connecting-IP': '203.0.113.7' }), deps({ limiter: l as unknown as RateLimit }));
    expect(l.calls).toEqual([{ key: '203.0.113.7' }]);
    expect(JSON.stringify(await rows())).not.toContain('203.0.113.7');
  });

  test('with no limiter the open is still recorded', async () => {
    expect((await handleCount(post('fleischner'), deps({ limiter: undefined }))).status).toBe(204);
    expect(await rows()).toHaveLength(1);
  });
});

describe('the deployed Worker', () => {
  test('accepts a real resource from the site origin and refuses others', async () => {
    expect((await worker.fetch(post('fleischner'), env)).status).toBe(204);
    expect((await worker.fetch(post('gone-id'), env)).status).toBe(400);
    expect((await worker.fetch(post('fleischner', { Origin: 'https://x.test' }), env)).status).toBe(403);
    expect(await rows()).toEqual([{ resource_id: 'fleischner', day: new Date().toISOString().slice(0, 10), n: 1 }]);
  });
});

describe('npm run counts (worker/sql/counts.sql)', () => {
  test('sums opens over the last 7, 30 and 90 days, most opened over 30 days first', async () => {
    const day = (ago: number) => new Date(Date.now() - ago * 86_400_000).toISOString().slice(0, 10);
    const insert = env.DB.prepare('INSERT INTO opens (resource_id, day, n) VALUES (?, ?, ?)');
    await env.DB.batch([
      insert.bind('fleischner', day(0), 3),
      insert.bind('fleischner', day(6), 1),
      insert.bind('fleischner', day(7), 10),
      insert.bind('fleischner', day(89), 100),
      insert.bind('fleischner', day(90), 1000),
      insert.bind('bosniak', day(29), 20),
      insert.bind('bosniak', day(30), 5),
    ]);
    const { results } = await env.DB.prepare(countsSql).all();
    expect(results).toEqual([
      { resource_id: 'bosniak', d7: 0, d30: 20, d90: 25 },
      { resource_id: 'fleischner', d7: 4, d30: 14, d90: 114 },
    ]);
  });
});
