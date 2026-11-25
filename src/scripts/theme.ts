import { safeStorage, writeTheme } from './storage.ts';

/** Wires the header switch. The inline head script has already applied the saved theme. */
export function initThemeSwitch(button: HTMLButtonElement): void {
  const root = document.documentElement;
  const sync = () => button.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
  sync();
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    if (next === 'light') root.dataset.theme = 'light';
    else delete root.dataset.theme;
    writeTheme(safeStorage(), next);
    sync();
  });
}
