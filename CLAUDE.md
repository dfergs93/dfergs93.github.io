# Radiology reference (dfergs93.github.io)

One public site for residents and radiologists: a front page that finds any
guideline, calculator or cardiac imaging reference in a click or two. Astro
builds static pages for GitHub Pages; one Cloudflare Worker (`radref`) counts
opens anonymously.

## Publishing

- This repo is the GitHub user site, so it is served at `https://dfergs93.github.io/`.
- `main` is live: every push to `main` deploys (`.github/workflows/deploy.yml`).
  Work on a branch; merge only what is ready to publish.
- The repo is public. Never commit secrets, patient information or the owner's email.
- Stage 1 was built on branch `rebuild`. Until launch, Pages still publishes the old
  portal from `main` with the legacy (branch) source. `deploy.yml` also runs on pushes to
  `rebuild` for the launch (the github-pages environment's branch rule holds the deploy
  until then; see the plan's Task 9). Rollback is switching back to the old portal:
  `gh api -X PUT repos/dfergs93/dfergs93.github.io/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'`.

## The ORCA pages are immutable

`public/orca-website-docs/privacy-policy.html` and `orca-usage-guide.html` are linked
from the ORCA Chrome Web Store listing and must ship byte-identical at
`/orca-website-docs/`. Their sha256 hashes are pinned in `scripts/check-dist.ts` and
`test/unit/orca-pages.test.ts`; CI fails on any change. Do not edit, reformat or move them.

Never create `/guidelines_manager/`, `/cardiac-imaging-resources/` or
`/radiology-protocols/` here: other repos' Pages sites serve those paths.

## The registry

`shared/data/resources.ts` is the single source of truth: every list, the search,
Popular, favorites and the Worker read from it. `shared/schema.ts` validates it when
it is imported, so a bad entry fails `npm run build` and every test.

To add a resource:
1. Add an entry with a new permanent `id` (favorites and counts are keyed by it; never
   rename one), exactly one `area` (`shared/areas.ts`), `version` as the linked page
   states it (`'none'` written out if it follows no versioned guideline), a summary of at
   most 110 characters, at least two `aliases` (everyday words, abbreviations,
   misspellings) and the page `url`.
2. `npm test`; add a search test in `test/unit/search.test.ts` if people will look for it
   by a word that isn't in its title.
3. Version labels and summaries are clinical statements: the owner signs them off.
4. Redeploy the Worker (`npm run worker:deploy`, owner's go-ahead) when ids are added:
   it accepts only the ids it was deployed with, so opens of a new resource are
   dropped until then. A push to `main` deploys the site, not the Worker.

Popular is `shared/data/popular.ts`, chosen and ordered by the owner. Within an area,
entries with `areaRank` come first, then the rest alphabetically. Areas with no entries
are not shown. Old guideline pages that are empty placeholders are not listed; see
`docs/audit-notes.md`.

## Running things

```sh
npm run dev                # site on localhost:4321
npm test                   # unit tests + Worker tests (workerd + D1)
npm run e2e                # Playwright, desktop + 360 px phone (builds first)
npm run typecheck          # astro check + the Worker's tsconfig
npm run check:dist         # after a build: ORCA hashes, required pages, foreign paths
npm run check:links        # every registry url answers 200 (live network)
npm run worker:dev         # Worker on localhost:8787 (after npm run db:migrate:local)
npm run worker:deploy      # deploy the Worker (owner's go-ahead)
npm run db:migrate:remote  # apply D1 migrations in Cloudflare (owner's go-ahead)
npm run counts             # opens per resource over 7, 30 and 90 days
```

Node 26 (`.nvmrc`). Dependencies are pinned to exact versions.

Astro 7 backgrounds `astro preview` when it detects an AI agent; Playwright starts it
with `--ignore-lock`, which keeps it in the foreground. Stop a stray background preview
with `npx astro preview stop`.

## Where things live

- Design: `docs/superpowers/specs/2026-11-24-radiology-reference-site-design.md` (stages 1–4).
- Stage 1 plan: `docs/superpowers/plans/2026-11-24-radiology-site-stage-1.md`.
- Stage 2 input: `docs/audit-notes.md` (version gaps, inconsistencies, placeholder pages).
- `shared/`: registry, areas, ordering, search (used by pages, browser and Worker).
- `src/`: Astro pages, components, styles and the browser scripts (`src/scripts/front.ts`).
- `worker/`: the `radref` Worker, its D1 migrations and `sql/counts.sql`.

## Look and behaviour rules

- Dark for every visitor by default, whatever the device setting; light only via the
  header switch (`radref:theme`). Never use `prefers-color-scheme`.
- Raw colours only in `src/styles/tokens.css`; every text colour ≥ 4.5:1 on `--ground`
  and `--panel` (tested). No gradients, box-shadows, `backdrop-filter`, emoji or card grids.
- One accent colour, for the calculator mark, the selected item and focus only.
- Hover effects wait 100 ms (`--hover-delay`); leaving is immediate. No coloured edge stripes.
- IBM Plex Sans 400/600 and Plex Mono 400, self-hosted; tabular numerals on counts and versions.
- No cookies or accounts. Local storage holds only `radref:favorites` and `radref:theme`
  (plus a probe key written and removed at once). Everything works when storage is blocked.
- Opening a resource sends its id with `navigator.sendBeacon`; it never delays navigation.
  The Worker stores resource id, day and count only.
