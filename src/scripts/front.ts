// The front page's behaviour over server-rendered markup: list selection by
// URL hash, search with keyboard control, and the `/` shortcut. Rows are never
// built here; they are cloned from #all-resources (written by ResourceRow.astro).
//
// The raw registry data is imported (not shared/registry.ts) so the validator
// and zod stay out of the browser bundle; `astro build` has validated it already.

import { RESOURCE_DATA } from '../../shared/data/resources.ts';
import { createSearch } from '../../shared/search.ts';

const HASH_PREFIX = '#list-';
const SHOWN_QUERY_MAX = 80;

export function initFront(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>('.search-input')!;
  const sections = new Map<string, HTMLElement>();
  for (const s of root.querySelectorAll<HTMLElement>('section.list[data-list]')) sections.set(s.dataset.list!, s);
  const railItems = [...root.querySelectorAll<HTMLAnchorElement>('.rail-item[data-list]')];
  const templates = new Map<string, HTMLLIElement>();
  for (const li of root.querySelectorAll<HTMLLIElement>('#all-resources > li.row')) templates.set(li.dataset.id!, li);
  const resultsList = sections.get('results')!.querySelector('ul')!;
  const noMatches = sections.get('results')!.querySelector<HTMLElement>('.no-matches')!;
  const search = createSearch(RESOURCE_DATA);

  let selected = 'popular';
  let searching = false;
  let highlighted = -1;

  const railItem = (key: string) => railItems.find((a) => a.dataset.list === key);
  const rowIdsIn = (key: string) =>
    [...sections.get(key)!.querySelectorAll<HTMLElement>('li.row')].map((li) => li.dataset.id!);

  function selectable(key: string | undefined): key is string {
    if (!key || key === 'results' || !sections.has(key)) return false;
    const item = railItem(key);
    return !!item && !item.hidden;
  }

  function keyFromHash(): string {
    const key = location.hash.startsWith(HASH_PREFIX) ? location.hash.slice(HASH_PREFIX.length) : undefined;
    return selectable(key) ? key : 'popular';
  }

  function showSection(key: string) {
    for (const [k, s] of sections) s.classList.toggle('current', k === key);
  }

  function markRail(key: string | null) {
    for (const a of railItems) {
      if (a.dataset.list === key) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  }

  /** Rail counts: rows per list, or matches per list while searching. */
  function setCounts(hits: ReadonlySet<string> | null) {
    for (const a of railItems) {
      const ids = rowIdsIn(a.dataset.list!);
      const n = hits ? ids.filter((id) => hits.has(id)).length : ids.length;
      a.querySelector('.rail-count')!.textContent = String(n);
      if (hits && n === 0) a.setAttribute('data-empty', '');
      else a.removeAttribute('data-empty');
    }
  }

  function select(key: string) {
    selected = key;
    showSection(key);
    markRail(key);
  }

  function cloneRow(id: string): HTMLLIElement | null {
    const template = templates.get(id);
    return template ? (template.cloneNode(true) as HTMLLIElement) : null;
  }

  function highlight(index: number, reveal = false) {
    const rows = [...resultsList.children] as HTMLElement[];
    highlighted = rows.length ? Math.max(0, Math.min(index, rows.length - 1)) : -1;
    rows.forEach((row, i) => row.setAttribute('aria-selected', String(i === highlighted)));
    const row = rows[highlighted];
    if (row) {
      input.setAttribute('aria-activedescendant', row.id);
      if (reveal) row.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  function runSearch() {
    const query = input.value.trim();
    if (!query) {
      endSearch();
      return;
    }
    searching = true;
    const hits = search(query);
    const rows = hits.flatMap((r) => {
      const row = cloneRow(r.id);
      if (!row) return [];
      row.id = `match-${r.id}`;
      row.setAttribute('role', 'option');
      return [row];
    });
    resultsList.replaceChildren(...rows);
    const shown = query.length > SHOWN_QUERY_MAX ? `${query.slice(0, SHOWN_QUERY_MAX)}…` : query;
    noMatches.textContent = `No matches for "${shown}"`;
    noMatches.hidden = rows.length > 0;
    showSection('results');
    markRail(null);
    setCounts(new Set(hits.map((r) => r.id)));
    input.setAttribute('aria-expanded', 'true');
    highlight(0);
  }

  function endSearch() {
    searching = false;
    resultsList.replaceChildren();
    noMatches.hidden = true;
    highlighted = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    setCounts(null);
    select(selected);
  }

  function clearSearch() {
    input.value = '';
    endSearch();
  }

  input.addEventListener('input', runSearch);

  input.addEventListener('keydown', (e) => {
    if (e.isComposing) return;
    if (e.key === 'ArrowDown' && searching) {
      e.preventDefault();
      highlight(highlighted + 1, true);
    } else if (e.key === 'ArrowUp' && searching) {
      e.preventDefault();
      highlight(highlighted - 1, true);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // A real click, so anything listening for opens (the count beacon) sees it.
      resultsList.children[highlighted]?.querySelector<HTMLAnchorElement>('.row-link')?.click();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      clearSearch();
    }
  });

  // `/` focuses the search box from anywhere, except while typing in a field.
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    const target = e.target instanceof HTMLElement ? e.target : null;
    if (target && (target.isContentEditable || target.closest('input, textarea, select'))) return;
    e.preventDefault();
    input.focus();
    input.select();
  });

  for (const a of railItems) {
    a.addEventListener('click', (e) => {
      // Leave new-tab and new-window clicks to the browser.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const key = a.dataset.list!;
      if (searching) clearSearch();
      if (location.hash !== `${HASH_PREFIX}${key}`) history.pushState(null, '', `${HASH_PREFIX}${key}`);
      select(key);
    });
  }

  const followHash = () => {
    if (searching) clearSearch();
    select(keyFromHash());
  };
  window.addEventListener('popstate', followHash);
  window.addEventListener('hashchange', followHash);

  // From here on CSS (.current) decides which list shows.
  for (const s of sections.values()) s.hidden = false;
  select(keyFromHash());
  // A #list-… hash names a list, not a place on the page: undo the browser's jump
  // to that section (it can repeat until load), so the search box stays in view.
  if (location.hash.startsWith(HASH_PREFIX)) {
    const toTop = () => window.scrollTo(0, 0);
    toTop();
    if (document.readyState !== 'complete') window.addEventListener('load', toTop, { once: true });
  }
  // The browser may restore text into the box (back/forward, autofill).
  if (input.value.trim()) runSearch();
}
