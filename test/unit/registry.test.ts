import { describe, expect, test } from 'vitest';
import { areaCounts } from '../../shared/order.ts';
import { POPULAR, RESOURCES, byId } from '../../shared/registry.ts';
import { validateRegistry } from '../../shared/schema.ts';

const ok = {
  id: 'ok',
  title: 'OK',
  area: 'chest',
  version: '2017',
  calculator: false,
  summary: 'A valid entry.',
  aliases: ['one', 'two'],
  url: 'https://dfergs93.github.io/guidelines_manager/ok/',
};

describe('validateRegistry', () => {
  test('accepts a valid entry', () => {
    expect(validateRegistry([ok], [])).toEqual([ok]);
  });

  test('rejects a missing version, an empty version, a duplicate id, an unknown area and an unknown popular id, listing all of them', () => {
    const { version: _omitted, ...noVersion } = { ...ok, id: 'no-version' };
    const emptyVersion = { ...ok, id: 'empty-version', version: '' };
    const dupA = { ...ok, id: 'dup' };
    const badArea = { ...ok, id: 'bad-area', area: 'thorax' };
    expect(() => validateRegistry([noVersion, emptyVersion, dupA, dupA, badArea], ['nope'])).toThrow(
      /version[\s\S]*version[\s\S]*duplicate id[\s\S]*area[\s\S]*popular/i,
    );
  });

  test("accepts version 'none'", () => {
    expect(validateRegistry([{ ...ok, version: 'none' }], [])).toHaveLength(1);
  });

  test('accepts a summary of exactly 110 characters', () => {
    expect(validateRegistry([{ ...ok, summary: 'x'.repeat(110) }], [])).toHaveLength(1);
  });

  test('rejects a summary over 110 characters, fewer than two aliases, a non-site url, and a duplicate areaRank in one area', () => {
    const entries = [
      { ...ok, id: 'long', summary: 'x'.repeat(111) },
      { ...ok, id: 'one-alias', aliases: ['only'] },
      { ...ok, id: 'elsewhere', url: 'https://example.com/fleischner/' },
      { ...ok, id: 'rank-a', areaRank: 1 },
      { ...ok, id: 'rank-b', areaRank: 1 },
    ];
    let message = '';
    try {
      validateRegistry(entries, []);
    } catch (e) {
      message = (e as Error).message;
    }
    expect(message).toMatch(/"long"[^\n]*summary/);
    expect(message).toMatch(/"one-alias"[^\n]*aliases/);
    expect(message).toMatch(/"elsewhere"[^\n]*url/);
    expect(message).toMatch(/"rank-b"[^\n]*areaRank/);
    expect(message).not.toMatch(/"rank-a"/);
  });

  test('allows the same areaRank in different areas', () => {
    const entries = [
      { ...ok, id: 'chest-1', areaRank: 1 },
      { ...ok, id: 'cardiac-1', area: 'cardiac', areaRank: 1 },
    ];
    expect(validateRegistry(entries, [])).toHaveLength(2);
  });

  test('rejects a url without a trailing slash, a bad id, a non-integer areaRank and a duplicate popular id', () => {
    const entries = [
      { ...ok, id: 'no-slash', url: 'https://dfergs93.github.io/guidelines_manager/ok' },
      { ...ok, id: 'Bad Id' },
      { ...ok, id: 'half', areaRank: 1.5 },
    ];
    expect(() => validateRegistry(entries, ['no-slash', 'no-slash'])).toThrow(
      /"no-slash"[^\n]*url[\s\S]*"Bad Id"[^\n]*id[\s\S]*"half"[^\n]*areaRank[\s\S]*popular[^\n]*duplicate/,
    );
  });

  test('rejects an unknown field, so a typo cannot pass silently', () => {
    expect(() => validateRegistry([{ ...ok, alias: ['x', 'y'] }], [])).toThrow(/"ok"[^\n]*alias/);
  });
});

