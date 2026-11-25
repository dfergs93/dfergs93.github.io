import { describe, expect, it } from 'vitest';
import { needsRecheck, parseBatch, parseGaps, parseSources, reviewProblems } from '../../../scripts/audit/schema.ts';

const SOURCE = {
  id: 'fleischner-2017',
  title: 'Guidelines for management of incidental pulmonary nodules detected on CT images',
  citation: 'MacMahon H, et al. Radiology 2017;284:228–243.',
  version: '2017',
  year: 2017,
  url: 'https://doi.org/10.1148/radiol.2017161659',
  access: 'open',
  reuse: 'unknown',
};
const LOCKED = { ...SOURCE, id: 'locked-2020', access: 'not-readable' };

const FINDING = {
  id: 'B1-fleischner-01',
  page: 'fleischner',
  piece: 'Solid nodule table',
  kind: 'guideline-threshold',
  topic: 'Incidental lung nodules',
  says: 'Single solid nodule <6 mm, low risk: no routine follow-up',
  sources: [{ source: 'fleischner-2017', location: 'Table 1' }],
  verdict: 'correct',
  management: false,
  home: 'Incidental lung nodules › Management',
};

const batch = (...findings: object[]) => ({
  batch: 1,
  title: 'Batch 1',
  startedOn: '2026-11-25',
  oldRepoCommits: { guidelines: '03cc237' },
  pages: [{ id: 'fleischner', url: 'https://dfergs93.github.io/guidelines_manager/pulmonary/fleischner/', title: 'Fleischner' }],
  findings,
  recheckList: [],
});
const sources = parseSources([SOURCE, LOCKED]);
const parse = (...findings: object[]) => parseBatch(batch(...findings), sources);
const wrong = { ...FINDING, verdict: 'wrong', fix: 'Correct the cut-off to 6 mm.' };

describe('parseBatch', () => {
  it('accepts a minimal batch', () => {
    expect(parse(FINDING).findings).toHaveLength(1);
  });

  it('rejects a duplicate finding id', () => {
    expect(() => parse(FINDING, FINDING)).toThrow(/B1-fleischner-01.*duplicate finding id/);
  });

  it('rejects an unknown page', () => {
    expect(() => parse({ ...FINDING, page: 'nowhere' })).toThrow(/B1-fleischner-01.*unknown page "nowhere"/);
  });

  it('rejects a source id that is not in sources.json', () => {
    expect(() => parse({ ...FINDING, sources: [{ source: 'missing', location: 'p1' }] })).toThrow(
      /B1-fleischner-01.*unknown source "missing"/,
    );
  });

  it.each(['correct', 'outdated', 'wrong', 'not-lead', 'duplicate'])('rejects verdict %s with no source', (verdict) => {
    const f = { ...FINDING, verdict, sources: [], fix: 'x', duplicateOf: 'B1-fleischner-02' };
    const other = { ...FINDING, id: 'B1-fleischner-02' };
    expect(() => parse(f, other)).toThrow(/B1-fleischner-01.*needs a source/);
  });

  it.each(['unsourced', 'local-practice', 'drop'])('allows verdict %s with no source', (verdict) => {
    expect(() => parse({ ...FINDING, verdict, sources: [], fix: 'x' })).not.toThrow();
  });

  it('rejects a verdict other than correct without a fix', () => {
    expect(() => parse({ ...FINDING, verdict: 'outdated' })).toThrow(/B1-fleischner-01.*needs a fix/);
  });

  it.each(['correct', 'drop'])('rejects the management flag on %s', (verdict) => {
    expect(() => parse({ ...FINDING, verdict, management: true, fix: 'x' })).toThrow(/B1-fleischner-01.*management/);
  });

  it('rejects a duplicate whose duplicateOf is missing or names no other finding', () => {
    const dup = { ...FINDING, verdict: 'duplicate', fix: 'Keep the other copy.' };
    expect(() => parse(dup)).toThrow(/B1-fleischner-01.*duplicateOf/);
    expect(() => parse({ ...dup, duplicateOf: 'B1-fleischner-01' })).toThrow(/B1-fleischner-01.*duplicateOf/);
    expect(() => parse({ ...dup, duplicateOf: 'B1-fleischner-09' })).toThrow(/B1-fleischner-01.*duplicateOf/);
  });

  it('rejects an id that does not follow B<batch>-<page>-<nn>', () => {
    expect(() => parse({ ...FINDING, id: 'fleischner-1' })).toThrow(/fleischner-1.*id/);
  });

  it('rejects a verdict resting only on unreadable sources, unless it says so', () => {
    const locked = { ...wrong, sources: [{ source: 'locked-2020', location: 'Table 2' }] };
    expect(() => parse(locked)).toThrow(/B1-fleischner-01.*not readable/);
    expect(() => parse({ ...locked, verdict: 'source-not-readable', fix: 'Ask the owner for a copy.' })).not.toThrow();
    const mixed = { ...locked, sources: [...locked.sources, { source: 'fleischner-2017', location: 'Table 1' }] };
    expect(() => parse(mixed)).not.toThrow();
  });

  it('reports every problem at once', () => {
    const two = [{ ...FINDING, page: 'nowhere' }, { ...FINDING, id: 'B1-fleischner-02', verdict: 'wrong' }];
    expect(() => parse(...two)).toThrow(/nowhere[\s\S]*B1-fleischner-02.*needs a fix/);
  });
});

describe('parseSources', () => {
  it('rejects a duplicate source id', () => {
    expect(() => parseSources([SOURCE, SOURCE])).toThrow(/fleischner-2017.*duplicate source id/);
  });
});

describe('needsRecheck', () => {
  it('re-checks thresholds even when correct, but not correct teaching', () => {
    expect(needsRecheck(parse(FINDING).findings[0]!)).toBe(true);
    expect(needsRecheck(parse({ ...FINDING, kind: 'teaching' }).findings[0]!)).toBe(false);
    expect(needsRecheck(parse({ ...wrong, kind: 'teaching' }).findings[0]!)).toBe(true);
  });
});

describe('reviewProblems', () => {
  it('lists a finding that needs a re-check and lacks one, and an unresolved disagreement', () => {
    const disagreed = { ...FINDING, id: 'B1-fleischner-02', recheck: { agrees: false, note: 'Table 1 says 6 mm.' } };
    const problems = reviewProblems(parse(wrong, disagreed));
    expect(problems).toEqual([
      'B1-fleischner-01: needs an independent re-check',
      'B1-fleischner-02: re-check disagreed; needs a resolution',
    ]);
  });

  it('is empty once every re-check is in and settled', () => {
    const done = { ...wrong, recheck: { agrees: false, note: 'n', resolution: 'Stands: Table 1, footnote.' } };
    expect(reviewProblems(parse(done))).toEqual([]);
  });
});

describe('parseGaps', () => {
  const GAP = {
    id: 'dvt-svt',
    topic: 'DVT and superficial vein thrombosis',
    raisedBy: 'owner',
    lead: 'to find',
    alternatives: [],
    car: 'unknown',
    today: 'Nothing on the site.',
    home: 'New vascular topic',
  };

  it('accepts a gap and rejects a duplicate id or an unknown raisedBy', () => {
    expect(parseGaps([GAP])).toHaveLength(1);
    expect(() => parseGaps([GAP, GAP])).toThrow(/dvt-svt.*duplicate gap id/);
    expect(() => parseGaps([{ ...GAP, raisedBy: 'resident' }])).toThrow(/raisedBy/);
  });
});
