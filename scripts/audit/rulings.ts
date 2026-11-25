// The owner's rulings, read back from the review page, applied to a batch.

import type { Batch } from './schema.ts';

export type SavedRuling = { id: string; decision: 'keep' | 'change' | 'drop'; note: string; date: string; savedAt: string };

/**
 * Applies the owner's rulings; when a finding was ruled more than once (the page saves
 * on every change), the latest `savedAt` wins. Throws on a ruling for an unknown finding.
 */
export function applyRulings(b: Batch, rulings: SavedRuling[]): Batch {
  const ids = new Set(b.findings.map((f) => f.id));
  const unknown = [...new Set(rulings.map((r) => r.id).filter((id) => !ids.has(id)))];
  if (unknown.length) throw new Error(`rulings name unknown finding id(s): ${unknown.join(', ')}`);

  const latest = new Map<string, SavedRuling>();
  for (const r of rulings) {
    const seen = latest.get(r.id);
    if (!seen || r.savedAt > seen.savedAt) latest.set(r.id, r);
  }
  return {
    ...b,
    findings: b.findings.map((f) => {
      const r = latest.get(f.id);
      return r ? { ...f, ruling: { decision: r.decision, note: r.note, date: r.date } } : f;
    }),
  };
}
