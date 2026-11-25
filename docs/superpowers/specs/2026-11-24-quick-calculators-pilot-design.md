# Quick calculators on the front page (pilot): design

Date: 2026-11-24. Status: draft for the owner's review.
Builds on: `2026-11-24-radiology-reference-site-design.md` (the site design; its
"Calculators" contract is the one used here). Timing: straight after the stage 1
launch, on its own branch off `main`.

## Intent

The owner wants to use a calculator straight from its row on the front page, without
leaving the list: "a dropdown … so you could quickly use it; you can always choose to
go to the full page if needed." The people are the site's usual readers (residents,
radiologists, the owner) at a reading-room workstation or on a phone, usually with
numbers from the case in front of them.

Success: from the front page, a reader opens ECV or Simplified Bernoulli under its row,
types the values, reads the answer (and copies it into the report) in seconds, and can
still open the full page in one click.

This pilot is also the first use of the calculator contract that stage 3 (calculator
pages) and stage 4 (the assistant) depend on: each calculator is written once as a
module and every place that uses it reads the same code.

## Goals, non-goals, anti-goals

Goals
- A quick view that opens under a calculator's row (owner's choice, layout "A").
- ECV and Simplified Bernoulli as calculator modules, with tests from worked examples.
- Same answers as the current full pages for the same inputs.

Non-goals
- The other eight calculators. Each gets its module and quick view when stage 3
  rebuilds it after the stage 2 audit (Fleischner, Lung-RADS, LI-RADS, Bosniak,
  PI-RADS, TI-RADS, adrenal) or alongside them (4D flow, whose inputs are complex).
- New calculator pages on this site, or pre-filled links to them: the "Full calculator"
  link opens the current page on the old cardiac site, which cannot take inputs. Stage 3
  adds pages that read inputs from the address.
- Severity grading from Bernoulli inputs. The current page converts only; its grading
  tables are reference. Adding grading is new clinical logic for the audit to weigh.
- Changing any clinical content (thresholds, labels). The pilot matches the current pages.

Anti-goals
- The quick view and the full page giving different answers for the same inputs.
- Guideline logic that hasn't been through the audit appearing on the front page.
- Opening a quick view making the list hard to use (several open at once, focus lost,
  the page jumping away from the row).
- Anything typed being stored or sent anywhere.

## Constraints

- Everything in the stage 1 design and its "Look and behaviour rules" (repo
  `CLAUDE.md`): dark by default, tokens only, one accent colour (calculator mark,
  selected item, focus), hover delay, no gradients or shadows, IBM Plex, tabular numerals.
- The front page's row markup has one writer (`ResourceRow.astro`); rows are cloned by
  the page script, so a quick view must work in any list (Popular, an area, Favorites,
  search results).
- Without JavaScript the front page lists everything; there is no quick view then, and
  the `calc` mark stays a plain label.
- Local storage holds only favorites and theme. Inputs are not kept anywhere.

## Approaches

Considered for timing and scope:
1. **Pilot with ECV and Simplified Bernoulli, after the stage 1 launch.** Chosen by the
   owner. Both are formulas that follow no versioned guideline, so the audit has
   nothing to change in them; the pilot proves the shared calculator contract early.
   Cost: until stage 3 the full page is the old one (no pre-filled inputs), and each
   formula exists twice for a while (old page and module), guarded by parity tests.
2. All ten now, ported as they are: biggest immediate payoff, but puts unaudited and in
   places outdated logic (the site's Lung-RADS is v1.1) in the most prominent place.
3. Design now, build everything in stage 3: no duplication, nothing to use until then.

Considered for layout (shown as mockups):
- **A. Opens under its row.** Chosen by the owner. Same on desktop and phone.
- B. Opens in a side panel; the list stays put, summaries hidden; a bottom sheet on phones.

## Design

### Calculator modules (`shared/calculators/`)

One file per calculator, keyed by its registry id (`ecv.ts`, `bernoulli.ts`), plus an
index mapping id → module. Each module declares:
- `id` (the registry id), `title`, `implements` (guideline and version, or `'none'`) and
  `citation`: the source of its formula and of any thresholds, always filled in. Where a
  threshold comes from local practice rather than a publication, the citation says so.
  The pilot's sources (the current pages state none; owner's decision 2026-11-24):
  - ECV formula: Messroghli DR et al. Clinical recommendations for CMR mapping of T1,
    T2, T2* and extracellular volume (SCMR consensus, endorsed by EACVI). J Cardiovasc
    Magn Reson 2017;19:75. ECV bands (30 / 32 / 40 %): local practice.
  - Simplified Bernoulli: Baumgartner H et al. Recommendations on the echocardiographic
    assessment of aortic valve stenosis (EACVI/ASE focused update). J Am Soc
    Echocardiogr 2017;30:372–392.
