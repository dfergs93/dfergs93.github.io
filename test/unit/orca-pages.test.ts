import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

// The Chrome Web Store listing links to these two pages; they must ship unchanged.
const PINNED = {
  'privacy-policy.html': '0494fdc86690df9141cea59f1b3ed565c0192d91c344ae46a3c778a9446f2305',
  'orca-usage-guide.html': '26caaf6d22a93169d97ad8b1fe130a67baf97622a6cbedf7605ef637b00a04cc',
};

const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

test.each(Object.entries(PINNED))('public/orca-website-docs/%s is byte-identical', (name, sha) => {
  expect(sha256(readFileSync(`public/orca-website-docs/${name}`))).toBe(sha);
});
