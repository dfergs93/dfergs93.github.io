# Quick Calculators Pilot (ECV and Simplified Bernoulli) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a reader open ECV or Simplified Bernoulli under its row on the front page, type values, read (and copy) the answer, and still reach the full page in one click.

**Architecture:** Each calculator is a pure TypeScript module in `shared/calculators/` (declared fields, `compute`, citation), the contract stages 3 and 4 reuse. `ResourceRow.astro` renders a hidden `calc` button next to the plain `calc` label; `front.ts` un-hides it when the page script runs and opens a quick view built by `src/scripts/quick-calc.ts` from the module's fields. Nothing typed is stored or sent.

**Tech Stack:** as stage 1 (Astro 7.4.13, TypeScript 6.0.3, Vitest 5.1.1, Playwright 1.65.1). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-24-quick-calculators-pilot-design.md` (approved 2026-11-24). It builds on `docs/superpowers/specs/2026-11-24-radiology-reference-site-design.md` and the stage 1 code; read the repo `CLAUDE.md` first.

## Global Constraints

- Starts only after the stage 1 launch (stage 1 plan, Task 9). Work on branch `quick-calc` from `main`; `main` is live, so nothing merges until Task 5's owner go-ahead.
- Every rule in the repo `CLAUDE.md` "Look and behaviour rules" holds: tokens only (raw colours only in `src/styles/tokens.css`), one accent (calculator mark, selected item, focus), hover delay, no gradients/shadows/emoji, IBM Plex, tabular numerals on numbers.
- Row markup is written only by `ResourceRow.astro`; the page script clones rows and never builds them. Quick-view panels are built from a calculator's declared fields by `quick-calc.ts`.
- Clinical text is copied from the current pages, not rewritten (labels, notes, prompts, report lines), minus emoji. The owner reviews it in Task 5.
- Citations (exact):
  - ECV full: `Formula: Messroghli DR et al. Clinical recommendations for cardiovascular magnetic resonance mapping of T1, T2, T2* and extracellular volume. J Cardiovasc Magn Reson 2017;19:75. Bands: local practice.` Short: `Formula: Messroghli et al., JCMR 2017 · Bands: local practice`.
  - Bernoulli full: `Baumgartner H et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the EACVI and ASE. J Am Soc Echocardiogr 2017;30:372–392.` Short: `Baumgartner et al., JASE 2017`.
- Nothing typed into a quick view is stored (local storage keeps only `radref:favorites`, `radref:theme`) or sent. Opening a quick view sends one count for that resource; typing sends nothing.
- Commit messages end with the session's `Co-Authored-By` and `Claude-Session` lines (as in stage 1).

## Review Focus

1. **A value the browser can't read as a number** (a comma decimal like `40,5`, a stray letter): the field counts as empty and the prompt shows; never a silently wrong number. Test in Task 1 (`parseField`); in the page, a number input the browser can't read already reports `''`, which `parseField` treats as empty.
2. **Clipboard blocked** (locked-down hospital browser): Copy says it couldn't copy; no exception, the result stays on screen. Test in Task 4.
3. **The same resource in two lists** (ECV is in Popular and Cardiac): opening it in one list leaves the other row closed; changing list or starting a search closes any open quick view. Test in Task 3.
4. **Keyboard only:** Enter or Space on the button opens it with focus in the first field; Esc from any field closes it and returns focus to the button; in search results, arrows in the search box still move the highlight. Test in Task 3.
5. **Display rounding vs bands:** an ECV of 29.97 shows "30.0%" but bands as Normal, as the current page does (bands use the unrounded value). Pinned by a parity test in Task 1 so a later "fix" is a visible decision, and listed for the audit.

---

### Task 1: The calculator contract and ECV

**Files:**
- Create: `shared/calculators/types.ts`, `shared/calculators/ecv.ts`
- Test: `test/unit/calculators/ecv.test.ts`, `test/unit/calculators/parse.test.ts`

**Interfaces:**
- Produces, in `types.ts`:
  - `type Field = { key: string; label: string; unit: string; min: number; max: number; step: number; placeholder: string }`
  - `type FieldGroup = { label?: string; fields: readonly Field[] }`
  - `type Values = Readonly<Record<string, number | undefined>>`
  - `type Outcome = { status: 'incomplete'; message: string } | { status: 'invalid'; message: string } | { status: 'ok'; headline: string; label?: string; note?: string; details: readonly string[]; report?: string; fill?: Readonly<Record<string, string>> }`
  - `type Calculator = { id: string; title: string; implements: string; citation: { full: string; short: string }; groups: readonly FieldGroup[]; compute(values: Values, changed?: string): Outcome }`
  - `parseField(raw: string): number | undefined` (trimmed; `''` or anything `Number()` can't read as finite gives `undefined`).
- Produces, in `ecv.ts`: `ecv: Calculator` and `ecvBand(value: number): 'Normal' | 'Borderline' | 'Elevated' | 'Markedly elevated'`.
- ECV fields (key, label, unit, min, max, step, placeholder), grouped as on the current page:
  - group without label: `hct` "Hematocrit" % 1 70 1 "40"
  - group "Pre-contrast T1": `pre_myo` "Myocardium" ms 500 2000 1 "1000"; `pre_blood` "Blood pool" ms 500 3000 1 "1700"
  - group "Post-contrast T1": `post_myo` "Myocardium" ms 100 1500 1 "550"; `post_blood` "Blood pool" ms 50 1000 1 "350"
- `ecv.id = 'ecv'`, `title = 'Extracellular volume (ECV)'`, `implements = 'none'`.
- ECV text from the current page: incomplete `Enter all T1 values and hematocrit to calculate ECV.`; invalid `Hematocrit must be between 1–99%.` (when Hct ≤ 0 or ≥ 100) and `Post-contrast T1 must be shorter than pre-contrast T1.` (either pair); notes per band `ECV <30% — normal extracellular matrix`, `ECV 30–32% — borderline; correlate with clinical context`, `ECV 32–40% — elevated; consistent with diffuse fibrosis or edema`, `ECV >40% — markedly elevated; consider amyloid or severe fibrosis`; details `λ (partition coeff.): 0.445`, `ΔR1 myo: 1.2222 s⁻¹`, `ΔR1 blood: 2.7451 s⁻¹`, `1 – Hct: 0.600` (formats as the page: λ 3 dp, ΔR1 ×1000 4 dp, 1 − Hct 3 dp); report lines joined by `\n`: `T1 Mapping / ECV:`, `  Hematocrit: 40%`, `  T1 Pre (myocardium) = 1000 ms`, `  ECV: 26.7% (Normal)`.

- [ ] **Step 1: Write the failing tests.**
  - `parse.test.ts`: `parseField('40')` → 40; `' 4.2 '` → 4.2; `''`, `'  '`, `'40,5'`, `'abc'`, `'Infinity'` → `undefined`; `'0'` → 0; `'-3'` → −3.
  - `ecv.test.ts`:
    - worked example `{hct:40, pre_myo:1000, pre_blood:1700, post_myo:450, post_blood:300}` → `{status:'ok', headline:'26.7%', label:'Normal'}`, the four details above, and the report above (exact string).
    - parity table (expected values computed from the current page's formula):
      | hct | pre_myo | pre_blood | post_myo | post_blood | headline | label |
      |---|---|---|---|---|---|---|
      | 42 | 1050 | 1650 | 480 | 330 | 27.1% | Normal |
      | 38 | 1100 | 1700 | 420 | 290 | 31.9% | Borderline |
      | 45 | 1000 | 1600 | 400 | 300 | 30.5% | Borderline |
      | 35 | 1150 | 1750 | 380 | 280 | 38.2% | Elevated |
      | 30 | 1100 | 1700 | 350 | 300 | 49.7% | Markedly elevated |
      | 44 | 1000 | 1700 | 405 | 300 | 30.0% | Normal (unrounded 29.97: Review Focus 5) |
    - `ecvBand`: 29.99 Normal; 30 Borderline; 32 Borderline; 32.01 Elevated; 40 Elevated; 40.01 Markedly elevated.
    - any field `undefined` → incomplete with the prompt; Hct 0 and 100 → the hematocrit message; post_myo = pre_myo, and post_blood > pre_blood → the post-contrast message.
    - `ecv.groups` flattened keys are `['hct','pre_myo','pre_blood','post_myo','post_blood']`, and `ecv.citation` equals the Global Constraints text.
- [ ] **Step 2: Run** `npm run test:unit -- calculators`. Expected: FAIL (modules not found).
- [ ] **Step 3: Implement** `types.ts` and `ecv.ts`. `compute` checks completeness, then Hct, then the T1 pairs, as the page does.
- [ ] **Step 4: Run** `npm run test:unit`. Expected: PASS. `npm run typecheck` exits 0.
- [ ] **Step 5: Commit** `feat: calculator contract and the ECV module`.

---

### Task 2: Simplified Bernoulli and the calculator index

**Files:**
- Create: `shared/calculators/bernoulli.ts`, `shared/calculators/index.ts`
- Test: `test/unit/calculators/bernoulli.test.ts`, `test/unit/calculators/index.test.ts`

**Interfaces:**
- Consumes: `Calculator`, `Outcome` (Task 1); `RESOURCES`, `byId` (stage 1 `shared/registry.ts`).
- Produces: `bernoulli: Calculator`; `CALCULATORS: ReadonlyMap<string, Calculator>` (`ecv`, `bernoulli`) in `index.ts`.
- Bernoulli fields (one unlabelled group): `vmax` "Peak velocity" m/s 0.1 10 0.01 "4.2"; `gradient` "Pressure gradient" mmHg 0 400 0.1 "70.6". `id = 'bernoulli'`, `title = 'Simplified Bernoulli'`, `implements = 'none'`.
- `compute(values, changed)`:
  - `changed === 'vmax'` and vmax > 0 → ok, `fill: { gradient: (4v²).toFixed(1) }`.
  - `changed === 'gradient'` and gradient ≥ 0 → ok, `fill: { vmax: √(ΔP/4).toFixed(2) }`.
  - otherwise → incomplete `Enter a peak velocity or a pressure gradient.` with no `fill` (the other field is left as it is).
  - ok results: `headline` `"<v to 2 dp> m/s ↔ <ΔP to 1 dp> mmHg"`, `details: ['ΔP = 4v²']`, no `label`, no `report` (the current page has no Copy).

- [ ] **Step 1: Write the failing tests.**
  - `bernoulli.test.ts`: vmax 4.0 → fill `{gradient:'64.0'}`, headline `4.00 m/s ↔ 64.0 mmHg`; vmax 4.2 → `'70.6'`; vmax 1.5 → `'9.0'`; gradient 64 → `{vmax:'4.00'}`; 70.6 → `'4.20'`; 0 → `'0.00'`; 100 → `'5.00'`; vmax 0, vmax −1, vmax `undefined` (changed `'vmax'`) and gradient −1 → incomplete with no `fill`; the other field's value is ignored when computing (vmax 4 changed with gradient 999 present → `'64.0'`).
  - `index.test.ts`: every `CALCULATORS` key is a registry id whose resource has `calculator: true`; each module's `id` equals its key; every field key is unique within a module and matches `/^[a-z][a-z0-9_]*$/`; every `citation.full` and `citation.short` is non-empty.
- [ ] **Step 2: Run** `npm run test:unit -- calculators`. Expected: FAIL for the new files.
- [ ] **Step 3: Implement** `bernoulli.ts` and `index.ts`.
- [ ] **Step 4: Run** `npm run test:unit`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: Simplified Bernoulli module and the calculator index`.

