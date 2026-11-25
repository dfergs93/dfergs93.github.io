import { expect, test, type Page } from '@playwright/test';

const railItem = (page: Page, list: string) => page.locator(`.rail-item[data-list="${list}"]`);
const star = (page: Page, list: string, id: string) => page.locator(`#list-${list} li.row[data-id="${id}"] .star`);
const rowIds = (page: Page, list: string) =>
  page.locator(`#list-${list} li.row`).evaluateAll((rows) => rows.map((r) => (r as HTMLElement).dataset.id));

test.beforeEach(async ({ page }) => {
  await page.route('https://dfergs93.github.io/**', (r) => r.fulfill({ body: 'ok', contentType: 'text/html' }));
});

test('starring Fleischner shows Favorites with a count of 1 and that row', async ({ page }) => {
  await page.goto('/');
  await expect(railItem(page, 'favorites')).toBeHidden();
  const s = star(page, 'popular', 'fleischner');
  await expect(s).toHaveAccessibleName('Add to favorites');
  await s.click();
  await expect(s).toHaveAttribute('aria-pressed', 'true');
  await expect(s).toHaveAccessibleName('Remove from favorites');
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(railItem(page, 'favorites')).toBeVisible();
  await expect(railItem(page, 'favorites').locator('.rail-count')).toHaveText('1');
  await railItem(page, 'favorites').click();
  await expect(page.locator('#list-favorites')).toBeVisible();
  expect(await rowIds(page, 'favorites')).toEqual(['fleischner']);
  await expect(star(page, 'favorites', 'fleischner')).toHaveAttribute('aria-pressed', 'true');
});

test('favorites keep their starred order and survive a reload', async ({ page }) => {
  await page.goto('/');
  await star(page, 'popular', 'ecv').click();
  await star(page, 'popular', 'fleischner').click();
  await page.reload();
  await expect(star(page, 'popular', 'ecv')).toHaveAttribute('aria-pressed', 'true');
  await expect(railItem(page, 'favorites').locator('.rail-count')).toHaveText('2');
  expect(await rowIds(page, 'favorites')).toEqual(['ecv', 'fleischner']);
  await page.goto('/#list-favorites');
  await page.reload();
  await expect(page.locator('#list-favorites')).toBeVisible();
});

test('a star in search results stays in step with the same row elsewhere', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox').fill('bosniak');
  await star(page, 'results', 'bosniak').click();
  await expect(star(page, 'results', 'bosniak')).toHaveAttribute('aria-pressed', 'true');
  await expect(railItem(page, 'favorites').locator('.rail-count')).toHaveText('1');
  await page.getByRole('combobox').press('Escape');
  await expect(star(page, 'popular', 'bosniak')).toHaveAttribute('aria-pressed', 'true');
});

test('unstarring the last favorite hides Favorites and returns the view to Popular', async ({ page }) => {
  await page.goto('/');
  await star(page, 'popular', 'fleischner').click();
  await railItem(page, 'favorites').click();
  await star(page, 'favorites', 'fleischner').click();
  await expect(railItem(page, 'favorites')).toBeHidden();
  await expect(page.locator('#list-popular')).toBeVisible();
  await expect(railItem(page, 'popular')).toHaveAttribute('aria-current', 'true');
  await expect(star(page, 'popular', 'fleischner')).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(page.locator('#list-popular')).toBeVisible();
});

test('stale favorite ids are ignored silently', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('radref:favorites', '["fleischner","gone-id"]'));
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(railItem(page, 'favorites').locator('.rail-count')).toHaveText('1');
  expect(await rowIds(page, 'favorites')).toEqual(['fleischner']);
  expect(errors).toEqual([]);
});

test('with local storage blocked, no star shows and search still works', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new DOMException('denied', 'SecurityError'); } });
  });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('.star:visible')).toHaveCount(0);
  await expect(railItem(page, 'favorites')).toBeHidden();
  await page.getByRole('combobox').fill('kidney cyst');
  await expect(page.locator('#list-results li.row').first()).toHaveAttribute('data-id', 'bosniak');
  await expect(page.locator('.star:visible')).toHaveCount(0);
  expect(errors).toEqual([]);
});
