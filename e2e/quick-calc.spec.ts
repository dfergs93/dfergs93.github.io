import { expect, test, type Page } from '@playwright/test';

const ECV_URL = 'https://dfergs93.github.io/cardiac-imaging-resources/calculators/ecv/';
const row = (page: Page, list: string, id: string) => page.locator(`#list-${list} li.row[data-id="${id}"]`);
const toggle = (page: Page, list: string, id: string) => row(page, list, id).locator('.calc-toggle');
const panel = (page: Page, list: string, id: string) => row(page, list, id).locator('.quick-calc');
const box = (page: Page) => page.getByRole('combobox', { name: 'Find a guideline or calculator' });

async function fillEcv(page: Page, list: string, values: Record<string, string>) {
  for (const [name, value] of Object.entries(values)) await panel(page, list, 'ecv').locator(`input[name="${name}"]`).fill(value);
}
const WORKED = { hct: '40', pre_myo: '1000', pre_blood: '1700', post_myo: '450', post_blood: '300' };

test.beforeEach(async ({ page }) => {
  await page.route('https://dfergs93.github.io/**', (r) => r.fulfill({ body: 'ok', contentType: 'text/html' }));
});

test('calculators with a module get a quick-view button; the rest keep the plain label', async ({ page }) => {
  await page.goto('/');
  await expect(toggle(page, 'popular', 'ecv')).toBeVisible();
  await expect(row(page, 'popular', 'ecv').locator('.calc-label')).toBeHidden();
  await expect(row(page, 'popular', 'ti-rads').locator('.calc-label')).toBeVisible();
  await expect(toggle(page, 'popular', 'ti-rads')).toHaveCount(0);
});

test('opening ECV focuses its first field and prompts for values', async ({ page }) => {
  await page.goto('/');
  await toggle(page, 'popular', 'ecv').click();
  await expect(toggle(page, 'popular', 'ecv')).toHaveAttribute('aria-expanded', 'true');
  await expect(panel(page, 'popular', 'ecv').locator('input[name="hct"]')).toBeFocused();
  await expect(panel(page, 'popular', 'ecv').locator('.quick-result')).toHaveText('Enter all T1 values and hematocrit to calculate ECV.');
});

test('the worked example shows 26.7%, Normal, the working and the source', async ({ page }) => {
  await page.goto('/');
  await toggle(page, 'popular', 'ecv').click();
  await fillEcv(page, 'popular', WORKED);
  const p = panel(page, 'popular', 'ecv');
  await expect(p.locator('.quick-headline')).toHaveText('26.7%');
  await expect(p.locator('.quick-label')).toHaveText('Normal');
  await expect(p.locator('.quick-details')).toContainText('λ (partition coeff.): 0.445');
  await expect(p.locator('.quick-source')).toHaveText('Formula: Messroghli et al., JCMR 2017 · Bands: local practice');
  await fillEcv(page, 'popular', { post_myo: '1000' });
  await expect(p.locator('.quick-message')).toHaveText('Post-contrast T1 must be shorter than pre-contrast T1.');
});

test('Bernoulli fills whichever field was not typed', async ({ page }) => {
  await page.goto('/#list-cardiac');
  await toggle(page, 'cardiac', 'bernoulli').click();
  const p = panel(page, 'cardiac', 'bernoulli');
  await p.locator('input[name="vmax"]').fill('4');
  await expect(p.locator('input[name="gradient"]')).toHaveValue('64.0');
  await p.locator('input[name="gradient"]').fill('70.6');
  await expect(p.locator('input[name="vmax"]')).toHaveValue('4.20');
  await expect(p.locator('.quick-headline')).toHaveText('4.20 m/s ↔ 70.6 mmHg');
});

test('Esc from a field closes it and returns focus; the button opens and closes it', async ({ page }) => {
  await page.goto('/');
  const t = toggle(page, 'popular', 'ecv');
  await t.click();
  await panel(page, 'popular', 'ecv').locator('input[name="pre_blood"]').press('Escape');
  await expect(panel(page, 'popular', 'ecv')).toHaveCount(0);
  await expect(t).toBeFocused();
  await expect(t).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await expect(panel(page, 'popular', 'ecv')).toBeVisible();
  await t.click();
  await expect(panel(page, 'popular', 'ecv')).toHaveCount(0);
});

test('only one quick view is open at a time', async ({ page }) => {
  await page.goto('/#list-cardiac');
  await toggle(page, 'cardiac', 'ecv').click();
  await toggle(page, 'cardiac', 'bernoulli').click();
  await expect(page.locator('.quick-calc')).toHaveCount(1);
  await expect(panel(page, 'cardiac', 'bernoulli')).toBeVisible();
  await expect(toggle(page, 'cardiac', 'ecv')).toHaveAttribute('aria-expanded', 'false');
});

