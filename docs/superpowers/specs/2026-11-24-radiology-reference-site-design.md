# Radiology reference site: design

Date: 2026-11-24. Status: draft for the owner's review.
Repo: `dfergs93/dfergs93.github.io`, branch `rebuild` (GitHub Pages publishes `main` as it stands, so nothing for the new site lands on `main` until launch).

## Intent

The owner (a radiologist) runs three public sites today, each a separate MkDocs site on GitHub Pages, plus a one-page "Radiology Apps Portal" at `dfergs93.github.io` that links to them:

- Clinical guidelines: `dfergs93.github.io/guidelines_manager/` (24 pages, 16 body areas, 7 calculators, untouched since April 2026).
- Cardiac imaging resources: `dfergs93.github.io/cardiac-imaging-resources/` (22 pages, 3 calculators, active).
- Old protocols: `dfergs93.github.io/radiology-protocols/` (the previous center's CT protocols; replaced for daily work by the owner's private Protocol Library).

He wants one site he can send people to. The people are residents, radiologists and himself, arriving with a specific thing in mind ("Bosniak", "the ECV calculator"), usually at a reading-room workstation. The current portal reads as template-made ("vibe-coded"), and the guidelines and cardiac sites need new architecture, new code and a deep check of their content for errors and gaps. He has long wanted an assistant that answers questions from the site's own content and works cases through the site's calculators.

Success: someone given the one address finds the resource they came for in a click or two, trusts what it says (version stated, source cited), and, once the assistant exists, can paste a case and get the calculator's answer with a link to the filled-in calculator.

## Goals, non-goals, anti-goals

Goals
- One site at `dfergs93.github.io` holding a front page plus guidelines and cardiac as sections, with one search and one look.
- A front page built to find a specific resource fast.
- Calculators written once and shared by their pages and the assistant.
- An assistant grounded only in the site's content (stage 4).

Non-goals
- Protocols. The old protocols site stays online at its address but is not linked anywhere on the new site.
- Accounts, logins, or any per-user data on a server.
- Editing content through the website. Content lives as files in the repo and is edited with Claude Code.
- A portfolio. The site is not about the owner beyond a small credit line.

Anti-goals (failure even if it technically works)
- Looking AI-generated: card grids, gradients, frosted glass, emoji, "Quick Access / Open Application" buttons.
- A calculator page and the assistant giving different answers for the same inputs.
- Clinical content with no stated guideline version or source.
- Breaking the two ORCA pages the Chrome Web Store listing links to.

## Constraints

- Address: `dfergs93.github.io` must stay the address people are given. It is a GitHub user site, so it is served from this repo.
- Paths `/guidelines_manager/`, `/cardiac-imaging-resources/` and `/radiology-protocols/` belong to the other repos' project sites. The new site must not use them.
- `https://dfergs93.github.io/orca-website-docs/privacy-policy.html` and `.../orca-usage-guide.html` must keep working, byte-identical, at those exact paths.
- Hospital workstations: locked-down browsers, sometimes shared between residents, sometimes clearing storage at logout. Pages must work without exotic browser features and degrade gracefully when local storage is unavailable.
- Reading rooms are dark.
- Cost: hosting must stay free (GitHub Pages, Cloudflare Workers free tier). The assistant (stage 4) is paid from the owner's Claude plan's monthly API credit.
- The owner's design rules (from his other apps): no coloured edge stripes on items; pop-ups ease in; hover effects wait a moment before showing; a number sits on a shaded cell, never a bar standing in for it; one accent colour, used for interactive and live state only.

## Approaches considered

1. **Static pages with Astro on GitHub Pages, plus a small Cloudflare Worker for the backend.** Chosen by the owner. Keeps the address; plain HTML pages load instantly and are readable by the assistant; calculators are TypeScript modules shared with the Worker; the backend is only what needs a server. Cost: two hosts.
2. **Everything on Cloudflare like the owner's Protocol Library (Worker + React single-page app + D1).** One platform and deploy, reuses known patterns, but the address changes (workers.dev or a bought domain), and pages drawn by JavaScript are slower to first show and worse for search engines and link previews, for what is mostly reading material.
3. **Astro pages served from Cloudflare.** Same pages as 1 on one host, but only worth it with a bought domain. Moving from 1 to 3 later is a hosting change, not a rewrite.

