import { bernoulli } from './bernoulli.ts';
import { ecv } from './ecv.ts';
import { fleischner } from './fleischner.ts';
import type { Calculator } from './types.ts';

/** Calculators that have a module, by registry id. The rest join as stage 3 rebuilds them. */
export const CALCULATORS: ReadonlyMap<string, Calculator> = new Map([
  [ecv.id, ecv],
  [bernoulli.id, bernoulli],
  [fleischner.id, fleischner],
]);
