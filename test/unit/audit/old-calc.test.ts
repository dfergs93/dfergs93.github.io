import { describe, expect, it } from 'vitest';
import { caseUrl, categoryOf, notAccepted, parseCaseFile, renderCaseResults, resultsPath, runModuleCase, toCaseResult } from '../../../scripts/audit/old-calc.ts';

const FILE = {
  calculator: 'lung_rads',
  pageUrl: 'https://dfergs93.github.io/guidelines_manager/pulmonary/lung_rads/',
  formId: 'lungrads-form',
  resultId: 'lungrads-results',
  params: ['nodule_type', 'size_mm', 'solid_component_mm', 'is_new', 'has_suspicious_features'],
  categoryKey: 'Category',
  cases: [
    {
      id: 'new-solid-3mm',
      inputs: { nodule_type: 'solid', size_mm: '3', is_new: 'yes', has_suspicious_features: 'no' },
      expected: { source: { source: 'lung-rads-1-1', location: 'Table, category 2' }, text: 'Category 2: continue annual screening', category: '2' },
    },
  ],
};

describe('parseCaseFile', () => {
  it('accepts a case file', () => {
    expect(parseCaseFile(FILE).cases).toHaveLength(1);
  });

  it('rejects an input the calculator does not declare (e.g. the other form on the page)', () => {
    const bad = { ...FILE, cases: [{ ...FILE.cases[0]!, inputs: { ...FILE.cases[0]!.inputs, washout_venous_hu: '80' } }] };
    expect(() => parseCaseFile(bad)).toThrow(/new-solid-3mm.*washout_venous_hu/);
  });

  it('rejects a duplicate case id', () => {
    expect(() => parseCaseFile({ ...FILE, cases: [FILE.cases[0], FILE.cases[0]] })).toThrow(/new-solid-3mm.*duplicate/);
  });
});

describe('caseUrl', () => {
  it('puts the inputs in the address, encoded', () => {
    expect(caseUrl('https://x.test/p/', { size_mm: '7', nodule_type: 'part-solid' })).toBe('https://x.test/p/?size_mm=7&nodule_type=part-solid');
    expect(caseUrl('https://x.test/p/', { note: 'a&b' })).toBe('https://x.test/p/?note=a%26b');
  });
});

describe('notAccepted', () => {
  it('names the inputs whose field did not take the value asked for', () => {
    expect(notAccepted({ nodule_type: 'ground_glass', size_mm: '7' }, { nodule_type: '', size_mm: '7' })).toEqual(['nodule_type']);
    expect(notAccepted({ size_mm: '7' }, { size_mm: '7', nodule_type: 'solid' })).toEqual([]);
  });
});

describe('categoryOf', () => {
  it('takes the last word of a category label', () => {
    expect(categoryOf('Lung-RADS 4A')).toBe('4A');
    expect(categoryOf('  Bosniak IIF ')).toBe('IIF');
  });
});

describe('toCaseResult', () => {
  const file = parseCaseFile(FILE);
  const c = file.cases[0]!;
  const seen = (values: Record<string, string>, category: string) => ({
    values,
    recommendation: `Lung-RADS ${category}: 6-month LDCT`,
    specifics: { Category: `Lung-RADS ${category}` },
  });

  it('compares the category when every input was accepted', () => {
    expect(toCaseResult(file, c, seen(c.inputs, '3')).categoryMatch).toBe(false);
    expect(toCaseResult(file, c, seen(c.inputs, '2')).categoryMatch).toBe(true);
  });

  it('never compares a case whose inputs were not all accepted', () => {
    const r = toCaseResult(file, c, seen({ ...c.inputs, nodule_type: '' }, '2'));
    expect(r.notAccepted).toEqual(['nodule_type']);
    expect(r.categoryMatch).toBeUndefined();
  });
});

describe('renderCaseResults', () => {
  const file = parseCaseFile(FILE);
  const c = file.cases[0]!;

  it('reports a not-accepted case as such, with no match mark', () => {
    const r = { id: c.id, notAccepted: ['nodule_type'], recommendation: 'Lung-RADS 2: annual', specifics: {} };
    const md = renderCaseResults(file, [r]);
    const row = md.split('\n').find((line) => line.startsWith('| new-solid-3mm'))!;
    expect(row).toContain('input not accepted: nodule_type');
    expect(row).not.toMatch(/✓|✗/);
    expect(md).toContain('1 cases: 0 matched, 0 mismatched, 0 to compare by reading, 1 input not accepted, 0 no result');
  });

  it('marks a mismatch and shows expected beside what came back', () => {
    const r = { id: c.id, notAccepted: [], recommendation: 'Lung-RADS 3: 6-month LDCT', specifics: { Category: 'Lung-RADS 3' }, categoryMatch: false };
    const row = renderCaseResults(file, [r]).split('\n').find((line) => line.startsWith('| new-solid-3mm'))!;
    expect(row).toContain('Category 2: continue annual screening');
    expect(row).toContain('Lung-RADS 3: 6-month LDCT');
    expect(row).toContain('✗');
  });
});

