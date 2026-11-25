# Radiology Reference Site, Stage 1 (Foundation and Front Page) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Radiology Apps Portal" at dfergs93.github.io with a static Astro front page that finds any of 49 guideline and cardiac resources in a click or two, plus a small Cloudflare Worker that counts opens anonymously.

**Architecture:** Astro builds plain static pages. One typed registry in `shared/` is the single source of truth, read by the pages, the client script and the Worker. Client behaviour (rail, search, favorites, theme, counts) is vanilla TypeScript over server-rendered markup, so the page still lists everything without JavaScript. The Worker has one endpoint (`POST /count`) writing daily per-resource counts to D1.

**Tech Stack:** Astro 7.4.13, TypeScript 6.0.3, zod 4.6.7, MiniSearch 7.2.0 (as in protocol-hub), self-hosted IBM Plex via @fontsource 5.3.0, Vitest 5.1.1, Playwright 1.65.1, Wrangler 4.168.0, @cloudflare/vitest-plugin 1.9.2, D1, GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-24-radiology-reference-site-design.md` (approved 2026-11-24). Read it before starting; this plan argues from it.

## Global Constraints

- Work on branch `rebuild` only. `main` is what GitHub Pages publishes today; nothing reaches `main` until Task 9's owner sign-off.
- Never create paths `/guidelines_manager/`, `/cardiac-imaging-resources/` or `/radiology-protocols/` in the build (they belong to other repos' Pages sites).
- `orca-website-docs/privacy-policy.html` (sha256 `0494fdc86690df9141cea59f1b3ed565c0192d91c344ae46a3c778a9446f2305`) and `orca-website-docs/orca-usage-guide.html` (sha256 `26caaf6d22a93169d97ad8b1fe130a67baf97622a6cbedf7605ef637b00a04cc`) ship byte-identical at those paths.
- No cookies, no accounts, nothing personal stored anywhere. Local storage keys are `radref:favorites` and `radref:theme` only.
- Dark for every visitor by default, whatever the device setting. Light only via the header switch. Do not use `prefers-color-scheme`.
- Raw colours appear only in `src/styles/tokens.css`. No gradients, box-shadows, `backdrop-filter`, emoji or card grids anywhere. One accent colour, used only for the calculator mark, the selected item and focus. Hover effects wait 100 ms before showing (`transition-delay: 100ms`). No coloured edge stripes on rows.
- Fonts: IBM Plex Sans (400, 600) and IBM Plex Mono (400), self-hosted via @fontsource. Tabular numerals (`font-variant-numeric: tabular-nums`) on counts and version labels.
- Dependencies are pinned to exact versions (no `^`), matching the owner's other repos.
- Node 25 in CI (protocol-hub's choice); Astro needs ≥ 22.23.4.
- Every commit message ends with:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_018rxg1PuJtLzstwBW3FFyVK
  ```
- Outward-facing actions (creating Cloudflare resources, deploying, pushing, changing GitHub Pages settings) happen only in Task 9, each with the owner's go-ahead at the time.

## Review Focus

1. **Count beacon blocked or slow** (hospital proxy, Worker down): opening a resource must navigate immediately and never wait on the count. Test in Task 7.
2. **Local storage throws or is wiped** (locked-down or private browsers): the page, search and theme still work; stars hide; the next load opens dark. Tests in Tasks 4 and 6.
3. **A `/` typed inside the search box** (e.g. "T1/T2"): the shortcut must not swallow it. Test in Task 5.
4. **Odd queries:** blank, punctuation like `c++(`, a 500-character paste, or no matches. No exceptions, and a plain "No matches" line. Tests in Tasks 3 and 5.
5. **Stale favorite ids** (a resource later removed or renamed): ignored silently, never shown as broken rows. Test in Task 6.

---

### Task 1: Repository scaffold, with the ORCA pages preserved

**Files:**
- Create: `package.json`, `package-lock.json`, `.nvmrc` (`25`), `astro.config.mjs`, `tsconfig.json`, `vitest.unit.config.ts`, `.gitignore`, `src/pages/index.astro` (temporary: a heading with the site name; Task 5 replaces it)
- Move: `orca-website-docs/*.html` → `public/orca-website-docs/` (`git mv`, bytes untouched)
- Delete: `index.html` (the old portal; `main` keeps it until launch)
- Test: `test/unit/orca-pages.test.ts`

**Interfaces:**
- Produces: npm scripts used by every later task: `dev`, `build` (`astro build`), `preview`, `typecheck` (`astro check && tsc -p worker/tsconfig.json`; the worker half is a no-op until Task 7 creates it, so start with `astro check` and extend in Task 7), `test:unit` (`vitest run -c vitest.unit.config.ts`), `test` (runs `test:unit`; Task 7 appends `test:worker`), `e2e` (`playwright test`, added in Task 4).
- `astro.config.mjs`: `site: 'https://dfergs93.github.io'`, static output, `trailingSlash: 'always'`, `build.format: 'directory'`.
- `.gitignore`: `node_modules/`, `dist/`, `.astro/`, `.wrangler/`, `test-results/`, `playwright-report/`, `.dev.vars`.
- Exact dependency versions: listed in Tech Stack, plus `@cloudflare/workers-types` 5.20261124.2 and `@types/node` 26.6.6.

