import { expect, test } from 'vitest';
import { applies, type Field } from '../../../shared/calculators/types.ts';

const risk: Field = {
  kind: 'choice',
  key: 'risk',
  label: 'Risk',
  options: [
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' },
  ],
  when: { type: ['solid'] },
};

test('a field with no condition always applies', () => expect(applies({ ...risk, when: undefined }, {})).toBe(true));

test('a field applies when its choice holds a listed value', () => expect(applies(risk, { type: 'solid' })).toBe(true));

test('a field does not apply for another value or no choice yet', () => {
  expect(applies(risk, { type: 'ground-glass' })).toBe(false);
  expect(applies(risk, {})).toBe(false);
});

test('every condition must hold', () => {
  const solid: Field = { ...risk, key: 'solid', when: { type: ['part-solid'], count: ['single'] } };
  expect(applies(solid, { type: 'part-solid', count: 'single' })).toBe(true);
  expect(applies(solid, { type: 'part-solid', count: 'multiple' })).toBe(false);
});
