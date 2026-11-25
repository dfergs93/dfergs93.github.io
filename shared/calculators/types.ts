// The calculator contract. Each calculator is written once as a module and
// used by every place that runs it: the front page's quick view now, the
// calculator pages (stage 3) and the assistant (stage 4) later.

/** One numeric input. `key` is also its address parameter (e.g. `?hct=40`). */
export type Field = {
  key: string;
  label: string;
  unit: string;
  /** min, max and step are typing hints, as on the current pages, not validation. */
  min: number;
  max: number;
  step: number;
  placeholder: string;
};

export type FieldGroup = { label?: string; fields: readonly Field[] };

/** Parsed field values; an empty or unreadable field is `undefined`. */
export type Values = Readonly<Record<string, number | undefined>>;

export type Outcome =
  | { status: 'incomplete'; message: string }
  | { status: 'invalid'; message: string }
  | {
      status: 'ok';
      headline: string;
      label?: string;
      note?: string;
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
  groups: readonly FieldGroup[];
  /** Pure: no DOM. `changed` is the key of the field just typed in, when it matters. */
  compute(values: Values, changed?: string): Outcome;
};

/** A field's text as a number; blank or anything that isn't a finite number is `undefined`. */
export function parseField(raw: string): number | undefined {
  const text = raw.trim();
  if (!text) return undefined;
  const n = Number(text);
  return Number.isFinite(n) ? n : undefined;
}