- [ ] **Step 1: Write the failing test** `test/unit/orca-pages.test.ts`:
```ts
const PINNED = {
  'privacy-policy.html': '0494fdc86690df9141cea59f1b3ed565c0192d91c344ae46a3c778a9446f2305',
  'orca-usage-guide.html': '26caaf6d22a93169d97ad8b1fe130a67baf97622a6cbedf7605ef637b00a04cc',
};
test.each(Object.entries(PINNED))('public/orca-website-docs/%s is byte-identical', (name, sha) => {
  expect(sha256(readFileSync(`public/orca-website-docs/${name}`))).toBe(sha);
});
```
- [ ] **Step 2: Run it.** `npx vitest run -c vitest.unit.config.ts test/unit/orca-pages.test.ts`. Expected: FAIL with ENOENT, because the files are still at the repo root.
- [ ] **Step 3: Scaffold the project** with the files above, `git mv` the ORCA pages into `public/orca-website-docs/`, and `git rm index.html`.
- [ ] **Step 4: Verify.** `npm run test:unit` should PASS. `npm run build` should exit 0, with `dist/orca-website-docs/privacy-policy.html` and `dist/index.html` present. `npm run typecheck` should exit 0.
- [ ] **Step 5: Commit** with message `chore: scaffold the Astro site and keep the ORCA pages byte-identical`.

---

### Task 2: The resource registry

**Files:**
- Create: `shared/areas.ts`, `shared/schema.ts`, `shared/site.ts`, `shared/data/resources.ts`, `shared/data/popular.ts`, `shared/registry.ts`, `shared/order.ts`, `docs/audit-notes.md`
- Test: `test/unit/registry.test.ts`, `test/unit/order.test.ts`

**Interfaces:**
- Produces, in `shared/areas.ts`:
  - `AREAS`: a readonly array of `{ id, label }` in rail order: `chest` "Chest", `cardiac` "Cardiac", `congenital` "Congenital heart", `abdomen` "Abdomen", `gu-pelvis` "GU & pelvis", `head-neck-neuro` "Head & neck · Neuro", `msk` "MSK", `breast` "Breast", `oncology` "Oncology", `contrast` "Contrast".
  - `type AreaId`, and `areaLabel(id: AreaId): string`.
- Produces, in `shared/schema.ts`:
  - `type Resource = { id: string; title: string; area: AreaId; version: string; calculator: boolean; summary: string; aliases: string[]; url: string; areaRank?: number }`.
  - `validateRegistry(raw: unknown[], popular: string[]): Resource[]`. It throws one `Error` listing every problem found.
  - Rules:
    - `id` matches `/^[a-z0-9-]+$/` and is unique.
    - `version` is non-empty; `'none'` is allowed but must be written out.
    - `summary` is 1–110 characters.
    - `aliases` has at least two entries.
    - `url` starts with `https://dfergs93.github.io/` and ends with `/`.
    - `areaRank`, if present, is a positive integer, unique within its area.
    - Every id in `popular` exists, and `popular` has no duplicates.
- Produces, in `shared/registry.ts`: `RESOURCES: readonly Resource[]` and `POPULAR: readonly string[]`, both validated at import time, so a bad entry fails `astro build`. Also `byId(id: string): Resource | undefined`.
- Produces, in `shared/order.ts`:
  - `areaList(resources, area: AreaId): Resource[]`: entries with `areaRank` first (ascending), then the rest alphabetically by title (`localeCompare`, `'en'`, `sensitivity: 'base'`).
  - `popularList(resources, popular): Resource[]`: in `popular` order.
  - `areaCounts(resources): Record<AreaId, number>`.
- Produces, in `shared/site.ts`: `SITE = { name: 'Radiology reference', credit: 'D. Ferguson', origin: 'https://dfergs93.github.io', reportErrorUrl: 'https://github.com/dfergs93/dfergs93.github.io/issues/new' }`. All placeholders for the owner's pre-launch review; do not publish his email.

**Entries (ids are permanent; urls are relative to `https://dfergs93.github.io/`; ✓ = calculator):**

