// Body areas in rail order. Every resource belongs to exactly one.
export const AREAS = [
  { id: 'chest', label: 'Chest' },
  { id: 'cardiac', label: 'Cardiac' },
  { id: 'congenital', label: 'Congenital heart' },
  { id: 'abdomen', label: 'Abdomen' },
  { id: 'gu-pelvis', label: 'GU & pelvis' },
  { id: 'head-neck-neuro', label: 'Head & neck · Neuro' },
  { id: 'msk', label: 'MSK' },
  { id: 'breast', label: 'Breast' },
  { id: 'oncology', label: 'Oncology' },
  { id: 'contrast', label: 'Contrast' },
] as const;

export type AreaId = (typeof AREAS)[number]['id'];

export const AREA_IDS = AREAS.map((a) => a.id) as [AreaId, ...AreaId[]];

const LABELS = new Map<AreaId, string>(AREAS.map((a) => [a.id, a.label]));

export function areaLabel(id: AreaId): string {
  return LABELS.get(id) ?? id;
}
