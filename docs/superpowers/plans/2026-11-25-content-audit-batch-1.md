# Content audit: setup and batch 1 — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The audit's record, tooling and review page, and batch 1 (Fleischner, Lung-RADS, adrenal, Bosniak, LI-RADS and their calculators) audited, independently re-checked and put in front of the owner.

**Architecture:** The audit record is JSON under `docs/audit/`, validated by a zod schema in `scripts/audit/` and rendered to Markdown that GitHub shows; a unit test keeps the committed files valid and the Markdown up to date. The old calculators are run on the live pages through their own forms by putting inputs in the address (the old site fills the form from the URL and submits it). The owner rules on a private claude.ai page backed by the artifact database; rulings are read back into the JSON.

**Tech Stack:** Node 26 (type stripping, `import.meta.main`), TypeScript 6.0.3, zod 4.6.7, Vitest 5.1.1, Playwright 1.65.1 (`chromium` from `@playwright/test`). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-25-content-audit-design.md`

## Global Constraints

- The repo is public. Audit files say "lead guideline", never whose department follows it; no owner or institution names.
- Clinical changes happen only on the owner's ruling. The owner is the clinical authority.
- What verifies: guideline documents and society consensus or expert statements; original research papers for the numbers they report; a named textbook edition for teaching only; review articles for teaching, with any threshold traced to the paper they cite. Websites (Radiopaedia included), summaries and memory never verify.
- Every threshold, size cut-off, interval, category and criterion on a page is compared with the source, and the location (table/figure/section, page) recorded.
- An unreadable source stops the verdict: the piece is marked `source-not-readable` and the owner is asked for a copy.
- Calculators are run, not read.
- Independent re-check by a fresh reviewer on the most capable model (`fable`), without my reasoning, of every finding other than *correct* and of every threshold marked *correct*; only findings that survive reach the owner.
- Lead guideline: Kyoto for pancreatic cysts; Perinatal Services BC for obstetric ultrasound; otherwise CAR wherever CAR has published guidance; else the established system (Fleischner; ACR LI-RADS, PI-RADS, BI-RADS, TI-RADS, Lung-RADS, O-RADS). Judgement calls are listed for the owner.
- Fix now: anything that could change management, with the smallest safe fix (correct in place / dated notice / calculator switched off), on the old pages and the new site's copies, each with the owner's OK.
- Source PDFs are never committed (copyright): they live in git-ignored `audit-sources/`.
- Work on branch `content-audit`. `main` deploys on every push; merge only on the owner's sign-off. Never create `/guidelines_manager/` paths in this repo.
- Requests to outside services carry nothing about the owner.

## Review Focus

1. A case asks for a select value the form doesn't offer: the browser sets it to '' and the calculator runs on whatever is left. Expected: the case is reported "input not accepted", never compared. (Task 3 test.)
2. The adrenal page has two calculators: a case for one must not carry the other's inputs, and its result is read from its own container. Expected: a case file with an undeclared input is rejected. (Task 3 test.)
3. A verdict backed only by a source marked unreadable. Expected: validation rejects it unless the verdict is `source-not-readable`. (Task 1 test.)
4. The JSON edited without re-rendering. Expected: the records test fails until `npm run audit:render` is run. (Task 2 test.)
5. The review page saves a ruling twice, or a ruling names an id that doesn't exist. Expected: the latest ruling per id wins; an unknown id is an error. (Task 2 test.)

---

### Task 1: The audit record and its rules

**Files:**
- Create: `scripts/audit/schema.ts`, `docs/audit/README.md`, `docs/audit/sources.json`, `docs/audit/gaps.json`
- Modify: `.gitignore` (add `audit-sources/`)
- Test: `test/unit/audit/schema.test.ts`

**Interfaces:**
- Produces (from `scripts/audit/schema.ts`):
  - `KINDS = ['guideline-threshold','protocol','normal-values','teaching','calculator','troubleshooting','listing'] as const` (`listing` = the new site's front-page row: version label and summary)
  - `VERDICTS = ['correct','outdated','wrong','not-lead','unsourced','local-practice','duplicate','drop','source-not-readable'] as const`
  - `type Source = { id; title; citation; version; year: number; url; access: 'open'|'owner-supplied'|'not-readable'; reuse: 'reproduce'|'restate-and-link'|'unknown'; note? }`
  - `type SourceRef = { source: string; location: string }`
  - `type Finding = { id; page; piece; kind; topic; says; sources: SourceRef[]; verdict; management: boolean; fix?; question?; home; duplicateOf?; recheck?: { agrees: boolean; note: string; resolution?: string }; ruling?: { decision: 'keep'|'change'|'drop'; note: string; date: string } }`
  - `type Batch = { batch: number; title; startedOn: string; oldRepoCommits: { guidelines?: string; cardiac?: string }; pages: { id; url; title }[]; findings: Finding[]; recheckList: string[] }`
  - `type Gap = { id; topic; raisedBy: 'owner'|'placeholder'|'candidate'; lead: string; alternatives: string[]; car: 'yes'|'no'|'unknown'; today: string; home: string; priority?: 'now'|'soon'|'later'|'no' }`
  - `parseSources(raw: unknown): Source[]`, `parseBatch(raw: unknown, sources: Source[]): Batch`, `parseGaps(raw: unknown): Gap[]` — throw an `Error` listing every problem
  - `needsRecheck(f: Finding): boolean` — true unless `verdict === 'correct'` and `kind` is `teaching`, `protocol` or `troubleshooting`
  - `reviewProblems(b: Batch): string[]` — findings that need a re-check and lack one, and disagreements without a `resolution`
  - `PAGE_IDS`: the registry's ids (`RESOURCES` from `shared/registry.ts`) plus `['guidelines-site','guidelines-home','cardiac-site','cardiac-home','cardiac-calculators-index','cmr-protocols-index']`

- [ ] **Step 1: Write the failing tests** in `test/unit/audit/schema.test.ts`, with a minimal valid source (`access: 'open'`) and finding as fixtures:
  - `parseBatch` accepts the minimal batch.
  - It rejects, naming the finding id: a duplicate finding id; an unknown `page`; a source id missing from sources; empty `sources` on any verdict other than `unsourced`, `local-practice`, `drop`; `fix` missing on any verdict other than `correct`; `management: true` on `correct` or `drop`; `duplicate` without a `duplicateOf` that names another finding in the batch; an id not matching `/^B\d+-[a-z0-9-]+-\d{2}$/`.
  - It rejects a verdict other than `source-not-readable` whose sources are all `access: 'not-readable'` (Review Focus 3).
  - `needsRecheck`: `correct` + `guideline-threshold` → true; `correct` + `teaching` → false; `wrong` + `teaching` → true.
  - `reviewProblems` lists a `wrong` finding without `recheck`, and a `recheck.agrees === false` without `resolution`; returns `[]` when both are present.
  - `parseGaps` rejects a duplicate gap id and an unknown `raisedBy`.

- [ ] **Step 2: Run and watch them fail**
  Run: `npx vitest run -c vitest.unit.config.ts test/unit/audit/schema.test.ts`
  Expected: FAIL (cannot find `scripts/audit/schema.ts`)

- [ ] **Step 3: Implement `scripts/audit/schema.ts`** with zod object schemas plus a cross-check pass (ids, sources, duplicates) that collects every problem before throwing.

- [ ] **Step 4: Run and watch them pass** (same command). Expected: PASS.

- [ ] **Step 5: Seed the record files**
  - `docs/audit/sources.json`: `[]`.
  - `docs/audit/gaps.json`: the owner's gaps from the spec (`raisedBy: 'owner'`: obstetric US findings, lead "Perinatal Services BC"; ovarian/adnexal nonspecific lesions; uterine/endometrial/cervical findings; breast rad-path correlation and follow-up; renal AML follow-up; lipomas, ganglion cysts and indeterminate superficial soft-tissue lesions; DVT and superficial vein thrombosis) and the 15 placeholders from `docs/audit-notes.md` (`raisedBy: 'placeholder'`, ids as reserved there, the two pancreatic cyst pages with `home` "one Kyoto-led pancreatic cyst page"). `lead` is what the spec states or `"to find"`; `car: 'unknown'` until checked; no `priority` yet.
  - `docs/audit/README.md`: the method in one page (pieces, kinds, verdicts with one line each, the management flag, what verifies, lead rule, fix-now, how to re-render), pointing to the spec.
  - `.gitignore`: `audit-sources/`.

- [ ] **Step 6: Commit**
  `git add scripts/audit/schema.ts test/unit/audit/schema.test.ts docs/audit .gitignore && git commit -m "feat(audit): record schema, rules and seeded gap list"`

### Task 2: Rendering, the records test, and rulings

**Files:**
- Create: `scripts/audit/render.ts`, `scripts/audit/rulings.ts`
- Modify: `package.json` (script `"audit:render": "node scripts/audit/render.ts"`)
- Test: `test/unit/audit/render.test.ts`, `test/unit/audit/records.test.ts`

**Interfaces:**
- Consumes: Task 1's types and parsers.
- Produces:
  - `renderBatch(b: Batch, sources: Source[]): string` — Markdown: title, start date and old-repo commits; one `##` section per page in `b.pages` order; per finding a `###` heading `<id> · <piece>`, then verdict (with **management** when flagged), what the page says, sources as `<citation>, <location>`, fix, question, proposed home, re-check note, ruling. Ends with the recheck list.
  - `renderGaps(g: Gap[]): string` — a table.
  - `reviewData(b: Batch, sources: Source[]): ReviewFinding[]` — each finding with its sources resolved to `{ citation, url, location }`, for the review page.
  - `applyRulings(b: Batch, rulings: { id: string; decision: 'keep'|'change'|'drop'; note: string; date: string; savedAt: string }[]): Batch` — latest `savedAt` per id wins; throws on an unknown id.
  - CLI (`import.meta.main`): for every `docs/audit/batch-*.json` writes `batch-N.md` and `docs/audit/review/batch-N.json`; writes `docs/audit/gaps.md`.