| id | area | ✓ | url | title (tidy as needed) |
|---|---|---|---|---|
| fleischner | chest | ✓ | guidelines_manager/pulmonary/fleischner/ | Fleischner Society |
| lung-rads | chest | ✓ | guidelines_manager/pulmonary/lung_rads/ | Lung-RADS |
| thoracic-aortic-aneurysm | chest | | guidelines_manager/cardiovascular/thoracic_aortic_aneurysm/ | Thoracic aortic aneurysm |
| arvc | cardiac | | guidelines_manager/cardiovascular/arvc_2019/ | ARVC |
| ecv | cardiac | ✓ | cardiac-imaging-resources/calculators/ecv/ | ECV |
| flow-4d | cardiac | ✓ | cardiac-imaging-resources/calculators/flow/ | 4D flow |
| bernoulli | cardiac | ✓ | cardiac-imaging-resources/calculators/bernoulli/ | Simplified Bernoulli |
| valve-grading | cardiac | | cardiac-imaging-resources/valves/ | Valve grading |
| cardiac-mri-sequences | cardiac | | cardiac-imaging-resources/cardiac_mri/ | Cardiac MRI sequences and normal values |
| cmr-masses | cardiac | | cardiac-imaging-resources/cardiac_mri/protocols/cardiac_masses/ | Cardiac masses protocol |
| cmr-cardiomyopathy | cardiac | | cardiac-imaging-resources/cardiac_mri/protocols/cardiomyopathy/ | Cardiomyopathy protocol |
| cmr-congenital-4d-flow | cardiac | | cardiac-imaging-resources/cardiac_mri/protocols/congenital_4dflow/ | Congenital / 4D flow protocol |
| cmr-stress-perfusion | cardiac | | cardiac-imaging-resources/cardiac_mri/protocols/stress_perfusion/ | Stress perfusion protocol |
| cardiac-ct-ccta | cardiac | | cardiac-imaging-resources/cardiac_ct/ | Coronary CT angiography and CAD-RADS |
| laao-ct | cardiac | | cardiac-imaging-resources/cardiac_ct/device_planning/laao/ | LAAO planning CT |
| tavr-ct | cardiac | | cardiac-imaging-resources/cardiac_ct/device_planning/tavr/ | TAVR planning CT |
| tmvr-ct | cardiac | | cardiac-imaging-resources/cardiac_ct/device_planning/tmvr/ | TMVR planning CT |
| ttvr-ct | cardiac | | cardiac-imaging-resources/cardiac_ct/device_planning/ttvr/ | TTVR planning CT |
| chd-overview | congenital | | cardiac-imaging-resources/congenital/ | Congenital heart disease: overview and MRI tips |
| asd | congenital | | cardiac-imaging-resources/congenital/asd/ | Atrial septal defect |
| avsd | congenital | | cardiac-imaging-resources/congenital/avsd/ | AV septal defect |
| cctga | congenital | | cardiac-imaging-resources/congenital/cctga/ | Congenitally corrected TGA |
| coarctation | congenital | | cardiac-imaging-resources/congenital/coa/ | Coarctation of the aorta |
| dorv | congenital | | cardiac-imaging-resources/congenital/dorv/ | Double-outlet right ventricle |
| ebstein | congenital | | cardiac-imaging-resources/congenital/ebstein/ | Ebstein anomaly |
| fontan | congenital | | cardiac-imaging-resources/congenital/fontan/ | Fontan circulation |
| tga | congenital | | cardiac-imaging-resources/congenital/tga/ | Transposition of the great arteries |
| tof | congenital | | cardiac-imaging-resources/congenital/tof/ | Tetralogy of Fallot |
| vsd | congenital | | cardiac-imaging-resources/congenital/vsd/ | Ventricular septal defect |
| adrenal | abdomen | ✓ | guidelines_manager/adrenal/adrenal_nodule_acr_2017/ | Adrenal nodule |
| li-rads | abdomen | ✓ | guidelines_manager/hepatobiliary/li_rads/ | LI-RADS |
| hepatobiliary-car-2020 | abdomen | | guidelines_manager/hepatobiliary/hepatobiliary_lesions_car_2020/ | Incidental hepatobiliary lesions |
| gallbladder-car-2025 | abdomen | | guidelines_manager/hepatobiliary/gallbladder_lesions_car_2025/ | Incidental gallbladder lesions |
| gallbladder-acr-2017 | abdomen | | guidelines_manager/hepatobiliary/gallbladder_polyp_acr_2017/ | Gallbladder and biliary tract |
| pancreatic-cyst-car-2021 | abdomen | | guidelines_manager/pancreatic/pancreatic_cysts_car_2021/ | Incidental pancreatic cysts |
| pancreatic-cyst-acr-2017 | abdomen | | guidelines_manager/pancreatic/pancreatic_cyst_acr_2017/ | Pancreatic cysts |
| splenic-car-2025 | abdomen | | guidelines_manager/spleen/splenic_lesions_car_2025/ | Incidental splenic lesions |
| bosniak | gu-pelvis | ✓ | guidelines_manager/genitourinary/bosniak/ | Bosniak |
| pi-rads | gu-pelvis | ✓ | guidelines_manager/genitourinary/pi_rads/ | PI-RADS |
| renal-lesion-acr-2017 | gu-pelvis | | guidelines_manager/genitourinary/renal_lesion_acr_2017/ | Incidental renal lesion |
| renal-mass-car-2019 | gu-pelvis | | guidelines_manager/genitourinary/renal_mass_car_2019/ | Incidental renal mass |
| o-rads | gu-pelvis | | guidelines_manager/gynecologic/o_rads/ | O-RADS |
| ti-rads | head-neck-neuro | ✓ | guidelines_manager/thyroid/tirads/ | TI-RADS |
| pituitary | head-neck-neuro | | guidelines_manager/neuro/pituitary/ | Pituitary |
| msk-car-2023 | msk | | guidelines_manager/musculoskeletal/msk_findings_car_2023/ | Incidental MSK findings |
| bi-rads | breast | | guidelines_manager/breast/bi_rads/ | BI-RADS |
| lung-cancer-staging | oncology | | guidelines_manager/oncology/lung_cancer_staging/ | Lung cancer staging |
| rectal-cancer-staging | oncology | | guidelines_manager/oncology/rectal_cancer_staging/ | Rectal cancer staging |
| contrast-safety | contrast | | guidelines_manager/contrast/contrast_safety/ | ACR contrast safety |

Source pages for the drafting below: `~/Code/_archive/guidelines_manager/docs/` and `~/Code/cardiac_imaging_resources/docs/`.

- **`version`:** state what the linked page itself says (e.g. `2017`, `v1.1`, `v2018`, `CAR 2025`, `ACR 2017`). Rules:
  - Use `'none'` for resources that follow no versioned guideline: the congenital pages, the cardiac MRI protocols, the cardiac CT planning pages, ECV, 4D flow, Bernoulli, and the overview pages.
  - If a guideline page states no version, use `'none'` and add a line to `docs/audit-notes.md`.
- **`summary`:** one plain line, at most 110 characters, saying what the resource is for. These are clinical statements, drafted for the owner's review.
- **`aliases`:** at least two per entry: abbreviations, everyday terms (`kidney cyst` for bosniak, `nodule` for fleischner, lung-rads, ti-rads and adrenal), joined-up spellings (`lirads`, `pirads`, `tirads`, `orads`, `birads`, `lungrads`) and common misspellings (`fleishner`).
- **`docs/audit-notes.md`:** a stage 2 list. It starts with "Lung-RADS page is v1.1; v2022 is current", "Old guidelines home page calls LI-RADS v2023 while the LI-RADS page is v2018", and "Two pancreatic cyst pages (ACR 2017 and CAR 2021) overlap". Add anything noticed while drafting.
- **`shared/data/popular.ts` seed:** `['fleischner','li-rads','bosniak','adrenal','lung-rads','contrast-safety','ecv','ti-rads','pi-rads','o-rads']`. No `areaRank` values yet; the owner sets them in Task 9.

