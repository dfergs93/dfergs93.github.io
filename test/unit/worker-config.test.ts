import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

// worker/wrangler.jsonc, with its // comments removed.
const config = JSON.parse(
  readFileSync('worker/wrangler.jsonc', 'utf8')
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n'),
) as { observability?: { enabled?: boolean } };

// The About page promises nothing about the visitor is kept. Workers Logs would keep
// each request's metadata (headers, address, location) for days, so they stay off.
test('the count Worker keeps no request logs', () => {
  expect(config.observability?.enabled).toBe(false);
});