- [ ] **Step 1: Write the failing tests**
  - `render.test.ts`: page sections appear in `pages` order; a management finding shows **management**; a source renders as citation then location; a finding with a ruling shows it; `reviewData` resolves source ids to citations and urls; `applyRulings` keeps the later of two rulings for one id and throws on an unknown id naming it (Review Focus 5).
  - `records.test.ts`: every committed `docs/audit/batch-*.json` passes `parseBatch` against `sources.json`; `gaps.json` passes `parseGaps`; each `batch-N.md` and `gaps.md` equals what `renderBatch`/`renderGaps` produce from its JSON (Review Focus 4; the failure message says to run `npm run audit:render`).

- [ ] **Step 2: Run and watch them fail**
  Run: `npx vitest run -c vitest.unit.config.ts test/unit/audit`
  Expected: FAIL (render module missing)

- [ ] **Step 3: Implement** `scripts/audit/render.ts` and `scripts/audit/rulings.ts`.

- [ ] **Step 4: Render and run**
  Run: `npm run audit:render && npx vitest run -c vitest.unit.config.ts test/unit/audit`
  Expected: `docs/audit/gaps.md` written; PASS.

- [ ] **Step 5: Full checks and commit**
  Run: `npm run typecheck && npm test` — Expected: clean, all green.
  `git add scripts/audit test/unit/audit package.json docs/audit && git commit -m "feat(audit): render records, records test, apply rulings"`

