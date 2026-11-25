import { expect, test } from '@playwright/test';

// The e2e build sets PUBLIC_COUNT_URL=https://count.test/count (playwright.config.ts).
const COUNT_URL = 'https://count.test/count';
const FLEISCHNER = 'https://dfergs93.github.io/guidelines_manager/pulmonary/fleischner/';

test.beforeEach(async ({ page }) => {
  await page.route('https://dfergs93.github.io/**', (r) => r.fulfill({ body: 'ok', contentType: 'text/html' }));
});

async function captureCounts(page: import('@playwright/test').Page) {
  const sent: { method: string; body: string | null }[] = [];
  await page.route(COUNT_URL, (r) => {
    sent.push({ method: r.request().method(), body: r.request().postData() });
    return r.fulfill({ status: 204 });
  });
  return sent;
}

test('opening a row sends its id to the count URL', async ({ page }) => {
  const sent = await captureCounts(page);
  await page.goto('/');
  await page.locator('#list-popular li.row[data-id="fleischner"] .row-link').click();
  await page.waitForURL(FLEISCHNER);
  await expect.poll(() => sent).toEqual([{ method: 'POST', body: 'fleischner' }]);
});

test('opening from search with Enter is counted too', async ({ page }) => {
  const sent = await captureCounts(page);
  await page.goto('/');
  await page.getByRole('combobox').fill('kidney cyst');
  await page.getByRole('combobox').press('Enter');
  await page.waitForURL('https://dfergs93.github.io/guidelines_manager/genitourinary/bosniak/');
  await expect.poll(() => sent).toEqual([{ method: 'POST', body: 'bosniak' }]);
});

test('starring a row is not an open', async ({ page }) => {
  const sent = await captureCounts(page);
  await page.goto('/');
  await page.locator('#list-popular li.row[data-id="fleischner"] .star').click();
  await page.waitForTimeout(300);
  expect(sent).toEqual([]);
});

test('with the count URL unreachable, the click still navigates within a second', async ({ page }) => {
  await page.route(COUNT_URL, (r) => r.abort());
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.locator('#list-popular li.row[data-id="fleischner"] .row-link').click();
  await page.waitForURL(FLEISCHNER, { timeout: 1000 });
  expect(errors).toEqual([]);
});

test('with the count URL hanging, the click still navigates within a second', async ({ page }) => {
  await page.route(COUNT_URL, () => new Promise(() => {}));
  await page.goto('/');
  await page.locator('#list-popular li.row[data-id="fleischner"] .row-link').click();
  await page.waitForURL(FLEISCHNER, { timeout: 1000 });
});
