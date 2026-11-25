import { AREA_IDS, type AreaId } from './areas.ts';
import type { Resource } from './schema.ts';

const byTitle = (a: Resource, b: Resource) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });

/** An area's resources: those with an areaRank first (ascending), then the rest by title. */
export function areaList(resources: readonly Resource[], area: AreaId): Resource[] {
  const inArea = resources.filter((r) => r.area === area);
  const ranked = inArea.filter((r) => r.areaRank !== undefined).sort((a, b) => a.areaRank! - b.areaRank!);
  const rest = inArea.filter((r) => r.areaRank === undefined).sort(byTitle);
  return [...ranked, ...rest];
}

/** The Popular resources, in the order the owner listed them. */
export function popularList(resources: readonly Resource[], popular: readonly string[]): Resource[] {
  const index = new Map(resources.map((r) => [r.id, r]));
  return popular.flatMap((id) => index.get(id) ?? []);
}

export function areaCounts(resources: readonly Resource[]): Record<AreaId, number> {
  const counts = Object.fromEntries(AREA_IDS.map((id) => [id, 0])) as Record<AreaId, number>;
  for (const r of resources) counts[r.area] += 1;
  return counts;
}
