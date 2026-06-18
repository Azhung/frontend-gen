# Design Craft

Read this when you want the generated project to feel "human-made and intentionally designed" rather than a generic AI-generated look. The goal isn't to pile on decoration, but to give every decision a reason. Content and personality come first, styling second.

## One-line principle

Be restrained, layered, and true to the content. Better plain and precise than ornate and hollow.

> For how to systematically produce and lock down the "token system" (colors / fonts / scales), see `references/design-system.md`. This document is about the judgment needed to use those tokens with real craft.

## A few high-leverage design judgments

These decide whether a page feels "thoughtful" or "safely mediocre" — they matter more than piling on details:

- **The first screen is an argument, not a formula.** Open with the most representative thing in this business — it could be a strong claim, an image that sets the tone, a real number, or an interactive moment. "One big number + small label + gradient accent" is the template answer; use it only when it genuinely fits best.
- **Structure is information.** Structural pieces like numbering, eyebrows, dividers, and labels should carry real meaning, not decoration. For example, use numbering (01/02/03) only when the content really is an ordered sequence of steps/timeline; if it isn't a sequence, don't slap numbers on it.
- **Match complexity to the vision.** If you want richness, execute the richness fully; if you want minimalism, sweat the precision of spacing, type, and alignment. Elegance = executing the chosen direction cleanly, not landing half-rich and half-minimal.
- **Spend boldness in exactly one place (the signature element).** Let the signature element be what makes the page memorable, and keep everything around it quiet and restrained; cut any decoration that doesn't serve the content. Playing it safe is itself a risk — but take the risk only once.
- **Copy is a design material.** Headlines make the value clear, buttons make the action clear, and the same action keeps the same name throughout ("Publish" button → "Published" toast). Empty states / errors are a chance to give direction, not filler.

## Set the personality first, then write styles

Before you start, write down this project's personality in one sentence and make choices based on it — don't let every project end up looking the same:

- Is it calm and professional, or warm and friendly? High-end and restrained, or lively and energetic?
- What brand signals do the reference materials send (logo, colors, fonts, tone, image style)?
- What should the target audience feel when they see the first screen?

Write this sentence into `docs/frontend-map.md` so every later page obeys the same personality.

## Anti-AI-slop checklist

The following are the hallmarks of the generic AI-generated look. Avoid all of them by default, unless the reference materials explicitly call for them.

| Don't | Change to |
| --- | --- |
| Purple-blue gradient background + gradient text | One restrained primary color, solid or with very light layering. |
| Rounded corners everywhere + multiple shadow layers + glassmorphism | Unify radii into 1–2 steps, few and light shadows. |
| The cookie-cutter Hero → three icon cards → testimonials → CTA | Order sections by the real content, and allow asymmetry. |
| Every block centered, same width, same spacing | Use alignment and density to create rhythm and emphasis. |
| Emoji as icons, ✨ as accents, "Powered by AI" badges | Use real icons or restrained typographic emphasis. |
| Fake placeholder copy (Lorem, "your tagline here") | Use the real copy from the reference materials; if missing, write short lines that fit the business. |
| Generic SaaS template palette (bright purple, neon cyan, floating dark cards) | Pull colors from the content/brand: a neutral base + one accent color. |
| All headings the same weight, same size | Establish a clear hierarchy of size and weight. |
| Pill buttons with large radii everywhere + all-caps text | Button form should obey the overall personality; use all-caps sparingly. |

A litmus test: if this interface could be reused as-is for a completely different business, it's probably too generic and lacks real design.

## Color

- Define a neutral scale first (background, surface, border, body text, muted text), then add one primary accent color, and only then status colors.
- Use the accent color where something genuinely needs to be clicked or noticed; don't paint it across the whole screen.
- Keep the total number of colors restrained within a project: about 5 neutral steps + 1 primary + 2–3 status colors.
- A dark background is not a shortcut to looking premium; restrained light is equally premium, and safer.
- Put all colors into `:root` variables; no stray hex values allowed.

```css
:root {
  --bg: #ffffff;
  --surface: #f6f5f2;
  --border: #e7e3da;
  --text: #1a1a1a;
  --muted: #6b6b6b;
  --accent: #b5502f;     /* pulled from the brand/content, not the default blue-purple */
  --accent-weak: #f3e3dc;
}
```

## Typography

- Choose a font pairing with character: one for headings, one for body; don't use a single default sans-serif site-wide.
- For CJK projects, prefer a system CJK font stack or an explicit CJK font; don't let CJK text fall back to a Latin font and end up looking thin.
- Establish a type scale (e.g. 13 / 15 / 18 / 24 / 32 / 44), with a clear gap between headings and body.
- Loosen body line-height (around 1.6) and tighten heading line-height. Keep body line width to about 60–75 characters.
- Build hierarchy with weight, size, color, and spacing, rather than bolding everything or using all-caps.

```css
:root {
  --font-sans: -apple-system, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --step-0: 0.9375rem;
  --step-1: 1.125rem;
  --step-2: 1.5rem;
  --step-3: 2rem;
  --step-4: 2.75rem;
  --leading-body: 1.6;
  --leading-tight: 1.15;
}
```

## Spacing and rhythm

- Use a single spacing scale (e.g. 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64); don't write magic numbers off the cuff.
- Whitespace is part of the design. Give sections enough room to breathe; pull related elements close and push unrelated ones apart.
- Keep the vertical rhythm consistent across sections of the same kind, so the page has cadence.
- Don't cram everything to the full line width; body text and cards should have a max-width constraint.

## Layout

- Think through the grid before placing content. Allow breaking symmetry: stagger image and text left/right, vary card sizes, make the emphasized item larger.
- Highlight only one focal point per screen; don't let multiple elements fight for visual attention at once.
- If it's mobile-first, then do mobile properly: single column, thumb-reachable, fixed bars that don't cover content, and mind `100dvh` and `env(safe-area-inset-bottom)`.
- Detail pages, list pages, and form pages each deserve a fitting layout; don't reuse the same three-column card layout for all of them.

## Details and texture

- Unify aspect ratios for cards, images, and avatars to avoid ragged, broken layouts.
- Use borders and dividers sparingly; often spacing separates things more cleanly than adding lines.
- Cover all states: hover, focus, active, disabled, empty state, loading, and missing-image fallback.
- For missing images, make a designed placeholder (initial letter, solid color block, brand graphic), not a broken-image icon.
- Keep the focus state clearly visible; don't remove the focus outline for looks.

## Motion

- Motion serves comprehension and feedback, not flair. Transition durations around 150–250ms, with natural easing.
- Keep entrance animations restrained; avoid the whole page flying in element by element.
- Always respect `prefers-reduced-motion` and turn off non-essential animations.

## Content

- Real, specific, short copy beats ornate empty talk. Headlines make the value clear, buttons make the action clear.
- Don't write explanatory placeholders like "your headline goes here" into the interface.
- Use real numbers, names, and cases from the reference materials wherever possible; if there genuinely are none, write reasonable content that fits the business and mark it as pending replacement.

## Three self-check questions

Before delivery, ask yourself:

1. Strip the content and look only at the skeleton — can you still recognize it as "this business"? (Recognizable = purposeful)
2. For any two sections, are the spacing, alignment, and type hierarchy consistent and justified?
3. Does anything from the anti-AI-slop checklist show up? If so, fix it.
