// The front page's behaviour over server-rendered markup: list selection by
// URL hash, search with keyboard control, the `/` shortcut, favorites, quick
// calculators and the anonymous open count. Rows are never built here; they are cloned from
// #all-resources (written by ResourceRow.astro).
//
// The raw registry data is imported (not shared/registry.ts) so the validator
// and zod stay out of the browser bundle; `astro build` has validated it already.

import { RESOURCE_DATA } from '../../shared/data/resources.ts';
import { CALCULATORS } from '../../shared/calculators/index.ts';
import { createSearch } from '../../shared/search.ts';
import { readFavorites, toggleFavorite } from './favorites.ts';
import { createQuickCalc } from './quick-calc.ts';
import { safeStorage } from './storage.ts';

const HASH_PREFIX = '#list-';
const SHOWN_QUERY_MAX = 80;
const COUNT_URL = import.meta.env.PUBLIC_COUNT_URL;

/**
 * Reports one open in the background. Never delays or blocks the navigation:
 * no preventDefault, nothing awaited, every failure ignored.
 */
function countOpen(id: string): void {
  if (!COUNT_URL) return;
  try {
    if (typeof navigator.sendBeacon === 'function') navigator.sendBeacon(COUNT_URL, id);
    else void fetch(COUNT_URL, { method: 'POST', body: id, keepalive: true, mode: 'no-cors' }).catch(() => {});
  } catch {
    // Counting is best effort.
  }
}

export function initFront(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>('.search-input')!;
  const sections = new Map<string, HTMLElement>();
  for (const s of root.querySelectorAll<HTMLElement>('section.list[data-list]')) sections.set(s.dataset.list!, s);
  const railItems = [...root.querySelectorAll<HTMLAnchorElement>('.rail-item[data-list]')];
  const templates = new Map<string, HTMLLIElement>();
  for (const li of root.querySelectorAll<HTMLLIElement>('#all-resources > li.row')) templates.set(li.dataset.id!, li);
  const resultsList = sections.get('results')!.querySelector('ul')!;
  const noMatches = sections.get('results')!.querySelector<HTMLElement>('.no-matches')!;
  const favoritesList = sections.get('favorites')!.querySelector('ul')!;
  const search = createSearch(RESOURCE_DATA);
  const storage = safeStorage();
  const validIds: ReadonlySet<string> = new Set(templates.keys());

  let selected = 'popular';
  let searching = false;
  let currentHits: ReadonlySet<string> | null = null;
  let highlighted = -1;
  let favorites = readFavorites(storage, validIds);
  /** The one open quick view, if any. */
  let quick: { toggle: HTMLButtonElement; panel: HTMLElement } | null = null;

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

  function closeQuick(returnFocus = false) {
    if (!quick) return;
    const { toggle, panel } = quick;
    quick = null;
    panel.remove();
    toggle.setAttribute('aria-expanded', 'false');
    toggle.removeAttribute('aria-controls');
    if (returnFocus && toggle.isConnected) toggle.focus();
  }

  function openQuick(toggle: HTMLButtonElement) {
    const row = toggle.closest<HTMLElement>('li.row');
    const id = row?.dataset.id;
    const calc = id ? CALCULATORS.get(id) : undefined;
    const link = row?.querySelector<HTMLAnchorElement>('.row-link');
    if (!row || !id || !calc || !link) return;
    closeQuick();
    const panel = createQuickCalc(calc, link.href);
    row.querySelector('.summary')!.after(panel);
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-controls', panel.id);
    quick = { toggle, panel };
    panel.querySelector('input')?.focus();
    countOpen(id);
  }

  function select(key: string) {
    closeQuick();
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
    closeQuick();
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
    currentHits = new Set(hits.map((r) => r.id));
    setCounts(currentHits);
    input.setAttribute('aria-expanded', 'true');
    highlight(0);
  }

  function endSearch() {
    closeQuick();
    searching = false;
    resultsList.replaceChildren();
    noMatches.hidden = true;
    highlighted = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    currentHits = null;
    setCounts(null);
    select(selected);
  }

  function clearSearch() {
    input.value = '';
    endSearch();
  }

  /** Brings every star (templates included, so later clones match) and the Favorites list in step. */
  function renderFavorites() {
    const starred = new Set(favorites);
    for (const star of root.querySelectorAll<HTMLButtonElement>('.star[data-id]')) {
      const on = starred.has(star.dataset.id!);
      star.setAttribute('aria-pressed', String(on));
      star.setAttribute('aria-label', on ? 'Remove from favorites' : 'Add to favorites');
    }
    if (quick && favoritesList.contains(quick.panel)) closeQuick();
    favoritesList.replaceChildren(...favorites.flatMap((id) => cloneRow(id) ?? []));
    railItem('favorites')!.hidden = favorites.length === 0;
    setCounts(currentHits);
  }

  function onStar(star: HTMLButtonElement) {
    const inFavorites = favoritesList.contains(star);
    const index = [...favoritesList.querySelectorAll('.star')].indexOf(star);
    favorites = toggleFavorite(storage, star.dataset.id!, validIds);
    renderFavorites();
    if (favorites.length === 0 && selected === 'favorites') {
      history.replaceState(null, '', location.pathname + location.search);
      if (!searching) select('popular');
      else selected = 'popular';
    }
    // Unstarring in Favorites removes the row: keep keyboard focus nearby.
    if (inFavorites && !star.isConnected) {
      const stars = favoritesList.querySelectorAll<HTMLButtonElement>('.star');
      (stars[Math.min(index, stars.length - 1)] ?? railItem('popular'))?.focus();
    }
  }

  input.addEventListener('input', runSearch);

  root.addEventListener('click', (e) => {
    const star = e.target instanceof Element ? e.target.closest<HTMLButtonElement>('.star[data-id]') : null;
    if (star) onStar(star);
    const toggle = e.target instanceof Element ? e.target.closest<HTMLButtonElement>('.calc-toggle') : null;
    if (toggle) {
      if (quick?.toggle === toggle) closeQuick();
      else openQuick(toggle);
    }
  });

  // Esc inside a quick view closes it (the search box's own Esc is separate).
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !quick || !(e.target instanceof Node) || !quick.panel.contains(e.target)) return;
    e.preventDefault();
    closeQuick(true);
  });

  // An open is a click on a row's link, or a middle click (new tab).
  const onOpen = (e: MouseEvent) => {
    if (e.type === 'auxclick' && e.button !== 1) return;
    const link = e.target instanceof Element ? e.target.closest('.row-link') : null;
    const id = link?.closest<HTMLElement>('li.row')?.dataset.id;
    if (id) countOpen(id);
  };
  root.addEventListener('click', onOpen);
  root.addEventListener('auxclick', onOpen);

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

  // Stars only when favorites can be kept; then the Favorites list, so a
  // #list-favorites hash can be honoured.
  if (storage) for (const star of root.querySelectorAll<HTMLButtonElement>('.star[data-id]')) star.hidden = false;
  // Quick-view buttons replace the plain calc label (templates too, so clones match).
  for (const toggle of root.querySelectorAll<HTMLButtonElement>('.calc-toggle')) {
    toggle.hidden = false;
    const label = toggle.closest('li.row')?.querySelector<HTMLElement>('.calc-label');
    if (label) label.hidden = true;
  }
  renderFavorites();
  // From here on CSS (.current) decides which list shows.
  for (const s of sections.values()) s.hidden = false;
  select(keyFromHash());
  // The browser may restore text into the box (back/forward, autofill).
  if (input.value.trim()) runSearch();
  // Tells the fallback in index.astro that the page script is running.
  document.documentElement.classList.add('front-ready');
}
