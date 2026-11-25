import type { Calculator, Outcome, Values } from './types.ts';

// Extracellular volume from T1 mapping, exactly as the current ECV page computes
// and words it (cardiac-imaging-resources/calculators/ecv/). The bands are local
// practice; the owner reviews this text.

export type EcvBand = 'Normal' | 'Borderline' | 'Elevated' | 'Markedly elevated';

/** Applied to the unrounded value, as the current page does. */
export function ecvBand(value: number): EcvBand {
  if (value < 30) return 'Normal';
  if (value <= 32) return 'Borderline';
  if (value <= 40) return 'Elevated';
  return 'Markedly elevated';
}

const NOTES: Record<EcvBand, string> = {
  Normal: 'ECV <30% — normal extracellular matrix',
  Borderline: 'ECV 30–32% — borderline; correlate with clinical context',
  Elevated: 'ECV 32–40% — elevated; consistent with diffuse fibrosis or edema',
  'Markedly elevated': 'ECV >40% — markedly elevated; consider amyloid or severe fibrosis',
};

function compute(v: Values): Outcome {
  const { hct, pre_myo, pre_blood, post_myo, post_blood } = v;
  if (hct === undefined || pre_myo === undefined || pre_blood === undefined || post_myo === undefined || post_blood === undefined) {
    return { status: 'incomplete', message: 'Enter all T1 values and hematocrit to calculate ECV.' };
  }
  if (hct <= 0 || hct >= 100) return { status: 'invalid', message: 'Hematocrit must be between 1–99%.' };
  if (post_myo >= pre_myo || post_blood >= pre_blood) {
    return { status: 'invalid', message: 'Post-contrast T1 must be shorter than pre-contrast T1.' };
  }

  const dR1Myo = 1 / post_myo - 1 / pre_myo;
  const dR1Blood = 1 / post_blood - 1 / pre_blood;
  const lambda = dR1Myo / dR1Blood;
  const value = (1 - hct / 100) * lambda * 100;
  const label = ecvBand(value);
  const shown = `${value.toFixed(1)}%`;

  return {
    status: 'ok',
    headline: shown,
    label,
    note: NOTES[label],
    details: [
      `λ (partition coeff.): ${lambda.toFixed(3)}`,
      `ΔR1 myo: ${(dR1Myo * 1000).toFixed(4)} s⁻¹`,
      `ΔR1 blood: ${(dR1Blood * 1000).toFixed(4)} s⁻¹`,
      `1 – Hct: ${(1 - hct / 100).toFixed(3)}`,
    ],
    report: ['T1 Mapping / ECV:', `  Hematocrit: ${hct}%`, `  T1 Pre (myocardium) = ${pre_myo} ms`, `  ECV: ${shown} (${label})`].join('\n'),
  };
}

export const ecv: Calculator = {
  id: 'ecv',
  title: 'Extracellular volume (ECV)',
  implements: 'none',
  citation: {
    full: 'Formula: Messroghli DR et al. Clinical recommendations for cardiovascular magnetic resonance mapping of T1, T2, T2* and extracellular volume. J Cardiovasc Magn Reson 2017;19:75. Bands: local practice.',
    short: 'Formula: Messroghli et al., JCMR 2017 · Bands: local practice',
  },
  groups: [
    { fields: [{ key: 'hct', label: 'Hematocrit', unit: '%', min: 1, max: 70, step: 1, placeholder: '40' }] },
    {
      label: 'Pre-contrast T1',
      fields: [
        { key: 'pre_myo', label: 'Myocardium', unit: 'ms', min: 500, max: 2000, step: 1, placeholder: '1000' },
        { key: 'pre_blood', label: 'Blood pool', unit: 'ms', min: 500, max: 3000, step: 1, placeholder: '1700' },
      ],
    },
    {
      label: 'Post-contrast T1',
      fields: [
        { key: 'post_myo', label: 'Myocardium', unit: 'ms', min: 100, max: 1500, step: 1, placeholder: '550' },
        { key: 'post_blood', label: 'Blood pool', unit: 'ms', min: 50, max: 1000, step: 1, placeholder: '350' },
      ],
    },
  ],
  compute,
};