---

### Task 3: The quick view under a row

**Files:**
- Create: `src/scripts/quick-calc.ts`, `e2e/quick-calc.spec.ts`
- Modify: `src/components/ResourceRow.astro`, `src/scripts/front.ts`, `src/styles/front.css`

**Interfaces:**
- Consumes: `CALCULATORS`, `Calculator`, `parseField` (Tasks 1–2); the stage 1 row contract and `front.ts` internals (`select`, `runSearch`, `endSearch`, `countOpen`).
- Row markup (`ResourceRow.astro`). The link holds only title and version; the rest moves beside it so the button is not inside the link:
  ```
  <li class="row" data-id>
    <button class="star" …>                      (unchanged)
    <div class="row-line">
      <a class="row-link" href><span class="row-title">…</span><span class="version">…</span></a>
      {calculator && <span class="calc calc-label">calc</span>}
      {quick && <button class="calc calc-toggle" type="button" aria-expanded="false" hidden>calc</button>}
      <span class="row-area">…</span>
    </div>
    <p class="summary">…</p>
  </li>
  ```
  `quick` = `CALCULATORS.has(id)`. The stretched link (`.row-link::after`) still covers the row; `.calc-toggle` and `.quick-calc` sit above it (`position: relative; z-index: 1`), like the star.
