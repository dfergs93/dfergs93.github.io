// Favorites live in this browser only, as a JSON list of resource ids under
// one key. Ids that are no longer in the registry are ignored and dropped on
// the next write. Nothing here ever throws.

const KEY = 'radref:favorites';

export function readFavorites(s: Storage | null, validIds: ReadonlySet<string>): string[] {
  try {
    const raw = s?.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const ids = parsed.filter((x): x is string => typeof x === 'string' && validIds.has(x));
    return [...new Set(ids)];
  } catch {
    return [];
  }
}

/** Stars or unstars `id` and returns the list storage now holds (unchanged if it refuses the write). */
export function toggleFavorite(s: Storage | null, id: string, validIds: ReadonlySet<string>): string[] {
  if (!s) return [];
  const current = readFavorites(s, validIds);
  const next = current.includes(id) ? current.filter((x) => x !== id) : validIds.has(id) ? [...current, id] : current;
  try {
    s.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage refused the write; the list stays as it was.
  }
  return readFavorites(s, validIds);
}
