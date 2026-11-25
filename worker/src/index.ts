import { RESOURCES } from '../../shared/registry.ts';
import { handleCount } from './count.ts';

const VALID_IDS: ReadonlySet<string> = new Set(RESOURCES.map((r) => r.id));

export default {
  fetch(request, env) {
    return handleCount(request, {
      db: env.DB,
      limiter: env.COUNT_LIMITER,
      allowedOrigins: env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean),
      validIds: VALID_IDS,
      today: () => new Date().toISOString().slice(0, 10),
    });
  },
} satisfies ExportedHandler<Env>;
