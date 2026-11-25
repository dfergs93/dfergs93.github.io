import { z } from 'zod';
import { AREA_IDS } from './areas.ts';

const SITE_ORIGIN = 'https://dfergs93.github.io/';

const resourceSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9-]+$/, 'must be lowercase letters, digits and hyphens'),
  title: z.string().min(1),
  area: z.enum(AREA_IDS),
  // 'none' is allowed but must be written out, so a forgotten version cannot pass silently.
  version: z.string().min(1, "must be set (write 'none' if the resource follows no versioned guideline)"),
  calculator: z.boolean(),
  summary: z.string().min(1).max(110),
  aliases: z.array(z.string().min(1)).min(2),
  url: z.string().startsWith(SITE_ORIGIN, `must start with ${SITE_ORIGIN}`).endsWith('/', 'must end with /'),
  areaRank: z.number().int().positive().optional(),
});

export type Resource = z.infer<typeof resourceSchema>;

/**
 * Validates the raw registry and the Popular list together. Throws one Error
 * listing every problem, so a bad entry fails the build with the whole picture.
 */
export function validateRegistry(raw: unknown[], popular: string[]): Resource[] {
  const problems: string[] = [];
  const valid: Resource[] = [];
  const seenIds = new Set<string>();
  const seenRanks = new Set<string>();

  raw.forEach((entry, index) => {
    const id = typeof entry === 'object' && entry !== null && 'id' in entry ? String(entry.id) : `#${index}`;
    const label = `entry ${index} "${id}"`;
    const parsed = resourceSchema.safeParse(entry);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path.length ? issue.path.join('.') : (issue.code === 'unrecognized_keys' ? issue.keys.join(', ') : 'entry');
        problems.push(`${label}: ${field}: ${issue.message}`);
      }
    }
    if (seenIds.has(id)) problems.push(`${label}: duplicate id`);
    seenIds.add(id);
    if (!parsed.success) return;
    const r = parsed.data;
    if (r.areaRank !== undefined) {
      const key = `${r.area}:${r.areaRank}`;
      if (seenRanks.has(key)) problems.push(`${label}: areaRank ${r.areaRank} is already used in ${r.area}`);
      seenRanks.add(key);
    }
    valid.push(r);
  });

  const seenPopular = new Set<string>();
  for (const id of popular) {
    if (!seenIds.has(id)) problems.push(`popular: unknown id "${id}"`);
    if (seenPopular.has(id)) problems.push(`popular: duplicate id "${id}"`);
    seenPopular.add(id);
  }

  if (problems.length) {
    throw new Error(`Registry has ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  }
  return valid;
}
