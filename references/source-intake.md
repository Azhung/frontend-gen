# Organizing source material

When the user provides HTML, screenshots, images, copy, product descriptions, or scattered requirements, read this first.

## Input types

| Input | How to handle |
| --- | --- |
| Reference HTML | Extract structure, copy, repeated modules, and inline-style intent; do not paste it verbatim into components. |
| Screenshot/visual mockup | Extract layout, hierarchy, colors, image needs, and interaction states. |
| Image assets | Sort into logo, brand, product, avatar, background, icon, decoration. |
| Copy | Keep the core message, break it into pages, sections, cards, FAQs, buttons. |
| Requirements list | Turn it into routes, components, data models, interactions, and acceptance points. |
| Old prototype | Keep the user paths, refactor into a modern Next structure. |

## What to look at first

- Page names, menus, buttons, forms, product/service lists, repeated sections.
- Brand signals: logo, colors, fonts, tone, image style, icon style.
- Interaction requirements: tabs, filters, drawers, forms, carousels, favorites, local state, navigation.
- Target device: mobile H5, desktop site, responsive web app, portfolio, operations dashboard.
- The data model hidden in the copy: products, services, team, cases, reviews, FAQ, steps, pricing, addresses.
- Places that will need new pages later: category pages, detail pages, case pages, article pages, form flows, account center.

## Turn it into an internal brief

Before coding, organize it into a short brief:

```text
Goal:
Users:
Device priority:
Routes:
Shared shell:
Core data models:
Available images:
Missing images/placeholders:
Interactions:
Acceptance focus:
Out of scope:
```

When the user has clearly asked to implement it, if the missing information is low-risk, just make reasonable assumptions and continue.

## When to ask

Only ask when the following information is missing and would clearly affect the architecture:

- Whether the project is actually an H5 app, a website, a dashboard, a tool, or a portfolio.
- Whether it must match a specific visual source.
- The page list is entirely unclear.
- Whether local mock data is allowed.

For other minor gaps, proceed on assumptions and record those assumptions in the delivery notes or `docs/frontend-map.md`.

## HTML to React

- Preserve the content hierarchy, section order, and key tags.
- Repeated HTML becomes a data-mapped component.
- Converge inline styles into CSS variables or local classes.
- Use the Next `Link` for in-site links.
- Put local images in `public/`; centralize image paths used in multiple places in a data file.
- Do not keep fragile absolute positioning unless the visual effect depends on it.
- For tables, lists, cards, steppers, and navigation, extract the data shape first, then write the component.
- Keep only the class names from the old HTML that carry business semantics; redesign presentational classes.

## Image handling

- Prefer the real images the user provided.
- Put images in `public/images/` or a business directory such as `public/brand/`.
- Put the image paths for multiple cards in a data file.
- Image containers must have a stable aspect ratio.
- When an image is missing, use a designed placeholder; do not show a broken-image icon.
- Do not use dark overlays, blurred crops, or abstract backgrounds to hide the real product/object the user needs to see clearly.
- Write clear alt text for important images; decorative images can have empty alt.

## Copy handling

- By default, keep the copy the user provides verbatim.
- When there is too little copy, add the minimum amount of connecting text in the same tone.
- Do not write instructions about "how to use this interface" in the UI.
- For Chinese projects, default to concise Chinese labels and action-oriented empty states.
- Organize copy by `data/`: keep site info, navigation, homepage sections, list items, FAQ, and contact info separate.
