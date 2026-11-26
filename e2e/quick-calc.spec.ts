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
  await expect(toggle(page, 'popular', 'fleischner')).toBeVisible();
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

test.describe('Fleischner', () => {
  const DOI = 'https://doi.org/10.1148/radiol.2017161659';
  const fl = (page: Page) => panel(page, 'popular', 'fleischner');
  const group = (page: Page, name: string) => fl(page).getByRole('group', { name, exact: true });
  const radio = (page: Page, name: string, option: string) => group(page, name).getByRole('radio', { name: option, exact: true });
  async function open(page: Page) {
    await page.goto('/');
    await toggle(page, 'popular', 'fleischner').click();
  }
  async function choose(page: Page, picks: Record<string, string>) {
    for (const [name, option] of Object.entries(picks)) await radio(page, name, option).check();
  }

  test('solid, single, low, 5.6 mm gives the 6–8 mm advice', async ({ page }) => {
    await open(page);
    await expect(radio(page, 'Nodule type', 'Solid')).toBeFocused();
    await expect(fl(page).locator('input[type="radio"]:checked')).toHaveCount(0);
    await expect(fl(page).locator('.quick-result')).toHaveText('Still needed: nodule type, number, average diameter.');
    await choose(page, { 'Nodule type': 'Solid', Number: 'Single', Risk: 'Low' });
    await fl(page).getByRole('spinbutton', { name: 'Average diameter' }).fill('5.6');
    await expect(fl(page).locator('.quick-headline')).toHaveText('CT at 6–12 months, then consider CT at 18–24 months');
    await expect(fl(page).locator('.quick-subject')).toHaveText('Single solid nodule, 6 mm, low risk');
    await expect(fl(page).locator('.quick-full')).toHaveText('Guideline →');
    await expect(fl(page).locator('.quick-full')).toHaveAttribute('href', DOI);
  });

  test('no explanatory text: no intro, hints, notes or working lines (owner, 2026-11-25)', async ({ page }) => {
    await open(page);
    // 7 mm solid and 12 mm ground glass both carry notes in the module.
    await choose(page, { 'Nodule type': 'Solid', Number: 'Single', Risk: 'Low' });
    await fl(page).locator('input[name="size"]').fill('7');
    await expect(fl(page).locator('.quick-headline')).toHaveText('CT at 6–12 months, then consider CT at 18–24 months');
    await expect(fl(page).locator('.quick-intro, .quick-hint, .quick-note, .quick-details')).toHaveCount(0);
    await choose(page, { 'Nodule type': 'Ground glass' });
    await fl(page).locator('input[name="size"]').fill('12');
    await expect(fl(page).locator('.quick-subject')).toHaveText('Single ground-glass nodule, 12 mm');
    await expect(fl(page).locator('.quick-intro, .quick-hint, .quick-note, .quick-details')).toHaveCount(0);
    await expect(fl(page).locator('[aria-describedby]')).toHaveCount(0);
  });

  test('risk applies only to solid, the solid component only to a single part-solid nodule; both stay in place', async ({ page }) => {
    await open(page);
    const solidBox = fl(page).locator('input[name="solid"]');
    const riskLow = radio(page, 'Risk', 'Low');
    await expect(group(page, 'Risk')).toBeVisible();
    await expect(riskLow).toBeDisabled();
    await expect(solidBox).toBeVisible();
    await expect(solidBox).toBeDisabled();
    await choose(page, { 'Nodule type': 'Solid' });
    await expect(riskLow).toBeEnabled();
    await choose(page, { 'Nodule type': 'Part solid' });
    await expect(riskLow).toBeDisabled();
    await expect(solidBox).toBeDisabled();
    await choose(page, { Number: 'Single' });
    await expect(solidBox).toBeEnabled();
    await choose(page, { Number: 'Multiple' });
    await expect(solidBox).toBeDisabled();
  });

  test('nothing moves as you use it (owner, 2026-11-25)', async ({ page }, testInfo) => {
    await open(page);
    // Every field's position and, on a desktop, the quick view's height. On a phone a
    // longer result can add a line below the fields (where it wraps depends on the
    // platform's text rendering: CI's Linux wraps a subject that fits on a Mac).
    const phone = testInfo.project.name === 'phone';
    const layout = () =>
      fl(page).evaluate((view, phone) => {
        const fields = [...view.querySelectorAll('.quick-item')].map((item) => Math.round(item.getBoundingClientRect().top));
        return phone ? { fields } : { fields, height: Math.round(view.getBoundingClientRect().height) };
      }, phone);
    const start = await layout();
    const steps: [string, () => Promise<void>][] = [
      ['solid', () => choose(page, { 'Nodule type': 'Solid' })],
      ['single, low', () => choose(page, { Number: 'Single', Risk: 'Low' })],
      ['7 mm', () => fl(page).locator('input[name="size"]').fill('7')],
      ['high risk', () => choose(page, { Risk: 'High' })],
      ['ground glass', () => choose(page, { 'Nodule type': 'Ground glass' })],
      ['multiple', () => choose(page, { Number: 'Multiple' })],
      ['part solid, single', () => choose(page, { 'Nodule type': 'Part solid', Number: 'Single' })],
      ['12 mm', () => fl(page).locator('input[name="size"]').fill('12')],
      ['solid component 9 mm', () => fl(page).locator('input[name="solid"]').fill('9')],
    ];
    for (const [step, act] of steps) {
      await act();
      expect(await layout(), `after ${step}`).toEqual(start);
    }
    // The two longest advice sentences may add a line; the fields still don't move.
    await fl(page).locator('input[name="solid"]').fill('4');
    await expect(fl(page).locator('.quick-headline')).toContainText('annual CT');
    expect((await layout()).fields).toEqual(start.fields);
  });

  test('switching type clears what no longer applies', async ({ page }) => {
    await open(page);
    await choose(page, { 'Nodule type': 'Part solid', Number: 'Single' });
    await fl(page).locator('input[name="size"]').fill('12');
    await fl(page).locator('input[name="solid"]').fill('7');
    await expect(fl(page).locator('.quick-headline')).toContainText('highly suspicious');
    await choose(page, { 'Nodule type': 'Ground glass' });
    await choose(page, { 'Nodule type': 'Part solid' });
    await expect(fl(page).locator('input[name="solid"]')).toHaveValue('');
    await expect(fl(page).locator('.quick-result')).toHaveText('Still needed: solid component.');
    await choose(page, { 'Nodule type': 'Solid', Risk: 'High' });
    await choose(page, { 'Nodule type': 'Ground glass' });
    await choose(page, { 'Nodule type': 'Solid' });
    await expect(group(page, 'Risk').locator('input:checked')).toHaveCount(0);
    await expect(fl(page).locator('.quick-result')).toHaveText('Still needed: risk.');
  });

  test('keyboard through the groups; Esc from a radio closes', async ({ page }) => {
    await open(page);
    await expect(radio(page, 'Nodule type', 'Solid')).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(radio(page, 'Nodule type', 'Ground glass')).toBeChecked();
    await page.keyboard.press('Tab');
    await expect(radio(page, 'Number', 'Single')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(fl(page)).toHaveCount(0);
    await expect(toggle(page, 'popular', 'fleischner')).toBeFocused();
  });

  test('Copy gives the report line', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await open(page);
    await choose(page, { 'Nodule type': 'Solid', Number: 'Single', Risk: 'Low' });
    await fl(page).locator('input[name="size"]').fill('7');
    await fl(page).locator('.quick-copy').click();
    await expect(fl(page).locator('.quick-copy')).toHaveText('Copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'Fleischner 2017 (single solid nodule, 7 mm average diameter, low risk): CT at 6–12 months, then consider CT at 18–24 months.',
    );
  });

  test('on a phone it fits without sideways scrolling, with tap-sized options', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'phone', 'phone layout only');
    await open(page);
    await choose(page, { 'Nodule type': 'Part solid', Number: 'Single' });
    await fl(page).locator('input[name="size"]').fill('12');
    await fl(page).locator('input[name="solid"]').fill('4');
    await expect(fl(page).locator('.quick-headline')).toContainText('annual CT');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    const heights = await fl(page).locator('label.quick-option:visible').evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(32);
  });
});
