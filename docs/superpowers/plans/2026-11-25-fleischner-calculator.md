# Fleischner calculator rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Fleischner 2017 quick view under the front page's Fleischner row, built from a new calculator module, with the shared calculator contract extended to choice fields.

**Architecture:** `shared/calculators/types.ts` gains choice fields, data-only "applies when" conditions, and a few optional result/foot fields; `shared/calculators/fleischner.ts` is a pure module tested against the audit's 40 cases; `src/scripts/quick-calc.ts` renders choice fields as radio groups and hides fields that don't apply. Registration turns on the row's calc button.

**Tech Stack:** TypeScript, Astro 7, Vitest (`vitest.unit.config.ts`), Playwright (desktop + 360 px phone).

**Spec:** `docs/superpowers/specs/2026-11-25-fleischner-calculator-design.md` (approved by the owner 2026-11-25).

## Global Constraints

- Advice and note wording: exactly the design's table and notes (en dashes in ranges, "≥", "<"); the owner signs it off in the preview.
- Look rules from `CLAUDE.md`: raw colours only in `src/styles/tokens.css`; one accent colour, for the calc mark, the selected item and focus only; hover effects wait `var(--hover-delay)`; no gradients, box-shadows, `backdrop-filter`, emoji or coloured edge stripes; IBM Plex; inputs ≥ 16 px on phones.
- Nothing typed is stored or sent; an open counts once (existing behaviour).
- ECV and Bernoulli: behaviour and their test files unchanged.
- ORCA pages untouched; work on branch `fleischner-calc`; `main` only after the owner has reviewed a preview on desktop and phone and said to merge.

## Review Focus

1. A size typed in centimetres (0.6) must ask for millimetres, never return "No routine follow-up" (Task 2 test `a size under 1 mm is taken for centimetres`).
2. Switching nodule type after choosing risk or typing a solid component must not carry the hidden value back silently (Task 3 e2e `switching type clears what no longer applies`).
3. A solid component as large as the whole nodule (a typo) gives a message, not advice (Task 2 test `solid component must be smaller than the whole nodule`).
4. Halves round up and just-below-halves round down at every cut-off (Task 2 test `rounding at the cut-offs`).
5. Keyboard: the radio groups take arrows, Esc from a radio closes the view and returns focus (Task 3 e2e `keyboard through the groups; Esc from a radio closes`).

---

### Task 1: The contract learns choice fields

**Files:**
- Modify: `shared/calculators/types.ts`
- Create: `test/unit/calculators/contract.test.ts`
- Modify: `test/unit/calculators/index.test.ts` (add the definition checks)

