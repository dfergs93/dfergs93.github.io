// The Worker's bindings (worker/wrangler.jsonc). Kept by hand: three bindings
// don't need `wrangler types`. `cloudflare:test` types its `env` from this too.
declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    COUNT_LIMITER?: RateLimit;
    /** Comma-separated origins allowed to send counts. */
    ALLOWED_ORIGINS: string;
  }
}

interface Env extends Cloudflare.Env {}
