import { POPULAR_IDS } from './data/popular.ts';
import { RESOURCE_DATA } from './data/resources.ts';
import { validateRegistry, type Resource } from './schema.ts';

// Validated at import time, so a bad entry fails `astro build` (and every test).
export const RESOURCES: readonly Resource[] = validateRegistry(RESOURCE_DATA, POPULAR_IDS);
export const POPULAR: readonly string[] = POPULAR_IDS;

const INDEX = new Map(RESOURCES.map((r) => [r.id, r]));

export function byId(id: string): Resource | undefined {
  return INDEX.get(id);
}
