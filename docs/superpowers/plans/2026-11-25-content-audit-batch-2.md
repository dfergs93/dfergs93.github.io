# Content audit: batch 2 — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Batch 2 (PI-RADS, TI-RADS, BI-RADS, contrast safety, the guidelines home page, with the PI-RADS, PSA density and TI-RADS calculators) audited, independently re-checked, and in front of the owner as questions only.

**Architecture:** Batch 1's record and tooling unchanged (`scripts/audit/`: schema, render, rulings, old-calc; `docs/audit/`). One auditor per page drafts findings against the primary documents and runs the old calculators; a fresh reviewer on the most capable model re-checks each page blind; the owner answers the questions; every other finding is recorded as kept (owner's rule, 2026-11-25).

**Tech Stack:** as batch 1 (Node 26, TypeScript, zod, Vitest, Playwright's chromium). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-25-content-audit-design.md` (batch 2 is "PI-RADS, TI-RADS, BI-RADS, contrast safety, guidelines home page, with the PI-RADS and TI-RADS calculators"; review rule under "Review and record").

## Global Constraints

- The repo is public. Audit files say "lead guideline", never whose department follows it; no owner or institution names.
- Clinical changes happen only on the owner's ruling. From batch 2 the owner rules on the questions; the other findings are kept with their proposed fixes once the questions are answered, and the owner is told how many.
- What verifies: guideline documents and society statements; original research papers for their own numbers; a named textbook edition for teaching only; reviews for teaching, thresholds traced to the paper cited. Websites, summaries and memory never verify.
- Every number on a page is compared with the source, location recorded. An unreadable source stops the verdict (`source-not-readable`) and the owner is asked for a copy.
- Calculators are run, not read (`npm run audit:calc`).
- Independent re-check on `fable`, blind, of every finding `needsRecheck` selects; only surviving findings reach the owner.
- Lead: CAR wherever CAR has published guidance; else the established system (PI-RADS, TI-RADS, BI-RADS; the ACR Manual on Contrast Media). Judgement calls are owner questions.
- Fix now: anything that could change management, smallest safe fix, old pages and new-site copies, each push with the owner's OK. Source PDFs stay in git-ignored `audit-sources/`. Don't get around paywalls or bot checks.
- Branch `audit-batch-2`; `main` deploys on every push; merge only on the owner's sign-off.

## Review Focus

1. A finding with a question recorded as kept by default although the owner never answered it. Expected: the default-keep step refuses, naming the finding. (Task 5 test.)
2. The PI-RADS page's second calculator (PSA density) skipped because the spec names only PI-RADS and TI-RADS. Expected: every `handleCalculator` form on a batch 2 page has a case file. (Task 3 check.)
3. BI-RADS's atlas behind a paywall and a verdict written from memory. Expected: `source-not-readable` and an owner request, never `wrong`. (Schema rule from batch 1; Task 2.)
4. Contrast safety spans topics where CAR has guidance (contrast-associated AKI, gadolinium in kidney disease) and topics where it may not (reactions, premedication). Expected: the lead is decided per topic, each judgement an owner question. (Task 2.)
5. Old-page lines already fixed site-wide in batch 1 ("Last Institutional Review", "Modifications") re-raised as new. Expected: batch 2's site-wide findings cover only what batch 1 didn't (e.g. the "Maintained by … QI Committee" footer, "Initial implementation at institution" history rows). (Task 3.)

---

### Task 1: Workspace and tools for batch 2

**Files:** workspace `.superpowers/sdd/2026-11-25-content-audit-batch-2/` (git-ignored): copies of batch 1's `auditor-brief.md`, `recheck-brief.md`, `check-draft.ts`, `compare.py`, `apply_recheck.py`, retargeted to batch 2 (`batch: 2`, `docs/audit/batch-2/…`, ids `B2-<page>-NN`), plus the batch 2 page list and the lead notes from Task 2.

- [ ] **Step 1:** Copy and retarget; `node <workspace>/check-draft.ts` on an empty draft fails with a schema message (proves it runs against batch 2 paths).
- [ ] **Step 2:** Delete the batch 1 workspace (its rulings and minors were reported when batch 1 and Fleischner closed).

### Task 2: Sources and leads

**Files:** Modify `docs/audit/sources.json`; local only `audit-sources/`.

- [ ] **Step 1: Leads.** For prostate MRI, thyroid nodules, breast imaging, and each contrast topic (reactions and premedication, contrast-associated AKI, metformin, gadolinium and NSF, gadolinium retention, pregnancy and breastfeeding, extravasation), search for CAR guidance first and record what exists; each judgement call becomes an owner question on the finding it governs.
- [ ] **Step 2: Documents.** The version each page claims and the current one: PI-RADS v2.1 (ACR document and Turkbey 2019) and anything later; ACR TI-RADS 2017 white paper and lexicon; BI-RADS 5th edition (2013) and any later edition; the current ACR Manual on Contrast Media and the version the page claims; CAR contrast guidance found in Step 1. Download with `curl -L` into `audit-sources/`, `pdftotext -layout` copies. Unreadable → `access: 'not-readable'`, and the owner is asked for a copy **as soon as known** (not at the end).
- [ ] **Step 3:** Record each in `sources.json`; `npx vitest run -c vitest.unit.config.ts test/unit/audit` → PASS; commit `docs(audit): batch 2 sources`.

### Task 3: Page audits and calculator runs

**Files:** `docs/audit/batch-2/cases/{pirads,psa_density,tirads}.json` and `.results.md`; drafts in the workspace; `docs/audit/batch-2.json` (rendered `batch-2.md`, `review/batch-2.json`); `docs/audit/gaps.json` for new candidate gaps.

- [ ] **Step 1: Pin** `startedOn` and `oldRepoCommits.guidelines` (`git -C ~/Code/_archive/guidelines_manager rev-parse --short HEAD`), pages `pi-rads`, `ti-rads`, `bi-rads`, `contrast-safety`, `guidelines-home`.
- [ ] **Step 2: Dispatch four auditors in parallel** (Agent, one per page: pi-rads with both calculators, ti-rads with its calculator, bi-rads, contrast-safety) with the retargeted auditor brief. Each writes its draft and case files, validated by `check-draft.ts` → `OK`.
- [ ] **Step 3: Home page and site-wide** myself: `docs/index.md` (labels, links, claims), the front-page rows' `listing` findings if an auditor missed one, and site-wide lines batch 1 didn't cover (Review Focus 5).
- [ ] **Step 4: Check every calculator form has cases** (Review Focus 2): `grep handleCalculator` ids for pirads, psa_density, tirads each have a case file with results.
- [ ] **Step 5: Merge** drafts into `batch-2.json` (candidate gaps to `gaps.json`), `npm run audit:render`, `npx vitest run -c vitest.unit.config.ts test/unit/audit` → PASS; commit `docs(audit): batch 2 findings (before re-check)`.

### Task 4: Independent re-check

- [ ] **Step 1:** One `fable` reviewer per page, in parallel, read-only, blind (pieces needing re-check with what the page says, the sources, the case results; not the verdicts).
- [ ] **Step 2:** Compare and settle each disagreement by re-reading the source; record `recheck`, `resolution`.
- [ ] **Step 3:** `npm run audit:render && npx vitest run -c vitest.unit.config.ts test/unit/audit`, and `reviewProblems(batch2)` is `[]`. Commit `docs(audit): batch 2 independently re-checked`.

### Task 5: The owner's questions (owner-gated)

**Files:** Modify `scripts/audit/rulings.ts`; Test `test/unit/audit/render.test.ts`.

**Interfaces:** Produces `keepUnquestioned(b: Batch, answered: ReadonlySet<string>, date: string): Batch` — every finding without a ruling gets `{ decision: 'keep', note: 'Kept with the questions answered (owner\'s rule from batch 2).', date }`; throws naming every finding that has a `question` and no ruling and is not in `answered`.

- [ ] **Step 1: Failing tests:** findings without questions get the default keep; an existing ruling is left alone; a questioned finding with no ruling throws naming its id (Review Focus 1). Run → FAIL (missing export).
- [ ] **Step 2: Implement**, run → PASS; `npm test` green; commit `feat(audit): keep unquestioned findings once the questions are answered`.
- [ ] **Step 3: Ask the owner** in chat: the questions only, most important first, each with the finding's one-line context and my recommendation; plus counts (findings, management fixes) and the record's path. A source still unreadable is asked for here. **Stop: the owner answers.**

### Task 6: Rulings, fix now, sign-off (owner-gated)

- [ ] **Step 1:** Write the answers as rulings (`docs/audit/batch-2.rulings.json`, paraphrased so nothing names the department), `applyRulings`, then `keepUnquestioned`; render; tests; commit.
- [ ] **Step 2: Fix now** for every kept or changed management finding: old site (`~/Code/_archive/guidelines_manager`, with the Fleischner notice line "The rebuilt calculator is on the front page" in the same push if the owner agrees) and new site registry rows (branch, `npm test && npm run e2e && npm run typecheck`). Each push only with the owner's OK; verify live (pages show the change, `npm run check:links`, ORCA hashes).
- [ ] **Step 3:** Merge `audit-batch-2` to `main` on the owner's OK (publishes nothing from `docs/`, but every push deploys); CI and Deploy green; branch deleted; workspace deleted after its rulings are reported.
