# Reordering favorites: short design

Date: 2026-11-24. Status: approved by the owner ("Yes 1. Fold it in.").
Builds on the stage 1 favorites (`src/scripts/favorites.ts`); shipped with the quick
calculators pilot (`2026-11-24-quick-calculators-pilot-design.md`).

**Intent.** Favorites appear in the order they were starred; the only way to change it
today is to unstar and star again. The owner wants to put them in his own order.

**Approaches.** (1) Move up / move down buttons on each row, only in the Favorites list:
same with mouse, keyboard and phone, usable with a screen reader. Chosen by the owner.
(2) Drag to reorder: nicer with a mouse, fiddly on phones and some locked-down hospital
browsers, and it still needs buttons for keyboard users.

**Design.**
- In the Favorites list only, each row shows two small buttons, "Move up" and "Move down"
  (accessible names include the title, e.g. "Move Fleischner Society up"). They don't
  appear in Popular, the areas or search results, nor without JavaScript (there are no
  favorites then).
- The first row's "Move up" and the last row's "Move down" are disabled.
- A move swaps the row with its neighbour and saves the new order at once under
  `radref:favorites` (the same JSON list). Focus stays on the same button of the moved
  row, so pressing it again keeps moving that row.
- Nothing else changes: starring adds to the end; unstarring removes; stale ids are dropped.
- Moving sends no count. If storage refuses the write, the order stays as it was.

**My calls.** Buttons rather than a separate "edit order" mode; icons (thin chevrons in
`--dim`, ink on hover) with the names as accessible labels; at least 32 px tap targets.

**Left to the builder.** Exact placement in the row within the approved look.
