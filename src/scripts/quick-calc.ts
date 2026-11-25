// The quick view: a calculator's fields, live result, source and a link to the
// full page, built from the module's declared fields (the same definitions the
// stage 3 pages and the stage 4 assistant use). Nothing typed is kept or sent.

import { parseField, type Calculator, type Outcome, type Values } from '../../shared/calculators/types.ts';

let serial = 0;

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
  line.append(el('span', 'quick-headline', outcome.headline));
  if (outcome.label) line.append(el('span', 'quick-label', outcome.label));
  const parts: HTMLElement[] = [line];
  if (outcome.note) parts.push(el('span', 'quick-note', outcome.note));
  if (outcome.details.length) {
    const details = el('span', 'quick-details');
    details.append(...outcome.details.map((d) => el('span', '', d)));
    parts.push(details);
  }
  result.replaceChildren(...parts);
}

/** A quick view for `calc`; `fullUrl` is the resource's full page. */
export function createQuickCalc(calc: Calculator, fullUrl: string): HTMLElement {
  const root = el('div', 'quick-calc');
  root.id = `quick-${calc.id}-${++serial}`;
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', `${calc.title} calculator`);

  const inputs = new Map<string, HTMLInputElement>();
  for (const group of calc.groups) {
    const block = el('div', 'quick-group');
    if (group.label) block.append(el('p', 'quick-group-label', group.label));
    for (const field of group.fields) {
      const id = `${root.id}-${field.key}`;
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
      const row = el('div', 'quick-field');
      row.append(label, input, el('span', 'quick-unit', field.unit));
      block.append(row);
      inputs.set(field.key, input);
    }
    root.append(block);
  }

  const result = el('output', 'quick-result');
  result.setAttribute('aria-live', 'polite');
  const source = el('p', 'quick-source', calc.citation.short);
  source.title = calc.citation.full;
  const full = el('a', 'quick-full', 'Full calculator →');
  full.href = fullUrl;
  const foot = el('div', 'quick-foot');
  foot.append(source, full);
  root.append(result, foot);

  // A number input the browser can't read reports '', which parseField treats as empty.
  const values = (): Values => Object.fromEntries([...inputs].map(([key, input]) => [key, parseField(input.value)]));

  const update = (changed?: string) => {
    const outcome = calc.compute(values(), changed);
    if (outcome.status === 'ok' && outcome.fill) {
      for (const [key, value] of Object.entries(outcome.fill)) {
        const input = inputs.get(key);
        if (input) input.value = value;
      }
    }
    renderOutcome(result, outcome);
  };

  root.addEventListener('input', (e) => {
    if (e.target instanceof HTMLInputElement) update(e.target.name);
  });
  update();
  return root;
}
