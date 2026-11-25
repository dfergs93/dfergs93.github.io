// POST /count: one anonymous open of one resource. The body is the resource id
// as plain text (navigator.sendBeacon). Only the site's origin and known ids
// are accepted. The connecting address keys the rate limiter and is never
// stored or logged.

export type CountDeps = {
  db: D1Database;
  limiter?: RateLimit;
  allowedOrigins: readonly string[];
  validIds: ReadonlySet<string>;
  /** Today's date, UTC, as YYYY-MM-DD. */
  today: () => string;
};

const MAX_BODY_BYTES = 100;

const RECORD = 'INSERT INTO opens (resource_id, day, n) VALUES (?, ?, 1) ON CONFLICT(resource_id, day) DO UPDATE SET n = n + 1';

const reply = (status: number) => new Response(null, { status });

export async function handleCount(request: Request, deps: CountDeps): Promise<Response> {
  if (new URL(request.url).pathname !== '/count') return reply(404);
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });

  const origin = request.headers.get('Origin');
  if (!origin || !deps.allowedOrigins.includes(origin)) return reply(403);

  if (deps.limiter) {
    const key = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const { success } = await deps.limiter.limit({ key });
    if (!success) return reply(429);
  }

  const declared = Number(request.headers.get('Content-Length') ?? 0);
  if (declared > MAX_BODY_BYTES) return reply(400);
  const body = await request.text();
  if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) return reply(400);
  const id = body.trim();
  if (!deps.validIds.has(id)) return reply(400);

  await deps.db.prepare(RECORD).bind(id, deps.today()).run();
  return reply(204);
}
