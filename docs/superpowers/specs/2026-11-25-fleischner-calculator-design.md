# Fleischner calculator, rebuilt: design

Date: 2026-11-25. Status: approved by the owner 2026-11-25; the multiple-nodule hint corrected after the final review (below).
Builds on: `2026-11-24-quick-calculators-pilot-design.md` (the quick view and the
calculator contract) and the stage 2 audit (`docs/audit/batch-1.md`, Fleischner
findings B1-fleischner-01 to -24, ruled 2026-11-25).

## Intent

The old Fleischner calculator gave wrong follow-up advice for common inputs and was
switched off on 2026-11-25. The owner wants it back ("I'd like to use the calculator at
some point"). Readers are the site's residents and radiologists, usually with a CT open
and a nodule measured. Success: from the Fleischner row on the front page, a reader
picks the nodule type, number and risk, types the size, and reads (and copies into the
report) exactly what the 2017 guideline recommends, in a few seconds, on a workstation
or a phone.

It is also the first guideline calculator built on the shared calculator contract, so
the contract learns choice fields here, as its header comment already expects.

## Goals, non-goals, anti-goals

Goals
- A Fleischner quick view under its front-page row, built from a module in
  `shared/calculators/`, giving the 2017 table's advice for every input.
- The audit's calculator fixes: whole-millimetre rounding (B1-fleischner-03), the
  18–24-month scan for multiple solid nodules over 8 mm (-04), a solid-component field
  for part-solid nodules (-05), the exclusions stated (-06).
- The contract gains choice fields and fields that show only when they apply, usable by
  stage 3's calculator pages and stage 4's assistant.

Non-goals
- A new Fleischner page on this site, address pre-fill, or rewriting the old page's text
  (stage 3).
- Machine-readable results for the assistant (stage 4 extends the contract then).
- Malignancy-risk models (Brock/PanCan) or volumetry input.

Anti-goals
- Advice that differs from the 2017 table for any input.
- A preselected choice silently producing advice for the wrong nodule (a forgotten
  "multiple" or "high risk").
- ECV or Bernoulli behaving differently after the contract change.

## Approaches (owner chose 1)

1. **Extend the shared contract; Fleischner becomes a module.** Chosen. One copy of the
   logic for the quick view now and the page and assistant later. Costs a change to the
   code ECV and Bernoulli run on, guarded by their tests.
2. A one-off Fleischner form for the front page: quicker, but written again for stage 3
   and 4, and two copies can drift (as the old page's text and calculator did).
3. Wait for stage 3's new Fleischner page: most complete, but weeks before it is usable.

Size input (owner chose B): one box, the average of the long and short axes; the
calculator rounds it. Rejected: long and short axes as two boxes (A), size bands as
buttons (C).

## Design

### Contract (`shared/calculators/types.ts`)

- A field is either a number field (as now) or a **choice field**: a key, a label and
  two or more options (value + label). Values passed to `compute` become numbers or
  option values.
- A field may declare **when it applies**, as data (e.g. risk applies when type is
  solid), so a page or the assistant can read it without running code. A field that
  doesn't apply is hidden in the quick view and reaches `compute` as empty.
- ECV and Bernoulli are unchanged in behaviour; their tests stay as they are.

### The quick view (`src/scripts/quick-calc.ts`, `src/styles/front.css`)

- A choice field is a row of buttons that behave as one radio group (real radio inputs:
  arrow keys, one tab stop, a visible label). The selected option uses the accent colour
  (the "selected item" use the look rules already allow). Options wrap on a phone; no
  sideways scroll at 360 px.
- Nothing is preselected. Until every applicable field is filled, the result says what is
  still needed.
- Text results: the headline is a sentence here, not a number, so it gets a text style
  that wraps and reads well.
- The foot link: the old page no longer has a calculator, so for Fleischner it reads
  "Guideline →" and opens the paper (https://doi.org/10.1148/radiol.2017161659). How the
  module says this (e.g. a link on its citation) is the builder's call; ECV and Bernoulli
  keep "Full calculator →".
- Everything else as in the pilot: opens under the row, one open at a time, Esc closes,
  focus moves to the first field, an open counts once, nothing typed is kept or sent,
  Copy copies the report text.

### The Fleischner module (`shared/calculators/fleischner.ts`)

`implements`: "Fleischner Society 2017". Citation: MacMahon H et al. Guidelines for
Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner
Society 2017. Radiology 2017;284:228–243. Short: "MacMahon et al., Radiology 2017".

Above the fields, always shown: "Not for patients under 35, with known cancer or
immunosuppression, or for lung cancer screening CTs."

Fields, in order (keys are the site design's address names):
1. `type` Nodule: Solid · Ground glass · Part solid
2. `count` Number: Single · Multiple (hint: "For multiple nodules, enter the largest. The most suspicious one
   (which may not be the largest) guides management." The column is set by whether any nodule is 6 mm or
   more, Recommendations 2 and 5; corrected from "enter the most suspicious" after the final review)
3. `risk` Risk (solid only): Low · High. Hint: "High: estimated cancer risk ≥ 5%
   (smoking, other exposures, emphysema or fibrosis, family history, age, and the
   nodule's size, margins and upper-lobe location)." No age cut-off (B1-fleischner-15).
4. `size` Size, mm: "average of long and short axes" (for subsolid nodules, the whole
   nodule). Rounded to the nearest whole millimetre, halves up (5.5 → 6). Must be > 0.
5. `solid` Solid component, mm (single part-solid only). Rounded the same way. Must be
   > 0 and smaller than the whole nodule. Needed only when the whole nodule counts as
   6 mm or more: below that the paper says solid components can't be reliably defined and
   the nodule is managed like a ground-glass one (Recommendation 4, p236). So the field
   shows for every single part-solid nodule, labelled "from 6 mm", and `compute` asks for
   it only at 6 mm or more. *(My call: keeps "applies when" to choices only; `compute`'s
   "still needed" message is what a page or the assistant asks for.)*

The result always shows the size counted ("Counted as 6 mm" when rounding changed it).

Advice, by rounded size (wording from the paper's table, journal p230; the comments
from the table and recommendations as cited in the audit findings):

| Nodule | < 6 mm | 6–8 mm | > 8 mm |
|---|---|---|---|
| Solid, single, low | No routine follow-up | CT at 6–12 months, then consider CT at 18–24 months | Consider CT at 3 months, PET/CT, or tissue sampling |
| Solid, single, high | Optional CT at 12 months | CT at 6–12 months, then CT at 18–24 months | Consider CT at 3 months, PET/CT, or tissue sampling |
| Solid, multiple, low | No routine follow-up | CT at 3–6 months, then consider CT at 18–24 months | CT at 3–6 months, then consider CT at 18–24 months |
| Solid, multiple, high | Optional CT at 12 months | CT at 3–6 months, then at 18–24 months | CT at 3–6 months, then at 18–24 months |

| Nodule | < 6 mm | ≥ 6 mm |
|---|---|---|
| Ground glass, single | No routine follow-up | CT at 6–12 months to confirm persistence, then CT every 2 years until 5 years |
| Part solid, single | No routine follow-up | solid component < 6 mm: CT at 3–6 months to confirm persistence. If unchanged and solid component remains < 6 mm, annual CT should be performed for 5 years. Solid component ≥ 6 mm: consider CT at 3–6 months to assess persistence; a persistent part-solid nodule with a solid component ≥ 6 mm is highly suspicious. Solid component > 8 mm: PET/CT, biopsy, or resection recommended (with the note below; owner's choice "B"). |
| Subsolid, multiple | CT at 3–6 months. If stable, consider CT at 2 and 4 years. | CT at 3–6 months. Subsequent management based on the most suspicious nodule(s). |

Notes shown with the advice:
- Solid, single, < 6 mm, high risk: "May warrant CT at 12 months with suspicious
  morphology, upper lobe location, or both." (B1-fleischner-08)
- Solid, multiple: "Use the most suspicious nodule as a guide to management."
- Solid, ≥ 6 mm: "A perifissural or juxtapleural nodule with lymph-node morphology needs
  no follow-up, even over 6 mm; consider CT at 6–12 months if its border is spiculated,
  the fissure is displaced, or there is a history of cancer." (B1-fleischner-11)
- Ground glass, single: "< 6 mm and suspicious: consider CT at 2 and 4 years. If a
  solid component or growth develops, consider resection." (B1-fleischner-13)
- Ground glass, single, ≥ 6 mm: "Make the first scan at 6 months, especially over 10 mm
  or with bubbly lucencies." (Recommendation 3, p235: "initial follow-up at 6 months is
  still recommended, particularly in those nodules with features reported to be risk
  factors for progression … diameter greater than 10 mm … bubbly lucencies".) *(My call:
  the audit's 12 mm case expects it; the owner reviews the wording.)*
- Part solid, single, solid component ≥ 6 mm: "PET/CT, biopsy or resection if the
  morphology is suspicious (lobulated margins, cystic components) or the solid component
  grows." (B1-fleischner-14)
- Part solid, single, solid component > 8 mm (owner, 2026-11-25): "A CT at 3–6 months
  to confirm it persists may be considered first; large solid components are also seen in
  nodules that clear up." (Recommendation 4, p237: the 3–6-month scan "should be
  considered" for solid components ≥ 6 mm, and "a large solid component can also be seen
  in transient part-solid nodules".) The result line itself, and so the copied report
  line, stays "PET/CT, biopsy, or resection recommended."
- Part solid, < 6 mm: "Part-solid nodules can't be defined as such until 6 mm."
- Subsolid, multiple, < 6 mm: "Usually benign; in selected high-risk patients consider
  CT at 2 and 4 years."

Copy puts one line on the clipboard for the report, e.g.:
"Fleischner 2017 (single solid nodule, 7 mm average diameter, low risk): CT at 6–12
months, then consider CT at 18–24 months."
Part solid adds the solid component ("12 mm with a 4 mm solid component"). The owner
reviews this wording in the preview.

### Registry and front page

`fleischner` goes back to `calculator: true`; the row gets the calc button. Its url
still opens the old page (which keeps its notice). Summary unchanged.

### Tests

- The audit's 40 Fleischner cases (`docs/audit/batch-1/cases/fleischner.json`) re-keyed
  to the new fields, keeping each case's id and inputs; the cases that relied on the old
  form's single size box are entered as the paper means them (a 12 mm part-solid nodule
  with a 4 mm solid component; with a 7 mm; a 15 mm with a 9 mm). The audit's expected
  text is worded differently from this design's, so each case's expected advice is
  written in this design's wording and must mean the same as the audit's (checked case
  by case when the test table is written).
- Every cut-off edge after rounding: 5.4, 5.5, 5.6, 6, 8, 8.4, 8.5, 9; solid component
  5, 6, 8, 9; a single part-solid nodule under 6 mm needs no solid component.
- Invalid and incomplete: missing choices, size ≤ 0 or blank, solid component ≥ the
  whole nodule, risk and solid component ignored where they don't apply.
- Contract: choice fields render as one radio group; a field that doesn't apply is
  hidden and empty; ECV and Bernoulli tests unchanged and green.
- e2e (desktop and 360 px): open Fleischner's quick view, choose and type, read the
  advice, keyboard through a group, no sideways scroll, Copy.

## Constraints

The repo's look and behaviour rules (`CLAUDE.md`), the ORCA pages untouched, work on a
branch, main only after the owner has reviewed a preview on desktop and phone and said
to merge. The advice wording is clinical text the owner signs off.

## Left to the builder

How the contract represents choice fields and "applies when"; the radio-button markup
and styles within the look rules; how the module points the foot link at the paper;
the exact incomplete-prompt wording.

## After it is live (owner's OK at the time)

Add a line to the old page's notice pointing to the calculator on the front page.
