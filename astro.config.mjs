import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dfergs93.github.io',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
