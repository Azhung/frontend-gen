# Design-Token System (build the system first, then the pages)

When starting a new project, read this before writing your first line of styles.
Core idea: **Don't tweak styles as you go—first lock in a "design-token system", and then have every page draw its values from that system.**
This step solves two things at once: (1) it makes the interface look intentionally designed rather than like AI slop (the system is the source of the aesthetic); (2) it keeps many pages consistent over the long run and prevents drift (the system is a sustainable foundation). The design system is the **single source of truth** for every visual decision in this project.

## Why build the system first

If you define colors and type sizes as you write each page, the result is: every page is slightly off from the others, it gets busier the more you add, and after three to five pages it falls apart—making it extremely costly to unify afterward.
Lock the decisions into tokens up front, and afterward you're only "referencing", not "deciding"—this is what lets you keep adding dozens of pages while staying consistent.

## Step 1: A one-line personality

First write down this project's personality; it governs every value that follows:

- Calm and professional / warm and friendly / high-end and restrained / lively and energetic / sharp and modern / vintage and handcrafted…
- Distill it from the brand signals in the reference material (logo, primary color, typeface, tone, image texture) and from the target audience's first impression.
- If you can't write it in one sentence, don't write code yet—if the personality is unclear, the tokens will be a mess.

## Step 2: Produce the full set of tokens

Define them in order, with a reason for each level; don't pile on decoration:

1. **Color**: First a neutral scale (background, surface, border, body text, muted text—about 5 levels), then **one** restrained primary accent color, and finally 2–3 status colors. Use the accent only where something truly needs to be clicked or noticed. Keep the total number of colors restrained.
2. **Typefaces**: Choose a pairing with character—one display typeface, one body typeface; don't use a single default sans-serif everywhere. For CJK projects, explicitly specify the CJK font stack; don't let CJK text fall back to a Latin font and look thin and washed out.
3. **Type scale**: Set one ratio (e.g. 13 / 15 / 18 / 24 / 32 / 44), with a clear gap between headings and body text.
4. **Spacing scale**: One fixed step set (e.g. 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64); eliminate ad-hoc magic numbers.
5. **Radius / shadow / motion**: Unify radius to 1–2 levels; keep shadows few and light; transitions 150–250ms with natural easing, respecting `prefers-reduced-motion`.
6. **Signature element**: Pick **one** memorable touch that best represents this business's personality—it could be a distinctive heading layout, a repeating structural motif, a special card/divider/graphic treatment, or a restrained entrance animation. **Spend boldly on this one spot only, and keep everything else quiet and restrained** ("spend where it counts"). A page with no signature element is the "safe but mediocre" AI default look.

## Step 3: Two-pass self-check (before writing code)

Once the tokens are drafted, don't rush into building pages. Run through the "three generic AI-generated default looks" below; if you hit one, change it to a choice that fits this business:

