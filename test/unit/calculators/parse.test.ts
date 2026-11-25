import { expect, test } from 'vitest';
import { parseField } from '../../../shared/calculators/types.ts';

test.each([
  ['40', 40],
  [' 4.2 ', 4.2],
  ['0', 0],
  ['-3', -3],
])('parseField(%j) is %d', (raw, want) => expect(parseField(raw)).toBe(want));

test.each(['', '  ', '40,5', 'abc', 'Infinity', 'NaN'])('parseField(%j) is empty (undefined)', (raw) =>
  expect(parseField(raw)).toBeUndefined());
