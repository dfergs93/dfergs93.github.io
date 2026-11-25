import { expect, test } from 'vitest';
import { RESOURCES } from '../../shared/registry.ts';
import { createSearch } from '../../shared/search.ts';

const search = createSearch(RESOURCES);
const ids = (q: string) => search(q).map((r) => r.id);

test('kidney cyst finds Bosniak first', () => expect(ids('kidney cyst')[0]).toBe('bosniak'));

test('nodule finds the four nodule guidelines', () =>
  expect(ids('nodule').slice(0, 6)).toEqual(expect.arrayContaining(['fleischner', 'lung-rads', 'ti-rads', 'adrenal'])));

test.each([
  ['fleishner', 'fleischner'],
  ['lirads', 'li-rads'],
  ['li-rads', 'li-rads'],
  ['ecv', 'ecv'],
  ['tavr', 'tavr-ct'],
  ['tof', 'tof'],
  ['Bosniak', 'bosniak'],
  ['thyroid', 'ti-rads'],
])('%s finds %s first', (q, id) => expect(ids(q)[0]).toBe(id));

test('qp qs finds the 4D flow calculator and the congenital flow protocol first', () =>
  expect(ids('qp qs').slice(0, 2).sort()).toEqual(['cmr-congenital-4d-flow', 'flow-4d']));

test('a second word narrows the results (AND)', () => {
  expect(ids('protocol').length).toBeGreaterThan(ids('protocol stress').length);
  expect(ids('protocol stress')).toEqual(['cmr-stress-perfusion']);
});

test('searching by area name finds that area', () =>
  expect(ids('congenital heart')).toEqual(expect.arrayContaining(['tof', 'fontan', 'asd'])));

test.each(['', '   ', 'zzzz', 'c++(', 'x'.repeat(500), '/', 'T1/T2'])('odd query %j returns an array without throwing', (q) =>
  expect(Array.isArray(search(q))).toBe(true));

test('blank query returns nothing', () => expect(search('  ')).toEqual([]));

test('a query with no match returns nothing', () => expect(search('zzzz')).toEqual([]));

// Natural queries add words the registry doesn't hold ("calculator", "criteria", a
// version or category). AND first; when nothing matches every word, the best partial matches.
test.each([
  ['ecv calculator', 'ecv'],
  ['the ecv calculator', 'ecv'],
  ['lirads calculator', 'li-rads'],
  ['fleischner calculator', 'fleischner'],
  ['4d flow calculator', 'flow-4d'],
  ['bosniak classification', 'bosniak'],
  ['fleischner criteria', 'fleischner'],
  ['bernoulli equation', 'bernoulli'],
  ['pirads 2.1', 'pi-rads'],
  ['pi-rads v2.1', 'pi-rads'],
  ['birads 3', 'bi-rads'],
  ['lung rads 4a', 'lung-rads'],
  ['fleischner society guidelines 2017', 'fleischner'],
])('natural query %j finds %s first', (q, id) => expect(ids(q)[0]).toBe(id));

// "calculator" (or "calc", or part of it while typing) puts calculators higher but is not a
// word every result must hold: a page without a calculator is still found by its name.
test('calculator alone gives exactly the calculators', () =>
  expect(ids('calculator').sort()).toEqual(RESOURCES.filter((r) => r.calculator).map((r) => r.id).sort()));

test.each([
  ['birads calculator', 'bi-rads'],
  ['bosniak calc', 'bosniak'],
  ['lirads calcu', 'li-rads'],
  ['adrenal calculators', 'adrenal'],
])('a page without a calculator is still found first: %j finds %s', (q, id) => expect(ids(q)[0]).toBe(id));

test('calculator lifts a calculator above a page that matches the other words as well', () => {
  expect(ids('shunt')[0]).toBe('vsd');
  expect(ids('shunt calculator')[0]).toBe('flow-4d');
});

test('a word that only starts like calculator is searched as itself', () =>
  expect(ids('cal')).not.toEqual(ids('calculator')));

test('words that match nothing at all still give nothing', () => expect(search('zzzz qqqq')).toEqual([]));

test('a query of only common words gives nothing', () => expect(search('the of and')).toEqual([]));