- [ ] **Step 1: Write failing tests**, using inline fixtures for the validator tests.
  - `test/unit/registry.test.ts`:
```ts
test('rejects a missing version, an empty version, a duplicate id, an unknown area and an unknown popular id, listing all of them', () => {
  expect(() => validateRegistry([noVersion, emptyVersion, dupA, dupA, badArea], ['nope']))
    .toThrow(/version[\s\S]*version[\s\S]*duplicate id[\s\S]*area[\s\S]*popular/i);
});
test("accepts version 'none'", () => expect(validateRegistry([{ ...ok, version: 'none' }], [])).toHaveLength(1));
test('rejects a summary over 110 characters, fewer than two aliases, a non-site url, and a duplicate areaRank in one area', ...);
test('the real registry has 49 entries, 10 calculators and these area counts', () => {
  expect(RESOURCES).toHaveLength(49);
  expect(RESOURCES.filter(r => r.calculator).map(r => r.id).sort()).toEqual(
    ['adrenal','bernoulli','bosniak','ecv','fleischner','flow-4d','li-rads','lung-rads','pi-rads','ti-rads']);
  expect(areaCounts(RESOURCES)).toEqual({ chest: 3, cardiac: 15, congenital: 11, abdomen: 8, 'gu-pelvis': 5,
    'head-neck-neuro': 2, msk: 1, breast: 1, oncology: 2, contrast: 1 });
});
test('every id from the plan table is present with its url and area', ...); // table as a fixture array
```
  - `test/unit/order.test.ts`:
    - `areaList` puts ranked entries first in rank order, then the rest alphabetically, ignoring case.
    - `popularList` keeps the given order.
- [ ] **Step 2: Run them.** `npm run test:unit`. Expected: FAIL (modules not found).
- [ ] **Step 3: Implement** the `shared/` modules and the data, then draft `docs/audit-notes.md`.
- [ ] **Step 4: Verify.** `npm run test:unit` should PASS, and `npm run build` should exit 0. Then temporarily blank one `version`, run `npm run build`, and confirm it FAILS naming that id. Revert the change.
- [ ] **Step 5: Commit** with message `feat: resource registry with areas, popular seed and ordering`.

---

### Task 3: Search

**Files:**
- Create: `shared/search.ts`
- Test: `test/unit/search.test.ts`

**Interfaces:**
- Consumes: `Resource`, `areaLabel` (Task 2).
- Produces: `createSearch(resources: readonly Resource[]): (query: string) => Resource[]`. Returns results ranked best first. A query that is empty or only spaces returns `[]`.
- MiniSearch settings:
  - Fields: `title` (boost 3), `aliases` (boost 2), area label (1), `summary` (1).
  - `prefix: true`, `fuzzy: (term) => term.length >= 4 ? 0.2 : false`, `combineWith: 'AND'`.
  - Queries are trimmed and cut to 200 characters before searching.

- [ ] **Step 1: Write failing tests** with real registry data:
```ts
const search = createSearch(RESOURCES);
const ids = (q: string) => search(q).map(r => r.id);
test('kidney cyst finds Bosniak first', () => expect(ids('kidney cyst')[0]).toBe('bosniak'));
test('nodule finds the four nodule guidelines', () =>
  expect(ids('nodule').slice(0, 6)).toEqual(expect.arrayContaining(['fleischner','lung-rads','ti-rads','adrenal'])));
test.each([['fleishner','fleischner'],['lirads','li-rads'],['li-rads','li-rads'],['ecv','ecv'],['tavr','tavr-ct'],['tof','tof']])
  ('%s finds %s first', (q, id) => expect(ids(q)[0]).toBe(id));
test('pancreatic cyst finds both pancreatic pages first', () =>
  expect(ids('pancreatic cyst').slice(0, 2).sort()).toEqual(['pancreatic-cyst-acr-2017','pancreatic-cyst-car-2021']));
test.each(['', '   ', 'zzzz', 'c++(', 'x'.repeat(500)])('odd query %j returns an array without throwing', q =>
  expect(Array.isArray(search(q))).toBe(true));
test('blank query returns nothing', () => expect(search('  ')).toEqual([]));
```
- [ ] **Step 2: Run them.** `npm run test:unit -- search`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement `createSearch`.** If a real query misses, fix the registry's aliases, not the test.
- [ ] **Step 4: Verify.** `npm run test:unit` should PASS.
- [ ] **Step 5: Commit** with message `feat: registry search with aliases and typo tolerance`.

---

### Task 4: Look, layout, theme switch, About and 404

**Files:**
- Create:
  - styles: `src/styles/tokens.css`, `src/styles/base.css`
  - layout and components: `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/ThemeSwitch.astro`, `src/components/Footer.astro`
  - scripts: `src/scripts/storage.ts`, `src/scripts/theme.ts`
  - pages: `src/pages/about.astro`, `src/pages/404.astro`
  - config: `playwright.config.ts`
- Modify: `src/pages/index.astro` (the placeholder now renders inside `Base.astro`, so the theme tests have a page to run on)
- Test: `test/unit/storage.test.ts`, `test/unit/style-rules.test.ts`, `e2e/theme.spec.ts`

**Interfaces:**
- Produces, in `src/scripts/storage.ts`:
  - `safeStorage(): Storage | null`, which probes with a set and remove inside try/catch.
  - `readTheme(s: Storage | null): 'light' | 'dark'`, which defaults to `'dark'`.
  - `writeTheme(s: Storage | null, t: 'light' | 'dark'): void`, which never throws.
