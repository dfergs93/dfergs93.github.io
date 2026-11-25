// Checks a built site before it is published: the ORCA pages byte-identical,
// the site's own pages present, and nothing at paths other repos' Pages sites own.
// Usage: node scripts/check-dist.ts dist

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// The Chrome Web Store listing links to these; they must never change.
export const ORCA_PAGES: Record<string, string> = {
  'orca-website-docs/privacy-policy.html': '0494fdc86690df9141cea59f1b3ed565c0192d91c344ae46a3c778a9446f2305',
  'orca-website-docs/orca-usage-guide.html': '26caaf6d22a93169d97ad8b1fe130a67baf97622a6cbedf7605ef637b00a04cc',
};

const REQUIRED_PAGES = ['index.html', 'about/index.html', '404.html'];

// Served by the guidelines, cardiac and protocols repos' own Pages sites.
const FOREIGN_PATHS = ['guidelines_manager', 'cardiac-imaging-resources', 'radiology-protocols'];

/** Problems found in the built site at `dir`; empty when it is fine. */
export function checkDist(dir: string): string[] {
  const problems: string[] = [];
  for (const [path, sha] of Object.entries(ORCA_PAGES)) {
    const file = join(dir, path);
    if (!existsSync(file)) {
      problems.push(`${path} is missing`);
      continue;
    }
    const actual = createHash('sha256').update(readFileSync(file)).digest('hex');
    if (actual !== sha) problems.push(`${path} has changed (sha256 ${actual}, expected ${sha})`);
  }
  for (const page of REQUIRED_PAGES) {
    if (!existsSync(join(dir, page))) problems.push(`${page} is missing`);
  }
  for (const path of FOREIGN_PATHS) {
    if (existsSync(join(dir, path))) problems.push(`${path}/ must not exist: another repo's Pages site serves it`);
  }
  return problems;
}

if (import.meta.main) {
  const dir = process.argv[2] ?? 'dist';
  const problems = checkDist(dir);
  for (const p of problems) console.error(`✗ ${p}`);
  if (problems.length) process.exit(1);
  console.log(`✓ ${dir} passes the build checks`);
}
