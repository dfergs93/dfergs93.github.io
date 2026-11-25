import { expect, test, type Page } from '@playwright/test';

const POPULAR = ['fleischner', 'li-rads', 'bosniak', 'adrenal', 'lung-rads', 'contrast-safety', 'ecv', 'ti-rads', 'pi-rads', 'bi-rads'];

const rowIds = (page: Page, list: string) =>
  page.locator(`#list-${list} li.row`).evaluateAll((rows) => rows.map((r) => (r as HTMLElement).dataset.id));
const railItem = (page: Page, list: string) => page.locator(`.rail-item[data-list="${list}"]`);
const box = (page: Page) => page.getByRole('combobox', { name: 'Find a guideline or calculator' });

test.beforeEach(async ({ page }) => {
  // Navigations to the old sites stay offline.
  await page.route('https://dfergs93.github.io/**', (r) => r.fulfill({ body: 'ok', contentType: 'text/html' }));
});

test('loads with Popular selected, its 10 rows in the seeded order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#list-popular')).toBeVisible();
  await expect(railItem(page, 'popular')).toHaveAttribute('aria-current', 'true');
  expect(await rowIds(page, 'popular')).toEqual(POPULAR);
  await expect(page.locator('#list-chest')).toBeHidden();
  await expect(page.locator('#all-resources')).toBeHidden();
});

test('a row shows its title, version, calc mark, area and summary', async ({ page }) => {
  await page.goto('/');
  const row = page.locator('#list-popular li.row[data-id="fleischner"]');
  await expect(row.locator('.row-link')).toHaveAttribute('href', 'https://dfergs93.github.io/guidelines_manager/pulmonary/fleischner/');
  await expect(row.locator('.version')).toHaveText('2017');
  await expect(row.locator('.calc')).toHaveText('calc');
  await expect(row.locator('.row-area')).toHaveText('Chest');
  await expect(row.locator('.summary')).toContainText('pulmonary nodules');
  await expect(page.locator('#list-popular li.row[data-id="ecv"] .version')).toHaveCount(0);
});

test('clicking an area shows its rows, puts it in the URL, and survives a reload and Back', async ({ page }) => {
  await page.goto('/');
  await railItem(page, 'abdomen').click();
  await expect(page.locator('#list-abdomen')).toBeVisible();
  await expect(page.locator('#list-popular')).toBeHidden();
  expect(await rowIds(page, 'abdomen')).toEqual(['adrenal', 'li-rads']);
  await expect(page.locator('#list-abdomen .row-area').first()).toBeHidden();
  expect(new URL(page.url()).hash).toBe('#list-abdomen');
  await expect(railItem(page, 'abdomen')).toHaveAttribute('aria-current', 'true');
  await expect(railItem(page, 'popular')).not.toHaveAttribute('aria-current');
  await page.reload();
  await expect(page.locator('#list-abdomen')).toBeVisible();
  await expect(railItem(page, 'abdomen')).toHaveAttribute('aria-current', 'true');
  await page.goBack();
  await expect(page.locator('#list-popular')).toBeVisible();
});

test('empty areas are not shown, and an unknown hash falls back to Popular', async ({ page }) => {
  await page.goto('/#list-msk');
  await expect(railItem(page, 'msk')).toHaveCount(0);
  await expect(page.locator('#list-msk')).toHaveCount(0);
  await expect(page.locator('#list-popular')).toBeVisible();
});

test('/ focuses the search box, and a / typed in the box stays in the box', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await expect(box(page)).toBeFocused();
  await expect(box(page)).toHaveValue('');
  await page.keyboard.type('T1/T2');
  await expect(box(page)).toHaveValue('T1/T2');
});

test('kidney cyst puts Bosniak first and counts matches per area on the rail', async ({ page }) => {
  await page.goto('/');
  await box(page).fill('kidney cyst');
  await expect(page.locator('#list-results')).toBeVisible();
  await expect(page.locator('#list-popular')).toBeHidden();
  expect((await rowIds(page, 'results'))[0]).toBe('bosniak');
  await expect(page.locator('#list-results .row-area').first()).toBeVisible();
  const gu = Number(await railItem(page, 'gu-pelvis').locator('.rail-count').textContent());
  expect(gu).toBeGreaterThanOrEqual(1);
  await expect(railItem(page, 'chest').locator('.rail-count')).toHaveText('0');
  await expect(railItem(page, 'chest')).toHaveAttribute('data-empty');
});