### Task 3: Running the old calculators

**Files:**
- Create: `scripts/audit/old-calc.ts`
- Modify: `package.json` (script `"audit:calc": "node scripts/audit/old-calc.ts"`)
- Test: `test/unit/audit/old-calc.test.ts`

**Interfaces:**
- Produces:
  - `type CaseFile = { calculator: string; pageUrl: string; formId: string; resultId: string; params: string[]; categoryKey?: string; cases: CalcCase[] }`
  - `type CalcCase = { id: string; inputs: Record<string, string>; expected: { source: SourceRef; text: string; category?: string }; note?: string }`
  - `type CaseResult = { id: string; notAccepted: string[]; recommendation: string; specifics: Record<string, string>; categoryMatch?: boolean }`
  - `parseCaseFile(raw: unknown): CaseFile` — rejects inputs not in `params`, duplicate case ids (Review Focus 2)
  - `caseUrl(pageUrl: string, inputs: Record<string, string>): string`
  - `notAccepted(requested: Record<string, string>, actual: Record<string, string>): string[]` — names whose field value differs from what was asked
  - `categoryOf(value: string): string` — the last whitespace-separated token ("Lung-RADS 4A" → "4A")
  - `renderCaseResults(file: CaseFile, results: CaseResult[]): string` — Markdown table: case, inputs, expected (with source location), got, match; a case with `notAccepted` shows "input not accepted: …" and no match (Review Focus 1)
  - CLI: `npm run audit:calc -- <case file>` opens each case's URL in headless Chromium, waits up to 5 s for `#<resultId>` to be visible, reads `#calc-<param>` values, `.result-recommendation` text and the `.result-inputs li` pairs, and writes `<case file>.results.md` next to the case file. Prints `n cases, n matched, n mismatched, n input not accepted, n no result`.

