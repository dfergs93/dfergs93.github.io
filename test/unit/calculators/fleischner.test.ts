import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { countedMm, fleischner } from '../../../shared/calculators/fleischner.ts';
import type { Choices, Outcome, Values } from '../../../shared/calculators/types.ts';

const run = (choices: Choices, values: Values): Outcome => fleischner.compute(values, undefined, choices);
const ok = (out: Outcome) => {
  if (out.status !== 'ok') throw new Error(`expected advice, got ${out.status}: ${out.message}`);
  return out;
};
const headline = (choices: Choices, values: Values) => ok(run(choices, values)).headline;

// The table's cells (Radiology 2017;284:228–243, journal p230), in the design's wording.
const SOLID_SINGLE_LOW_6_8 = 'CT at 6–12 months, then consider CT at 18–24 months';
const SOLID_SINGLE_HIGH_6_8 = 'CT at 6–12 months, then CT at 18–24 months';
const SOLID_SINGLE_OVER_8 = 'Consider CT at 3 months, PET/CT, or tissue sampling';
const SOLID_MULTIPLE_LOW_6_UP = 'CT at 3–6 months, then consider CT at 18–24 months';
const SOLID_MULTIPLE_HIGH_6_UP = 'CT at 3–6 months, then at 18–24 months';
const NONE = 'No routine follow-up';
const OPTIONAL_12 = 'Optional CT at 12 months';
const GGN_SINGLE_6_UP = 'CT at 6–12 months to confirm persistence, then CT every 2 years until 5 years';
const PART_SOLID_COMPONENT_UNDER_6 =
  'CT at 3–6 months to confirm persistence. If unchanged and solid component remains < 6 mm, annual CT should be performed for 5 years.';
const PART_SOLID_COMPONENT_6_8 =
  'Consider CT at 3–6 months to assess persistence; a persistent part-solid nodule with a solid component ≥ 6 mm is highly suspicious.';
const PART_SOLID_COMPONENT_OVER_8 = 'PET/CT, biopsy, or resection recommended.';
const SUBSOLID_MULTIPLE_UNDER_6 = 'CT at 3–6 months. If stable, consider CT at 2 and 4 years.';
const SUBSOLID_MULTIPLE_6_UP = 'CT at 3–6 months. Subsequent management based on the most suspicious nodule(s).';

// Each entry was checked by eye against the case's expected text in the audit's case file.
const EXPECTED: Record<string, string> = {
  'f2017-solid-single-low-5-0': NONE,
  'f2017-solid-single-low-5-4': NONE,
  'f2017-solid-single-low-5-6': SOLID_SINGLE_LOW_6_8,
  'f2017-solid-single-low-6-0': SOLID_SINGLE_LOW_6_8,
  'f2017-solid-single-low-8-0': SOLID_SINGLE_LOW_6_8,
  'f2017-solid-single-low-8-4': SOLID_SINGLE_LOW_6_8,
  'f2017-solid-single-low-8-6': SOLID_SINGLE_OVER_8,
  'f2017-solid-single-low-9-0': SOLID_SINGLE_OVER_8,
  'f2017-solid-single-high-5-0': OPTIONAL_12,
  'f2017-solid-single-high-5-6': SOLID_SINGLE_HIGH_6_8,
  'f2017-solid-single-high-6-0': SOLID_SINGLE_HIGH_6_8,
  'f2017-solid-single-high-8-0': SOLID_SINGLE_HIGH_6_8,
  'f2017-solid-single-high-8-4': SOLID_SINGLE_HIGH_6_8,
  'f2017-solid-single-high-9-0': SOLID_SINGLE_OVER_8,
  'f2017-solid-multiple-low-5-0': NONE,
  'f2017-solid-multiple-low-5-6': SOLID_MULTIPLE_LOW_6_UP,
  'f2017-solid-multiple-low-6-0': SOLID_MULTIPLE_LOW_6_UP,
  'f2017-solid-multiple-low-8-0': SOLID_MULTIPLE_LOW_6_UP,
  'f2017-solid-multiple-low-9-0': SOLID_MULTIPLE_LOW_6_UP,
  'f2017-solid-multiple-high-5-0': OPTIONAL_12,
  'f2017-solid-multiple-high-6-0': SOLID_MULTIPLE_HIGH_6_UP,
  'f2017-solid-multiple-high-8-0': SOLID_MULTIPLE_HIGH_6_UP,
  'f2017-solid-multiple-high-8-4': SOLID_MULTIPLE_HIGH_6_UP,
  'f2017-solid-multiple-high-9-0': SOLID_MULTIPLE_HIGH_6_UP,
  'f2017-ggn-single-low-5-0': NONE,
  'f2017-ggn-single-low-5-6': GGN_SINGLE_6_UP,
  'f2017-ggn-single-low-6-0': GGN_SINGLE_6_UP,
  'f2017-ggn-single-high-5-0': NONE,
  'f2017-ggn-single-high-12-0': GGN_SINGLE_6_UP,
  'f2017-partsolid-single-low-5-0': NONE,
  'f2017-partsolid-single-low-5-6': PART_SOLID_COMPONENT_UNDER_6,
  'f2017-partsolid-single-low-6-0': PART_SOLID_COMPONENT_UNDER_6,
  'f2017-partsolid-single-solid-entered-4': PART_SOLID_COMPONENT_UNDER_6,
  'f2017-partsolid-single-solid-7': PART_SOLID_COMPONENT_6_8,
  'f2017-partsolid-single-solid-9': PART_SOLID_COMPONENT_OVER_8,
  'f2017-subsolid-multiple-ggn-5-0': SUBSOLID_MULTIPLE_UNDER_6,
  'f2017-subsolid-multiple-ggn-5-6': SUBSOLID_MULTIPLE_6_UP,
  'f2017-subsolid-multiple-ggn-6-0': SUBSOLID_MULTIPLE_6_UP,
  'f2017-subsolid-multiple-partsolid-5-0': SUBSOLID_MULTIPLE_UNDER_6,
  'f2017-subsolid-multiple-partsolid-8-0': SUBSOLID_MULTIPLE_6_UP,
};

