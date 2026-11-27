# Content audit: batch 3 — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Batch 3 (cardiac CT: the coronary CT angiography and CAD-RADS page, TAVR, TMVR, TTVR and LAAO planning; valve grading; the Simplified Bernoulli calculator, old page and the front page's quick calculator) audited, independently re-checked, and in front of the owner as questions only.

**Architecture:** Batches 1–2's record and tooling (`scripts/audit/`, `docs/audit/`). The calculator runner gains two ways to run a calculator besides the address: typing into a page that updates as you type (the cardiac site's calculators), and calling a front-page module's `compute` directly. One auditor per page group drafts findings against the primary documents; fresh reviewers on the most capable model re-check blind; the owner answers the questions; every other finding is kept with its proposed fix.

**Tech Stack:** as batch 2 (Node 26, TypeScript, zod, Vitest, Playwright's chromium). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-25-content-audit-design.md` (batch 3 is "Cardiac CT (overview/CAD-RADS, TAVR, TMVR, TTVR, LAAO), valve grading, Bernoulli"). Batch 2's plan (`docs/superpowers/plans/2026-11-25-content-audit-batch-2.md`) is the pattern; `docs/audit/README.md` holds the rules as they stand after batch 2.

## Global Constraints

- The repo is public. Audit files say "lead guideline", never whose department follows it; no owner or institution names, no email addresses.
- Clinical changes happen only on the owner's ruling. The owner rules on the questions; every other finding is kept with its proposed fix once the questions are answered, and the owner is told how many.
- What verifies: guideline documents and society statements; original research papers for their own numbers; a named textbook edition for teaching only; reviews for teaching, thresholds traced to the paper cited. Websites, summaries and memory never verify (batch 2's BI-RADS exception does not carry over).
- Every number on a page is compared with the source, location recorded. An unreadable source stops the verdict (`source-not-readable`) and the owner is asked for a copy **as soon as it is known**.
- Calculators are run, not read (`npm run audit:calc`).
- Independent re-check on `fable`, blind, of every finding `needsRecheck` selects; only settled findings reach the owner.
- Lead: CAR wherever CAR has published guidance (CAR/CSTR Cardiac CT Practice Guidelines 2024, Part 1 coronary CTA and Part 2 non-coronary); else the established system (SCCT for CT planning, CAD-RADS 2.0 for coronary reporting, ASE/EACVI for echocardiographic grading). Which body leads valve-disease severity and intervention thresholds (ACC/AHA 2020 or ESC/EACTS 2025) is an owner question.
- The old cardiac site (`~/Code/cardiac_imaging_resources`, live at `/cardiac-imaging-resources/`) is still edited by the owner: fix-now edits go on a branch there, pulled fresh, and each push needs the owner's OK. Source PDFs stay in git-ignored `audit-sources/`. Don't get around paywalls or bot checks.
- Branch `audit-batch-3`; `main` deploys on every push; merge only on the owner's sign-off.

## Review Focus

1. The old Bernoulli page has no address parameters and no submit button: it converts as you type. Expected: the runner types into its fields and reads the other one back; a results file exists for it (Task 3 test, Task 4 case file).
2. The front page's Bernoulli quick calculator (`shared/calculators/bernoulli.ts`) is audited too, not only the old page: its formula, rounding, limits and citation. Expected: a module case file run through `compute` with results (Task 3, Task 4).
3. Numbers inside troubleshooting tables and checklists ("<250 HU", "5–10% R-R", minimum access diameters) escaping the re-check because the piece is a correct `troubleshooting` or `protocol`. Expected: a piece that states a number is `guideline-threshold`, `normal-values` or `calculator`, so it is re-checked (Task 4 brief rule; Task 5 check).
4. Outcome thresholds from research papers (the valve page's CMR regurgitation figures) verified from a review that quotes them. Expected: traced to the paper itself, or `source-not-readable` with the owner asked (Task 2, Task 4).
5. Cardiology society documents behind publisher walls (JACC, JCCT, EHJ-CVI, JASE). Expected: an open copy from the society or a repository if one exists; otherwise `source-not-readable` and the owner asked at once, never a verdict from memory (Task 2).

---

### Task 1: Workspace and tools for batch 3

**Files:** workspace `.superpowers/sdd/2026-11-27-content-audit-batch-3/` (git-ignored): batch 2's `auditor-brief.md`, `recheck-brief.md` (with round 2's rules folded in), `check-draft.ts`, `check-problems.ts`, `compare.py`, `apply_recheck.py`, retargeted to batch 3 (`batch: 3`, `docs/audit/batch-3/…`, ids `B3-<page>-NN`, drafts in the workspace's `drafts/`); the page list and the lead notes from Task 2.

- [ ] **Step 1:** Copy and retarget; `node <workspace>/check-draft.ts` on an empty draft fails with a schema message (proves it runs against batch 3 paths).
- [ ] **Step 2:** Delete the batch 2 workspace (its rulings and minors were reported when batch 2 closed).

### Task 2: Sources and leads

**Files:** Modify `docs/audit/sources.json`; local only `audit-sources/`.

- [ ] **Step 1: Leads.** Read CAR/CSTR 2024 Parts 1 and 2 first and record what each covers (coronary CTA acquisition and reporting; TAVI, mitral, tricuspid and LAA planning; valve imaging). Where CAR covers a topic it leads; where it defers (to CAD-RADS, SCCT) record that. The valve-disease lead (ACC/AHA 2020 vs ESC/EACTS 2025, with the Canadian Cardiovascular Society's 2019 TAVI position statement if it bears on a page) becomes an owner question.
- [ ] **Step 2: Documents.** CAR/CSTR 2024 Part 1 and Part 2; CAD-RADS 2.0 (2022; the open Radiology: Cardiothoracic Imaging copy); SCCT 2019 TAVI/TAVR consensus; the TMVR, TTVR and LAAO documents the pages cite and their current versions (incl. the 2020 LAAO expert recommendations and the 2024 LAAO position statement); ASE/EACVI 2017 aortic stenosis update and 2009 valve stenosis recommendations (mitral, tricuspid, pulmonary grading); ASE/SCMR 2017 regurgitation; ACC/AHA 2020; ESC/EACTS 2025; the research papers behind the valve page's CMR thresholds. Download with `curl -L` into `audit-sources/`, `pdftotext -layout` copies. Unreadable → `access: 'not-readable'`, and the owner is asked for a copy as soon as known.
- [ ] **Step 3:** Record each in `sources.json`; `npx vitest run -c vitest.unit.config.ts test/unit/audit` → PASS; commit `docs(audit): batch 3 sources`.

### Task 3: The runner types into pages and calls modules

**Files:** Modify `scripts/audit/old-calc.ts`; Test `test/unit/audit/old-calc.test.ts`.

**Interfaces:**
- Consumes: today's `CaseFile` (address mode: `pageUrl`, `formId`, `resultId`, `params`, `categoryKey?`, `cases`).
- Produces: an optional `mode` on the case file — `'url'` (default, today's behaviour), `'type'` (Playwright fills each input by element id from `fields: Record<param, elementId>`, firing `input` and `change`, then reads `outputs: Record<name, elementId>` — an input's `value` or an element's text — into `specifics`; `recommendation` is the outputs joined `name: value; …`), `'module'` (imports `shared/calculators/index.ts`, finds `calculator` by id, calls `compute(values, changed)` with `changed` from the case's `changed` field, and reads `headline` into `recommendation` and `fill` into `specifics`). `parseCaseFile` validates per mode: `formId`/`resultId` required for `'url'` only; `fields` and `outputs` for `'type'`; `params` must match the module's field keys for `'module'`.

- [ ] **Step 1: Failing tests** (`old-calc.test.ts`): a `'type'` case file without `fields` is refused naming the file; a `'module'` case whose input isn't one of the module's fields is refused naming the case; `runModuleCase(file, case)` on the Bernoulli module with `vmax=4`, `changed=vmax` gives `recommendation` "4.00 m/s ↔ 64.0 mmHg" and `specifics` `{ gradient: '64.0' }`; an address-mode file parses exactly as before. Run → FAIL (missing mode).
- [ ] **Step 2: Implement** the schema change, `runModuleCase`, and the `'type'` branch of the browser loop (the browser loop itself is exercised by Task 4's run). Run → PASS; `npm test` green; commit `feat(audit): the runner types into live pages and calls front-page modules`.

### Task 4: Page audits and calculator runs

**Files:** `docs/audit/batch-3/cases/{bernoulli_old,bernoulli_module}.json` and `.results.md`; drafts in the workspace; `docs/audit/batch-3.json` (rendered `batch-3.md`, `review/batch-3.json`); `docs/audit/gaps.json`.

- [ ] **Step 1: Pin** `startedOn` and `oldRepoCommits.cardiac` (`git -C ~/Code/cardiac_imaging_resources pull --ff-only && git -C … rev-parse --short HEAD`); pages `cardiac-ct-ccta`, `tavr-ct`, `tmvr-ct`, `ttvr-ct`, `laao-ct`, `valve-grading`, `bernoulli`.
- [ ] **Step 2: Dispatch five auditors in parallel** (Agent): (a) `cardiac-ct-ccta`; (b) `tavr-ct` and `tmvr-ct`; (c) `ttvr-ct` and `laao-ct`; (d) `valve-grading`; (e) `bernoulli`, old page and module, with both case files (every grading-table row is a finding too). Brief rule (Review Focus 3): a troubleshooting row or checklist line that states a number is its own `guideline-threshold`/`normal-values` piece. Each writes its draft, validated by `check-draft.ts` → `OK`.
- [ ] **Step 3: Site-wide** myself: the cardiac site's lines shared across batch 3's pages (reference boxes, footers, version or review claims), as `cardiac-site` findings.
- [ ] **Step 4: Check calculator coverage:** every calculator on a batch 3 page (old `calculators.js` init functions those pages call; the front-page modules for their rows) has a case file with results.
- [ ] **Step 5: Merge** drafts into `batch-3.json` (candidate gaps to `gaps.json`), `npm run audit:render`, `npx vitest run -c vitest.unit.config.ts test/unit/audit` → PASS; commit `docs(audit): batch 3 findings (before re-check)`.

### Task 5: Independent re-check

- [ ] **Step 1:** `fable` reviewers in parallel (one per auditor group), read-only, blind: the pieces needing re-check with what the page says, the sources, the case results; not the verdicts.
- [ ] **Step 2:** Compare; settle each disagreement by re-reading the source; record `recheck`, `resolution`. Check Review Focus 3: no `troubleshooting`/`protocol` piece marked correct states a number.
- [ ] **Step 3:** `npm run audit:render && npx vitest run -c vitest.unit.config.ts test/unit/audit` (the records test requires `reviewProblems` empty). Commit `docs(audit): batch 3 independently re-checked`.

### Task 6: The owner's questions (owner-gated)

- [ ] **Step 1: Ask the owner** in chat: the questions only, most important first, each with the finding's one-line context and my recommendation; counts (findings, management fixes) and the record's path; any source still unreadable. **Stop: the owner answers.**

### Task 7: Rulings, fix now, sign-off (owner-gated)

- [ ] **Step 1:** The answers as rulings (`docs/audit/batch-3.rulings.json`, paraphrased, "(In chat.)"), `applyRulings`, then `keepUnquestioned`; render; tests (the records test ties every question to its ruling); commit.
- [ ] **Step 2: Fix now** for every kept or changed management finding: old cardiac pages (branch in `~/Code/cardiac_imaging_resources`, pulled fresh: dated notice naming the errors and the current guidance, in-place correction only where a number is read under pressure, "Out of date" pointers), and new-site registry rows or the Bernoulli module (branch, `npm test && npm run e2e && npm run typecheck`, exit codes read directly). Each push only with the owner's OK; verify live (pages show the change, `npm run check:links`, ORCA hashes).
- [ ] **Step 3:** Final whole-branch review (fresh `fable` reviewer); fix Critical/Important; merge `audit-batch-3` to `main` on the owner's OK; CI and Deploy green; branch and workspace deleted after the rulings are reported.