- [ ] **Step 1: Write the failing tests** for `parseCaseFile` (undeclared input rejected, duplicate case id rejected), `caseUrl` (encodes values; `size_mm=7&nodule_type=part-solid`), `notAccepted` (`{nodule_type:'ground_glass'}` vs `{nodule_type:''}` → `['nodule_type']`), `categoryOf`, and `renderCaseResults` (a not-accepted case renders "input not accepted: nodule_type" and no match mark).

- [ ] **Step 2: Run and watch them fail**
  Run: `npx vitest run -c vitest.unit.config.ts test/unit/audit/old-calc.test.ts` — Expected: FAIL (module missing)

- [ ] **Step 3: Implement** `scripts/audit/old-calc.ts`.

- [ ] **Step 4: Run and watch them pass** (same command). Expected: PASS.

- [ ] **Step 5: Live smoke** — a scratch case file (not committed) for Fleischner: page `https://dfergs93.github.io/guidelines_manager/pulmonary/fleischner/`, form `fleischner-form`, result `fleischner-results`, params `size_mm, nodule_type, patient_risk, multiplicity`, one case `{size_mm:'4', nodule_type:'solid', patient_risk:'low', multiplicity:'single'}`.
  Run: `npm run audit:calc -- <scratch file>`
  Expected: `1 cases`, the results table shows "No routine follow-up", nothing "input not accepted".

- [ ] **Step 6: Commit** `git add scripts/audit/old-calc.ts test/unit/audit/old-calc.test.ts package.json && git commit -m "feat(audit): run the old calculators through their live forms"`

### Task 4: Batch 1 sources

**Files:** Modify `docs/audit/sources.json`; local only: `audit-sources/` (PDFs).

- [ ] **Step 1: Decide each topic's lead by the rule.** For lung nodules (incidental), lung cancer screening, adrenal incidentaloma, cystic renal masses and LI-RADS: search for CAR guidance first; record what exists. Where CAR guidance and an established system both cover a topic (e.g. CAR renal guidance and Bosniak 2019), or the lead is otherwise a judgement (e.g. a provincial screening program's chosen Lung-RADS version), the lead is a question for the owner in Task 6.
- [ ] **Step 2: Get the documents.** The version each page claims and the current version (e.g. Lung-RADS v1.1 and v2022; Fleischner 2017; ACR adrenal 2017 and any CAR adrenal guidance; Bosniak 2019 and CAR renal; LI-RADS CT/MRI v2018 and any later CT/MRI core). Download with `curl -L -o audit-sources/<id>.pdf <url>`; read them with the Read tool. A document that can't be read gets `access: 'not-readable'` and goes on the owner's list.
- [ ] **Step 3: Record each** in `sources.json` (citation in full, version, year, url, access, reuse terms as the publisher states them, or `unknown`).
- [ ] **Step 4: Verify** — `npx vitest run -c vitest.unit.config.ts test/unit/audit` — Expected: PASS.
- [ ] **Step 5: Commit** `git add docs/audit/sources.json && git commit -m "docs(audit): batch 1 sources"`

### Task 5: Batch 1 calculator runs

**Files:** Create `docs/audit/batch-1/cases/{fleischner,lung_rads,adrenal_washout,adrenal_nodule,bosniak,lirads}.json` and their `.results.md`.

Form, result container and params per calculator are in the old site's `docs/javascripts/guideline_calculators.js` (`handleCalculator(...)` calls); select values are in each page's Markdown.

