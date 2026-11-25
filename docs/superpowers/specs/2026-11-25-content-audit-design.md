# Stage 2: content audit — design

Date: 2026-11-25. Status: for the owner's approval (builder check done; the two questions it raised answered by the owner).
Builds on: `2026-11-24-radiology-reference-site-design.md` ("Stage 2: content audit"),
and `docs/audit-notes.md` (issues found while building stage 1). Stage 1 and the quick
calculators pilot are live.

## Intent

The site will send residents and radiologists to these pages mid-case, and in stage 4
the assistant will answer only from them. Today the owner would not send a resident to
them without a second thought. In the owner's words, in order of weight:

1. **The lack of sources is the biggest thing.** Most pages cite nothing (all 11
   congenital pages, the MRI protocols, the valve grading page, the adrenal page).
2. The organisation is haphazard and redundant in places.
3. Some calculators are not intuitive: PI-RADS, Bosniak and TI-RADS are wordy; the
   format makes the options hard to see when they are complex; where the logic is an
   algorithm, the algorithm is hidden inside buttons you press.
4. Pages are disorganised: cardiac is split into CT, MR and congenital, but guidelines,
   protocols, calculators and teaching are mixed together inside them.

The audit finds out, piece by piece, what the content says, where it comes from,
whether it is right and current, where it repeats itself, and what is missing. Its
output, signed off by the owner, is stage 3's content plan. The owner is the clinical
authority on every content change.

Success: every piece of content has a verdict the owner has ruled on, every surviving
statement has a named source (or is labelled local practice), every gap has a lead
source and a priority, and the owner has approved the whole layout the content will
take in stage 3.

## Goals, non-goals, anti-goals

Goals
- Every page and calculator on the old guidelines and cardiac sites audited, in batches
  the owner reviews as they are done.
- Each finding checked against the primary source document, then re-checked by an
  independent reviewer before it reaches the owner.
- A gap list: the owner's gaps, the 15 empty placeholder pages, and candidate gaps,
  each with its lead source and the owner's priority.
- At the end, the whole layout (every topic page, its sections, the shared pages) for
  the owner to approve.

Non-goals
- Writing new content or rebuilding pages and calculators (stage 3).
- Page design and calculator design (stage 3; the direction found here is recorded).
- The assistant (stage 4).

Anti-goals
- A false finding reaching the owner: a "wrong" verdict that the source doesn't support.
- Anything verified from memory, a summary article or another website.
- A known error that could change management left on the live old pages until stage 3.
- The audit turning into a rewrite: proposed fixes are short; the writing is stage 3's.
- Batches so large the owner can't rule on them in one sitting.
- The owner's department or institution named anywhere on the public site or repo.

## Constraints

- The repo is public. Audit files say "lead guideline", never whose department follows it.
- Clinical changes happen only on the owner's ruling.
- The old sites stay live until stage 3 replaces them: guidelines at
  `/guidelines_manager/` (repo `~/Code/_archive/guidelines_manager`) and cardiac at
  `/cardiac-imaging-resources/` (repo `~/Code/cardiac_imaging_resources`, still edited).
- Thoroughness is the owner's condition for batching ("if it allows you to be thorough").
  The independent re-check costs extra model time; that is accepted.

## Approaches

Considered for how the audit runs:
1. **Batches, reviewed as they are done.** Chosen by the owner. Each batch is audited,
   re-checked, and ruled on before the next; early rulings shape later batches; each
   review fits a sitting. Cost: more rounds over more days.
2. One full report at the end: the whole picture at once, but a review of well over
   150 findings in one go, and nothing decided early can shape the rest.
3. Audit and rewrite each page together: fastest to a better site, but it fixes the
   layout before the content is settled, which the owner wants the other way round.

Considered for how content is organised (affects the "proposed home" recorded for every
piece; the final layout is approved at the end):
- **By topic, same sections on every page** (condition, procedure or guideline; e.g. a
  Tetralogy of Fallot page with Protocol → shared protocol, Measurements and thresholds,
  Report checklist, Background), with things used across topics (protocols, normal
  values, calculators) kept once and linked, never copied. The working assumption; the
  owner: "makes sense", to be confirmed when the whole layout is shown.
- By kind (Guidelines and thresholds / Protocols / Normal values / Calculators /
  Teaching): clear what each item is, but one condition is spread over several places.

Considered for when guideline bodies differ (e.g. ACR 2017 and CAR 2021 pancreatic cyst
pages both wait as placeholders):
- **One lead guideline per topic, shown first and most prominently, with the others as
  short notes of where they differ.** Chosen by the owner.
- Both side by side (the redundancy the owner wants gone); one body only (hides
  guidance other readers use).

## The audit

### What is audited

Everything on the two old sites, as live at each batch's start (old repo commit recorded):
- Guidelines site: 9 pages with content, the home page, and 7 calculators (Fleischner,
  Lung-RADS, LI-RADS, Bosniak, PI-RADS, TI-RADS, adrenal).
