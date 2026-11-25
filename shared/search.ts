import MiniSearch from 'minisearch';
import { areaLabel } from './areas.ts';
import type { Resource } from './schema.ts';

const MAX_QUERY = 200;

/**
 * Builds an in-browser search over the registry: title, aliases, area name and
 * summary. Returns a function giving matches best first; a blank query gives [].
 */
export function createSearch(resources: readonly Resource[]): (query: string) => Resource[] {
  const byId = new Map(resources.map((r) => [r.id, r]));
  const index = new MiniSearch<Resource>({
    fields: ['title', 'aliases', 'area', 'summary'],
    extractField: (doc, field) => {
      if (field === 'aliases') return doc.aliases.join(' ');
      if (field === 'area') return areaLabel(doc.area);
      return String(doc[field as keyof Resource] ?? '');
    },
    searchOptions: {
      boost: { title: 3, aliases: 2, area: 1, summary: 1 },
      prefix: true,
      fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
      combineWith: 'AND',
    },
  });
  index.addAll(resources as Resource[]);

  return (query: string) => {
    const q = query.trim().slice(0, MAX_QUERY);
    if (!q) return [];
    return index.search(q).flatMap((hit) => byId.get(hit.id as string) ?? []);
  };
}
