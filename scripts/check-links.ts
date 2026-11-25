// Checks that every registry url answers 200, so a stale link to the old sites
// fails CI. Usage: node scripts/check-links.ts

const CONCURRENCY = 6;
const TIMEOUT_MS = 15_000;

type Fetcher = (url: string) => Promise<number>;

async function answers200(url: string, fetcher: Fetcher): Promise<boolean> {
  try {
    return (await fetcher(url)) === 200;
  } catch {
    return false;
  }
}

/** The urls that did not answer 200, after one retry each, in input order. */
export async function checkLinks(urls: string[], fetcher: Fetcher): Promise<string[]> {
  const ok = new Array<boolean>(urls.length);
  let next = 0;
  const work = async () => {
    while (next < urls.length) {
      const i = next++;
      ok[i] = (await answers200(urls[i]!, fetcher)) || (await answers200(urls[i]!, fetcher));
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, work));
  return urls.filter((_, i) => !ok[i]);
}

const realFetch: Fetcher = async (url) => {
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS) });
  await res.body?.cancel();
  return res.status;
};

if (import.meta.main) {
  const { RESOURCES } = await import('../shared/registry.ts');
  const urls = RESOURCES.map((r) => r.url);
  const failed = await checkLinks(urls, realFetch);
  for (const url of failed) console.error(`✗ ${url}`);
  if (failed.length) process.exit(1);
  console.log(`✓ all ${urls.length} registry urls answer 200`);
}