- `quick-calc.ts`: `createQuickCalc(calc: Calculator, fullUrl: string): HTMLElement`. It returns `<div class="quick-calc" role="group" aria-label="{title} calculator">` containing:
  - per group an optional `<p class="quick-group">` label;
  - per field `<label>` + `<input type="number" inputmode="decimal" name="{key}" min max step placeholder>` + unit;
  - `<output class="quick-result" aria-live="polite">`, with `.quick-headline`, `.quick-label`, `.quick-note` and `.quick-details` as the outcome has them, or the incomplete/invalid message as `.quick-message`;
  - `<p class="quick-source">{citation.short}</p>` (`title` = `citation.full`);
  - `<a class="quick-full" href="{fullUrl}">Full calculator →</a>`.
  
  Values come from `parseField(input.value)` (a number input the browser can't read gives `''`). On each `input` event it calls `compute(values, input.name)` and writes any `fill` values into those inputs.
- `front.ts` behaviour:
  - At init, if the page script runs, every `.calc-toggle` (templates included) is un-hidden and its row's `.calc-label` hidden.
  - Clicking a toggle opens a quick view after the row's `.summary`, sets `aria-expanded="true"` and `aria-controls`, focuses the first input, and calls `countOpen(id)` (Task 4 tests it).
  - Clicking the toggle again, or Esc from inside the quick view, removes it, sets `aria-expanded="false"` and focuses the toggle.
  - Only one quick view exists at a time. `select()`, `runSearch()` and `endSearch()` close any open one.
  - Esc inside a quick view does not clear the search box.

- [ ] **Step 1: Write failing tests** in `e2e/quick-calc.spec.ts` (route `https://dfergs93.github.io/**` offline as in stage 1):
  - ECV's row in Popular has a visible `.calc-toggle` and no visible `.calc-label`; Fleischner's row has a visible `.calc-label` and no `.calc-toggle`.
  - Opening ECV: `aria-expanded="true"`, `input[name=hct]` focused, and `.quick-result` shows `Enter all T1 values and hematocrit to calculate ECV.`.
  - Filling the worked example (40, 1000, 1700, 450, 300) shows `26.7%`, `Normal`, `λ (partition coeff.): 0.445`, and the source line `Formula: Messroghli et al., JCMR 2017 · Bands: local practice`.
  - Post-contrast myocardium 1000 (equal to pre) shows the post-contrast message.
  - Bernoulli (Cardiac list): typing `4` in `vmax` sets `gradient` to `64.0`; then typing `70.6` in `gradient` sets `vmax` to `4.20`.
  - Esc from a field closes it and focuses the toggle; Enter on the focused toggle reopens it; clicking the toggle closes it.
  - One at a time: open ECV in Popular, then go to Cardiac and open Bernoulli, then return to Popular: no `.quick-calc` exists in Popular, and ECV's toggle has `aria-expanded="false"`.
  - Changing list closes an open quick view; typing in the search box closes it.
  - In search results (`ecv`): the result row has a toggle; opening it works; Esc from its field closes it without clearing the box; ArrowDown in the box still moves the highlight.
  - Clicking inside the quick view (a field, the result) does not navigate; `.quick-full` has the registry URL for ECV.
  - Phone project: with ECV open, `document.documentElement.scrollWidth <= 360`.
  - Without JavaScript, and with the front bundle aborted: no visible `.calc-toggle`, and ECV shows its `.calc-label`.
- [ ] **Step 2: Run** `npm run e2e -- quick-calc`. Expected: FAIL.
- [ ] **Step 3: Implement** the row markup, `quick-calc.ts`, the `front.ts` wiring and the styles. The quick view is a panel in `--panel` with a `--line` border, fields in a two-column grid, and the result in tabular numerals; the band label is ink-coloured text, not a coloured badge. Check that the stage 1 row tests still pass with the new `.row-line`.
- [ ] **Step 4: Run** `npm run e2e` (all specs), `npm test`, `npm run typecheck`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: quick calculators open under their rows`.

---

### Task 4: Copy, counting, privacy and docs

**Files:**
- Modify: `src/scripts/quick-calc.ts`, `src/scripts/front.ts`, `CLAUDE.md`, `docs/audit-notes.md`
- Test: `e2e/quick-calc.spec.ts`, `e2e/beacon.spec.ts`

**Interfaces:**
- `quick-calc.ts` adds `<button class="quick-copy" type="button">Copy</button>`, shown only when the current outcome has `report`.
  - On click: `navigator.clipboard.writeText(report)`. On success the button reads "Copied" for 2 s; on rejection, or with no clipboard, it reads "Couldn't copy" for 2 s. It never throws.

- [ ] **Step 1: Write failing tests.**
  - `quick-calc.spec.ts`:
    - With clipboard permissions granted (`context.grantPermissions(['clipboard-read','clipboard-write'])`), Copy after the worked example puts exactly the Task 1 report on the clipboard.
    - Bernoulli shows no Copy.
    - With `navigator.clipboard.writeText` stubbed to reject (`addInitScript`), Copy shows "Couldn't copy", the result stays on screen, and there is no `pageerror`.
    - After typing the worked example, `localStorage.length` equals its value before opening.
  - `beacon.spec.ts`: opening ECV's quick view sends exactly one POST with body `ecv`; typing all five fields and copying sends nothing more; closing and reopening sends a second.
- [ ] **Step 2: Run** `npm run e2e -- quick-calc beacon`. Expected: FAIL (Copy missing; any test that passes already gets a note in the ledger saying why).
- [ ] **Step 3: Implement** Copy.
  - Repo `CLAUDE.md`: under "The registry", add a short "Adding a quick calculator" paragraph (a module in `shared/calculators/`, registered in `index.ts`, worked-example and parity tests, citation required, owner signs off the text). Update "Running things" if anything changed.
  - `docs/audit-notes.md`: add "ECV bands use the unrounded value, so 29.97 shows '30.0%' and Normal (current page behaviour, kept in the quick calculator)".
- [ ] **Step 4: Run** `npm test && npm run e2e && npm run typecheck && npm run build && npm run check:dist`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: copy ECV to the report; quick calculators documented`.

---

### Task 5: Owner review and ship (each step needs the owner's go-ahead)

- [ ] **Step 1: Owner review** on `npm run build && npm run preview`. The owner checks:
  - both quick views on desktop and phone;
  - the clinical text (labels, notes, prompts, report lines);
  - the citations and the source line wording.

  Apply edits, re-run `npm test && npm run e2e`, and commit `content: owner's review of the quick calculators`.
- [ ] **Step 2: Push** `quick-calc` (public repo); CI must be green.
- [ ] **Step 3: Merge** to `main` (fast-forward) and push; the Pages deploy runs from `main`. No Worker change is needed (no new ids).
- [ ] **Step 4: Verify live:** both quick views work at `https://dfergs93.github.io/`, and the ORCA pages still match their pinned hashes (CI's `check:dist` already ran). Update the owner's memory notes.