- Produces, in `Base.astro`:
  - Props `{ title: string; description: string }`.
  - An inline head script (`is:inline`, runs before first paint) that:
    - adds class `js` to `<html>`;
    - sets `data-theme="light"` on `<html>` only when `radref:theme` is `'light'`;
    - wraps everything in try/catch.
  - Slots: default (main content).
  - Imports the fonts and both stylesheets.
- Produces, in `tokens.css`:
  - Custom properties `--ground --panel --line --ink --muted --dim --accent --star` under `:root` (dark) and `:root[data-theme="light"]`.
  - Start the dark values from the approved mockup (`#0c0f14 #12161d #202733 #e6eaf0 #8a94a3 #5b6472 #5fc2b0 #e3b341`) and adjust any that fail contrast.
- `Header.astro`: `SITE.name` and `SITE.credit` on the left. On the right: an About link (`/about/`), an ORCA link (`/orca-website-docs/orca-usage-guide.html`), and `ThemeSwitch` (a `<button>` with `aria-pressed` set when light, labelled "Light mode").
- `Footer.astro`: "A reference, not a substitute for clinical judgement.", the credit, and an About link.
- `about.astro` covers:
  - what the site is and who maintains it;
  - how to report an error (`SITE.reportErrorUrl`);
  - that content follows the cited guideline versions;
  - the clinical-judgement disclaimer;
  - that favorites are kept per browser, so a shared workstation shares them.

  The owner reviews this copy in Task 9.
- `playwright.config.ts`:
  - `webServer`: `PUBLIC_COUNT_URL=https://count.test/count npm run build && npm run preview -- --port 4321`, URL `http://localhost:4321/`.
  - Projects: Chromium desktop and Chromium at 360×740.

- [ ] **Step 1: Write failing tests.**
  - `test/unit/storage.test.ts`:
    - `readTheme(null)` is `'dark'`.
    - A storage whose `getItem` throws gives `'dark'`.
    - `writeTheme` on a throwing storage doesn't throw.
    - `safeStorage()` returns `null` when `localStorage.setItem` throws.
  - `test/unit/style-rules.test.ts`:
    - Every text token (`--ink --muted --dim --accent --star`) has contrast ≥ 4.5:1 against `--ground` and `--panel`, in both themes (parse `tokens.css`, compute WCAG relative luminance).
    - No `#hex`, `rgb(` or `hsl(` appears in `src/**` outside `tokens.css`.
    - No `gradient(`, `box-shadow` or `backdrop-filter` appears anywhere in `src/**`.
  - `e2e/theme.spec.ts`:
    - With `colorScheme: 'light'` emulated, the page opens with no `data-theme` and a dark `--ground` background.
    - Clicking the switch sets light, and after reload it is still light.
    - No flash: the first-paint background colour is already light. Check this via `page.addInitScript` recording `getComputedStyle(document.documentElement).backgroundColor` at `DOMContentLoaded`.
    - With `localStorage` replaced by a throwing stub (`addInitScript`), the switch still toggles for the visit, and the next load opens dark.
- [ ] **Step 2: Run them.** `npm run test:unit && npm run e2e -- theme`. Expected: FAIL.
- [ ] **Step 3: Implement** the files above, applying `transition-delay: 100ms` to hover effects.
- [ ] **Step 4: Verify.** `npm run test:unit && npm run e2e -- theme` should PASS, and `npm run typecheck` should exit 0.
- [ ] **Step 5: Commit** with message `feat: dark-first look, theme switch, About and 404 pages`.

---

### Task 5: Front page (rail, lists, search, keyboard, phone, no-JavaScript)

**Files:**
- Create: `src/components/Rail.astro`, `src/components/ResourceRow.astro`, `src/components/ResourceSection.astro`, `src/components/SearchBox.astro`, `src/scripts/front.ts`
- Modify: `src/pages/index.astro` (replace the placeholder)
- Test: `e2e/front.spec.ts`

**Interfaces:**
- Consumes: `RESOURCES`, `POPULAR`, `byId`, `areaList`, `popularList`, `areaCounts`, `AREAS` (Task 2); `createSearch` (Task 3); `Base.astro` (Task 4).
- Produces this DOM contract, which Tasks 6 and 7 rely on. Only `ResourceRow.astro` writes row markup; client code never builds rows, it clones them from `#all-resources` by `data-id`.
  - Each row is `<li class="row" data-id="{id}">` containing:
    - `<button class="star" type="button" data-id="{id}" aria-pressed="false" hidden>`;
    - `<a class="row-link" href="{url}">` holding the title, `<span class="version">` (omitted when `'none'`), `<span class="calc">calc</span>` for calculators, and `<span class="row-area">` (shown only in Popular, Favorites and search results);
    - `<p class="summary">`.
  - Sections: `<section class="list" id="list-{key}" data-list="{key}">`, with an `<h2>` and a `<ul>`. The keys are:
    - `popular`, then each area id, server-rendered in order;
    - `favorites` and `results`, empty and hidden;
    - `#all-resources`, which holds every row once and is hidden.
  - Rail: `<nav class="rail">` of `<a class="rail-item" href="#list-{key}" data-list="{key}">` with `<span class="rail-count">`, in this order: favorites (rendered with `hidden`), popular, a `<hr class="rail-divider">`, then the areas in `AREAS` order.
