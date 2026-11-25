import MiniSearch from 'minisearch';
import { areaLabel } from './areas.ts';
import type { Resource } from './schema.ts';

const MAX_QUERY = 200;

// Words that carry no meaning in a query ("the ecv calculator").
const STOP_WORDS = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);

/** Searchable text per field; `version` and `kind` let "pirads 2.1" and "ecv calculator" match. */
function fieldText(doc: Resource, field: string): string {
  switch (field) {
    case 'aliases':
      return doc.aliases.join(' ');
    case 'area':
      return areaLabel(doc.area);
    case 'version':
      return doc.version === 'none' ? '' : `${doc.version} ${doc.version.replace(/^v/i, '')}`;
    case 'kind':
      return doc.calculator ? 'calculator calc' : '';
    default:
      return String(doc[field as keyof Resource] ?? '');
  }
}

/**
 * Builds an in-browser search over the registry: title, aliases, area name,
 * summary, version and whether it is a calculator. Returns a function giving
 * matches best first; a blank query gives [].
 *
 * Every word must match (AND); when no resource matches them all, the best
 * partial matches are returned instead, so an extra word like "criteria" or
 * "4a" narrows nothing away.
 */
export function createSearch(resources: readonly Resource[]): (query: string) => Resource[] {
  const byId = new Map(resources.map((r) => [r.id, r]));
  const index = new MiniSearch<Resource>({
    fields: ['title', 'aliases', 'area', 'summary', 'version', 'kind'],
    extractField: fieldText,
    processTerm: (term) => {
      const t = term.toLowerCase();
      return STOP_WORDS.has(t) ? null : t;
    },
    searchOptions: {
      boost: { title: 3, aliases: 2, area: 1, summary: 1, version: 1, kind: 1 },
      prefix: true,
      fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
    },
  });
  index.addAll(resources as Resource[]);

  const toResources = (hits: { id: unknown }[]) => hits.flatMap((hit) => byId.get(hit.id as string) ?? []);

  return (query: string) => {
    const q = query.trim().slice(0, MAX_QUERY);
    if (!q) return [];
    const all = index.search(q, { combineWith: 'AND' });
    return toResources(all.length ? all : index.search(q, { combineWith: 'OR' }));
  };
}
