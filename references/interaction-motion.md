# Interaction · Motion · Icons

A page is more than static layout—interaction, motion, and icons decide whether it feels "alive and professional." But **these three are the easiest to overdo into AI slop** (everything flying in, show-off transitions, emoji as icons). The principle in one line: **serve understanding and feedback; be restrained, consistent, and disableable.**

## 1. Interaction and States

Anything interactive must "look clickable, and give feedback when clicked."

- **Cover all states**: every interactive element needs `hover / focus-visible / active / disabled`, plus `loading / empty / error / missing-image` fallbacks. An interface with missing states looks unfinished.
- **Visible focus**: keep a clear outline for `:focus-visible` (use the `--grass`-style accent color); don't delete it for the sake of looks.
- **Use the same wording for feedback**: the trigger and the result share a name—a "Publish" button → "Published" toast; "Save" → "Saved." Don't switch wording midway.
- **Keyboard and touch**: tabbable, triggerable with Enter/Space; touch tap targets ≥ 44px; fixed bars reserve `env(safe-area-inset-bottom)`.
- **Forms**: validate in real time or on submit, place error messages next to the field and explain how to fix them; disable the button during submission and show loading.
- **Client boundary**: only add `'use client'` to components that need state/events/browser APIs; keep presentational ones as Server Components (see `frontend-architecture.md`).

## 2. Motion and Transitions (restraint first)

### What should move
- **State changes**: hover, expand/collapse, tab switching, popover enter/exit—use `transition`, with duration `--dur` (150–250ms) and easing `--ease`.
- **One choreographed entrance moment**: a single restrained reveal on the first screen (e.g. heading + hero subtly sliding up and fading in) is more refined than every element flying in one by one. Design only one "main entrance moment" for the whole page.
- **Scroll reveal**: long pages may let sections subtly fade and slide up as they enter the viewport—but **small in amount, only once, and not on every element.**
- **Micro-interactions**: a button sinking slightly on press, a card lifting/outlining slightly on hover—keep it subtle.

### What should not move (sources of AI slop)
- Every element on the page bouncing/flying in one by one; animations longer than ~300ms; infinitely looping decorative animations; piled-on parallax; show-off transitions.
- Motion must never become an obstacle to or a delay in understanding the content.

### Implementation
- Use tokens: `transition: color var(--dur) var(--ease)`, instead of writing a different magic duration in each place.
- Entrance / scroll-reveal example (lightweight, pure CSS + a small hook):

```css
.reveal { opacity: 0; transform: translateY(12px); transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease); }
.reveal.in { opacity: 1; transform: none; }
```

```ts
// hooks/useReveal.ts —— IntersectionObserver: add .in when it enters the viewport, fire only once
"use client";
import { useEffect, useRef } from "react";
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: .15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}
```

- **Page/route transitions** (optional): CSS View Transitions or a simple fade is enough; don't build flashy scene changes.
- **Hard accessibility requirement**: always respect `prefers-reduced-motion: reduce` (the tokens already zero out `--dur`); critical information must never be conveyed by animation alone.

## 3. Icons

Whether icons are consistent directly decides whether something "looks like one coherent design."

- **One icon family, no mixing**: prefer a consistent line-icon library (such as `lucide-react`), the same family and style site-wide; don't go line here and filled there, solid here and outlined there.
- **Icon tokens**: unify size and stroke width (e.g. `--icon-size: 20px; --icon-stroke: 1.75`), following the font size/character, instead of setting them ad hoc each time.
- **Emoji are not icons**: unless it's a deliberate playful/flag scenario, don't use emoji for functional UI icons (this is a point on the AI-slop-removal checklist).
- **Custom / brand icons = inline SVG**: for what the library lacks, or what needs brand feel, draw an **inline SVG** that follows the design system's stroke width, corner radius, and accent color (use `currentColor` to inherit text color for easy uniform coloring).
- **The boundary of "generating" icons**: anything expressible with simple geometry + `currentColor` inline SVG (arrows, checkmarks, logo motifs, divider motifs) you draw yourself into `components/ui/icons/` or `public/icons/`; don't force complex illustrations/realistic icons into crummy SVG—hand those to design resources or an icon library.
- **Accessibility**: decorative icons get `aria-hidden="true"`; informative icons get `aria-label` or accompanying text.
- **Asset placement**: make SVG icons small components (`components/ui/icons/`) or place them in `public/icons/`, with centralized paths, not scattered around.

## Self-check
- All interactive elements have hover/focus/active/disabled + the necessary empty/error/loading states.
- Motion is restrained: only one main entrance moment, no full-screen fly-in, durations use tokens, `prefers-reduced-motion` takes effect.
- Icons are the same family, size, and stroke width; no emoji standing in as functional icons; decorative icons are `aria-hidden`.
