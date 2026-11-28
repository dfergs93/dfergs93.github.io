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

`batch-N.rulings.json` holds the owner's rulings: batch 1's as saved on the review page,
batches 2 and 3 as given in chat (marked "(In chat.)", with `savedAt` times that only order them;
the latest ruling on a finding wins). Where a note described the owner's own department or
career it is paraphrased (marked "Paraphrased." or "(In chat, paraphrased.)"), so the public
record states the ruling, not whose practice it is.

From batch 2 the owner rules on the questions only (2026-11-25). Once every question has the
owner's ruling, every other finding is kept with its proposed fix ("Kept with the questions
answered"); a question added later is unanswered until the owner rules on it.

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
- **wrong**: contradicts its own source or the lead source.
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
- One exception, the owner's ruling of 2026-11-26: the BI-RADS v2025 manual can't be had, so
  the BI-RADS page is checked against the ACR's own summary of the changes and Radiology
  Assistant's v2025 summaries for mammography and ultrasound. Each such finding names the
  summary it was checked against.

Websites (Radiopaedia included), summaries and memory may help find a source; they never
verify one. Every number is compared with the source and its location recorded. Calculators
are run through their live forms (`npm run audit:calc -- <case file>`), not read. A results
file is the evidence of its run and is not replaced unless `--force` is given. Batch 1's
results were run on 2026-11-25 against the old guidelines site at 03cc237 (Fleischner's at
b29e6ab); all five calculators were switched off afterwards (b29e6ab, and 34cf4eb for
Fleischner), so those results stand as recorded. Batch 2's were run on 2026-11-25 against
34cf4eb; its three calculators (PI-RADS, PSA density, TI-RADS) were switched off afterwards
(85da968), so those results stand as recorded too. Batch 3's Bernoulli runs were on 2026-11-27:
the old cardiac site's page at 84b6118, typed into its form (`"mode": "type"`), and the
front page's Bernoulli module, run in code (`"mode": "module"`).

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

Batch 2 (2026-11-26 and -27):
- Contrast media, per topic: CAR/CSACI 2025 for hypersensitivity and premedication (switch
  agent, no steroid premedication); CAR 2022 for contrast-associated AKI and metformin; CAR
  2018/2019 for gadolinium in kidney disease; the ACR Manual (2026) for reaction treatment,
  extravasation, pregnancy, breast-feeding and the thyroid (B2-contrast-safety-01). Local
  practice: IV hydration is not routinely given (B2-contrast-safety-18).
- Prostate MRI: PI-RADS v2.1, with CAR's prostate MRI white paper where it says more; the
  urology biopsy pathway goes under "Other guidelines differ" (B2-pi-rads-08).
- Thyroid nodules: ACR TI-RADS 2017, adults only (B2-ti-rads-24), with the white paper's
  ranges (B2-ti-rads-10).
- Breast: BI-RADS v2025, checked against the ACR's summary of changes and Radiology
  Assistant's v2025 summaries (above); CAR's 2026 breast guidelines for practice. The MRI
  pieces stay marked not checked (B2-bi-rads-37). Local practice: breast density is stated
  in every report (B2-bi-rads-45).

Batch 3 (2026-11-27):
- Valve grading: ACC/AHA 2020 leads severity stages and intervention thresholds, with
  ESC/EACTS 2025 under "Other guidelines differ"; echo grading follows the ASE/EACVI
  documents (B3-valve-grading-01). So a Vmax of 2.0–2.5 m/s is mild AS (B3-bernoulli-05),
  severe AR by CMR is RF ≥ 50% (B3-valve-grading-10), and the calcium score thresholds are
  ACC/AHA's (B3-valve-grading-06). 3D VCA for severe TR: ASE 2017's > 0.4 cm²
  (B3-valve-grading-40).
- Coronary CTA: CAR/CSTR 2024 leads; the CAD-RADS score may sit beside a written conclusion
  but does not replace it, with SCCT 2026 noted (B3-cardiac-ct-ccta-23).
- Structural heart CT: CAR/CSTR 2024 part 2 where it gives a number; SCCT 2019 for the rest of
  TAVR; the SCAI/HRS 2023 consensus for LAAO until Korsholm 2020 is read (B3-laao-ct-01);
  the ESCR/NASCI 2026 recommendations for TMVR once readable (B3-tmvr-ct-17); Hausleiter
  2025 counts as expert consensus for TTVR (B3-ttvr-ct-14). The LAAO page gives the
  measurements, not device sizing (B3-laao-ct-13).
- Local practice: the LVOT is measured below the annulus (B3-tavr-ct-05); no supplemental
  oxygen for coronary CTA (B3-cardiac-ct-ccta-14). Nothing else asked about was local
  practice, so those numbers go.
