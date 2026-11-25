import { expect, test } from 'vitest';
import { readFavorites, toggleFavorite } from '../../src/scripts/favorites.ts';

const KEY = 'radref:favorites';
const VALID = new Set(['fleischner', 'bosniak', 'ecv']);

function memory(initial?: string): Storage {
  const items = new Map<string, string>(initial === undefined ? [] : [[KEY, initial]]);
  return {
    get length() { return items.size; },
    clear: () => items.clear(),
    getItem: (k) => items.get(k) ?? null,
    key: (i) => [...items.keys()][i] ?? null,
    removeItem: (k) => { items.delete(k); },
    setItem: (k, v) => { items.set(k, String(v)); },
  };
}

test('unknown ids in storage are dropped', () =>
  expect(readFavorites(memory('["fleischner","gone-id","ecv"]'), VALID)).toEqual(['fleischner', 'ecv']));

test('malformed JSON gives []', () => expect(readFavorites(memory('["fleischner"'), VALID)).toEqual([]));

test('JSON that is not a list of strings gives only the valid strings', () => {
  expect(readFavorites(memory('{"fleischner":true}'), VALID)).toEqual([]);
  expect(readFavorites(memory('["ecv",3,null,"ecv","bosniak"]'), VALID)).toEqual(['ecv', 'bosniak']);
});

test('starred order is kept', () => {
  const s = memory();
  toggleFavorite(s, 'ecv', VALID);
  toggleFavorite(s, 'fleischner', VALID);
  expect(toggleFavorite(s, 'bosniak', VALID)).toEqual(['ecv', 'fleischner', 'bosniak']);
  expect(readFavorites(s, VALID)).toEqual(['ecv', 'fleischner', 'bosniak']);
  expect(JSON.parse(s.getItem(KEY)!)).toEqual(['ecv', 'fleischner', 'bosniak']);
});

test('toggling twice removes the id', () => {
  const s = memory();
  expect(toggleFavorite(s, 'ecv', VALID)).toEqual(['ecv']);
  expect(toggleFavorite(s, 'ecv', VALID)).toEqual([]);
  expect(readFavorites(s, VALID)).toEqual([]);
});

test('an unknown id is never added', () => expect(toggleFavorite(memory(), 'gone-id', VALID)).toEqual([]));

test('a toggle drops stale ids from storage', () => {
  const s = memory('["gone-id","fleischner"]');
  toggleFavorite(s, 'ecv', VALID);
  expect(JSON.parse(s.getItem(KEY)!)).toEqual(['fleischner', 'ecv']);
});

test('a null storage gives [], and toggling it returns [] without throwing', () => {
  expect(readFavorites(null, VALID)).toEqual([]);
  expect(toggleFavorite(null, 'ecv', VALID)).toEqual([]);
});

test('a storage that refuses writes leaves the list unchanged, without throwing', () => {
  const s = memory('["fleischner"]');
  s.setItem = () => { throw new DOMException('full', 'QuotaExceededError'); };
  expect(toggleFavorite(s, 'ecv', VALID)).toEqual(['fleischner']);
});

test('a storage that throws on read gives []', () => {
  const s = memory();
  s.getItem = () => { throw new DOMException('denied', 'SecurityError'); };
  expect(readFavorites(s, VALID)).toEqual([]);
  expect(toggleFavorite(s, 'ecv', VALID)).toEqual([]);
});
