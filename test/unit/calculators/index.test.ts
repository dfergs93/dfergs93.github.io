import { expect, test } from 'vitest';
import { CALCULATORS } from '../../../shared/calculators/index.ts';
import { byId } from '../../../shared/registry.ts';

test('the pilot has ECV and Simplified Bernoulli', () => expect([...CALCULATORS.keys()]).toEqual(['ecv', 'bernoulli']));

test.each([...CALCULATORS.entries()])('%s belongs to a calculator in the registry', (key, calc) => {
  expect(calc.id).toBe(key);
  expect(byId(key)?.calculator).toBe(true);
});

test.each([...CALCULATORS.entries()])('%s has unique, address-ready field keys and a citation', (_key, calc) => {
  const keys = calc.groups.flatMap((g) => g.fields.map((f) => f.key));
  expect(new Set(keys).size).toBe(keys.length);
  for (const key of keys) expect(key).toMatch(/^[a-z][a-z0-9_]*$/);
  expect(calc.citation.full.length).toBeGreaterThan(0);
  expect(calc.citation.short.length).toBeGreaterThan(0);
});
