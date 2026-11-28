import { expect, test } from 'vitest';
import { bernoulli } from '../../../shared/calculators/bernoulli.ts';

test.each([
  [4.0, '64.0', '4.00 m/s ↔ 64.0 mmHg'],
  [4.2, '70.6', '4.20 m/s ↔ 70.6 mmHg'],
  [1.5, '9.0', '1.50 m/s ↔ 9.0 mmHg'],
])('a peak velocity of %d m/s fills the gradient with %s mmHg', (vmax, gradient, headline) => {
  expect(bernoulli.compute({ vmax }, 'vmax')).toEqual({ status: 'ok', headline, label: 'Peak gradient', note: MEAN, notes: [PROXIMAL], details: ['ΔP = 4v²'], fill: { gradient } });
});

// B3-bernoulli-03 (owner's rule: proposed fixes kept): 4v² is the peak gradient only.
const MEAN = 'The mean gradient is traced from the Doppler envelope; it can’t be worked out from one velocity.';
const PROXIMAL = 'With a proximal (LVOT) velocity over 1.5 m/s, or a peak velocity under 3.0 m/s, use ΔP = 4(Vmax² − Vproximal²) (ASE/EACVI 2017).';

test('the second field is the peak gradient', () => {
  expect(bernoulli.groups[0]!.fields.map((f) => f.label)).toEqual(['Peak velocity', 'Peak gradient']);
});

test('a converted gradient is labelled peak, with the mean-gradient line, either way round', () => {
  expect(bernoulli.compute({ gradient: 64 }, 'gradient')).toMatchObject({ label: 'Peak gradient', note: MEAN });
});

test.each([
  [64, '4.00'],
  [70.6, '4.20'],
  [0, '0.00'],
  [100, '5.00'],
])('a gradient of %d mmHg fills the velocity with %s m/s', (gradient, vmax) => {
  expect(bernoulli.compute({ gradient }, 'gradient')).toMatchObject({ status: 'ok', fill: { vmax } });
});

test('the field not just typed is ignored', () => {
  expect(bernoulli.compute({ vmax: 4, gradient: 999 }, 'vmax')).toMatchObject({ fill: { gradient: '64.0' } });
});

test.each([
  [{ vmax: 0 }, 'vmax'],
  [{ vmax: -1 }, 'vmax'],
  [{ vmax: undefined }, 'vmax'],
  [{ gradient: -1 }, 'gradient'],
  [{ gradient: undefined }, 'gradient'],
  [{ vmax: 4 }, undefined],
])('%o (changed %s) leaves the other field alone', (values, changed) => {
  expect(bernoulli.compute(values, changed)).toEqual({ status: 'incomplete', message: 'Enter a peak velocity or a peak gradient.' });
});

test('cites its source', () => {
  expect(bernoulli.citation).toEqual({
    full: 'Baumgartner H et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the EACVI and ASE. J Am Soc Echocardiogr 2017;30:372–392.',
    short: 'Baumgartner et al., JASE 2017',
  });
  expect(bernoulli).toMatchObject({ id: 'bernoulli', title: 'Simplified Bernoulli', implements: 'none' });
});
