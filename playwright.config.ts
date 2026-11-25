import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4321/', trace: 'retain-on-failure' },
  webServer: {
    // Built with a dummy count URL so the beacon test can intercept it. --ignore-lock keeps
    // Astro 7's preview in the foreground (it backgrounds itself when it detects an AI agent).
    command: 'PUBLIC_COUNT_URL=https://count.test/count npm run build && npm run preview -- --port 4321 --ignore-lock',
    url: 'http://localhost:4321/',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 740 } } },
  ],
});
