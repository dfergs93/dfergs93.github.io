import MiniSearch from 'minisearch';
import { areaLabel } from './areas.ts';
import type { Resource } from './schema.ts';

const MAX_QUERY = 200;

// Words that carry no meaning in a query ("the ecv calculator").
const STOP_WORDS = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);

// How much "calculator" in a query lifts the resources that are calculators.
const CALCULATOR_BOOST = 2;

/** "calc", "calculator", "calculators", or the start of one while it is typed ("calcu"). */
function isCalculatorWord(word: string): boolean {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  return w.length >= 4 && 'calculators'.startsWith(w);
}

/** Searchable text per field; `version` lets "pirads 2.1" match. */
function fieldText(doc: Resource, field: string): string {
  switch (field) {
    case 'aliases':
      return doc.aliases.join(' ');
    case 'area':
      return areaLabel(doc.area);
    case 'version':
      return doc.version === 'none' ? '' : `${doc.version} ${doc.version.replace(/^v/i, '')}`;
    default:
      return String(doc[field as keyof Resource] ?? '');
  }
}

/**
 * Builds an in-browser search over the registry: title, aliases, area name,
 * summary and version. Returns a function giving matches best first; a blank
 * query gives [].
 *
 * Every word must match (AND); when no resource matches them all, the best
 * partial matches are returned instead, so an extra word like "criteria" or
 * "4a" narrows nothing away. "calculator" is not a word to match: it lifts the
 * calculators among the matches, and on its own it gives the calculators.
 */
export function createSearch(resources: readonly Resource[]): (query: string) => Resource[] {
  const byId = new Map(resources.map((r) => [r.id, r]));
  const index = new MiniSearch<Resource>({
    fields: ['title', 'aliases', 'area', 'summary', 'version'],
    extractField: fieldText,
    processTerm: (term) => {
      const t = term.toLowerCase();
      return STOP_WORDS.has(t) ? null : t;
    },
    searchOptions: {
      boost: { title: 3, aliases: 2, area: 1, summary: 1, version: 1 },
      prefix: true,
      fuzzy: (term) => (term.length >= 4 ? 0.2 : false),
    },
  });
  index.addAll(resources as Resource[]);

  const toResources = (hits: { id: unknown }[]) => hits.flatMap((hit) => byId.get(hit.id as string) ?? []);

  const liftCalculators = { boostDocument: (id: unknown) => (byId.get(id as string)?.calculator ? CALCULATOR_BOOST : 1) };

  return (query: string) => {
    const q = query.trim().slice(0, MAX_QUERY);
    if (!q) return [];
    const words = q.split(/\s+/);
    const wantsCalculator = words.some(isCalculatorWord);
    const rest = words.filter((w) => !isCalculatorWord(w));
    if (wantsCalculator && rest.every((w) => STOP_WORDS.has(w.toLowerCase()))) {
      return resources.filter((r) => r.calculator);
    }
    const text = rest.join(' ');
    const options = wantsCalculator ? liftCalculators : {};
    const all = index.search(text, { ...options, combineWith: 'AND' });
    return toResources(all.length ? all : index.search(text, { ...options, combineWith: 'OR' }));
  };
}