- Behaviour:
  - **Selection:** with `html.js`, only the selected section shows. The selection follows the URL hash (`#list-abdomen`), so reload and back keep it. With no hash, Popular is selected. The selected rail item has `aria-current="true"`.
  - **`/` shortcut:** pressing `/` focuses the search box, unless focus is already in an input, textarea or contenteditable element.
  - **Typing:** a non-blank query shows `#list-results`, holding the matching rows cloned in ranked order. The rail counts change to matches per area, and areas with no matches get `aria-disabled` styling.
  - **No matches:** the results list says "No matches for "{query}"".
  - **Clearing:** Esc clears the box and restores the previous selection. So does clicking a rail item during a search, which also selects that item.
  - **Arrows and Enter:** results have a highlighted row, the first one by default (`aria-selected="true"`, `aria-activedescendant` on the input). Up and Down move the highlight while focus stays in the box. Enter goes to the highlighted row's link.
  - **No JavaScript:** every section is visible, stacked with its heading, and the rail links jump to them.
  - **Phone:** below 720 px the rail becomes a single horizontally scrolling row of tabs under the search box, and the page never scrolls sideways.

- [ ] **Step 1: Write failing tests** in `e2e/front.spec.ts`. Use `page.route('https://dfergs93.github.io/**', r => r.fulfill({ body: 'ok' }))` so navigations to the old sites stay offline.
  - **Popular on load:** the page loads with Popular selected and its 10 rows in the seeded order.
  - **Areas:** clicking Abdomen shows its 8 rows and puts `#list-abdomen` in the URL; reload keeps Abdomen.
  - **Shortcut:** `/` focuses the box; typing `T1/T2` into the box gives the value `T1/T2`.
  - **Search:** `kidney cyst` makes the first result row `bosniak`, the GU & pelvis rail count ≥ 1, and Chest's count 0 and disabled.
  - **Keys:** ArrowDown moves the highlight to the second row. Enter navigates to that row's URL; assert the `page.waitForURL`.
  - **Esc:** clears the box and restores the previous section.
  - **Odd queries:** `zzzz` shows "No matches for "zzzz"". `c++(` and a 500-character paste raise no `pageerror`.
  - **Rail during search:** clicking a rail item clears the search.
  - **No JavaScript** (`javaScriptEnabled: false`): all 49 rows are visible in area sections, and the Popular section is visible.
  - **Phone (360×740):** the rail is one row (all `.rail-item` share the same `offsetTop`), and `document.documentElement.scrollWidth <= 360`.
- [ ] **Step 2: Run them.** `npm run e2e -- front`. Expected: FAIL.
- [ ] **Step 3: Implement** the components, `index.astro` and `front.ts`, as `initFront(root: HTMLElement): void`, called from a `<script>` in `index.astro`.
- [ ] **Step 4: Verify.** `npm run e2e` (all specs) should PASS, and `npm run typecheck` should exit 0.
- [ ] **Step 5: Commit** with message `feat: front page with rail, Popular, search and keyboard`.

---

### Task 6: Favorites

**Files:**
- Create: `src/scripts/favorites.ts`
- Modify: `src/scripts/front.ts`
- Test: `test/unit/favorites.test.ts`, `e2e/favorites.spec.ts`

**Interfaces:**
- Consumes: `safeStorage` (Task 4) and the row/section/rail DOM contract (Task 5).
- Produces:
  - `readFavorites(s: Storage | null, validIds: ReadonlySet<string>): string[]`, in starred order.
  - `toggleFavorite(s: Storage | null, id: string, validIds: ReadonlySet<string>): string[]`, which returns the new list and never throws.
  - Stored as a JSON array under `radref:favorites`.
- Behaviour:
  - When storage works, `front.ts` un-hides every `.star`. Clicking one toggles `aria-pressed`, and its label switches between "Add to favorites" and "Remove from favorites".
  - The favorites rail item appears once at least one favorite exists, with its count, and `#list-favorites` holds the starred rows cloned in starred order.
  - Removing the last favorite while viewing Favorites switches the view to Popular.
  - With storage unavailable, the stars stay hidden.

- [ ] **Step 1: Write failing tests.**
  - `test/unit/favorites.test.ts`:
    - Unknown ids in storage are dropped.
    - Malformed JSON gives `[]`.
    - Starred order is kept.
    - Toggling twice removes the id.
    - A `null` storage gives `[]`, and toggling it returns `[]` without throwing.
  - `e2e/favorites.spec.ts`:
    - Starring Fleischner makes "Favorites" appear with count 1 and shows that row.
    - The star survives a reload.
    - Unstarring hides the Favorites item and returns the view to Popular.
    - Pre-seeding `radref:favorites` with `["fleischner","gone-id"]` shows only Fleischner.
    - With a throwing `localStorage` stub, no `.star` is visible and search still works.
- [ ] **Step 2: Run them.** `npm run test:unit -- favorites && npm run e2e -- favorites`. Expected: FAIL.
- [ ] **Step 3: Implement** `favorites.ts` and wire it into `front.ts`.
- [ ] **Step 4: Verify.** `npm run test:unit && npm run e2e` should PASS.
- [ ] **Step 5: Commit** with message `feat: favorites kept in the browser`.

---

### Task 7: Count Worker and the open beacon

**Files:**
- Create:
  - Worker: `worker/wrangler.jsonc`, `worker/tsconfig.json`, `worker/src/index.ts`, `worker/src/count.ts`, `worker/migrations/0001_opens.sql`, `worker/sql/counts.sql`
  - Test config: `vitest.worker.config.ts`
- Modify: `src/scripts/front.ts`, `package.json` (scripts)
- Test: `test/worker/count.test.ts`, `e2e/beacon.spec.ts`

