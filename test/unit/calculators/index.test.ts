import { expect, test } from 'vitest';
import { CALCULATORS } from '../../../shared/calculators/index.ts';
import { byId } from '../../../shared/registry.ts';

test('the pilot has ECV and Simplified Bernoulli', () => expect([...CALCULATORS.keys()]).toEqual(['ecv', 'bernoulli']));

test.each([...CALCULATORS.entries()])('%s belongs to a calculator in the registry', (key, calc) => {
  expect(calc.id).toBe(key);
  expect(byId(key)?.calculator).toBe(true);
});

test.each([...CALCULATORS.entries()])('%s declares its choices and conditions consistently', (_key, calc) => {
  const fields = calc.groups.flatMap((g) => g.fields);
  fields.forEach((field, i) => {
    if (field.kind === 'choice') {
      const values = field.options.map((o) => o.value);
      expect(values.length).toBeGreaterThanOrEqual(2);
      expect(new Set(values).size).toBe(values.length);
      for (const value of values) expect(value).toMatch(/^[a-z][a-z0-9-]*$/);
    }
    for (const [key, allowed] of Object.entries(field.when ?? {})) {
      const earlier = fields.slice(0, i).find((f) => f.key === key);
      expect(earlier?.kind, `${field.key} depends on ${key}, which must be an earlier choice field`).toBe('choice');
      if (earlier?.kind !== 'choice') continue;
      for (const value of allowed) expect(earlier.options.map((o) => o.value)).toContain(value);
    }
  });
});

test.each([...CALCULATORS.entries()])('%s has unique, address-ready field keys and a citation', (_key, calc) => {
  const keys = calc.groups.flatMap((g) => g.fields.map((f) => f.key));
  expect(new Set(keys).size).toBe(keys.length);
  for (const key of keys) expect(key).toMatch(/^[a-z][a-z0-9_]*$/);
  expect(calc.citation.full.length).toBeGreaterThan(0);
  expect(calc.citation.short.length).toBeGreaterThan(0);
});
