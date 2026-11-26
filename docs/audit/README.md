# Content audit (stage 2)

The audit of every guideline and cardiac page and calculator on the old sites, before
stage 3 rebuilds them on this site. Design and the owner's decisions:
[`docs/superpowers/specs/2026-11-25-content-audit-design.md`](../superpowers/specs/2026-11-25-content-audit-design.md).
The owner is the clinical authority on every content change.

## Files

- `sources.json`: every source read, with version, link, whether it could be read, and
  its reuse terms (whether its tables may be reproduced or should be restated and linked).
  The documents themselves are kept locally in `audit-sources/`, never committed.
- `batch-N.json`: the findings of one batch, with the owner's rulings once made.
  `batch-N.md` is generated from it for reading on GitHub.
- `batch-N/cases/`: the test cases run through the old calculators, and their results.
- `gaps.json` (`gaps.md`): what the site lacks, with each topic's lead source and priority.
- `review/`: the review page's source and the data it shows the owner.

`batch-N.rulings.json` holds the owner's rulings as saved on the review page. Where a note
described the owner's own department or career it is paraphrased (marked "Paraphrased."), so
the public record states the ruling, not whose practice it is; the review page keeps the original.

Edit the JSON, then run `npm run audit:render`. The unit tests fail if a record breaks
the rules below or a generated file is out of date.

## How a page is audited

Each page is split into pieces (a table, a set of thresholds, a protocol, normal values,
a teaching passage, a calculator, a troubleshooting list or checklist, the reference box with its citation and version (provenance); and the page's
row on this site's front page). Each piece is a finding with its kind, topic, what the
page says (numbers verbatim), its source with the exact location, a verdict, a short
proposed fix, any question for the owner, and its proposed home in the topic layout.

Verdicts:
- **correct**: matches the lead source.
- **outdated**: a newer version of the source exists; the differences are listed.
- **wrong**: contradicts its own source.
- **not-lead**: follows a guideline that isn't this topic's lead, and the advice differs.
- **unsourced**: no published source supports it.
- **local-practice**: not in a published source; the owner confirms it and it is labelled.
- **duplicate**: the same content exists elsewhere; names the copy to keep.
- **drop**: no longer useful (proposed; the owner decides).
- **source-not-readable**: the source couldn't be read; the owner is asked for a copy.

**Management** marks a finding where following the page could change what happens to
a patient. Those are fixed on the live pages during the batch, with the smallest safe
fix (corrected in place, a dated notice naming the current version, or a calculator
switched off), each with the owner's OK.

## What counts as a source

- Guideline documents and society consensus or expert statements.
- Original research papers, for the specific numbers they report.
- A named textbook edition, for teaching only, never for a threshold.
- Review articles for teaching; any threshold they give is traced to the paper they cite.

Websites (Radiopaedia included), summaries and memory may help find a source; they never
verify one. Every number is compared with the source and its location recorded. Calculators
are run through their live forms (`npm run audit:calc -- <case file>`), not read. A results
file is the evidence of its run and is not replaced unless `--force` is given. Batch 1's
results were run on 2026-11-25 against the old guidelines site at 03cc237; four of its
calculators were switched off afterwards (b29e6ab), so those results stand as recorded.

Before the owner sees a batch, an independent reviewer re-checks against the sources
every finding other than *correct*, and every threshold marked *correct*.

## Which guideline leads

The lead guideline comes first and carries the main tables; other bodies get short notes
of where they differ. Pancreatic cysts: Kyoto. Obstetric ultrasound: Perinatal Services
BC. Otherwise CAR wherever CAR has published guidance; where it hasn't, the established
system (Fleischner; the ACR's LI-RADS, PI-RADS, BI-RADS, TI-RADS, Lung-RADS, O-RADS).
Judgement calls go to the owner.

The owner's lead rulings so far (batch 1, 2026-11-25):
- Lung cancer screening: the BC Lung Screening Protocol (v2.0, January 2026) leads;
  Lung-RADS v2022 becomes the note on where it differs (B1-lung-rads-01). The window
  setting and the 4B/4X call-the-clinician line are not local practice (B1-lung-rads-22, -37);
  up to six nodules are measured, as the program says (B1-lung-rads-26).
- Cystic renal masses: Bosniak 2019 leads for the classes and for management, ahead of
  CAR 2019, because it is newer (B1-bosniak-01).
- Incidental adrenal mass: ACR 2017 leads, with the CUA 2023 guideline as a short
  "differs" note (B1-adrenal-01); avid enhancement is tested at > 120 HU (B1-adrenal-05) and
  the delayed phase is 15 minutes (B1-adrenal-07).
- LI-RADS: no BCLC table, only a link (B1-li-rads-21).
- Incidental pulmonary nodules: Fleischner 2017 stays the lead (CAR's thoracic referral
  guideline points to it). No age cut-off for risk (B1-fleischner-15); no window numbers,
  just "lung window" (B1-fleischner-17); the front-page summary names who it does not apply
  to (B1-fleischner-24). The owner wants the calculator back, rebuilt with the fixes in
  B1-fleischner-03 to -06 (B1-fleischner-03).
- None of the old guidelines pages was ever institutionally reviewed (B1-guidelines-site-01).
