import { afterEach, expect, test, vi } from 'vitest';
import { readTheme, safeStorage, writeTheme } from '../../src/scripts/storage.ts';

class MemoryStorage implements Storage {
  #items = new Map<string, string>();
  get length() { return this.#items.size; }
  clear() { this.#items.clear(); }
  getItem(key: string) { return this.#items.get(key) ?? null; }
  key(index: number) { return [...this.#items.keys()][index] ?? null; }
  removeItem(key: string) { this.#items.delete(key); }
  setItem(key: string, value: string) { this.#items.set(key, String(value)); }
}

const throwing = (): Storage => {
  const s = new MemoryStorage();
  const deny = () => { throw new DOMException('denied', 'SecurityError'); };
  s.getItem = deny; s.setItem = deny; s.removeItem = deny;
  return s;
};

afterEach(() => vi.unstubAllGlobals());

test("readTheme(null) is 'dark'", () => expect(readTheme(null)).toBe('dark'));

test("a storage whose getItem throws gives 'dark'", () => expect(readTheme(throwing())).toBe('dark'));

test('writeTheme on a throwing storage does not throw', () => {
  expect(() => writeTheme(throwing(), 'light')).not.toThrow();
  expect(() => writeTheme(null, 'light')).not.toThrow();
});

test('the theme round-trips through storage, and dark leaves nothing stored', () => {
  const s = new MemoryStorage();
  writeTheme(s, 'light');
  expect(readTheme(s)).toBe('light');
  writeTheme(s, 'dark');
  expect(readTheme(s)).toBe('dark');
  expect(s.length).toBe(0);
});

test("an unexpected stored value reads as 'dark'", () => {
  const s = new MemoryStorage();
  s.setItem('radref:theme', 'sepia');
  expect(readTheme(s)).toBe('dark');
});

test('safeStorage() returns null when localStorage.setItem throws', () => {
  vi.stubGlobal('localStorage', throwing());
  expect(safeStorage()).toBeNull();
});

test('safeStorage() returns null when touching localStorage throws', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new DOMException('denied', 'SecurityError'); } });
  try {
    expect(safeStorage()).toBeNull();
  } finally {
    delete (globalThis as { localStorage?: Storage }).localStorage;
  }
});

test('safeStorage() returns a working storage and leaves no probe behind', () => {
  const s = new MemoryStorage();
  vi.stubGlobal('localStorage', s);
  expect(safeStorage()).toBe(s);
  expect(s.length).toBe(0);
});