**Interfaces:**
- Produces (in `types.ts`):
  - `type When = Readonly<Record<string, readonly string[]>>` — the field applies when every named choice field holds one of the listed values.
  - `type NumberField = { kind?: 'number'; key; label; unit; min; max; step; placeholder; hint?: string; when?: When }` (today's `Field` plus `kind`, `hint`, `when`; ECV and Bernoulli literals need no change).
  - `type ChoiceOption = { value: string; label: string }`; `type ChoiceField = { kind: 'choice'; key: string; label: string; options: readonly ChoiceOption[]; hint?: string; when?: When }`; `type Field = NumberField | ChoiceField`.
  - `type Choices = Readonly<Record<string, string | undefined>>`.
  - `Outcome` ok branch gains `notes?: readonly string[]` (shown after `note`) and `textHeadline?: boolean` (headline is a sentence).
  - `Calculator` gains `intro?: string` (one line above the fields), `link?: { text: string; href: string }` (replaces "Full calculator →"), and `compute(values: Values, changed?: string, choices?: Choices): Outcome` (choices third so ECV and Bernoulli stay as they are).
  - `function applies(field: Field, choices: Choices): boolean`.

- [ ] **Step 1: Write the failing tests** in `contract.test.ts`:

```ts
const risk: Field = { kind: 'choice', key: 'risk', label: 'Risk', options: [{ value: 'low', label: 'Low' }, { value: 'high', label: 'High' }], when: { type: ['solid'] } };
test('a field with no condition always applies', () => expect(applies({ ...risk, when: undefined }, {})).toBe(true));
test('a field applies when its choice holds a listed value', () => expect(applies(risk, { type: 'solid' })).toBe(true));
test('a field does not apply for another value or no choice yet', () => {
  expect(applies(risk, { type: 'ground-glass' })).toBe(false);
  expect(applies(risk, {})).toBe(false);
});
test('every condition must hold', () => {
  const solid: Field = { ...risk, key: 'solid', when: { type: ['part-solid'], count: ['single'] } };
  expect(applies(solid, { type: 'part-solid', count: 'single' })).toBe(true);
  expect(applies(solid, { type: 'part-solid', count: 'multiple' })).toBe(false);
});
```

  In `index.test.ts`, a `test.each` over `CALCULATORS`: every choice field has ≥ 2 options with unique values matching `/^[a-z][a-z0-9-]*$/`; every `when` key names a choice field declared earlier in the same calculator, and every listed value is one of its options.

- [ ] **Step 2: Run** `npx vitest run -c vitest.unit.config.ts test/unit/calculators`. Expected: FAIL (`applies` not exported).
- [ ] **Step 3: Implement** the types and `applies` in `types.ts`; update the header comment (choice fields now exist; machine-readable results still wait for stage 4).
- [ ] **Step 4: Run** `npx vitest run -c vitest.unit.config.ts test/unit/calculators && npm run typecheck`. Expected: PASS, no type errors (ECV/Bernoulli unchanged).
- [ ] **Step 5: Commit** `feat(calculators): choice fields and fields that apply only when a choice holds`.

### Task 2: The Fleischner module

**Files:**
- Create: `shared/calculators/fleischner.ts` (not registered yet)
- Create: `test/unit/calculators/fleischner.test.ts`

**Interfaces:**
- Consumes: Task 1's `Calculator`, `ChoiceField`, `NumberField`, `Choices`, `applies`.
- Produces: `export const fleischner: Calculator` with `id: 'fleischner'`, `title: 'Fleischner Society 2017'`, `implements: 'Fleischner Society 2017'`, citation full "MacMahon H et al. Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017. Radiology 2017;284:228–243." and short "MacMahon et al., Radiology 2017", `intro` "Not for patients under 35, with known cancer or immunosuppression, or for lung cancer screening CTs.", `link` `{ text: 'Guideline →', href: 'https://doi.org/10.1148/radiol.2017161659' }`.
- Fields, one group, in order: `type` "Nodule type" (solid / ground-glass / part-solid → "Solid", "Ground glass", "Part solid"); `count` "Number" (single / multiple → "Single", "Multiple"; hint "For multiple nodules, enter the most suspicious one."); `risk` "Risk", `when: { type: ['solid'] }` (low / high; hint from the design's field 3); `size` "Size", unit "mm", hint "Average of long and short axes (whole nodule)", min 1, max 100, step 1, placeholder "6"; `solid` "Solid component", unit "mm", hint "From 6 mm", `when: { type: ['part-solid'], count: ['single'] }`, min 1, max 100, step 1, placeholder "4".
- `export function countedMm(raw: number): number` — `Math.round(raw)` (halves up).

Compute order: (1) incomplete if a field that applies is empty, except `solid` when the counted size is < 6 — message `Still needed: <labels, lower-case, in field order>.`; (2) invalid: size ≤ 0 → "Size must be greater than 0 mm."; 0 < size < 1 → "Enter the size in millimetres (e.g. 6, not 0.6)."; solid given and ≤ 0 → "Solid component must be greater than 0 mm."; solid ≥ size (raw values) → "The solid component must be smaller than the whole nodule."; (3) advice from the design's tables by counted size (and counted solid component), `textHeadline: true`, `notes` from the design's notes list, `details` `["Counted as 6 mm (5.6 rounded)"]` or `["Counted as 7 mm"]`, plus `"Solid component counted as 4 mm"` when used; (4) `report`: `Fleischner 2017 (<description>): <headline>`, ending with a full stop (added when the headline has none), where description is `single solid nodule, 7 mm average diameter, low risk` / `multiple solid nodules, most suspicious 7 mm average diameter, high risk` / `single ground-glass nodule, 7 mm average diameter` / `single part-solid nodule, 12 mm average diameter with a 4 mm solid component` / `multiple part-solid nodules, most suspicious 8 mm average diameter` (counted sizes). Risk is ignored where it doesn't apply.

- [ ] **Step 1: Write the failing tests** in `fleischner.test.ts`:
  - `the audit's 40 cases give the paper's advice`: read `docs/audit/batch-1/cases/fleischner.json`; map `size_mm→size`, `nodule_type→type`, `multiplicity→count`, `patient_risk→risk`; overrides `f2017-partsolid-single-low-5-6` and `-low-6-0` add `solid: 3`; `f2017-partsolid-single-solid-entered-4` → size 12, solid 4; `-solid-7` → size 12, solid 7; `-solid-9` → size 15, solid 9. A hand-written `EXPECTED: Record<caseId, headline>` in the design's wording, one entry per case, each checked by eye against the case's `expected.text` while writing it. Assert the key sets are equal (no case skipped) and each `compute(...)` is ok with that headline.
  - `rounding at the cut-offs` (single solid low): 5.4 → "No routine follow-up"; 5.5 and 5.6 → the 6–8 mm advice; 8.4 → 6–8; 8.5 → > 8. Part solid size 12: solid 5.4 → annual CT advice; 5.5 → highly suspicious; 8.4 → highly suspicious; 8.5 → "PET/CT, biopsy, or resection recommended."
  - `a single part-solid nodule under 6 mm needs no solid component`: size 5 → ok "No routine follow-up" with the "can't be defined" note; size 5.6, no solid → incomplete "Still needed: solid component."
  - `what is still needed`: `{}` → "Still needed: nodule type, number, size."; type solid only → "Still needed: number, risk, size.".
  - `a size under 1 mm is taken for centimetres`: 0.6 → invalid "Enter the size in millimetres (e.g. 6, not 0.6)."; 0 and −2 → "Size must be greater than 0 mm.".
  - `solid component must be smaller than the whole nodule`: size 8, solid 8 and solid 9 → that message; solid 0 → "Solid component must be greater than 0 mm.".
  - `risk is ignored for subsolid nodules`: ground glass single 7 with risk low, high, undefined → identical outcomes.
  - `notes`: one assertion per note in the design's list (each appears where the design says and not on a solid single low < 6 result).
  - `details show the size counted`: 5.6 → "Counted as 6 mm (5.6 rounded)"; 7 → "Counted as 7 mm"; part solid 12/4 → also "Solid component counted as 4 mm".
  - `the report line`: the five description shapes above, exact strings.
- [ ] **Step 2: Run** `npx vitest run -c vitest.unit.config.ts test/unit/calculators/fleischner.test.ts`. Expected: FAIL (module missing).
- [ ] **Step 3: Implement** `fleischner.ts`.
- [ ] **Step 4: Run** `npx vitest run -c vitest.unit.config.ts test/unit/calculators && npm run typecheck`. Expected: PASS.
- [ ] **Step 5: Commit** `feat(calculators): Fleischner 2017 module, tested on the audit's cases`.

### Task 3: The quick view draws it; the row gets its button

**Files:**
- Modify: `src/scripts/quick-calc.ts`, `src/styles/front.css`
- Modify: `shared/calculators/index.ts` (register `fleischner`), `shared/data/resources.ts` (`fleischner` → `calculator: true`, drop the switched-off comment)
- Modify: `test/unit/calculators/index.test.ts` (ids `['ecv', 'bernoulli', 'fleischner']`), `test/unit/registry.test.ts` (6 calculators incl. `fleischner`; comment), `e2e/quick-calc.spec.ts`, `e2e/front.spec.ts`

**Interfaces:**
- Consumes: Task 1 types and `applies`; Task 2 `fleischner`.
- `createQuickCalc(calc, fullUrl)` keeps its signature. Markup it adds: `p.quick-intro` (when `intro`); a choice field is `fieldset.quick-choice` with `legend.quick-field-label` and one `label.quick-option` per option wrapping `input[type=radio]` (`name` = `${root.id}-${key}`, `value`, `data-key` = key) and a `span`; a hint is `p.quick-hint` tied by `aria-describedby`; each field's wrapper is hidden when `applies` is false and its value cleared when it becomes hidden; number inputs keep `name` = key. `compute(values, changedKey, choices)`. Foot link text/href from `calc.link`, else "Full calculator →" and `fullUrl`. `notes` render as extra `.quick-note`s; `textHeadline` adds `.quick-headline-text`.

- [ ] **Step 1: Write the failing e2e tests** in `quick-calc.spec.ts` (Fleischner is in Popular):
  - in the first test, Fleischner's toggle is visible.
  - `Fleischner: solid, single, low, 5.6 mm gives the 6–8 mm advice`: open; the first radio is focused, no radio is checked and the result says "Still needed: nodule type, number, size."; intro text shown; check Solid, Single, Low; fill `input[name="size"]` 5.6; `.quick-headline` = "CT at 6–12 months, then consider CT at 18–24 months"; `.quick-details` contains "Counted as 6 mm (5.6 rounded)"; `.quick-full` text "Guideline →", href the DOI.
  - `risk shows only for solid; the solid component only for a single part-solid nodule`.
  - `switching type clears what no longer applies`: Part solid, Single, size 12, solid 7 → switch to Ground glass → switch back to Part solid → `input[name="solid"]` is empty and the result says "Still needed: solid component."; same for Risk (High chosen, switch to Ground glass and back → no risk radio checked).
  - `keyboard through the groups; Esc from a radio closes`: ArrowRight in the type group checks the next option; Tab reaches the next group; Escape from a radio closes and focuses the toggle.
  - `Copy gives the report line` for solid single low 7.
  - phone: Part solid, Single, all fields shown, no sideways scroll at 360 px; radio labels ≥ 32 px tall.
  - `front.spec.ts` row test: Fleischner's row shows `.calc-toggle` (replace the `.calc` count-0 assertion and its comment; TI-RADS keeps the plain-label check).
- [ ] **Step 2: Run** `npm run e2e -- quick-calc front`. Expected: FAIL (no Fleischner toggle).
- [ ] **Step 3: Implement** the renderer changes, styles (`.quick-intro`, `.quick-hint` muted/small; `.quick-choice` fieldset reset; `.quick-option` segments with `--line` borders, checked = `--accent` border and text, `:focus-visible` accent outline, wraps on a phone; `.quick-headline-text` at 1rem, wrapping), registration, registry flag and unit-test updates.
- [ ] **Step 4: Run** `npm test && npm run typecheck && npm run e2e && npm run check:dist`. Expected: all PASS.
- [ ] **Step 5: Commit** `feat: Fleischner quick view on the front page`.

### Task 4: Owner review and ship (each step needs the owner's go-ahead)

- [ ] **Step 1: Owner review** of a preview (`npm run build`, then `npx astro preview --host 127.0.0.1` reachable from the owner's phone over the tailnet) on desktop and phone: the buttons, the advice and note wording, the report line, the "Guideline →" link. Apply edits with their tests; re-run Task 3's Step 4; commit `content: owner's review of the Fleischner calculator`.
- [ ] **Step 2: Merge** `fleischner-calc` to `main` and push (public repo; the Pages deploy runs from `main`; no Worker change, no new ids). CI and Deploy green.
- [ ] **Step 3: Verify live** on desktop and 360 px (Worker stubbed): the Fleischner quick view works, ORCA hashes unchanged, `npm run check:links`.
- [ ] **Step 4: Old page** (guidelines_manager, owner's OK): add to the notice "The rebuilt calculator is on the front page: https://dfergs93.github.io/". Push; verify live.