// A results file is the evidence of the run that made it: the old pages change (batch 1's
// calculators were switched off after the audit), so a re-run must not replace it by accident.
describe('resultsPath', () => {
  const none = () => false;
  const all = () => true;

  it('puts the results beside the case file', () => {
    expect(resultsPath('docs/audit/batch-1/cases/bosniak.json', none, false)).toBe('docs/audit/batch-1/cases/bosniak.results.md');
  });

  it('refuses to replace existing results without --force', () => {
    expect(() => resultsPath('docs/audit/batch-1/cases/bosniak.json', all, false)).toThrow(/bosniak\.results\.md.*--force/);
  });

  it('replaces them with --force', () => {
    expect(resultsPath('docs/audit/batch-1/cases/bosniak.json', all, true)).toBe('docs/audit/batch-1/cases/bosniak.results.md');
  });

  it('refuses a case file that is not .json, which would otherwise be overwritten by its own results', () => {
    expect(() => resultsPath('docs/audit/batch-1/cases/bosniak.txt', none, true)).toThrow(/\.json/);
  });
});

// Batch 3: the cardiac site's calculators convert as you type (no address, no submit), and
// the front page's own modules are audited through their compute().
const SOURCE = { source: 'baumgartner-2017', location: 'p. 375' };

const TYPE_FILE = {
  calculator: 'bernoulli_old',
  mode: 'type',
  pageUrl: 'https://dfergs93.github.io/cardiac-imaging-resources/calculators/bernoulli/',
  params: ['vmax', 'gradient'],
  fields: { vmax: 'bern-vmax', gradient: 'bern-pg' },
  outputs: { vmax: 'bern-vmax', gradient: 'bern-pg' },
  cases: [{ id: 'v-4', inputs: { vmax: '4' }, expected: { source: SOURCE, text: '64 mmHg' } }],
};

const MODULE_FILE = {
  calculator: 'bernoulli_module',
  mode: 'module',
  module: 'bernoulli',
  params: ['vmax', 'gradient'],
  cases: [{ id: 'v-4', inputs: { vmax: '4' }, changed: 'vmax', expected: { source: SOURCE, text: '64 mmHg' } }],
};

describe('case file modes', () => {
  it('reads a file without a mode as an address-mode file, as before', () => {
    expect(parseCaseFile(FILE)).toEqual({ mode: 'url', ...FILE });
  });

  it('accepts a type-mode file', () => {
    expect(parseCaseFile(TYPE_FILE).mode).toBe('type');
  });

  it('refuses a type-mode file without its field ids, naming the file', () => {
    const { fields: _fields, ...bad } = TYPE_FILE;
    expect(() => parseCaseFile(bad)).toThrow(/fields/);
  });

  it("refuses a type-mode file whose field ids don't match its params", () => {
    expect(() => parseCaseFile({ ...TYPE_FILE, fields: { vmax: 'bern-vmax' } })).toThrow(/bernoulli_old[\s\S]*gradient/);
  });

  it("refuses a module case whose input isn't one of the module's fields, naming the case", () => {
    const bad = { ...MODULE_FILE, params: ['vmax', 'gradient', 'area'], cases: [{ ...MODULE_FILE.cases[0]!, inputs: { area: '1' } }] };
    expect(() => parseCaseFile(bad)).toThrow(/area/);
  });

  it('refuses a module that does not exist', () => {
    expect(() => parseCaseFile({ ...MODULE_FILE, module: 'tirads' })).toThrow(/tirads/);
  });
});

describe('runModuleCase', () => {
  it("runs the front page's Bernoulli module: 4 m/s gives 64.0 mmHg", () => {
    const file = parseCaseFile(MODULE_FILE);
    const r = runModuleCase(file, file.cases[0]!);
    expect(r.notAccepted).toEqual([]);
    expect(r.recommendation).toBe('4.00 m/s ↔ 64.0 mmHg');
    expect(r.specifics).toEqual({ gradient: '64.0' });
  });

  it('reports what the module says when it gives no result', () => {
    const file = parseCaseFile({ ...MODULE_FILE, cases: [{ ...MODULE_FILE.cases[0]!, inputs: { vmax: '0' } }] });
    expect(runModuleCase(file, file.cases[0]!).recommendation).toBe('incomplete: Enter a peak velocity or a pressure gradient.');
  });

  it("names an input the module can't read as not accepted", () => {
    const file = parseCaseFile({ ...MODULE_FILE, cases: [{ ...MODULE_FILE.cases[0]!, inputs: { vmax: 'fast' } }] });
    expect(runModuleCase(file, file.cases[0]!).notAccepted).toEqual(['vmax']);
  });
});