**Interfaces:**
- Consumes: `RESOURCES` (Task 2) for the valid id set, and the `.row-link` contract (Task 5).
- Produces:
  - `worker/src/count.ts`: `handleCount(request: Request, deps: CountDeps): Promise<Response>`, with `type CountDeps = { db: D1Database; limiter?: RateLimit; allowedOrigins: readonly string[]; validIds: ReadonlySet<string>; today: () => string }`.
  - `worker/src/index.ts`: wires `env` into `deps` (`allowedOrigins` from var `ALLOWED_ORIGINS`, comma-separated; `today` gives the UTC `YYYY-MM-DD`).
  - Responses:

    | Request | Response |
    |---|---|
    | `POST /count` with a valid origin and id | 204, count recorded |
    | Origin missing or not allowed | 403 |
    | Body not a known id, or over 100 bytes | 400 |
    | Limiter returns `success: false` | 429 (nothing recorded) |
    | Not POST on `/count` | 405 |
    | Any other path | 404 |
  - Rate limiter key: the `CF-Connecting-IP` header, used only as the limiter key and never stored or logged. The limit is generous because hospitals share one address and a limited request only drops a count.
- Schema (`0001_opens.sql`): `CREATE TABLE opens (resource_id TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (resource_id, day));`. Record with `INSERT ... VALUES (?, ?, 1) ON CONFLICT(resource_id, day) DO UPDATE SET n = n + 1`.
- `worker/wrangler.jsonc`:
  - Settings: `name: "radref"`, `main: "src/index.ts"`, `compatibility_date: "2026-11-01"`, `preview_urls: false`.
  - D1 binding `DB` → database `radref` (`database_id` filled in Task 9), `migrations_dir: "migrations"`.
  - `ratelimits`: `[{ name: "COUNT_LIMITER", namespace_id: "4301", simple: { limit: 60, period: 60 } }]`.
  - `vars`: `{ ALLOWED_ORIGINS: "https://dfergs93.github.io" }`.
- npm scripts:
  - `test:worker`: `vitest run -c vitest.worker.config.ts`, appended to `test`.
  - `worker:dev`: `wrangler dev -c worker/wrangler.jsonc`.
  - `worker:deploy`: `wrangler deploy -c worker/wrangler.jsonc`.
  - `db:migrate:local` and `db:migrate:remote`: `wrangler d1 migrations apply radref --local|--remote -c worker/wrangler.jsonc`.
  - `counts`: `wrangler d1 execute radref --remote -c worker/wrangler.jsonc --file worker/sql/counts.sql`. It prints `resource_id, d7, d30, d90` (sums of `n` over the last 7, 30 and 90 days), ordered by `d30 DESC`.
  - Extend `typecheck` with `tsc -p worker/tsconfig.json`.
- `vitest.worker.config.ts`: protocol-hub's pattern (`cloudflareTest` from `@cloudflare/vitest-plugin`, `readD1Migrations('./worker/migrations')`, with a setup file applying them). If the test runtime rejects the `ratelimits` block, point the tests at a `worker/wrangler.test.jsonc` without it; the handler's limiter is injected anyway.
- Beacon:
  - On `click`, and on `auxclick` with the middle button, of any `.row-link`, `front.ts` calls `navigator.sendBeacon(import.meta.env.PUBLIC_COUNT_URL, id)`, with the row's id as a text/plain body. If `sendBeacon` is missing, it uses `fetch(url, { method: 'POST', body: id, keepalive: true, mode: 'no-cors' })`.
  - It never calls `preventDefault` and never awaits.
  - When `PUBLIC_COUNT_URL` is unset at build time, no beacon is sent.

- [ ] **Step 1: Write failing tests.**
  - `test/worker/count.test.ts` (real D1 from the test runtime, fake limiter objects):
    - **Recording:** two valid POSTs on the same day leave one row with `n = 2`. `PRAGMA table_info(opens)` lists exactly `resource_id, day, n`.
    - **Rejected ids:** an unknown id gives 400 and no row. A 101-byte body gives 400.
    - **Rejected origins:** `Origin: https://evil.example` gives 403, and so does a missing Origin header.
    - **Method and path:** GET `/count` gives 405, and `/other` gives 404.
    - **Limiter:** a limiter returning `{ success: false }` gives 429 and no row. With no limiter in `deps`, the request is still recorded.
  - `e2e/beacon.spec.ts` (the build has `PUBLIC_COUNT_URL=https://count.test/count`):
    - Clicking the Fleischner row sends a POST to `https://count.test/count` with body `fleischner`. Capture it with `page.route`.
    - With that route aborted, the click still navigates to the Fleischner URL within 1 second.
- [ ] **Step 2: Run them.** `npm run test:worker && npm run e2e -- beacon`. Expected: FAIL.
- [ ] **Step 3: Implement** the Worker, the migration, `counts.sql`, the scripts and the beacon.
- [ ] **Step 4: Verify.** `npm test && npm run e2e && npm run typecheck` should PASS. Run `npm run db:migrate:local` and `npm run worker:dev`. Then `curl -i -X POST localhost:8787/count -H 'Origin: https://dfergs93.github.io' --data fleischner` should give 204, and the same request with `-H 'Origin: https://x.test'` should give 403.
- [ ] **Step 5: Commit** with message `feat: anonymous open counts via a Cloudflare Worker`.

---

### Task 8: CI, build checks, deploy workflow and repo docs