// The old form had one size box; these cases are entered as the paper means them.
const OVERRIDES: Record<string, Values> = {
  'f2017-partsolid-single-low-5-6': { solid: 3 },
  'f2017-partsolid-single-low-6-0': { solid: 3 },
  'f2017-partsolid-single-solid-entered-4': { size: 12, solid: 4 },
  'f2017-partsolid-single-solid-7': { size: 12, solid: 7 },
  'f2017-partsolid-single-solid-9': { size: 15, solid: 9 },
};

type AuditCase = { id: string; inputs: { size_mm: string; nodule_type: string; patient_risk: string; multiplicity: string } };
const CASES: AuditCase[] = JSON.parse(readFileSync('docs/audit/batch-1/cases/fleischner.json', 'utf8')).cases;

describe('Fleischner 2017', () => {
  test("the audit's 40 cases give the paper's advice", () => {
    expect(CASES).toHaveLength(40);
    expect(Object.keys(EXPECTED).sort()).toEqual(CASES.map((c) => c.id).sort());
    for (const c of CASES) {
      const choices = { type: c.inputs.nodule_type, count: c.inputs.multiplicity, risk: c.inputs.patient_risk };
      const values = { size: Number(c.inputs.size_mm), ...OVERRIDES[c.id] };
      expect(headline(choices, values), c.id).toBe(EXPECTED[c.id]);
    }
  });

  test('rounding at the cut-offs', () => {
    expect(countedMm(5.5)).toBe(6);
    const solid = { type: 'solid', count: 'single', risk: 'low' };
    expect(headline(solid, { size: 5.4 })).toBe(NONE);
    expect(headline(solid, { size: 5.5 })).toBe(SOLID_SINGLE_LOW_6_8);
    expect(headline(solid, { size: 5.6 })).toBe(SOLID_SINGLE_LOW_6_8);
    expect(headline(solid, { size: 8.4 })).toBe(SOLID_SINGLE_LOW_6_8);
    expect(headline(solid, { size: 8.5 })).toBe(SOLID_SINGLE_OVER_8);
    const partSolid = { type: 'part-solid', count: 'single' };
    expect(headline(partSolid, { size: 12, solid: 5.4 })).toBe(PART_SOLID_COMPONENT_UNDER_6);
    expect(headline(partSolid, { size: 12, solid: 5.5 })).toBe(PART_SOLID_COMPONENT_6_8);
    expect(headline(partSolid, { size: 12, solid: 8.4 })).toBe(PART_SOLID_COMPONENT_6_8);
    expect(headline(partSolid, { size: 12, solid: 8.5 })).toBe(PART_SOLID_COMPONENT_OVER_8);
  });

  test('a single part-solid nodule under 6 mm needs no solid component', () => {
    const partSolid = { type: 'part-solid', count: 'single' };
    const small = ok(run(partSolid, { size: 5 }));
    expect(small.headline).toBe(NONE);
    expect(small.notes).toContain("Part-solid nodules can't be defined as such until 6 mm.");
    expect(run(partSolid, { size: 5.6 })).toEqual({ status: 'incomplete', message: 'Still needed: solid component.' });
  });

  test('what is still needed', () => {
    expect(run({}, {})).toEqual({ status: 'incomplete', message: 'Still needed: nodule type, number, size.' });
    expect(run({ type: 'solid' }, {})).toEqual({ status: 'incomplete', message: 'Still needed: number, risk, size.' });
    expect(run({ type: 'solid', count: 'single', risk: 'low' }, {})).toEqual({ status: 'incomplete', message: 'Still needed: size.' });
    expect(run({ type: 'nodular', count: 'single' }, { size: 7 })).toEqual({ status: 'incomplete', message: 'Still needed: nodule type.' });
  });

  test('a size under 1 mm is taken for centimetres', () => {
    const solid = { type: 'solid', count: 'single', risk: 'low' };
    expect(run(solid, { size: 0.6 })).toEqual({ status: 'invalid', message: 'Enter the size in millimetres (e.g. 6, not 0.6).' });
    expect(run(solid, { size: 0 })).toEqual({ status: 'invalid', message: 'Size must be greater than 0 mm.' });
    expect(run(solid, { size: -2 })).toEqual({ status: 'invalid', message: 'Size must be greater than 0 mm.' });
  });

  test('solid component must be smaller than the whole nodule', () => {
    const partSolid = { type: 'part-solid', count: 'single' };
    const message = 'The solid component must be smaller than the whole nodule.';
    expect(run(partSolid, { size: 8, solid: 8 })).toEqual({ status: 'invalid', message });
    expect(run(partSolid, { size: 8, solid: 9 })).toEqual({ status: 'invalid', message });
    expect(run(partSolid, { size: 8, solid: 0 })).toEqual({ status: 'invalid', message: 'Solid component must be greater than 0 mm.' });
  });

  test('risk is ignored for subsolid nodules', () => {
    const base = { type: 'ground-glass', count: 'single' };
    const without = run(base, { size: 7 });
    expect(run({ ...base, risk: 'low' }, { size: 7 })).toEqual(without);
    expect(run({ ...base, risk: 'high' }, { size: 7 })).toEqual(without);
  });

  describe('notes', () => {
    const notes = (choices: Choices, values: Values) => ok(run(choices, values)).notes ?? [];
    const PERIFISSURAL =
      'A perifissural or juxtapleural nodule with lymph-node morphology needs no follow-up, even over 6 mm; consider CT at 6–12 months if its border is spiculated, the fissure is displaced, or there is a history of cancer.';

    test('a small solid nodule in a low-risk patient has none', () => {
      expect(notes({ type: 'solid', count: 'single', risk: 'low' }, { size: 4 })).toEqual([]);
    });
    test('high risk, single solid under 6 mm: the 12-month option', () => {
      expect(notes({ type: 'solid', count: 'single', risk: 'high' }, { size: 4 })).toEqual([
        'May warrant CT at 12 months with suspicious morphology, upper lobe location, or both.',
      ]);
    });
    test('multiple solid: the most suspicious nodule guides, and from 6 mm the perifissural exception', () => {
      expect(notes({ type: 'solid', count: 'multiple', risk: 'low' }, { size: 4 })).toEqual(['Use the most suspicious nodule as a guide to management.']);
      expect(notes({ type: 'solid', count: 'multiple', risk: 'low' }, { size: 7 })).toEqual([
        'Use the most suspicious nodule as a guide to management.',
        PERIFISSURAL,
      ]);
    });
    test('single solid from 6 mm: the perifissural exception', () => {
      expect(notes({ type: 'solid', count: 'single', risk: 'high' }, { size: 7 })).toEqual([PERIFISSURAL]);
      expect(notes({ type: 'solid', count: 'single', risk: 'low' }, { size: 12 })).toEqual([PERIFISSURAL]);
    });
    test('single ground glass: suspicious small ones, resection, and the 6-month first scan', () => {
      expect(notes({ type: 'ground-glass', count: 'single' }, { size: 4 })).toEqual([
        '< 6 mm and suspicious: consider CT at 2 and 4 years. If a solid component or growth develops, consider resection.',
      ]);
      expect(notes({ type: 'ground-glass', count: 'single' }, { size: 12 })).toEqual([
        'Make the first scan at 6 months, especially over 10 mm or with bubbly lucencies.',
        'If a solid component or growth develops, consider resection.',
      ]);
    });
    test('single part solid: highly suspicious from a 6 mm component; over 8 mm the first-scan caution', () => {
      expect(notes({ type: 'part-solid', count: 'single' }, { size: 12, solid: 4 })).toEqual([]);
      expect(notes({ type: 'part-solid', count: 'single' }, { size: 12, solid: 7 })).toEqual([
        'PET/CT, biopsy or resection if the morphology is suspicious (lobulated margins, cystic components) or the solid component grows.',
      ]);
      expect(notes({ type: 'part-solid', count: 'single' }, { size: 15, solid: 9 })).toEqual([
        'A CT at 3–6 months to confirm it persists may be considered first; large solid components are also seen in nodules that clear up.',
      ]);
    });
    test('multiple subsolid under 6 mm: usually benign', () => {
      expect(notes({ type: 'ground-glass', count: 'multiple' }, { size: 4 })).toEqual([
        'Usually benign; in selected high-risk patients consider CT at 2 and 4 years.',
      ]);
      expect(notes({ type: 'part-solid', count: 'multiple' }, { size: 8 })).toEqual([]);
    });
  });

  test('details show the size counted', () => {
    expect(ok(run({ type: 'solid', count: 'single', risk: 'low' }, { size: 5.6 })).details).toEqual(['Counted as 6 mm (5.6 rounded)']);
    expect(ok(run({ type: 'solid', count: 'single', risk: 'low' }, { size: 7 })).details).toEqual(['Counted as 7 mm']);
    expect(ok(run({ type: 'part-solid', count: 'single' }, { size: 12, solid: 4 })).details).toEqual([
      'Counted as 12 mm',
      'Solid component counted as 4 mm',
    ]);
  });

  test('the report line', () => {
    const report = (choices: Choices, values: Values) => ok(run(choices, values)).report;
    expect(report({ type: 'solid', count: 'single', risk: 'low' }, { size: 7 })).toBe(
      'Fleischner 2017 (single solid nodule, 7 mm average diameter, low risk): CT at 6–12 months, then consider CT at 18–24 months.',
    );
    expect(report({ type: 'solid', count: 'multiple', risk: 'high' }, { size: 6.6 })).toBe(
      'Fleischner 2017 (multiple solid nodules, most suspicious 7 mm average diameter, high risk): CT at 3–6 months, then at 18–24 months.',
    );
    expect(report({ type: 'ground-glass', count: 'single' }, { size: 7 })).toBe(
      'Fleischner 2017 (single ground-glass nodule, 7 mm average diameter): CT at 6–12 months to confirm persistence, then CT every 2 years until 5 years.',
    );
    expect(report({ type: 'part-solid', count: 'single' }, { size: 12, solid: 4 })).toBe(
      `Fleischner 2017 (single part-solid nodule, 12 mm average diameter with a 4 mm solid component): ${PART_SOLID_COMPONENT_UNDER_6}`,
    );
    expect(report({ type: 'part-solid', count: 'multiple' }, { size: 8 })).toBe(
      `Fleischner 2017 (multiple part-solid nodules, most suspicious 8 mm average diameter): ${SUBSOLID_MULTIPLE_6_UP}`,
    );
  });

  test('says what it is, whom it is not for, and links the paper', () => {
    expect(fleischner).toMatchObject({
      id: 'fleischner',
      implements: 'Fleischner Society 2017',
      intro: 'Not for patients under 35, with known cancer or immunosuppression, or for lung cancer screening CTs.',
      link: { text: 'Guideline →', href: 'https://doi.org/10.1148/radiol.2017161659' },
      citation: { short: 'MacMahon et al., Radiology 2017' },
    });
    expect(ok(run({ type: 'solid', count: 'single', risk: 'low' }, { size: 7 })).textHeadline).toBe(true);
  });
});
