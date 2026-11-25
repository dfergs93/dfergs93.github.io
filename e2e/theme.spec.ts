import { expect, test } from '@playwright/test';

const DARK_GROUND = 'rgb(12, 15, 20)';
const LIGHT_GROUND = 'rgb(246, 247, 249)';

const groundOf = (page: import('@playwright/test').Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);

test.use({ colorScheme: 'light' });

test('opens dark on a device set to light', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  expect(await groundOf(page)).toBe(DARK_GROUND);
});

test('the switch changes to light, and the choice survives a reload', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Light mode' });
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await button.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(await groundOf(page)).toBe(LIGHT_GROUND);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Light mode' })).toHaveAttribute('aria-pressed', 'true');
  await button.click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  await page.reload();
  expect(await groundOf(page)).toBe(DARK_GROUND);
});

test('no flash: a saved light choice is already applied when the document is parsed', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('radref:theme', 'light');
    document.addEventListener('DOMContentLoaded', () => {
      (window as unknown as { firstGround: string }).firstGround = getComputedStyle(document.documentElement).backgroundColor;
    });
  });
  await page.goto('/');
  expect(await page.evaluate(() => (window as unknown as { firstGround: string }).firstGround)).toBe(LIGHT_GROUND);
});

test('with local storage blocked, the switch works for the visit and the next load opens dark', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new DOMException('denied', 'SecurityError'); } });
  });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  expect(await groundOf(page)).toBe(DARK_GROUND);
  expect(errors).toEqual([]);
});

test('the About and 404 pages share the layout', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About');
  await expect(page.getByRole('link', { name: 'Report an error' })).toHaveAttribute('href', 'https://github.com/dfergs93/dfergs93.github.io/issues/new');
  await expect(page.getByRole('button', { name: 'Light mode' })).toBeVisible();
  const missing = await page.goto('/no-such-page/');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Back to the front page' })).toBeVisible();
});
