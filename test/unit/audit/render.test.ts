import { describe, expect, it } from 'vitest';
import { renderBatch, renderGaps, reviewData } from '../../../scripts/audit/render.ts';
import { applyRulings } from '../../../scripts/audit/rulings.ts';
import { parseBatch, parseGaps, parseSources } from '../../../scripts/audit/schema.ts';

const sources = parseSources([
  {
    id: 'lung-rads-2022',
    title: 'Lung-RADS v2022',
    citation: 'American College of Radiology. Lung-RADS v2022',
    version: 'v2022',
    year: 2022,
    url: 'https://www.acr.org/lung-rads',
    access: 'open',
    reuse: 'restate-and-link',
  },
]);

const base = {
  page: 'lung-rads',
  kind: 'guideline-threshold',
  topic: 'Lung cancer screening',
  says: 'New solid nodule <4 mm: category 3',
  sources: [{ source: 'lung-rads-2022', location: 'Table, category 2' }],
  home: 'Lung cancer screening › Categories',
};

const batch = parseBatch(
  {
    batch: 1,
    title: 'Chest, adrenal, kidney and liver',
    startedOn: '2026-11-25',
    oldRepoCommits: { guidelines: '03cc237' },
    pages: [
      { id: 'lung-rads', url: 'https://dfergs93.github.io/guidelines_manager/pulmonary/lung_rads/', title: 'Lung-RADS' },
      { id: 'fleischner', url: 'https://dfergs93.github.io/guidelines_manager/pulmonary/fleischner/', title: 'Fleischner' },
    ],
    findings: [
      { ...base, id: 'B1-fleischner-01', page: 'fleischner', piece: 'Solid nodules', verdict: 'correct', management: false },
      {
        ...base,
        id: 'B1-lung-rads-01',
        piece: 'New nodule grading',
        verdict: 'outdated',
        management: true,
        fix: 'Dated notice naming v2022.',
        question: 'Does the provincial program use v2022?',
        ruling: { decision: 'keep', note: 'Yes, v2022.', date: '2026-11-26' },
      },
      { ...base, id: 'B1-guidelines-site-01', page: 'guidelines-site', piece: 'Review date line', kind: 'teaching', verdict: 'drop', management: false, sources: [], fix: 'Remove the line.' },
    ],
    recheckList: [],
  },
  sources,
);

describe('renderBatch', () => {
  const md = renderBatch(batch, sources);

  it('puts page sections in the batch order, then findings across the site', () => {
    const order = ['## Lung-RADS', '## Fleischner', '## Across the site'].map((h) => md.indexOf(h));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(md.indexOf('B1-guidelines-site-01')).toBeGreaterThan(order[2]!);
  });

  it('marks management findings and shows the source as citation — location', () => {
    expect(md).toContain('### B1-lung-rads-01 · New nodule grading');
    expect(md).toMatch(/\*\*Verdict:\*\* outdated · \*\*management\*\*/);
    expect(md).toContain('American College of Radiology. Lung-RADS v2022 — Table, category 2');
  });

  it('shows the question and the ruling', () => {
    expect(md).toContain('Does the provincial program use v2022?');
    expect(md).toContain('**Ruling:** keep (2026-11-26) — Yes, v2022.');
  });
});

describe('reviewData', () => {
  it('resolves source ids to citation, url and location', () => {
    const lung = reviewData(batch, sources).find((f) => f.id === 'B1-lung-rads-01')!;
    expect(lung.pageTitle).toBe('Lung-RADS');
    expect(lung.sources).toEqual([
      { citation: 'American College of Radiology. Lung-RADS v2022', url: 'https://www.acr.org/lung-rads', location: 'Table, category 2' },
    ]);
  });
});

describe('renderGaps', () => {
  it('renders one table row per gap, escaping pipes', () => {
    const gaps = parseGaps([
      { id: 'dvt-svt', topic: 'DVT | SVT', raisedBy: 'owner', lead: 'to find', alternatives: [], car: 'unknown', today: 'Nothing.', home: 'Vascular' },
    ]);
    const md = renderGaps(gaps);
    expect(md).toContain('| DVT \\| SVT | owner | to find |');
  });
});

describe('applyRulings', () => {
  const r = (id: string, decision: 'keep' | 'change' | 'drop', savedAt: string) => ({ id, decision, note: decision, date: savedAt.slice(0, 10), savedAt });

  it('keeps the latest ruling for each finding', () => {
    const out = applyRulings(batch, [r('B1-fleischner-01', 'drop', '2026-11-26T10:00:00Z'), r('B1-fleischner-01', 'change', '2026-11-26T09:00:00Z')]);
    expect(out.findings.find((f) => f.id === 'B1-fleischner-01')!.ruling).toEqual({ decision: 'drop', note: 'drop', date: '2026-11-26' });
    expect(batch.findings.find((f) => f.id === 'B1-fleischner-01')!.ruling).toBeUndefined();
  });

  it('rejects a ruling for a finding that does not exist', () => {
    expect(() => applyRulings(batch, [r('B1-nowhere-01', 'keep', '2026-11-26T10:00:00Z')])).toThrow(/B1-nowhere-01/);
  });
});
