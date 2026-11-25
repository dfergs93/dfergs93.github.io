import type { Calculator, Outcome, Values } from './types.ts';

// Simplified Bernoulli, ΔP = 4v², as the current page does it
// (cardiac-imaging-resources/calculators/bernoulli/): type either field and the
// other fills in. It converts only; the page's grading tables are reference.

const INCOMPLETE: Outcome = { status: 'incomplete', message: 'Enter a peak velocity or a pressure gradient.' };

const converted = (vmax: number, gradient: number, fill: Record<string, string>): Outcome => ({
  status: 'ok',
  headline: `${vmax.toFixed(2)} m/s ↔ ${gradient.toFixed(1)} mmHg`,
  details: ['ΔP = 4v²'],
  fill,
});

function compute(v: Values, changed?: string): Outcome {
  if (changed === 'vmax' && v.vmax !== undefined && v.vmax > 0) {
    const gradient = 4 * v.vmax * v.vmax;
    return converted(v.vmax, gradient, { gradient: gradient.toFixed(1) });
  }
  if (changed === 'gradient' && v.gradient !== undefined && v.gradient >= 0) {
    const vmax = Math.sqrt(v.gradient / 4);
    return converted(vmax, v.gradient, { vmax: vmax.toFixed(2) });
  }
  return INCOMPLETE;
}

export const bernoulli: Calculator = {
  id: 'bernoulli',
  title: 'Simplified Bernoulli',
  implements: 'none',
  citation: {
    full: 'Baumgartner H et al. Recommendations on the echocardiographic assessment of aortic valve stenosis: a focused update from the EACVI and ASE. J Am Soc Echocardiogr 2017;30:372–392.',
    short: 'Baumgartner et al., JASE 2017',
  },
  groups: [
    {
      fields: [
        { key: 'vmax', label: 'Peak velocity', unit: 'm/s', min: 0.1, max: 10, step: 0.01, placeholder: '4.2' },
        { key: 'gradient', label: 'Pressure gradient', unit: 'mmHg', min: 0, max: 400, step: 0.1, placeholder: '70.6' },
      ],
    },
  ],
  compute,
};
