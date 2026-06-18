# Adding More Pages

Read this when continuing to add pages to an existing generated project. The first principle of extending a project: **carry the baton, don't restart**—add incrementally on top of the existing project, never rebuild the project from scratch, never switch to a different aesthetic.

## Must-Do Before Extending (Prevent Drift)

1. **Read the two memory files first**: `docs/frontend-map.md` (current routes/components/data) and `docs/design-system.md` (character + tokens + signature element).
2. **Reuse existing tokens**: a new page's colors, font sizes, spacing, and border radii must all use the existing `:root` variables—no ad-hoc color tweaks, no introducing a new aesthetic. If a step is missing, add it back to the token system first, then use it.
3. **Keep signature elements consistent**: use the same treatment site-wide, don't do something different on this page.
4. On finishing, you **must update** `frontend-map.md` (newly added routes/components/data/tokens), and sync `design-system.md` if tokens changed.
5. Self-check: randomly compare the new page against older pages—are they fully from the same source? If drift starts, converge back to the tokens.

## Determine the Expansion Type First

| Need | Approach |
| --- | --- |
| Add a static page | Add a route + reuse Section/UI + update navigation. |
| Add a list page | Extend the `data/` types and data first, then build the list component. |
| Add a detail page | Build a `[slug]` route, query data with `lib/content.ts`. |
| Add a flow/form page | Split into step data, form components, and state helpers. |
| Add many pages of the same kind | Extract the data model and shared layout first, then batch-create routes. |

## Expansion Flow

1. If `docs/frontend-map.md` exists, read it first.
2. Find the closest existing route and shared components.
3. Decide whether it's a static page, list page, detail page, form page, or flow page.
4. Extend the data model first, then write the page JSX.
5. Reuse the existing page shell, navigation, section components, and UI primitives.
6. Update navigation only when it needs to be reachable.
7. Add metadata, empty states, and missing-image fallbacks.
8. Run type checking/build.
9. Update `docs/frontend-map.md`.

## Choosing a Route

| Page Type | Route Pattern |
| --- | --- |
| Main navigation page | `app/<name>/page.tsx` or `app/(tabs)/<name>/page.tsx` |
| Detail page | `app/<domain>/[slug]/page.tsx` |
| Form/flow page | `app/<action>/page.tsx` |
| Static info/help page | `app/<topic>/page.tsx` |
| Nested section | `app/<domain>/<section>/page.tsx` |

Don't create a route group casually when there's no need for a shared layout, navigation, or metadata.

## Extracting Components

Extract a component when these arise:

- The same section appears on two pages.
- Cards, lists, or tables have a repeated data shape.
- A visual primitive is likely to be reused later.
- A page has multiple independent interactions.

Genuinely unique page copy and small layouts can stay inside the page.

## Detail Page Pattern

Recommended structure:

```text
data/items.ts
lib/content.ts
app/items/page.tsx
app/items/[slug]/page.tsx
components/items/ItemCard.tsx
components/items/ItemDetail.tsx
```

When a detail page can't find the slug, use `notFound()` or the project's existing empty state—don't render a half-empty page.

## Extending Data

- Make a new field optional only when it must be compatible with old data.
- Prefer `slug`, `label`, `title`, `description`, `image`, `href`, `tags`, `meta`.
- Use arrays for ordered content.
- Let ops/users edit copy without touching the component structure as much as possible.
- When adding an enum-type field, put the display text in a helper—don't write ternary expressions across multiple components.

## Regression Checks

- Navigation highlighting is still correct.
- Fixed headers/footers don't obscure content.
- Cards have a stable height or aspect ratio.
- Long titles wrap correctly.
- Missing images don't break the layout.
- Both mobile and desktop are reasonable.
- A new page works when refreshed/accessed directly.
- Newly added data doesn't break old components.
- `docs/frontend-map.md` matches the real routes.