Dropped: keeping MkDocs with a new theme (the architecture being replaced, and its calculators can't be shared with the assistant); hand-written HTML (50+ pages to maintain).

## Architecture (whole site)

- **Site:** Astro, static output, TypeScript. Built by GitHub Actions and deployed to GitHub Pages (Pages source switched from "deploy from branch" to "GitHub Actions" at launch).
- **Backend:** one Cloudflare Worker (TypeScript), deployed with Wrangler from this repo. Stage 1 gives it one job (anonymous open counts); stage 4 adds the assistant. Nothing else is server-side.
- **Resource registry:** one data file in the repo listing every resource (guideline page, calculator, reference page). Every list, the search, Popular, favorites and later the assistant read from it. Fields per entry: a stable `id`; `title`; `area` (exactly one); `version` label (e.g. `2017`, `v2018`, `CAR 2025`), or the explicit value `none` for resources that follow no versioned guideline (congenital pages, cardiac MRI protocols, the ECV, 4D flow and Bernoulli calculators), in which case the row shows no label; `calculator` (true/false); a one-line summary ("what it's for"); `aliases` (everyday search words such as "kidney cyst" for Bosniak); `url`; and ordering (see stage 1). The build fails on a missing field (an omitted `version` counts as missing; `none` must be written out), a duplicate id or an unknown area. *(My call: `none` is explicit so that a forgotten version can't pass silently.)*
- **URL layout:** `/` front page; `/guidelines/...` and `/cardiac/...` sections (stage 3); `/orca-website-docs/...` unchanged. Old section addresses redirect to the new ones once each section is rebuilt (stage 3).
- **Calculators (stage 3 contract, fixed now because stages 3 and 4 both depend on it):** each calculator is a pure TypeScript module with a declared input schema, a compute function, the guideline name and version it implements, and its source citation. The page's interactive form and the Worker's assistant both import the same module. A calculator page reads its inputs from the address (for example `/guidelines/fleischner/?type=solid&count=single&size=7&risk=high`), fills the form and shows the result, which is how the assistant links to a filled-in calculator. Each calculator ships with test cases taken from the guideline's own worked examples.
- **Look:** one token file (colours, type, spacing) used everywhere. Dark for every visitor by default, whatever the device's own setting (most hospital workstations are set to light, and reading rooms are dark). A light/dark switch in the header changes to light and is remembered in that browser's local storage; where storage is wiped at logout or unavailable, the page simply opens dark. A small inline script in the page head applies the saved choice before the page draws, so it never flashes the wrong theme. *(Owner's decision.)* Near-monochrome interface, one accent colour, thin dividing lines and type instead of boxes and shadows. IBM Plex Sans and IBM Plex Mono, self-hosted (the Protocol Library uses Plex Sans, so the owner's tools read as one family). Tabular numerals in anything numeric. Approved direction: the "B, with favorites" mockup in `~/Code/.superpowers/brainstorm/59014-1795561915/content/front-page-b-v3.html`.
- **Privacy:** no cookies, no accounts, no personal data stored. Favorites live in the visitor's browser. Counts store a resource id and a day, nothing about the visitor.

## Stage 1: foundation and front page (full detail)

Delivers the new site with its front page, replacing today's portal. Until stage 3, each entry links to the resource's current page on the old guidelines or cardiac site.

### Front page layout (approved mockup "B, with favorites")

- **Header:** site name (placeholder "Radiology reference · D. Ferguson"; the owner picks the real name before launch) on the left; on the right, links to an About page and to ORCA's usage guide, and the light/dark switch. *(My call: Guidelines/Cardiac header links wait for stage 3, when those sections exist on this site.)*
- **Search box** across the top, full width. `/` focuses it from anywhere on the page; Esc clears it.
- **Left rail:** `★ Favorites` (shown only once the visitor has starred something), `Popular`, a divider, then the body areas with a count of resources in each.
- **Right pane:** the selected list. Each row: star toggle, title, version label in mono, a `calc` mark for calculators, the area name (in Popular and Favorites, where items come from several areas), and the one-line summary under the title. Clicking the row opens the resource.
- **On load:** Popular is selected.
- **Footer:** a short line saying this is a reference and not a substitute for clinical judgement, the owner's credit, and a link to the About page. *(My call.)*

### Version labels and summaries in stage 1

- Each label states what the linked page actually contains today, not what the current guideline is. The site's Lung-RADS page says v1.1, so its entry says v1.1 until stage 3 replaces the page. An honest label beats one that promises content the page doesn't have.
- Inconsistencies already noticed go to the stage 2 audit list rather than being fixed here: Lung-RADS v1.1 (v2022 is current), and the old guidelines home page calling LI-RADS "v2023" while the LI-RADS page is v2018.
- The builder drafts every version label and one-line summary. Both are clinical statements, so they are part of the owner's pre-launch review (see Launch). *(My call.)*

### Lists and ordering

- **Popular:** a list of ids in the registry, chosen and ordered by the owner. The builder seeds it with a draft (Fleischner, LI-RADS, Bosniak, adrenal, Lung-RADS, ACR contrast, ECV, ...) for the owner to edit before launch.
- **Each body area:** lists its resources with the most-used first, in an order the owner sets in the registry. Until he sets one, alphabetical.
- **Body areas:** each resource belongs to exactly one. The builder drafts the mapping from the two current sites' sections (for example Chest; Cardiac; Congenital heart; Abdomen covering liver, biliary, pancreas, spleen and adrenal; GU and pelvis; Head and neck and neuro; MSK; Breast; Oncology; Contrast) and the owner reviews it. *(My call: one area per resource keeps counts and lists simple; aliases cover the "it's also a pelvis thing" cases in search.)*
- **Favorites:** stored in the browser's local storage, in the order starred. If local storage is unavailable the stars are hidden and nothing else breaks. A short note on the About page explains favorites are per browser, so a shared workstation shares them.

### Search

- Runs in the browser over the registry: title, aliases, area and summary.
- Filters instantly as the visitor types. While there is text in the box, the pane shows matches from all areas (the rail selection is set aside) and the rail shows match counts per area.
- Up/down arrows move through results, Enter opens the highlighted one.
- Aliases are written by the builder for every entry (everyday terms, abbreviations, common misspellings such as "fleishner"), for the owner to extend.
- Later (stage 4) a question typed into the same box can be handed to the assistant. Stage 1 does nothing with questions beyond filtering.

### Anonymous counts

- When a row is opened, the page sends the resource id to the Worker in the background (`navigator.sendBeacon`), without slowing navigation.
- The Worker keeps one count per resource per day. It accepts requests only from the site's origin and only ids that exist in the registry, and limits each sender's rate so a script can't skew the counts. It stores no IP address, user agent or cookie.
- The owner reads the numbers with a command in the repo (for example `npm run counts`) printing each resource's opens over the last 7, 30 and 90 days. No dashboard page.
- *(My call: storage in Cloudflare D1 or Workers Analytics Engine is the builder's choice; this is the Worker the assistant will later live in.)*

### Phone

- The rail becomes a horizontally scrolling row of tabs (Favorites, Popular, then areas) under the search box.
- The rest of the layout stacks. There is no horizontal page scroll at 360 px wide.

### About page

- What the site is, who maintains it, how to report an error, that content follows the cited guidelines and versions, the clinical-judgement disclaimer, and the favorites note.
- *(My call: one short page.)*

### Launch

- Build and deploy through a GitHub Actions workflow; switch the Pages source to GitHub Actions.
- Copy the two ORCA pages into the build unchanged, at their current paths, and check them byte for byte in CI.
- The old portal `index.html` is replaced. Rollback is switching the Pages source back to the `main` branch, which still holds the old portal until the `rebuild` branch is merged; merge only after the owner has checked the live site.
- A CI link check confirms every registry URL answers 200, so a stale old-site link fails the build.
- Owner's pre-launch review, all on the `rebuild` branch preview: the site name, the body-area mapping, the Popular list and per-area order, the search aliases, and every version label and one-line summary.

### Testing (stage 1)

- Unit tests: registry validation (fields, unique ids, known areas, Popular ids exist); search ranking for a set of real queries ("kidney cyst" finds Bosniak first, "nodule" finds Fleischner, Lung-RADS, TI-RADS and adrenal).
- Browser tests: `/` focuses search; filtering and Enter; rail switching; starring, unstarring and Favorites appearing; behaviour with local storage blocked; phone width.
- Theme tests: the page opens dark on a device set to light; the switch changes to light and the choice survives a reload; no flash of the other theme on load; with local storage blocked the switch still works for the visit and the next load opens dark.
- Worker tests: counts recorded; unknown ids, wrong origins and floods rejected; nothing personal stored.

## Stage 2: content audit (outline; its own conversation)

- **Scope:** every guideline and cardiac page and calculator.
- **For each:** is it the current version of the guideline (example already found: the site says Lung-RADS v1.1, and v2022 has replaced it); are thresholds, tables and recommendations correct; is the source cited; does the calculator match the guideline on its worked examples; is it duplicated (there are two pancreatic cyst pages today).
- **Gaps:** topics and guidelines residents need that the site lacks. The owner sets priorities in that conversation.
- **Output:** an audit report the owner reviews and signs off. It becomes stage 3's content plan. The owner is the clinical authority on every content change.

## Stage 3: guidelines and cardiac rebuilt as sections (outline; its own conversation)

- Content moves into this site under `/guidelines/` and `/cardiac/` as Markdown or MDX files, corrected and extended per the audit.
- Calculators are rebuilt to the contract above.
- The registry's URLs switch from the old sites to the new pages.
- The `guidelines_manager` and `cardiac-imaging-resources` repos are replaced with redirect pages, mapping every old page address to its new one.
- Header links to the two sections appear.
- Page design is decided in that conversation.

## Stage 4: the assistant, shared with ORCA (outline; its own conversation)

Decisions already made:
- **Sources:** it answers only from the site's content, cites the pages used, and says plainly when the site doesn't cover something.
- **Calculators:** given a case, it runs the site's calculator modules and never does the maths itself. It shows the inputs it understood, asks for any input the calculator needs that is missing, and links to the calculator page with those inputs filled in.
- **Answer layout:** to be worked out in that conversation. The first sketch repeated itself; keep it lean.
- **Patient information:** a visible warning not to enter any.
- **Where it runs:** the same assistant serves the site's search box and the ORCA Chrome extension (currently published on the Web Store, its backend retired).
- **Open to everyone, with protections:** a Cloudflare Turnstile bot check, a per-visitor rate limit, a daily budget so one day can't use the month, requests accepted only from the site and the ORCA extension, and optional codes for people the owner knows that raise their limit.
- **Paid by:** the owner's Claude plan's monthly API credit, linked to one Claude Console organization. On Max that's $100 a month; it expires each billing cycle, and requests stop when it runs out.
- **Model choice is the owner's.** Real per-answer costs are measured before launch.

Open for that conversation: the ORCA extension's backend address is currently `orca-radiology.fly.dev`, held by an empty reserved Fly app. Moving the extension to the Worker's address makes Chrome ask existing users to approve the new site once. The alternative is to keep the Fly name in front of the Worker.

## Decided by the owner

- **One site:** guidelines and cardiac become sections of this site.
- **Protocols:** not linked.
- **Approach 1:** Astro on GitHub Pages plus a Worker.
- **Front page:** layout B, with Popular first.
- **Popular:** chosen by the owner.
- **Favorites:** kept in the browser.
- **Background counts:** anonymous counts are fine.
- **The assistant:** grounded in the site, works cases through the real calculators with filled-in links, shared with ORCA, and open to all with protections.
- **Paid by:** the Max plan API credit.
- **Answer format:** leaner than the first sketch.
- **Order:** front page first, then audit, then section rebuilds, then the assistant.
- **Theme:** dark by default, with a light switch in the header.

## My calls (marked above, listed here for checking)

- **Content:** lives in repo files with no web editor.
- **Section links:** the header gets Guidelines/Cardiac links only in stage 3.
- **Footer:** carries a clinical-judgement disclaimer.
- **About page:** one short page.
- **Body areas:** one per resource.
- **Fonts:** IBM Plex.
- **Counts:** read with a repo command rather than a dashboard.
- **The Worker:** created in stage 1 for the counts.
- **Unversioned resources:** carry an explicit `version: none`.
- **Stage 1 labels:** describe the linked page as it is today.
- **The owner's pre-launch review:** covers version labels and summaries, not only the areas, aliases and Popular list.

## Left to the builder

- Astro project structure and component split.
- How the registry is expressed (an Astro content collection or a plain YAML or JSON file).
- The search ranking method.
- Count storage (D1 or Analytics Engine) and the exact rate limits.
- The Worker's name.
- The CI layout.
- Exact spacing and type scale within the approved look.
- The draft area mapping, aliases and Popular list (the owner reviews all three before launch).
