import { applies, type Calculator, type ChoiceField, type Choices, type Field, type NumberField, type Outcome, type Values } from './types.ts';

// Fleischner Society 2017 guidelines for incidental pulmonary nodules on CT
// (MacMahon et al., Radiology 2017;284:228–243). The advice is the paper's table
// (journal p230) and the notes come from its comments and recommendations, as the
// stage 2 audit traced them (docs/audit/batch-1.md, B1-fleischner-03 to -18).
// Design: docs/superpowers/specs/2026-11-25-fleischner-calculator-design.md.
// The wording is clinical text the owner signs off.

const type: ChoiceField = {
  kind: 'choice',
  key: 'type',
  label: 'Nodule type',
  options: [
    { value: 'solid', label: 'Solid' },
    { value: 'ground-glass', label: 'Ground glass' },
    { value: 'part-solid', label: 'Part solid' },
  ],
};

const count: ChoiceField = {
  kind: 'choice',
  key: 'count',
  label: 'Number',
  options: [
    { value: 'single', label: 'Single' },
    { value: 'multiple', label: 'Multiple' },
  ],
  // The column is set by whether any nodule is 6 mm or more (Recommendations 2 and 5,
  // pp234 and 237), so the largest is entered; the most suspicious guides management.
  hint: 'For multiple nodules, enter the largest. The most suspicious one (which may not be the largest) guides management.',
};

// Risk applies to solid nodules only: the paper's subsolid advice is independent of
// the customary risk categories. No age cut-off (owner's ruling, B1-fleischner-15).
const risk: ChoiceField = {
  kind: 'choice',
  key: 'risk',
  label: 'Risk',
  options: [
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' },
  ],
  hint: "High: estimated cancer risk ≥ 5% (smoking, other exposures, emphysema or fibrosis, family history, age, and the nodule's size, margins and upper-lobe location).",
  when: { type: ['solid'] },
};

const size: NumberField = {
  key: 'size',
  label: 'Size',
  unit: 'mm',
  min: 1,
  max: 100,
  step: 1,
  placeholder: '6',
  hint: 'Average of long and short axes (whole nodule)',
};

// Below 6 mm the paper says a solid component can't be reliably defined, so
// `compute` asks for it only when the whole nodule counts as 6 mm or more.
const solid: NumberField = {
  key: 'solid',
  label: 'Solid component',
  unit: 'mm',
  min: 1,
  max: 100,
  step: 1,
  placeholder: '4',
  hint: 'From 6 mm',
  when: { type: ['part-solid'], count: ['single'] },
};

const FIELDS: readonly Field[] = [type, count, risk, size, solid];

/** The table's sizes are averages rounded to the nearest whole millimetre; halves round up. */
export function countedMm(raw: number): number {
  return Math.round(raw);
}

const NOTE = {
  highRiskSmall: 'May warrant CT at 12 months with suspicious morphology, upper lobe location, or both.',
  mostSuspicious: 'Use the most suspicious nodule as a guide to management.',
  perifissural:
    'A perifissural or juxtapleural nodule with lymph-node morphology needs no follow-up, even over 6 mm; consider CT at 6–12 months if its border is spiculated, the fissure is displaced, or there is a history of cancer.',
  groundGlassSmall: '< 6 mm and suspicious: consider CT at 2 and 4 years. If a solid component or growth develops, consider resection.',
  groundGlassFirstScan: 'Make the first scan at 6 months, especially over 10 mm or with bubbly lucencies.',
  groundGlassResection: 'If a solid component or growth develops, consider resection.',
  partSolidSuspicious:
    'PET/CT, biopsy or resection if the morphology is suspicious (lobulated margins, cystic components) or the solid component grows.',
  partSolidLargeComponent:
    'A CT at 3–6 months to confirm it persists may be considered first; large solid components are also seen in nodules that clear up.',
  partSolidSmall: "Part-solid nodules can't be defined as such until 6 mm.",
  subsolidMultipleSmall: 'Usually benign; in selected high-risk patients consider CT at 2 and 4 years.',
} as const;

type Advice = { headline: string; notes: string[] };

function solidAdvice(single: boolean, high: boolean, mm: number): Advice {
  const notes: string[] = single ? [] : [NOTE.mostSuspicious];
  if (mm < 6) {
    if (single && high) notes.push(NOTE.highRiskSmall);
    return { headline: high ? 'Optional CT at 12 months' : 'No routine follow-up', notes };
  }
  notes.push(NOTE.perifissural);
  if (single) {
    if (mm > 8) return { headline: 'Consider CT at 3 months, PET/CT, or tissue sampling', notes };
    return { headline: high ? 'CT at 6–12 months, then CT at 18–24 months' : 'CT at 6–12 months, then consider CT at 18–24 months', notes };
  }
  return { headline: high ? 'CT at 3–6 months, then at 18–24 months' : 'CT at 3–6 months, then consider CT at 18–24 months', notes };
}

function groundGlassAdvice(mm: number): Advice {
  if (mm < 6) return { headline: 'No routine follow-up', notes: [NOTE.groundGlassSmall] };
  return {
    headline: 'CT at 6–12 months to confirm persistence, then CT every 2 years until 5 years',
    notes: [NOTE.groundGlassFirstScan, NOTE.groundGlassResection],
  };
}