**Files:**
- Create: `scripts/check-dist.ts`, `scripts/check-links.ts`, `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `CLAUDE.md`, `README.md`
- Modify: `package.json` (scripts `check:dist`: `node scripts/check-dist.ts dist`, and `check:links`: `node scripts/check-links.ts`)
- Test: `test/unit/check-dist.test.ts`, `test/unit/check-links.test.ts`

**Interfaces:**
- Produces:
  - `checkDist(dir: string): string[]` (exported from `scripts/check-dist.ts`; the list of problems, empty when fine). Checks:
    - both ORCA files are present with the pinned hashes;
    - `index.html`, `about/index.html` and `404.html` exist;
    - no top-level `guidelines_manager`, `cardiac-imaging-resources` or `radiology-protocols` entry exists.
  - `checkLinks(urls: string[], fetcher: (url: string) => Promise<number>): Promise<string[]>` (exported from `scripts/check-links.ts`). It returns the urls that didn't answer 200, after one retry each, running 6 requests at a time. The CLI runs it on every `RESOURCES` url using real `fetch` (GET, redirects followed, 15-second timeout), and exits 1 on any failure.
- `ci.yml` runs on every push and pull request, on Node 25 with an npm cache. Steps, in order:
  1. `npm ci`;
  2. `npm run typecheck`;
  3. `npm test`;
  4. `npm run build`;
  5. `npm run check:dist`;
  6. `npm run check:links`;
  7. `npx playwright install --with-deps chromium`;
  8. `npm run e2e`;
  9. upload `test-results` when the job fails.

  Use `actions/checkout@v7` and `actions/setup-node@v7`.
- `deploy.yml` runs on push to `main` and on `workflow_dispatch`.
  - Permissions: `pages: write`, `id-token: write`, `contents: read`.
  - Concurrency group `pages`.
  - Build job: `npm ci`, then `npm run build` with env `PUBLIC_COUNT_URL: https://radref.dferguson93.workers.dev/count`, then `npm run check:dist`, then `actions/upload-pages-artifact@v5` (path `dist`).
  - Deploy job: `actions/deploy-pages@v5` in environment `github-pages`.
- `CLAUDE.md` (repo) covers:
  - **Publishing:** what this repo publishes; `main` is live, so work happens on branches.
  - **The ORCA pages:** they are immutable, why, and the pinned hashes.
  - **The registry:** it is the source of truth; how to add a resource; that the owner signs off version labels and summaries.
  - **Running things:** the commands (dev, test, e2e, typecheck, worker, counts).
  - **Where things live:** the spec and plan paths, and `docs/audit-notes.md` for stage 2.
  - **Rules:** the look rules from Global Constraints.
- `README.md`: one paragraph and the commands.

- [ ] **Step 1: Write failing tests.**
  - `test/unit/check-dist.test.ts`:
    - A temp dir copied from `public/` plus stub `index.html`, `about/index.html` and `404.html` gives `[]`.
    - Changing one byte of `privacy-policy.html` reports it.
    - Adding a `radiology-protocols/` dir reports it.
  - `test/unit/check-links.test.ts`:
    - A fetcher returning 404 for one url reports only that url.
    - A fetcher that fails once and then returns 200 reports nothing.
- [ ] **Step 2: Run them.** `npm run test:unit -- check`. Expected: FAIL.
- [ ] **Step 3: Implement** the scripts, workflows and docs.
- [ ] **Step 4: Verify.** `npm run build && npm run check:dist && npm run check:links` should exit 0 locally. Then run `npm test` and `npm run e2e`, which should PASS.
- [ ] **Step 5: Commit** with message `ci: test, build checks and Pages deploy workflow; repo docs`.

---

### Task 9: Owner review and launch (every step needs the owner's go-ahead)

**Files:**
- Modify: `shared/site.ts`, `shared/data/resources.ts`, `shared/data/popular.ts`, `src/pages/about.astro` (per the review), `worker/wrangler.jsonc` (`database_id`)

Steps:

- [ ] **Step 1: Owner review on a local preview.** Run `npm run build && npm run preview`. The owner checks and edits:
  - the site name, the credit and the error-report link;
  - the area mapping;
  - the Popular list and any `areaRank` order;
  - the aliases;
  - every version label and summary;
  - the About page copy.

  Apply the edits, then re-run `npm test && npm run e2e`. Commit with message `content: owner's pre-launch review`.
- [ ] **Step 2: Cloudflare (needs the owner to run `! npx wrangler login`).**
  1. Run `npx wrangler d1 create radref` and put the returned id in `worker/wrangler.jsonc`.
  2. Run `npm run db:migrate:remote`, then `npm run worker:deploy`.
  3. If the deploy rejects `ratelimits` (plan availability), remove the block, note it in `CLAUDE.md` and redeploy; the handler runs without a limiter.
  4. Verify that `curl -i -X POST https://radref.dferguson93.workers.dev/count -H 'Origin: https://dfergs93.github.io' --data fleischner` gives 204, that a bad origin gives 403, and that `npm run counts` shows `fleischner` with 1.
  5. Commit the `database_id`.
- [ ] **Step 3: Push `rebuild`.** The repo is public, so the spec and plan become visible; confirm with the owner first. CI must be green.
- [ ] **Step 4: Go live from `rebuild`.**
  1. Read the current Pages config: `gh api repos/dfergs93/dfergs93.github.io/pages`.
  2. Switch the source to GitHub Actions: `gh api -X PUT repos/dfergs93/dfergs93.github.io/pages -f build_type=workflow`.
  3. Allow `rebuild` to deploy: `gh api -X POST repos/dfergs93/dfergs93.github.io/environments/github-pages/deployment-branch-policies -f name=rebuild`. Read the environment's policy first; if it isn't set to custom branch policies, set that.
  4. Start the deploy: `gh workflow run deploy.yml --ref rebuild`, then watch it to success.
- [ ] **Step 5: Verify live.**
  - `https://dfergs93.github.io/` shows the new front page.
  - Both ORCA pages fetched over HTTPS match the pinned sha256.
  - `/guidelines_manager/`, `/cardiac-imaging-resources/` and `/radiology-protocols/` still answer 200.
  - Opening a resource increments `npm run counts`.

  Rollback, if anything is wrong: `gh api -X PUT repos/dfergs93/dfergs93.github.io/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'`, which restores the old portal straight from `main`.
- [ ] **Step 6: The owner checks the live site.** After his OK:
  1. Fast-forward `main` to `rebuild` and push. The deploy now runs from `main`.
  2. Remove the `rebuild` deployment policy.
  3. Update the owner's memory notes and `~/Code/CLAUDE.md` to say stage 1 is live.
