// The calculator contract. Each calculator is written once as a module and
// used by every place that runs it: the front page's quick view now, the
// calculator pages (stage 3) and the assistant (stage 4) later.
//
// Fields are numbers or choices (Fleischner added choices: nodule type, number,
// risk), and a field may apply only when certain choices hold. Results are still
// display strings; stage 4 will want machine-readable values, so extend it then.

/**
 * When a field applies: every named choice field holds one of the listed values.
 * Plain data, so a page or the assistant can read it without running code.
 */
export type When = Readonly<Record<string, readonly string[]>>;

/** One numeric input. `key` is also its address parameter (e.g. `?hct=40`). */
export type NumberField = {
  kind?: 'number';
  key: string;
  label: string;
  unit: string;
  /** min, max and step are typing hints, as on the current pages, not validation. */
  min: number;
  max: number;
  step: number;
  placeholder: string;
  /** How to measure or choose, for the full page and the assistant; the quick view leaves it out. */
  hint?: string;
  when?: When;
};

export type ChoiceOption = { value: string; label: string };

/** Pick one of a few options (shown as a radio group). `key` is its address parameter. */
export type ChoiceField = {
  kind: 'choice';
  key: string;
  label: string;
  options: readonly ChoiceOption[];
  /** As for a number field: for the full page and the assistant, not the quick view. */
  hint?: string;
  when?: When;
};

export type Field = NumberField | ChoiceField;

export type FieldGroup = { label?: string; fields: readonly Field[] };

/** Parsed number fields; an empty or unreadable field, or one that doesn't apply, is `undefined`. */
export type Values = Readonly<Record<string, number | undefined>>;

/** Chosen options by field key; nothing chosen, or a field that doesn't apply, is `undefined`. */
export type Choices = Readonly<Record<string, string | undefined>>;

export type Outcome =
  | { status: 'incomplete'; message: string }
  | { status: 'invalid'; message: string }
  | {
      status: 'ok';
      /** What the result is for, shown above it (e.g. the choices made), so a wrong tap shows. */
      subject?: string;
      headline: string;
      label?: string;
      /** One short line under the result, in the quick view too (e.g. what an ECV band means). */
      note?: string;
      /**
       * Comments that qualify the advice, for the full page and the assistant. The quick view
       * leaves them out: explanations belong on the page (owner, 2026-11-25).
       */
      notes?: readonly string[];
      /** The headline is a sentence (advice), not a number: it wraps at reading size. */
      textHeadline?: boolean;
      details: readonly string[];
      /** Text the Copy button puts on the clipboard, for the report. */
      report?: string;
      /** Values to write into other fields (two-way converters). */
      fill?: Readonly<Record<string, string>>;
    };

export type Calculator = {
  /** The registry id of the resource this calculator belongs to. */
  id: string;
  title: string;
  /** The guideline and version it implements, or 'none'. */
  implements: string;
  /** Where the formula and any thresholds come from; local practice says so. */
  citation: { full: string; short: string };
  /** Replaces the quick view's "Full calculator →" link, e.g. when the resource's page has none. */
  link?: { text: string; href: string };
  groups: readonly FieldGroup[];
  /**
   * Pure: no DOM. `changed` is the key of the field just changed, when it matters.
   * `choices` comes last so number-only calculators can ignore it.
   */
  compute(values: Values, changed?: string, choices?: Choices): Outcome;
};

/** Whether `field` applies, given the choices made so far. */
export function applies(field: Field, choices: Choices): boolean {
  return Object.entries(field.when ?? {}).every(([key, allowed]) => {
    const chosen = choices[key];
    return chosen !== undefined && allowed.includes(chosen);
  });
}

/** A field's text as a number; blank or anything that isn't a finite number is `undefined`. */
export function parseField(raw: string): number | undefined {
  const text = raw.trim();
  if (!text) return undefined;
  const n = Number(text);
  return Number.isFinite(n) ? n : undefined;
}
