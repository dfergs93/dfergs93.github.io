import { expect, test } from 'vitest';
import { areaList, popularList } from '../../shared/order.ts';
import type { Resource } from '../../shared/schema.ts';

const r = (id: string, title: string, area: Resource['area'], areaRank?: number): Resource => ({
  id,
  title,
  area,
  version: 'none',
  calculator: false,
  summary: 's',
  aliases: ['a', 'b'],
  url: `https://dfergs93.github.io/${id}/`,
  ...(areaRank === undefined ? {} : { areaRank }),
});

const resources = [
  r('zeta', 'zeta', 'abdomen'),
  r('second', 'Second', 'abdomen', 2),
  r('alpha', 'Alpha', 'abdomen'),
  r('first', 'Yankee', 'abdomen', 1),
  r('beta', 'beta', 'abdomen'),
  r('chest-one', 'Aardvark', 'chest'),
];

test('areaList puts ranked entries first in rank order, then the rest alphabetically, ignoring case', () => {
  expect(areaList(resources, 'abdomen').map((x) => x.id)).toEqual(['first', 'second', 'alpha', 'beta', 'zeta']);
});

test('areaList leaves out other areas', () => {
  expect(areaList(resources, 'chest').map((x) => x.id)).toEqual(['chest-one']);
});

test('popularList keeps the given order', () => {
  expect(popularList(resources, ['zeta', 'chest-one', 'alpha']).map((x) => x.id)).toEqual(['zeta', 'chest-one', 'alpha']);
});