- `inputs`: an ordered list of fields. A field has a `key` (also its future address
  parameter, e.g. `?hct=40`), a label, a unit, and min, max and step. Fields may be
  grouped (ECV: hematocrit; pre-contrast myocardium and blood; post-contrast myocardium
  and blood), matching the full page's order and grouping.
- `compute(values)`: pure, no DOM. Returns one of:
  - incomplete (a field is empty), with the full page's prompt text;
  - invalid, with a plain message (e.g. "Post-contrast T1 must be shorter than
    pre-contrast T1.");
  - a result: the headline value with unit, an optional label (ECV: Normal,
    Borderline, Elevated, Markedly elevated), a one-line note, the working
    (ECV: λ, ΔR1 myo, ΔR1 blood, 1 − Hct), and the report text the Copy button copies.
- A converter like Bernoulli, where either field can be typed, returns the other field's
  value and the page fills it in (velocity → gradient = 4v², shown to 0.1 mmHg; gradient
  → velocity = √(ΔP/4), shown to 0.01 m/s), exactly as the current page does.

ECV, as the current page does it: ΔR1 = 1/T1post − 1/T1pre for myocardium and blood;
λ = ΔR1myo / ΔR1blood; ECV = (1 − Hct/100) × λ × 100, shown to 0.1 %. Bands, applied to
the unrounded value: below 30 Normal; 30 to 32 Borderline; above 32 to 40 Elevated;
above 40 Markedly elevated (the page's boundaries: 30 and 32 are Borderline, 40 is
Elevated). Hematocrit must be above 0 and below 100 % (the page's message says "1–99%");
post-contrast T1 must be shorter than pre-contrast for both. A field's min and max are
typing hints, as on the page, not validation.

Bernoulli's `compute` is told which field was just typed and fills the other; an empty
or non-positive velocity, or an empty or negative gradient, leaves the other field as it is.

The module's text (labels, notes, prompts, report lines) is clinical wording copied from
the current pages; the owner reviews it with the pilot.

### The quick view

- On rows whose id has a module, the `calc` mark becomes a button ("calc", with
  `aria-expanded`), placed outside the row's link (a button can't sit inside a link).
  Rows for calculators without a module keep the plain label. Search-result rows behave
  the same (the results list's listbox caveat from stage 1 applies).
- Pressing it opens the quick view inside that row, under the summary: the fields, the
  live result (updating as you type), Copy (copies the report text), a source line
  under the result (the module's citation, shortened: "Formula: Messroghli et al., JCMR
  2017 · Bands: local practice"; "Baumgartner et al., JASE 2017"), and "Full
  calculator →" (the resource's page). Clicking the row's title still opens the full
  page as now; the quick view area is not part of that link.
- One quick view open at a time: opening another closes the first. Esc, or the button
  again, closes it and returns focus to the button. Opening moves focus to the first field.
- It works the same in every list and on a phone (full width under the row, numeric
  keyboard for numeric fields). Closing it, changing list, or a new search clears it;
  nothing is remembered.
- Each opening of a quick view counts once as an open of that resource for the
  anonymous counts (the reader used it), sent the same way as a row click; typing in it
  sends nothing.
- The quick view is built by a small renderer from the module's declared inputs, so
  stage 3's full pages and stage 4's assistant use the same field definitions.

### Tests

- Each module: worked examples with hand-derived values (e.g. an ECV case computed by
  hand), every band boundary (29.9, 30, 32, 32.1, 40, 40.1), every invalid case, and
  Bernoulli both ways (4.0 m/s ↔ 64.0 mmHg).
- Parity: a table of inputs whose expected outputs are what the current pages produce
  (computed once from their formulas and written in as literals).
- Browser: open and close (button, Esc), one open at a time, live result, Copy, focus,
  the full-page link, inside search results, phone width without sideways scroll, no
  quick view without JavaScript, and nothing written to storage.

## Decided by the owner

- Quick calculators on the front page, with the full page one click away.
- Layout A: opens under its row.
- Pilot with ECV and Simplified Bernoulli, straight after the stage 1 launch; the rest
  follow the audit.
- Every calculator states its source, shown under the result. ECV's formula and
  Bernoulli cite the 2017 SCMR and EACVI/ASE recommendations; ECV's 30 / 32 / 40 bands
  are local practice and say so.

## My calls (for checking)

- One quick view open at a time; opening one counts as an open.
- The two citations above (drafted; the owner confirms them with the pilot) and the
  shortened wording of the source line.
- Copy is included, as on the current ECV page (the Bernoulli page has none; the pilot
  doesn't add one there).
- No severity grading from Bernoulli inputs, and no change to ECV's bands, until the audit.
- "Full calculator" opens the current page without inputs until stage 3.

## Left to the builder

- File layout beyond `shared/calculators/`, the renderer's structure, and the exact
  spacing of the quick view within the approved look.
- How the button and quick view are announced to screen readers, within the usual
  disclosure pattern.
