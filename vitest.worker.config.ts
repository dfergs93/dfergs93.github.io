import { cloudflareTest, readD1Migrations } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig(async () => {
  const migrations = await readD1Migrations('./worker/migrations');
  return {
    plugins: [
      cloudflareTest({
        wrangler: { configPath: './worker/wrangler.jsonc' },
        miniflare: { bindings: { TEST_MIGRATIONS: migrations } },
      }),
    ],
    test: { include: ['test/worker/**/*.test.ts'], setupFiles: ['./test/worker/setup.ts'] },
  };
});
