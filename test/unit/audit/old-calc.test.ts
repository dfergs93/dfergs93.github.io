import { describe, expect, it } from 'vitest';
import { caseUrl, categoryOf, notAccepted, parseCaseFile, renderCaseResults, toCaseResult } from '../../../scripts/audit/old-calc.ts';

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
