# Project Architecture

Read this when generating a new pure-frontend project. The examples below use the default recommended stack **Next.js App Router + TS + plain CSS**; if you chose a different stack per SKILL.md "Tech Selection" (Vite/Astro/single HTML, or added Tailwind), follow that stack's community conventions for the skeleton and naming, but the **goals stay the same**: clear routing, editable data, reusable components, tokenized styles, testable shared logic, and a fixed method for appending new pages.

## Architecture Goals

What you generate is not a "single-page demo" but a frontend project that can continue to be developed:

- Clear routing.
- Editable data.
- Reusable components.
- Styles with variables and naming rules.
- Testable shared JS.
- A fixed method for appending new pages.

## Recommended Skeleton

```text
project/
  package.json
  next.config.mjs
  tsconfig.json
  README.md
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
  components/
    layout/
    ui/
    sections/
    cards/
  data/
    site.ts
    navigation.ts
    pages.ts
  lib/
    assets.ts
    content.ts
    format.ts
    routes.ts
  hooks/
  public/
    images/
  docs/
    design-system.md
    frontend-map.md
```

`docs/design-system.md` is the decision record for the design tokens (see `references/design-system.md`), and `docs/frontend-map.md` is the project memory. Both are part of the "complete project / continuously adding pages" deliverable.

Mobile H5 / App-like projects can use route groups:

```text
app/
  (tabs)/
    layout.tsx
    page.tsx
    explore/page.tsx
    cart/page.tsx
    me/page.tsx
  product/[slug]/page.tsx
```

## Default Dependencies

Keep dependencies to a minimum:

- `next`
- `react`
- `react-dom`
- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`

If the project already has an icon library, reuse it; when adding one is allowed, prefer `lucide-react`.

Default scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  }
}
```

## Data Contract

For repeated UI, define typed data first:

```ts
export type NavItem = {
  label: string;
  href: string;
};

export type CardItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
};
```

Use stable `id` and `slug` so that adding detail pages later does not require rewriting the component contract.

Recommended data files:

| File | Content |
| --- | --- |
| `data/site.ts` | Site name, description, contact, social media, SEO defaults. |
| `data/navigation.ts` | Top navigation, bottom navigation, footer navigation. |
| `data/pages.ts` | Page sections and static copy. |
| `data/items.ts` | List data such as products, case studies, articles, services. |

Data fields should stay close to the business, but keep common generic fields: `id`, `slug`, `title`, `description`, `image`, `href`, `tags`, `meta`.

## Component Boundaries

| Type | Responsible for |
| --- | --- |
| Route page | metadata, route composition, selecting data. |
| Layout | header, navigation, footer, tabs, page shell. |
| Section | page sections such as Hero, gallery, feature list, FAQ. |
| UI primitive | Button, Input, Sheet, Tabs, Card, Badge, EmptyState. |
| Pure helper | formatting, filtering, slug lookup, grouping, display labels. |
| Client component | state, browser APIs, animation, local storage, form interactions. |

Use Server Components by default. Only add `'use client'` when you need state, events, effects, or browser APIs.

## Routing Conventions

- Home: `app/page.tsx`.
- Main nav pages: `app/<name>/page.tsx`.
- App-like tabs: `app/(tabs)/<name>/page.tsx` + `app/(tabs)/layout.tsx`.
- Detail pages: `app/<domain>/[slug]/page.tsx`.
- Form/flow pages: `app/<action>/page.tsx`.
- Static info pages: `app/<topic>/page.tsx`.

Each page should ideally do only three things: select data, compose components, and declare metadata. Push complex interactions down into Client Components.

## CSS System

`app/globals.css` is responsible for:

- `:root` variables: colors, text, spacing, radius, shadows, container width.
- Base font and page background.
- Shared layout classes.
- UI base component classes.
- Page / business-domain prefixed classes.

Recommended variable shape:

```css
:root {
  --bg: #ffffff;
  --surface: #f7f7f5;
  --text: #181818;
  --muted: #666666;
  --border: #e8e4dc;
  --accent: #111111;
  --radius: 8px;
  --container: 1120px;
}
```

Do not flood the page with a single color family. Use neutrals + one primary accent + necessary status colors.

Naming suggestions:

- `site-`: site-level layout.
- `nav-`: navigation.
- `section-`: generic page sections.
- `card-`: cards.
- `form-`: forms.
- Business domains can use their own prefix, e.g. `product-`, `case-`, `profile-`.

Fixed bars, bottom navigation, and mobile drawers should account for `env(safe-area-inset-bottom)`.

## Shared JS

Logic that appears twice or is prone to regression goes into a shared helper:

- `lib/routes.ts`: route constants, active-navigation checks.
- `lib/format.ts`: currency, dates, quantities, text truncation.
- `lib/content.ts`: lookup by slug, list grouping, fallback copy.
- `lib/assets.ts`: image fallback rules.
- `hooks/useToast.ts` or `components/ui/Toast.tsx`: transient feedback.

Keep shared helpers as pure functions where possible, for easier testing and reuse.

Example:

```ts
export function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug) ?? null;
}
```

Do not scatter filtering, sorting, formatting, and slug lookup throughout the JSX.

## Continuity Doc

Generate and continuously maintain `docs/frontend-map.md`, treating it as **project memory** (read it first when extending an existing project; always update it before wrapping up). Record:

- The route map.
- **Component inventory**: what each shared component is called, where it lives, and which pages use it — when extending, check here first and reuse rather than create new.
- Data files and field shapes.
- Image directories.
- Steps for adding a new page.
- A pointer to the token system in `docs/design-system.md` (the source of truth for colors / fonts / scales / signature elements).

When the user asks for a "complete project" or "continuously adding pages," this document is part of the deliverable. After every addition or change, write the change back here so the next extension can pick up from it.

## Minimum README Content

The project root README should at least cover:

- The project's purpose.
- Local startup commands.
- Directory overview.
- How to add a page.
- How to replace copy and images.
