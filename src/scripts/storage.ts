// Local storage that may be missing, blocked or wiped (locked-down hospital
// browsers). Nothing here ever throws.

export type Theme = 'light' | 'dark';

const THEME_KEY = 'radref:theme';
// Written and removed at once, only to learn whether storage works.
const PROBE_KEY = 'radref:probe';

/** The browser's local storage if it can be written to, otherwise null. */
export function safeStorage(): Storage | null {
  try {
    const s = globalThis.localStorage;
    if (!s) return null;
    s.setItem(PROBE_KEY, '1');
    s.removeItem(PROBE_KEY);
    return s;
  } catch {
    return null;
  }
}

/** The saved theme; dark unless light was explicitly chosen. */
export function readTheme(s: Storage | null): Theme {
  try {
    return s?.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

/** Saves the theme. Dark is the default, so choosing it removes the key. */
export function writeTheme(s: Storage | null, t: Theme): void {
  try {
    if (t === 'light') s?.setItem(THEME_KEY, 'light');
    else s?.removeItem(THEME_KEY);
  } catch {
    // Storage blocked: the choice lasts for this visit only.
  }
}