| AI default look | Traits | How to break it |
| --- | --- | --- |
| (1) Literary-magazine look | Beige background (#F4F1EA-ish) + high-contrast serif headlines + terracotta/clay accent | Use only when the personality really is "warm/handcrafted/editorial"; otherwise switch to a neutral background and primary color that fit the business |
| (2) Dark-neon look | Near-black background + a single neon-green/vermilion accent + glassmorphism | Unless the personality is "tech/nighttime/gaming", a restrained light theme is just as premium and safer |
| (3) Newspaper hairline look | Full-width hairline rules + zero radius + dense newspaper-style layout | Use only when a "serious news/editorial" personality holds up; otherwise give it whitespace and hierarchy |

Then ask one more thing: **If you could drop this set of tokens onto a completely different business and it wouldn't feel out of place, then it's too generic—redo it.** A good system should "look like this business".

## Step 4: Persist in two places

Once the system is finalized, write it in **both** places at the same time; the two must match:

- The `:root` in `app/globals.css`: machine-facing tokens. Pages/components reference variables only—no scattered hex or magic numbers.
- `docs/design-system.md`: a human-readable record of decisions, explaining "what the personality is, why these colors/typefaces/scales were chosen, what the signature element is". When you extend the project later, read this first and draw values from it; don't start a new aesthetic.

### `:root` token example

```css
:root {
  /* Neutral scale */
  --bg: #ffffff;
  --surface: #f6f5f2;
  --border: #e7e3da;
  --text: #1a1a1a;
  --muted: #6b6b6b;
  /* Primary accent (extracted from brand/content, not the default blue-purple) */
  --accent: #b5502f;
  --accent-weak: #f3e3dc;
  /* Status colors */
  --ok: #2e7d32; --warn: #b26a00; --danger: #c0392b;
  /* Typefaces */
  --font-display: "Source Han Serif SC", Georgia, serif;
  --font-sans: -apple-system, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  /* Type scale */
  --step-0: .8125rem; --step-1: .9375rem; --step-2: 1.125rem;
  --step-3: 1.5rem; --step-4: 2rem; --step-5: 2.75rem;
  --leading-body: 1.6; --leading-tight: 1.15;
  /* Spacing scale */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px;
  /* Radius / shadow / container / motion / icons */
  --radius: 8px; --radius-lg: 16px;
  --shadow: 0 1px 2px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.05);
  --container: 1120px;
  --ease: cubic-bezier(.2,.6,.2,1); --dur: 200ms;   /* Motion tokens: use these two for all transitions */
  --icon-size: 20px; --icon-stroke: 1.75;           /* Unified icon size/stroke width */
}
@media (prefers-reduced-motion: reduce){ :root{ --dur: 0ms; } }
```

### `docs/design-system.md` template

```markdown
# Design System

## Personality
One line: ________ (e.g. calm & professional / warm & friendly / high-end & restrained / sharp & modern — pick what fits the business)

## Signature element
________ (e.g. a distinctive heading treatment, a repeating structural motif, or one restrained accent — the only point of tension across the whole site)

## Color (semantic → value)
- Background/surface/border/body/muted: …
- Primary accent: … (source: extracted from the brand logo)
- Status colors: …

## Typefaces
- Display: … Body: … (CJK font stack: …)

## Scales
- Type: … Spacing: … Radius: … Motion: …

## Usage conventions
- All colors/spacing/type sizes must use :root variables; no scattered hardcoded values.
- For a new requirement, first add a level here, then reference it in the component.
```

## Responsive tokens and conventions (responsive is a first-class citizen)

Responsive isn't tacked on at the end; it's locked into the tokens and followed on every page as a system capability. Default to **mobile-first**: write the narrow-screen single column first, then use `min-width` media queries to add columns and spacing for larger screens.

### Responsive tokens (merge into `:root`)

```css
:root {
  /* Breakpoints (unified levels; don't write ad-hoc ones per page) */
  --bp-sm: 480px;   /* large phone */
  --bp-md: 768px;   /* tablet */
  --bp-lg: 1024px;  /* desktop */
  --bp-xl: 1280px;
  /* Container and side safe padding */
  --container: 1120px;
  --gutter: clamp(16px, 4vw, 40px);
  /* Fluid type: scales smoothly between min~max with the screen, no need for a pile of media queries to adjust sizes */
  --step-3: clamp(1.25rem, 1rem + 1.2vw, 1.5rem);
  --step-4: clamp(1.6rem, 1.1rem + 2.2vw, 2rem);
  --step-5: clamp(2rem, 1.2rem + 3.5vw, 2.75rem);
}
```

### Three core patterns (enough to cover the vast majority of pages)

```css
/* 1) Centered container + side padding */
.container { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }

/* 2) Fluid grid: more columns when there's room, auto-wrap when there isn't—no pile of breakpoints needed */
.grid { display: grid; gap: var(--s-5); grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); }

/* 3) Mobile-first + min-width progressive enhancement */
.cols { display: grid; gap: var(--s-4); }              /* narrow screen, single column */
@media (min-width: 768px){ .cols { grid-template-columns: 1fr 1fr; } }   /* tablet, two columns */
@media (min-width: 1024px){ .cols { grid-template-columns: 1fr 1fr 1fr; } } /* desktop, three columns */
```

### Conventions

- **Mobile-first**: write base styles for narrow screens and add upward with `min-width`; don't go PC-first and cut down.
- **Prefer fluid over breakpoints**: when you can adapt with `clamp()` (type/spacing) and `auto-fit/minmax` (grids), write fewer media queries; breakpoints should only use the unified token levels.
- **Media that doesn't break layout**: images `max-width:100%;height:auto`; give cards/media a fixed aspect ratio (`aspect-ratio`).
- **Touch-friendly**: tappable areas ≥ 44px; for fixed bars/bottom navigation use `env(safe-area-inset-bottom)`, and on mobile use `100dvh` for height rather than `100vh`.
- **Every page must hold up at three widths**: ~375px (phone) / ~768px (tablet) / ~1280px (desktop)—no overlap, no overflow, no broken images.
- Horizontal scrolling is a bug (unless it's an intentional carousel/horizontal-swipe component).

## Cross-page reuse and preventing drift (the core of sustainability)

- Every subsequent page and component **references tokens only**; don't tweak colors or set type sizes on the spot.
- Missing a value (e.g. you need a larger heading level) → **go back to the token system and add a level**, then reference it in the component; don't hardcode it in place.
- Keep the signature element treated the same way across the whole site; don't vary it page to page.
- Before you extend an existing project, you must read `docs/design-system.md`; it's the basis for newcomers to "align on the aesthetic".
- Self-check: randomly flip through two pages—are the colors, type hierarchy, spacing rhythm, and radii all from the same source? If not, drift has begun; converge back to the tokens immediately.