function partSolidAdvice(mm: number, componentMm: number | undefined): Advice {
  if (mm < 6 || componentMm === undefined) return { headline: 'No routine follow-up', notes: [NOTE.partSolidSmall] };
  if (componentMm < 6) {
    return {
      headline: 'CT at 3–6 months to confirm persistence. If unchanged and solid component remains < 6 mm, annual CT should be performed for 5 years.',
      notes: [],
    };
  }
  if (componentMm <= 8) {
    return {
      headline: 'Consider CT at 3–6 months to assess persistence; a persistent part-solid nodule with a solid component ≥ 6 mm is highly suspicious.',
      notes: [NOTE.partSolidSuspicious],
    };
  }
  return { headline: 'PET/CT, biopsy, or resection recommended.', notes: [NOTE.partSolidLargeComponent] };
}

function subsolidMultipleAdvice(mm: number): Advice {
  if (mm < 6) return { headline: 'CT at 3–6 months. If stable, consider CT at 2 and 4 years.', notes: [NOTE.subsolidMultipleSmall] };
  return { headline: 'CT at 3–6 months. Subsequent management based on the most suspicious nodule(s).', notes: [] };
}

/** A choice only counts if it is one of the field's options (an address may carry anything). */
function chosen(field: ChoiceField, choices: Choices): string | undefined {
  const value = choices[field.key];
  return field.options.some((o) => o.value === value) ? value : undefined;
}

/**
 * A fractional entry under 3 is far likelier centimetres than a fractional millimetre
 * (the paper advises against fractional millimetres, p232), and read as millimetres it
 * would fall in the smallest column. Whole numbers can't be told apart, so they pass.
 */
function looksLikeCentimetres(raw: number): boolean {
  return raw > 0 && raw < 3 && !Number.isInteger(raw);
}

const inMillimetres = (what: string, raw: number): Outcome => ({
  status: 'invalid',
  message: `Enter the ${what} in millimetres (e.g. ${Math.round(raw * 10)}, not ${raw}).`,
});

function counted(label: string, raw: number, mm: number): string {
  return mm === raw ? `${label} ${mm} mm` : `${label} ${mm} mm (${raw} rounded)`;
}

function compute(values: Values, _changed?: string, choices: Choices = {}): Outcome {
  const picked: Choices = { type: chosen(type, choices), count: chosen(count, choices), risk: chosen(risk, choices) };
  const sizeMm = values.size === undefined ? undefined : countedMm(values.size);
  const needsSolid = applies(solid, picked) && sizeMm !== undefined && sizeMm >= 6;

  const missing = FIELDS.filter((f) => {
    if (!applies(f, picked)) return false;
    if (f.kind === 'choice') return picked[f.key] === undefined;
    if (f === solid) return needsSolid && values.solid === undefined;
    return values[f.key] === undefined;
  });
  if (missing.length) {
    return { status: 'incomplete', message: `Still needed: ${missing.map((f) => f.label.toLowerCase()).join(', ')}.` };
  }

  const rawSize = values.size!;
  if (rawSize <= 0) return { status: 'invalid', message: 'Size must be greater than 0 mm.' };
  if (looksLikeCentimetres(rawSize)) return inMillimetres('size', rawSize);
  const rawSolid = applies(solid, picked) ? values.solid : undefined;
  if (rawSolid !== undefined && rawSolid <= 0) return { status: 'invalid', message: 'Solid component must be greater than 0 mm.' };
  if (rawSolid !== undefined && looksLikeCentimetres(rawSolid)) return inMillimetres('solid component', rawSolid);
  if (rawSolid !== undefined && rawSolid >= rawSize) {
    return { status: 'invalid', message: 'The solid component must be smaller than the whole nodule.' };
  }

  const mm = countedMm(rawSize);
  const componentMm = needsSolid && rawSolid !== undefined ? countedMm(rawSolid) : undefined;
  const single = picked.count === 'single';
  const high = picked.risk === 'high';

  let advice: Advice;
  if (picked.type === 'solid') advice = solidAdvice(single, high, mm);
  else if (!single) advice = subsolidMultipleAdvice(mm);
  else if (picked.type === 'ground-glass') advice = groundGlassAdvice(mm);
  else advice = partSolidAdvice(mm, componentMm);

  const details = [counted('Counted as', rawSize, mm)];
  if (componentMm !== undefined) details.push(counted('Solid component counted as', rawSolid!, componentMm));

  const kind = picked.type === 'solid' ? 'solid' : picked.type === 'ground-glass' ? 'ground-glass' : 'part-solid';
  const described = single
    ? `single ${kind} nodule, ${mm} mm average diameter`
    : `multiple ${kind} nodules, largest ${mm} mm average diameter`;
  const withComponent = componentMm === undefined ? '' : ` with a ${componentMm} mm solid component`;
  const withRisk = picked.type === 'solid' ? `, ${picked.risk} risk` : '';
  const sentence = advice.headline.endsWith('.') ? advice.headline : `${advice.headline}.`;

  return {
    status: 'ok',
    headline: advice.headline,
    textHeadline: true,
    notes: advice.notes,
    details,
    report: `Fleischner 2017 (${described}${withComponent}${withRisk}): ${sentence}`,
  };
}

export const fleischner: Calculator = {
  id: 'fleischner',
  title: 'Fleischner Society 2017',
  implements: 'Fleischner Society 2017',
  citation: {
    full: 'MacMahon H et al. Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017. Radiology 2017;284:228–243.',
    short: 'MacMahon et al., Radiology 2017',
  },
  intro: 'Not for patients under 35, with known cancer or immunosuppression, or for lung cancer screening CTs.',
  link: { text: 'Guideline →', href: 'https://doi.org/10.1148/radiol.2017161659' },
  groups: [{ fields: FIELDS }],
  compute,
};