- [ ] **Step 1: Write the cases** from the source documents: every category boundary (each side of every cut-off) and every branch the guideline defines, for the version the page claims and, as separate cases, the lead/current version. Each case's `expected` cites its source location.
- [ ] **Step 2: Run each** — `npm run audit:calc -- docs/audit/batch-1/cases/<calc>.json` — Expected: a results table per calculator; every mismatch, "input not accepted" and "no result" becomes a finding in Task 6.
- [ ] **Step 3: Usability notes** per calculator: words before the first input, whether every option is visible at once, whether the algorithm is visible (kept for Task 6 as `calculator` findings' text).
- [ ] **Step 4: Commit** `git add docs/audit/batch-1 && git commit -m "docs(audit): batch 1 calculator runs"`

### Task 6: Batch 1 findings

**Files:** Create `docs/audit/batch-1.json` (rendered to `batch-1.md` and `review/batch-1.json`); modify `docs/audit/gaps.json` for gaps found.

- [ ] **Step 1: Pin the pages**: `startedOn`, `oldRepoCommits.guidelines` = `git -C ~/Code/_archive/guidelines_manager rev-parse --short HEAD`, and the five pages with their live URLs.
- [ ] **Step 2: Split and check every page** (Fleischner, Lung-RADS, adrenal, Bosniak, LI-RADS): every piece as a finding, every number against the source with its location; the calculator findings from Task 5; one `listing` finding per page for its front-page row (version label and summary in `shared/data/resources.ts`).
- [ ] **Step 3: Cross-page findings** (`page: 'guidelines-site'`): the "Last Institutional Review: January 2024" line (proposed removal); the home page's LI-RADS "v2023" and BI-RADS "v2023" labels if they bear on batch 1 pages; any repeat across the five pages.
- [ ] **Step 4: Owner questions** on the findings they belong to (lead judgement calls, local practice to confirm, unreadable sources).
- [ ] **Step 5: Render and verify** — `npm run audit:render && npx vitest run -c vitest.unit.config.ts test/unit/audit` — Expected: PASS (`reviewProblems` not yet empty: re-checks pending).
- [ ] **Step 6: Commit** `git add docs/audit && git commit -m "docs(audit): batch 1 findings (before re-check)"`

### Task 7: Independent re-check

- [ ] **Step 1: Dispatch one fresh reviewer per page** (Agent, `model: 'fable'`, in parallel, read-only). Each gets: the page's Markdown path in the old repo (at the pinned commit), the list of pieces needing re-check (`needsRecheck`) with id, piece and what the page says, and the local source PDFs; **not** my verdicts, fixes or reasoning. It returns, per id: its verdict, the source location, and a short quote of the source text it relied on.
- [ ] **Step 2: Compare and settle.** Agreement → `recheck: { agrees: true, note }`. Disagreement → re-read the source; record `agrees: false`, the reviewer's note and the `resolution` (finding changed, withdrawn, or standing with the reason). Withdrawn findings keep their record with verdict changed.
- [ ] **Step 3: Verify** — `npm run audit:render && npx vitest run -c vitest.unit.config.ts test/unit/audit`, plus a one-off check that `reviewProblems(batch1)` is `[]`. Expected: PASS, no problems.
- [ ] **Step 4: Commit** `git add docs/audit && git commit -m "docs(audit): batch 1 independently re-checked"`

### Task 8: The review page (owner-gated at the end)

**Files:** Create `docs/audit/review/index.html` (the page source).

- [ ] **Step 1:** Load the `artifact-capabilities` skill and run the Artifact quickstart (`intent: 'other'`) before writing the page.
- [ ] **Step 2: Build the page**: findings grouped by page, each showing piece, verdict (management marked), what the page says, sources with links and locations, proposed fix, question, re-check note; Keep / Change / Drop and a note box saving to the artifact database (one record per finding id with `decision`, `note`, `savedAt`); a count of findings ruled; usable at 360 px; follows the artifact design rules. Data: `review/batch-1.json` published with the page.
- [ ] **Step 3: Publish** the private page and give the owner the link with the batch summary (counts by verdict, management findings first, the owner's questions). **Stop: the owner reviews.**
- [ ] **Step 4: Commit** `git add docs/audit/review && git commit -m "docs(audit): review page for batch 1"`

### Task 9: Rulings, fixes and sign-off (owner-gated)

- [ ] **Step 1:** Read the rulings back (ArtifactData), save them as `docs/audit/batch-1.rulings.json`, apply with `applyRulings`, render, run `npx vitest run -c vitest.unit.config.ts test/unit/audit`, commit.
- [ ] **Step 2: Fix now**, for each management finding the owner kept or changed: the smallest safe fix (correct in place, dated notice, or calculator switched off) on the old guidelines repo, or on the new site on a branch with tests (`npm test && npm run e2e`). Each push or merge only with the owner's OK; verify live afterwards (the page shows the change; `npm run check:links` passes).
- [ ] **Step 3:** Later edits to batch 1 pages go on `recheckList`. Batch 1 is signed off when every finding has a ruling and every agreed fix is live. Merging `content-audit` to `main` (which publishes nothing from `docs/`, but every push deploys) waits for the owner's OK.