test('changing list or starting a search closes an open quick view', async ({ page }) => {
  await page.goto('/');
  await toggle(page, 'popular', 'ecv').click();
  await page.locator('.rail-item[data-list="chest"]').click();
  await page.locator('.rail-item[data-list="popular"]').click();
  await expect(page.locator('.quick-calc')).toHaveCount(0);
  await expect(toggle(page, 'popular', 'ecv')).toHaveAttribute('aria-expanded', 'false');
  await toggle(page, 'popular', 'ecv').click();
  await box(page).fill('bosniak');
  await expect(page.locator('.quick-calc')).toHaveCount(0);
});

test('in search results it opens too, and Esc leaves the search alone', async ({ page }) => {
  await page.goto('/');
  await box(page).fill('ecv');
  await expect(row(page, 'results', 'ecv')).toHaveAttribute('aria-selected', 'true');
  await toggle(page, 'results', 'ecv').click();
  await panel(page, 'results', 'ecv').locator('input[name="hct"]').press('Escape');
  await expect(page.locator('.quick-calc')).toHaveCount(0);
  await expect(box(page)).toHaveValue('ecv');
  await box(page).press('ArrowDown');
  await expect(page.locator('#list-results li.row').nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('clicking inside the quick view stays on the page; its link is the full calculator', async ({ page }) => {
  await page.goto('/');
  await toggle(page, 'popular', 'ecv').click();
  const p = panel(page, 'popular', 'ecv');
  await p.locator('.quick-result').click();
  await p.locator('input[name="post_blood"]').click();
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(p.locator('.quick-full')).toHaveAttribute('href', ECV_URL);
});

test('on a phone the quick view fits without sideways scrolling', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only');
  await page.goto('/');
  await toggle(page, 'popular', 'ecv').click();
  await fillEcv(page, 'popular', WORKED);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

test('if the page script is blocked, ECV shows its plain calc label', async ({ page }) => {
  await page.route('**/_astro/index.astro*.js', (r) => r.abort());
  await page.goto('/');
  await page.waitForLoadState('load');
  await expect(page.locator('.calc-toggle:visible')).toHaveCount(0);
  await expect(row(page, 'popular', 'ecv').locator('.calc-label')).toBeVisible();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('there is no quick view, only the plain calc label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.calc-toggle:visible')).toHaveCount(0);
    await expect(row(page, 'popular', 'ecv').locator('.calc-label')).toBeVisible();
  });
});

test.describe('Copy', () => {
  const REPORT = 'T1 Mapping / ECV:\n  Hematocrit: 40%\n  T1 Pre (myocardium) = 1000 ms\n  ECV: 26.7% (Normal)';

  test('appears once ECV has a result and copies the report text', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await toggle(page, 'popular', 'ecv').click();
    const copy = panel(page, 'popular', 'ecv').locator('.quick-copy');
    await expect(copy).toBeHidden();
    await fillEcv(page, 'popular', WORKED);
    await copy.click();
    await expect(copy).toHaveText('Copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(REPORT);
  });

  test('Bernoulli has no Copy', async ({ page }) => {
    await page.goto('/#list-cardiac');
    await toggle(page, 'cardiac', 'bernoulli').click();
    await panel(page, 'cardiac', 'bernoulli').locator('input[name="vmax"]').fill('4');
    await expect(panel(page, 'cardiac', 'bernoulli').locator('.quick-copy')).toBeHidden();
  });

  test('with the clipboard blocked it says so, keeps the result and raises no error', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new DOMException('denied', 'NotAllowedError')) } });
    });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/');
    await toggle(page, 'popular', 'ecv').click();
    await fillEcv(page, 'popular', WORKED);
    await panel(page, 'popular', 'ecv').locator('.quick-copy').click();
    await expect(panel(page, 'popular', 'ecv').locator('.quick-copy')).toHaveText("Couldn't copy");
    await expect(panel(page, 'popular', 'ecv').locator('.quick-headline')).toHaveText('26.7%');
    expect(errors).toEqual([]);
  });
});

test('nothing typed into a quick view is stored', async ({ page }) => {
  await page.goto('/');
  const before = await page.evaluate(() => JSON.stringify({ ...localStorage }));
  await toggle(page, 'popular', 'ecv').click();
  await fillEcv(page, 'popular', WORKED);
  expect(await page.evaluate(() => JSON.stringify({ ...localStorage }))).toBe(before);
});

test('on a phone, inputs are at least 16px so iOS does not zoom the page on focus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone layout only');
  await page.goto('/');
  await toggle(page, 'popular', 'ecv').click();
  const size = (selector: string) => page.locator(selector).first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(await size('.quick-input')).toBeGreaterThanOrEqual(16);
  expect(await size('.search-input')).toBeGreaterThanOrEqual(16);
});
