import { describe, expect, test } from 'vitest';
import { ecv, ecvBand } from '../../../shared/calculators/ecv.ts';

const WORKED = { hct: 40, pre_myo: 1000, pre_blood: 1700, post_myo: 450, post_blood: 300 };

describe('ECV', () => {
  test('the worked example gives 26.7%, Normal, the working and the report', () => {
    const out = ecv.compute(WORKED);
    expect(out).toMatchObject({ status: 'ok', headline: '26.7%', label: 'Normal', note: 'ECV <30% — normal extracellular matrix' });
    if (out.status !== 'ok') throw new Error('expected ok');
    expect(out.details).toEqual(['λ (partition coeff.): 0.445', 'ΔR1 myo: 1.2222 s⁻¹', 'ΔR1 blood: 2.7451 s⁻¹', '1 – Hct: 0.600']);
    expect(out.report).toBe('T1 Mapping / ECV:\n  Hematocrit: 40%\n  T1 Pre (myocardium) = 1000 ms\n  ECV: 26.7% (Normal)');
  });

  // Expected values computed from the current ECV page's formula.
  test.each([
    [42, 1050, 1650, 480, 330, '27.1%', 'Normal'],
    [38, 1100, 1700, 420, 290, '31.9%', 'Borderline'],
    [45, 1000, 1600, 400, 300, '30.5%', 'Borderline'],
    [35, 1150, 1750, 380, 280, '38.2%', 'Elevated'],
    [30, 1100, 1700, 350, 300, '49.7%', 'Markedly elevated'],
    // Unrounded 29.97: shows 30.0% but bands as Normal, as the current page does.
    [44, 1000, 1700, 405, 300, '30.0%', 'Normal'],
  ])('parity: Hct %d, pre %d/%d, post %d/%d → %s %s', (hct, pre_myo, pre_blood, post_myo, post_blood, headline, label) => {
    expect(ecv.compute({ hct, pre_myo, pre_blood, post_myo, post_blood })).toMatchObject({ status: 'ok', headline, label });
  });

  test.each([
    [29.99, 'Normal'],
    [30, 'Borderline'],
    [32, 'Borderline'],
    [32.01, 'Elevated'],
    [40, 'Elevated'],
    [40.01, 'Markedly elevated'],
  ])('band of %d is %s', (value, band) => expect(ecvBand(value)).toBe(band));

  test.each(['hct', 'pre_myo', 'pre_blood', 'post_myo', 'post_blood'])('an empty %s gives the prompt', (key) => {
    expect(ecv.compute({ ...WORKED, [key]: undefined })).toEqual({
      status: 'incomplete',
      message: 'Enter all T1 values and hematocrit to calculate ECV.',
    });
  });

  test.each([0, 100, -5])('hematocrit %d is refused', (hct) => {
    expect(ecv.compute({ ...WORKED, hct })).toEqual({ status: 'invalid', message: 'Hematocrit must be between 1–99%.' });
  });

  test.each([
    { post_myo: 1000 },
    { post_blood: 1800 },
  ])('post-contrast T1 not shorter than pre-contrast is refused (%o)', (change) => {
    expect(ecv.compute({ ...WORKED, ...change })).toEqual({
      status: 'invalid',
      message: 'Post-contrast T1 must be shorter than pre-contrast T1.',
    });
  });

  test('fields are grouped as on the current page, with address-ready keys', () => {
    expect(ecv.groups.flatMap((g) => g.fields.map((f) => f.key))).toEqual(['hct', 'pre_myo', 'pre_blood', 'post_myo', 'post_blood']);
    expect(ecv.groups.map((g) => g.label)).toEqual([undefined, 'Pre-contrast T1', 'Post-contrast T1']);
  });

  test('cites its sources, saying the bands are local practice', () => {
    expect(ecv.citation).toEqual({
      full: 'Formula: Messroghli DR et al. Clinical recommendations for cardiovascular magnetic resonance mapping of T1, T2, T2* and extracellular volume. J Cardiovasc Magn Reson 2017;19:75. Bands: local practice.',
      short: 'Formula: Messroghli et al., JCMR 2017 · Bands: local practice',
    });
    expect(ecv).toMatchObject({ id: 'ecv', title: 'Extracellular volume (ECV)', implements: 'none' });
  });
});