- Cardiac site: 27 pages (CT overview with CAD-RADS, TAVR, TMVR, TTVR, LAAO; MRI
  overview and sequences, protocols index, cardiomyopathy, stress perfusion,
  congenital/4D flow, masses; valve grading; congenital overview with segmental
  analysis and 10 lesion pages; calculators index; home) and 3 calculators (ECV,
  4D flow, Simplified Bernoulli; the first and last already have pilot modules).
- The 15 empty placeholder pages go to the gap list, not a batch.

### Batches (my call on boundaries and order)

1. Fleischner, Lung-RADS, adrenal, Bosniak, LI-RADS, with their calculators.
2. PI-RADS, TI-RADS, BI-RADS, contrast safety, guidelines home page, with the PI-RADS
   and TI-RADS calculators.
3. Cardiac CT (overview/CAD-RADS, TAVR, TMVR, TTVR, LAAO), valve grading, Bernoulli.
4. Cardiac MRI (overview, protocols index and the four protocols), ECV, 4D flow,
   calculators index.
5. Congenital (overview and segmental analysis, the 10 lesion pages), cardiac home page.
6. Gap list for ruling (it grows from batch 1 on).
7. Content plan and the whole layout, for approval.

Guidelines go first: they are the most used (most of Popular) and carry most calculators.

### Pieces and findings

Each page is split into pieces: a table, a set of thresholds, a protocol, a list of
normal values, a teaching passage, a calculator, a troubleshooting list or checklist.
Each piece is recorded with:
- **kind** (guideline threshold, protocol, normal values, teaching, calculator,
  troubleshooting/checklist) and **topic**;
- **what the page says** (quoted or summarised exactly, numbers verbatim);
- **source**: document, version, and table/figure/section (and page), or "none found";
- **verdict**: one of
  - *correct*: matches the lead source;
  - *outdated*: a newer version exists; the differences are listed;
  - *wrong*: contradicts its own source; flagged **management** if following the page
    could change what happens to a patient;
  - *unsourced*: no published source found that supports it;
  - *local practice*: not in a published source; the owner confirms it and it is
    labelled as such (as the ECV bands are);
  - *duplicate*: the same content exists elsewhere; names the copy to keep;
  - *drop*: no longer useful (proposed; owner decides);
- **proposed fix** in a line or two, and **questions only the owner can answer**;
- **proposed home** in the topic layout.

Calculators also get a usability record against the owner's complaints: words to read
before the first input, whether every option is visible at once, whether the
algorithm is visible, and the path-by-path check below.

### How thoroughness is ensured

- **What verifies (owner, 2026-11-25).** Always the current version, read at the
  relevant section:
  - guideline documents and society consensus or expert statements (the society
    paper, the ACR manual or lexicon, the CAR paper, the Perinatal Services BC
    document, SCCT and SCMR statements, SCMR reference-value papers);
  - original research papers, for the specific numbers they report (e.g. outcome
    thresholds such as TOF's RV volume and QRS cut-offs);
  - a named textbook edition, for teaching content only (anatomy, physiology,
    classification), never for a threshold;
  - review articles (JACC state-of-the-art reviews, RadioGraphics) may be cited for
    teaching, but any threshold they give is traced to the paper they cite, and that
    paper is what verifies it.
  Websites (Radiopaedia included), summaries and memory may help find a source; they
  never verify one.
- **The congenital pages' origin.** At least some were generated with Claude from
  chapters of *Diagnosis and Management of Adult Congenital Heart Disease* (Gatzoulis,
  Webb, Daubeney; edition to confirm) by `scripts/generate_lesion_page.py` in the
  cardiac repo (commit 13dec0a, 2026-03-07). Batch 5 checks them against the book
  (the owner is asked for the edition and the chapters) and against the guidelines
  and papers for any threshold; stage 3's text must not closely paraphrase the
  chapters, since the site is public.
- **Every number is compared**: each threshold, size cut-off, interval, category and
  criterion on the page against the source, with its location recorded.
- **Unreadable sources stop the verdict.** If a document is paywalled or unavailable,
  the piece is marked "source not readable" and the owner is asked for a copy.
- **Calculators are run, not read.** The old calculator code is driven headlessly
  through every path the guideline defines (each category boundary and branch), and
  each output is compared with the guideline.
- **Independent re-check.** After a batch is drafted, a fresh reviewer on the most
  capable model, without my reasoning, re-checks against the sources every finding
  other than *correct*, and every management threshold marked *correct*.
  Disagreements are settled by re-reading the source; only findings that survive
  reach the owner, and any overturned ones are noted.

### Which guideline leads (owner's rule)

- The lead guideline comes first and carries the main tables; other bodies get short
  notes listing only where they differ.
- Pancreatic cysts: Kyoto (2023 international guidelines). They cover IPMN only, so the
  audit asks the owner what applies to cysts not presumed to be IPMN.
- Obstetric ultrasound findings: Perinatal Services BC.
- Otherwise: CAR wherever CAR has published guidance; where it hasn't, the established
  system (Fleischner; the ACR systems LI-RADS, PI-RADS, BI-RADS, TI-RADS, Lung-RADS,
  O-RADS).
- Every topic where the lead is a judgement call (e.g. CAR guidance and an ACR system
  both cover it) is listed for the owner.

### Fix now (owner, 2026-11-25)

Stage 3 may be months away, so anything that could change management is fixed on the
live pages during its batch, whatever its verdict: *wrong*, *outdated* (a page that
faithfully follows a superseded version, like Lung-RADS v1.1), or a non-lead guideline
whose advice differs from the lead's. These findings carry the **management** flag.
The fix is the smallest safe one:
- a wrong line or table cell: corrected in place;
- a page on a superseded version: a dated notice at the top naming the current
  version, with a link to it;
- a calculator that gives wrong management: switched off and replaced by that notice.

The new site's live copies follow the same rule: the ECV and Bernoulli quick-calculator
modules, and the registry's version labels and summaries. Each fix is made on a branch,
passes the tests, and goes live only with the owner's OK (on the new site a merge to
`main` deploys; the old sites deploy from their own repos). Everything that doesn't
change management waits for stage 3.

