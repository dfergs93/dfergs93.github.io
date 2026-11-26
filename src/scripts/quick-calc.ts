// The quick view: a calculator's fields, live result, source and a link to the
// full page, built from the module's declared fields (the same definitions the
// stage 3 pages and the stage 4 assistant use). Nothing typed is kept or sent.

import { applies, parseField, type Calculator, type ChoiceField, type Choices, type Field, type NumberField, type Outcome, type Values } from '../../shared/calculators/types.ts';

let serial = 0;
const COPY_FEEDBACK_MS = 2000;

/** Copies `text`; true if the browser allowed it. Never throws (locked-down browsers refuse). */
async function copyText(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderOutcome(result: HTMLElement, outcome: Outcome): void {
  if (outcome.status !== 'ok') {
    result.replaceChildren(el('span', 'quick-message', outcome.message));
    return;
  }
  const line = el('span', 'quick-line');
  line.append(el('span', outcome.textHeadline ? 'quick-headline quick-headline-text' : 'quick-headline', outcome.headline));
  if (outcome.label) line.append(el('span', 'quick-label', outcome.label));
  const parts: HTMLElement[] = [line];
  for (const note of [outcome.note, ...(outcome.notes ?? [])]) if (note) parts.push(el('span', 'quick-note', note));
  if (outcome.details.length) {
    const details = el('span', 'quick-details');
    details.append(...outcome.details.map((d) => el('span', '', d)));
    parts.push(details);
  }
  result.replaceChildren(...parts);
}

/** A number field: label, input (named by its key) and unit. */
function numberField(rootId: string, field: NumberField): { row: HTMLElement; input: HTMLInputElement } {
  const id = `${rootId}-${field.key}`;
  const label = el('label', 'quick-field-label', field.label);
  label.htmlFor = id;
  const input = el('input', 'quick-input');
  Object.assign(input, {
    type: 'number',
    id,
    name: field.key,
    inputMode: 'decimal',
    autocomplete: 'off',
    min: String(field.min),
    max: String(field.max),
    step: String(field.step),
    placeholder: field.placeholder,
  });
  input.dataset.key = field.key;
  const row = el('div', 'quick-field');
  row.append(label, input, el('span', 'quick-unit', field.unit));
  return { row, input };
}

/** A choice field: a fieldset of radio buttons drawn as segments; nothing preselected. */
function choiceField(rootId: string, field: ChoiceField): { row: HTMLElement; radios: HTMLInputElement[] } {
  const row = el('fieldset', 'quick-choice');
  row.append(el('legend', 'quick-field-label', field.label));
  const options = el('div', 'quick-options');
  const radios = field.options.map((option) => {
    const radio = el('input', '');
    Object.assign(radio, { type: 'radio', name: `${rootId}-${field.key}`, value: option.value });
    radio.dataset.key = field.key;
    const label = el('label', 'quick-option');
    label.append(radio, el('span', '', option.label));
    options.append(label);
    return radio;
  });
  row.append(options);
  return { row, radios };
}

/** A quick view for `calc`; `fullUrl` is the resource's full page. */
export function createQuickCalc(calc: Calculator, fullUrl: string): HTMLElement {
  const root = el('div', 'quick-calc');
  root.id = `quick-${calc.id}-${++serial}`;
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', `${calc.title} calculator`);
  if (calc.intro) root.append(el('p', 'quick-intro', calc.intro));

  const inputs = new Map<string, HTMLInputElement>();
  const radios = new Map<string, HTMLInputElement[]>();
  // Each field's wrapper, hidden while the field doesn't apply.
  const wrappers: { field: Field; wrapper: HTMLElement }[] = [];
  for (const group of calc.groups) {
    const block = el('div', 'quick-group');
    if (group.label) block.append(el('p', 'quick-group-label', group.label));
    for (const field of group.fields) {
      const wrapper = el('div', 'quick-item');
      if (field.kind === 'choice') {
        const built = choiceField(root.id, field);
        wrapper.append(built.row);
        radios.set(field.key, built.radios);
      } else {
        const built = numberField(root.id, field);
        wrapper.append(built.row);
        inputs.set(field.key, built.input);
      }
      if (field.hint) {
        const hint = el('p', 'quick-hint', field.hint);
        hint.id = `${root.id}-${field.key}-hint`;
        wrapper.firstElementChild!.setAttribute('aria-describedby', hint.id);
        wrapper.append(hint);
      }
      block.append(wrapper);
      wrappers.push({ field, wrapper });
    }
    root.append(block);
  }

  const result = el('output', 'quick-result');
  result.setAttribute('aria-live', 'polite');
  const source = el('p', 'quick-source', calc.citation.short);
  source.title = calc.citation.full;
  const copy = el('button', 'quick-copy', 'Copy');
  copy.type = 'button';
  copy.hidden = true;
  const full = el('a', 'quick-full', calc.link?.text ?? 'Full calculator →');
  full.href = calc.link?.href ?? fullUrl;
  const actions = el('span', 'quick-actions');
  actions.append(copy, full);
  const foot = el('div', 'quick-foot');
  foot.append(source, actions);

  let report: string | undefined;
  let resetCopy: ReturnType<typeof setTimeout> | undefined;
  copy.addEventListener('click', async () => {
    if (!report) return;
    const ok = await copyText(report);
    copy.textContent = ok ? 'Copied' : "Couldn't copy";
    clearTimeout(resetCopy);
    resetCopy = setTimeout(() => (copy.textContent = 'Copy'), COPY_FEEDBACK_MS);
  });
  root.append(result, foot);

  const choices = (): Choices =>
    Object.fromEntries([...radios].map(([key, group]) => [key, group.find((r) => r.checked)?.value]));

  // Hide what doesn't apply and clear it, so a hidden choice is never reused silently.
  // Choices can depend on earlier choices, so repeat until nothing changes.
  const applyConditions = (): Choices => {
    for (;;) {
      const chosen = choices();
      let cleared = false;
      for (const { field, wrapper } of wrappers) {
        const shown = applies(field, chosen);
        wrapper.hidden = !shown;
        if (shown) continue;
        for (const radio of radios.get(field.key) ?? []) if (radio.checked) (radio.checked = false), (cleared = true);
        const input = inputs.get(field.key);
        if (input && input.value) (input.value = ''), (cleared = true);
      }
      if (!cleared) return chosen;
    }
  };

  // A number input the browser can't read reports '', which parseField treats as empty.
  const values = (): Values => Object.fromEntries([...inputs].map(([key, input]) => [key, parseField(input.value)]));

  const update = (changed?: string) => {
    const chosen = applyConditions();
    const outcome = calc.compute(values(), changed, chosen);
    if (outcome.status === 'ok' && outcome.fill) {
      for (const [key, value] of Object.entries(outcome.fill)) {
        const input = inputs.get(key);
        if (input) input.value = value;
      }
    }
    renderOutcome(result, outcome);
    report = outcome.status === 'ok' ? outcome.report : undefined;
    copy.hidden = !report;
  };

  root.addEventListener('input', (e) => {
    if (e.target instanceof HTMLInputElement) update(e.target.dataset.key);
  });
  update();
  return root;
}
