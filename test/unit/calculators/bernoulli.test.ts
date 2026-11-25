import { expect, test } from 'vitest';
import { bernoulli } from '../../../shared/calculators/bernoulli.ts';

test.each([
  [4.0, '64.0', '4.00 m/s ↔ 64.0 mmHg'],
  [4.2, '70.6', '4.20 m/s ↔ 70.6 mmHg'],
  [1.5, '9.0', '1.50 m/s ↔ 9.0 mmHg'],
])('a peak velocity of %d m/s fills the gradient with %s mmHg', (vmax, gradient, headline) => {
  expect(bernoulli.compute({ vmax }, 'vmax')).toEqual({ status: 'ok', headline, details: ['ΔP = 4v²'], fill: { gradient } });
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
  expect(bernoulli.compute(values, changed)).toEqual({ status: 'incomplete', message: 'Enter a peak velocity or a pressure gradient.' });
});

test('cites its source', () => {
  expect(bernoulli.citation).toEqual({
    full: 'Baumgartner H et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the EACVI and ASE. J Am Soc Echocardiogr 2017;30:372–392.',
    short: 'Baumgartner et al., JASE 2017',
  });
  expect(bernoulli).toMatchObject({ id: 'bernoulli', title: 'Simplified Bernoulli', implements: 'none' });
});