Batch 1 also proposes removing the "Last Institutional Review: January 2024" line from
every guideline page (my call): the pages were written in February–March 2026, so the
line reads as a sign-off that did not happen.

A lead to verify first in batch 1 (from reading the code, not yet checked against the
document): the Lung-RADS calculator may grade new nodules differently from v1.1 itself
(new nodules under 4 mm as 3, 4–6 mm as 4A, over 6 mm as 4B) and produce "3X", "4AX"
and "4BX" categories.

### The gap list

Each gap: topic, who raised it (owner, placeholder, or candidate), lead source and
alternatives, whether CAR has guidance, what the site has today, proposed home, and the
owner's priority (now / soon / later / no). Writing them is stage 3, in batches by
priority, after the corrected existing pages go live.

Raised by the owner (2026-11-25):
- Obstetric ultrasound findings (Perinatal Services BC).
- Nonspecific ovarian and adnexal lesions.
- Nonspecific uterine, endometrial and cervical findings: myometrial cysts,
  endometrial thickness, endometrial polyps.
- Breast rad-path correlation and follow-up after biopsy.
- Everyday ultrasound: renal AML follow-up (likely a section of the renal mass page);
  lipomas, ganglion cysts and indeterminate superficial soft-tissue lesions (one MSK
  page); DVT and superficial vein thrombosis (a new vascular topic; no vascular area
  exists yet).

Also on the list: the 15 placeholders (`docs/audit-notes.md`), to fill, merge (the two
pancreatic cyst pages become one Kyoto-led page) or drop; and candidates drafted from
common resident needs, marked as candidates for the owner to cut.

### Review and record

- Each batch is reviewed on a private claude.ai page that works on a phone: findings
  grouped by page, each with Keep / Change / Drop and a note box. The owner's answers
  are saved and read back (answering in chat also works). (My call.)
- The record lives in this repo under `docs/audit/`: the method and verdict definitions,
  one file per batch (findings and the owner's rulings), `gaps.md`, `sources.md` (every
  source with version, link and its reuse terms: whether its tables may be reproduced or
  should be restated and linked, which stage 3 needs) and, last, `content-plan.md` with
  the whole layout. Branch `content-audit`; merged to `main` (it publishes nothing:
  `docs/` is not part of the site) when the owner signs off.
- Cardiac edits made after a batch starts go on a recheck list in that batch's file.

### Direction recorded for stage 3

- Topic pages with the same sections in the same order, shared material once and
  linked (pending the owner's approval of the whole layout).
- Calculators where the algorithm is the interface: the table or flowchart stays in
  view and choosing lights up the path, instead of the logic hidden behind buttons;
  fewer words before the first input.
- The lead guideline shown as primary without naming the department (my call).

## Decided by the owner

- Biggest problem: missing sources; then organisation, calculator usability, mixed pages.
- Batches, on condition the audit is thorough.
- Organise by topic with fixed sections (working assumption; whole layout shown at the end).
- One lead guideline per topic, shown first or most prominently; others as differences.
- Kyoto for pancreatic cysts; Perinatal Services BC for obstetric ultrasound; otherwise CAR.
- The gaps listed above.
- Fix now covers anything that could change management, whatever its verdict, with the
  smallest safe fix (correct in place / dated notice / calculator switched off), on the
  old pages and the new site's copies, each with the owner's OK.
- What verifies: guidelines and society statements, research papers for their own
  numbers, named textbook editions for teaching only; reviews for teaching, with
  thresholds traced to the papers they cite; never websites or memory.
- The congenital chapters came from *Diagnosis and Management of Adult Congenital
  Heart Disease*.

## My calls (for checking)

- Batch boundaries and order; the 15 placeholders handled in the gap list.
- The verdict set.
- Proposing removal of the "Last Institutional Review" line in batch 1.
- The phone-friendly review page with Keep / Change / Drop.
- Recording each source's reuse terms.
- The cut-off rule for cardiac edits.
- Not naming the department on the public site.
- Drafting candidate gaps for the owner to cut.

## Left to the builder

- The file format of the batch reports and the review page's design.
- How the old calculators are driven headlessly.
- The order of work within a batch.