test('arrows move the highlight and Enter opens the highlighted row', async ({ page }) => {
  await page.goto('/');
  await box(page).fill('nodule');
  const rows = page.locator('#list-results li.row');
  await expect(rows.first()).toHaveAttribute('aria-selected', 'true');
  await box(page).press('ArrowDown');
  await expect(rows.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(rows.first()).toHaveAttribute('aria-selected', 'false');
  await expect(box(page)).toBeFocused();
  const second = await rows.nth(1).getAttribute('id');
  await expect(box(page)).toHaveAttribute('aria-activedescendant', second!);
  await box(page).press('ArrowUp');
  await box(page).press('ArrowUp');
  await expect(rows.first()).toHaveAttribute('aria-selected', 'true');
  await box(page).press('ArrowDown');
  const href = await rows.nth(1).locator('.row-link').getAttribute('href');
  await box(page).press('Enter');
  await page.waitForURL(href!);
});

test('Esc clears the box and restores the previous section', async ({ page }) => {
  await page.goto('/#list-cardiac');
  await box(page).fill('bosniak');
  await expect(page.locator('#list-results')).toBeVisible();
  await box(page).press('Escape');
  await expect(box(page)).toHaveValue('');
  await expect(page.locator('#list-cardiac')).toBeVisible();
  await expect(page.locator('#list-results')).toBeHidden();
  await expect(railItem(page, 'cardiac')).toHaveAttribute('aria-current', 'true');
  await expect(railItem(page, 'chest').locator('.rail-count')).toHaveText('2');
  await expect(railItem(page, 'chest')).not.toHaveAttribute('data-empty');
});

test('odd queries: no matches says so, and punctuation or a long paste raise no errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await box(page).fill('zzzz');
  await expect(page.locator('#list-results')).toContainText('No matches for "zzzz"');
  await expect(page.locator('#list-results li.row')).toHaveCount(0);
  await box(page).press('Enter');
  await box(page).fill('c++(');
  await box(page).fill('x'.repeat(500));
  await box(page).fill('   ');
  await expect(page.locator('#list-popular')).toBeVisible();
  expect(errors).toEqual([]);
});

test('clicking a rail item during a search clears the search and selects that item', async ({ page }) => {
  await page.goto('/');
  await box(page).fill('nodule');
  await railItem(page, 'congenital').click();
  await expect(box(page)).toHaveValue('');
  await expect(page.locator('#list-congenital')).toBeVisible();
  await expect(page.locator('#list-results')).toBeHidden();
  await expect(railItem(page, 'congenital')).toHaveAttribute('aria-current', 'true');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('every section is visible, stacked, and lists all 34 resources', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#list-popular')).toBeVisible();
    await expect(page.locator('#all-resources')).toBeHidden();
    const areaRows = page.locator('section.list:not([data-list="popular"]):not([data-list="favorites"]):not([data-list="results"]) li.row');
    await expect(areaRows).toHaveCount(34);
    for (const row of await areaRows.all()) await expect(row).toBeVisible();
    await expect(page.locator('#list-favorites')).toBeHidden();
    await expect(page.locator('#list-results')).toBeHidden();
    await expect(railItem(page, 'chest')).toHaveAttribute('href', '#list-chest');
  });
});

test('on a phone the rail is one row of tabs and the page never scrolls sideways', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only');
  await page.goto('/');
  const tops = await page.locator('.rail-item:visible').evaluateAll((items) => items.map((i) => (i as HTMLElement).offsetTop));
  expect(tops.length).toBeGreaterThan(5);
  expect(new Set(tops).size).toBe(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  await box(page).fill('tetralogy');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

test('opening a list from the URL keeps the page at the top (search box in view)', async ({ page }) => {
  await page.goto('/#list-cardiac');
  await expect(page.locator('#list-cardiac')).toBeVisible();
  await page.waitForLoadState('load');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(box(page)).toBeInViewport();
});

test.describe('when the front-page script is blocked (hospital proxy) or fails', () => {
  test('the page falls back to every list, stacked, as without JavaScript', async ({ page }) => {
    await page.route('**/_astro/index.astro*.js', (r) => r.abort());
    await page.goto('/');
    await page.waitForLoadState('load');
    const areaRows = page.locator('section.list:not([data-list="popular"]):not([data-list="favorites"]):not([data-list="results"]) li.row');
    await expect(areaRows).toHaveCount(34);
    await expect(areaRows.last()).toBeVisible();
    await expect(page.locator('#list-popular')).toBeVisible();
    await expect(page.locator('.search')).toBeHidden();
  });

  test('before the script runs, Popular is already showing', async ({ page }) => {
    let release!: () => void;
    const held = new Promise<void>((r) => (release = r));
    await page.route('**/_astro/index.astro*.js', async (r) => {
      await held;
      await r.continue();
    });
    await page.goto('/', { waitUntil: 'commit' });
    await expect(page.locator('#list-popular li.row').first()).toBeVisible();
    await expect(page.locator('#list-chest')).toBeHidden();
    release();
    await expect(box(page)).toBeVisible();
  });
});