// The 34 resources with real content on 2026-11-24 (see the Task 2 ruling in the plan ledger).
const TABLE: [id: string, area: string, url: string][] = [
  ['fleischner', 'chest', 'guidelines_manager/pulmonary/fleischner/'],
  ['lung-rads', 'chest', 'guidelines_manager/pulmonary/lung_rads/'],
  ['ecv', 'cardiac', 'cardiac-imaging-resources/calculators/ecv/'],
  ['flow-4d', 'cardiac', 'cardiac-imaging-resources/calculators/flow/'],
  ['bernoulli', 'cardiac', 'cardiac-imaging-resources/calculators/bernoulli/'],
  ['valve-grading', 'cardiac', 'cardiac-imaging-resources/valves/'],
  ['cardiac-mri-sequences', 'cardiac', 'cardiac-imaging-resources/cardiac_mri/'],
  ['cmr-masses', 'cardiac', 'cardiac-imaging-resources/cardiac_mri/protocols/cardiac_masses/'],
  ['cmr-cardiomyopathy', 'cardiac', 'cardiac-imaging-resources/cardiac_mri/protocols/cardiomyopathy/'],
  ['cmr-congenital-4d-flow', 'cardiac', 'cardiac-imaging-resources/cardiac_mri/protocols/congenital_4dflow/'],
  ['cmr-stress-perfusion', 'cardiac', 'cardiac-imaging-resources/cardiac_mri/protocols/stress_perfusion/'],
  ['cardiac-ct-ccta', 'cardiac', 'cardiac-imaging-resources/cardiac_ct/'],
  ['laao-ct', 'cardiac', 'cardiac-imaging-resources/cardiac_ct/device_planning/laao/'],
  ['tavr-ct', 'cardiac', 'cardiac-imaging-resources/cardiac_ct/device_planning/tavr/'],
  ['tmvr-ct', 'cardiac', 'cardiac-imaging-resources/cardiac_ct/device_planning/tmvr/'],
  ['ttvr-ct', 'cardiac', 'cardiac-imaging-resources/cardiac_ct/device_planning/ttvr/'],
  ['chd-overview', 'congenital', 'cardiac-imaging-resources/congenital/'],
  ['asd', 'congenital', 'cardiac-imaging-resources/congenital/asd/'],
  ['avsd', 'congenital', 'cardiac-imaging-resources/congenital/avsd/'],
  ['cctga', 'congenital', 'cardiac-imaging-resources/congenital/cctga/'],
  ['coarctation', 'congenital', 'cardiac-imaging-resources/congenital/coa/'],
  ['dorv', 'congenital', 'cardiac-imaging-resources/congenital/dorv/'],
  ['ebstein', 'congenital', 'cardiac-imaging-resources/congenital/ebstein/'],
  ['fontan', 'congenital', 'cardiac-imaging-resources/congenital/fontan/'],
  ['tga', 'congenital', 'cardiac-imaging-resources/congenital/tga/'],
  ['tof', 'congenital', 'cardiac-imaging-resources/congenital/tof/'],
  ['vsd', 'congenital', 'cardiac-imaging-resources/congenital/vsd/'],
  ['adrenal', 'abdomen', 'guidelines_manager/adrenal/adrenal_nodule_acr_2017/'],
  ['li-rads', 'abdomen', 'guidelines_manager/hepatobiliary/li_rads/'],
  ['bosniak', 'gu-pelvis', 'guidelines_manager/genitourinary/bosniak/'],
  ['pi-rads', 'gu-pelvis', 'guidelines_manager/genitourinary/pi_rads/'],
  ['ti-rads', 'head-neck-neuro', 'guidelines_manager/thyroid/tirads/'],
  ['bi-rads', 'breast', 'guidelines_manager/breast/bi_rads/'],
  ['contrast-safety', 'contrast', 'guidelines_manager/contrast/contrast_safety/'],
];

describe('the real registry', () => {
  // The owner ruled that the row names whom Fleischner does not apply to (B1-fleischner-24).
  // The page follows CAR or the ACR topic by topic (docs/audit/batch-2.md, B2-guidelines-home-04).
  test("contrast safety is not titled as one body's", () => {
    expect(byId('contrast-safety')?.title).toBe('Contrast safety');
  });

  test("Fleischner's summary names its exclusions", () => {
    const summary = RESOURCES.find((r) => r.id === 'fleischner')?.summary ?? '';
    for (const word of ['35+', 'screening', 'known cancer', 'immunosuppression']) expect(summary).toContain(word);
  });

  // Lung-RADS, adrenal, Bosniak and LI-RADS lost their calculators on the old pages after
  // the content audit (docs/audit/batch-1.md, 2026-11-25), and PI-RADS and TI-RADS after
  // batch 2 (docs/audit/batch-2.md, 2026-11-26), so their rows carry no calc mark.
  // Fleischner's was rebuilt as a module (the front page's quick view).
  test('has 34 entries, 4 calculators and these area counts', () => {
    expect(RESOURCES).toHaveLength(34);
    expect(RESOURCES.filter((r) => r.calculator).map((r) => r.id).sort()).toEqual(
      ['bernoulli', 'ecv', 'fleischner', 'flow-4d'],
    );
    expect(areaCounts(RESOURCES)).toEqual({
      chest: 2, cardiac: 14, congenital: 11, abdomen: 2, 'gu-pelvis': 2,
      'head-neck-neuro': 1, msk: 0, breast: 1, oncology: 0, contrast: 1,
    });
  });

  test.each(TABLE)('%s is present in %s at its url', (id, area, url) => {
    const r = byId(id);
    expect(r?.area).toBe(area);
    expect(r?.url).toBe(`https://dfergs93.github.io/${url}`);
  });

  test('byId returns undefined for an unknown id', () => {
    expect(byId('gone-id')).toBeUndefined();
  });

  test('Popular is the seeded draft, every id resolvable', () => {
    expect(POPULAR).toEqual(['fleischner', 'li-rads', 'bosniak', 'adrenal', 'lung-rads', 'contrast-safety', 'ecv', 'ti-rads', 'pi-rads', 'bi-rads']);
  });
});
