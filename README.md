# Radiology reference

A quick way for residents and radiologists to find radiology guidelines, calculators
and cardiac imaging references: search, a rail of body areas, Popular, and favorites
kept in the browser. Static pages built with Astro and served by GitHub Pages at
https://dfergs93.github.io/, plus a small Cloudflare Worker that counts opens
anonymously. A reference, not a substitute for clinical judgement.

```sh
npm ci
npm run dev        # http://localhost:4321/
npm test           # unit and Worker tests
npm run e2e        # browser tests
npm run typecheck
```

Errors and suggestions: https://github.com/dfergs93/dfergs93.github.io/issues
