# Delivery Acceptance

Read this before delivery. The goal is to avoid "looks like it was generated, but can't actually be used going forward".

## Must-pass checks (beginner-friendly, runs out of the box)

- The project ships with complete `package.json`, `tsconfig.json`, `next.config.mjs`; dependencies install successfully, or it reuses existing dependencies.
- `npm run typecheck` or an equivalent type check passes; when there is no script, run `npx tsc --noEmit`.
- `npm run build` passes; if it fails, explain the specific reason.
- When the environment allows, actually start the local dev server to confirm it opens and provide a URL (fix it until it runs first); when the environment is restricted and the server can't be started, at least make type/build pass, provide local startup steps and the expected URL, and honestly state that you did not start it yourself.
- When there is logic / critical flows or the user requires it, add tests at the corresponding level per `references/testing.md` and run them green; for purely static sites, substitute browser self-check.
- For official sites / landing pages / content sites, the SEO basics have been done per `references/seo.md` (per-page metadata, OG image, sitemap/robots, canonical, semantics, alt).
- The last line of the final reply must always state the current running URL: `Current URL: http://localhost:xxxx`. If it can't be started, write: `Current URL: not started (reason: ...)`.
- No leftover TODOs, half-finished pages, errors, or steps the user has to complete themselves.
- Every page, at three breakpoints (~375px phone / ~768px tablet / ~1280px desktop), has no overlap, no overflow, no broken images, and no unexpected horizontal scroll (except for deliberate horizontal-swipe components).
- Prefer fluid responsiveness (`clamp()` font sizes, `auto-fit/minmax` grids); take breakpoints from the unified `:root` tokens, don't write them ad hoc on each page.
- Mobile: tappable areas ≥ 44px, fixed bars use `env(safe-area-inset-bottom)`, height uses `100dvh`, images `max-width:100%`.

## Self-check & repair (must run before delivery, don't just check that it "starts")

"The dev server is up" does not equal "the page is correct". After starting, do a round of real self-check; when you find a problem, fix it in place before delivering:

1. **Browser self-check** (beyond build/types):
   - No console errors / no red warnings (including hydration, 404 resources, uncaught exceptions).
   - Key interactions actually work: navigation, form submission validation, tabs/filters/popovers/carousels all have real responses, not dead.
   - At three breakpoints (phone/tablet/desktop), no overlap, overflow, broken images, or unexpected horizontal scroll.
   - Images and fonts load; missing images have a fallback, not a broken-image icon.

2. **When you find a bug, fix it by process, don't blindly patch**:
   - **Reproduce**: pin down exactly which action / which width triggers the problem.
   - **Locate**: look at the console error stack, the network panel, the corresponding component/data/style; find the root cause first, not the symptom.
   - **Fix source → re-verify**: after the fix, rerun that scenario, confirm the problem is gone and no new problem was introduced (glance over adjacent pages while you're at it).

3. **When stuck, escalate; don't force it or pretend it's fixed**:
   - Same problem fixed twice and still not right → narrow the scope (bisect, build a minimal repro) or switch to a different implementation approach.
   - Genuinely constrained (e.g. some capability is impossible in pure frontend) → provide a usable fallback version, and in the delivery notes **honestly write out what wasn't done and why**, don't leave hidden broken features.

## Design-system consistency check (prevent drift)

- `docs/design-system.md` exists and records the personality, tokens, signature elements; `:root` is consistent with it.
- Colors, font sizes, spacing, and corner radii all come from `:root` tokens; **no scattered hex or magic numbers can be found across the whole project** (new pages have no temporary color tweaks / temporary font sizes).
- Randomly pick two pages and compare: palette, font-size hierarchy, spacing rhythm, and corner radii share the same source, with no drift starting.
- Signature elements are unified site-wide, bold only there and restrained elsewhere.
- Extension scenario: it's an incremental addition on the original project (no rebuilding the project, no changing the aesthetic).

## Structure check

- Route pages have not turned into giant single files.
- Repeated lists/cards/sections are data-driven.
- Shared presentation rules live in `lib/`.
- Images live in `public/`, with paths managed centrally.
- Style variables live in `globals.css`, with no multiple conflicting style systems.
- `docs/frontend-map.md` is updated: it records the routes/components/data/tokens added this time and the method for adding new pages.

## Visual & design-feel check

- Run through the three self-check questions in `references/design-craft.md` once.
- The brand signals from the reference material are visible above the fold; strip the content and look at just the skeleton, and the interface is still recognizable as "this business", not a generic template.
- None of the features on the avoid-AI-slop list: purple-blue gradients, gradient text, screen-full of rounded corners with big shadows and glassmorphism, the Hero→three-cards→testimonials→CTA formula, emoji as icons, fake placeholder copy.
- Colors come from `:root` variables: a neutral scale + one restrained primary accent; font sizes and weights have hierarchy, spacing follows a unified scale.
- Images have a stable aspect ratio, not relying on random cropping to prop up the layout.
- Long titles, button text, and form errors can all wrap or shrink.
- Fixed navigation, bottom buttons, and drawers don't obscure the body content.

## Interaction check

- Navigation links are clickable, and the current-page state is correct.
- Visible controls such as forms, tabs, filters, popovers, and carousels are not fake props; they have at least reasonable local state.
- Interactive elements have hover/focus-visible/active/disabled, plus empty/loading/error/missing-image fallbacks (see `references/interaction-motion.md`).
- Motion is restrained: only one main entrance moment, transitions use token durations, no screen-full fly-ins; `prefers-reduced-motion` takes effect.
- Icons share a consistent family, same size and same stroke width, with no emoji acting as functional icons; decorative icons use `aria-hidden`, information-bearing ones have `aria-label`.

## Accessibility basics

- Images have appropriate `alt`.
- Form labels and error messages are understandable.
- Tabs use `role="tablist"`, `role="tab"`, `aria-selected`.
- Popovers use `role="dialog"` and `aria-modal="true"`.
- Current navigation uses `aria-current`.

## Delivery notes

The final reply must include:

- What was done.
- Locations of key files.
- Verification commands and results.
- Local access URL.
- Entry points for adding pages, adding data, and swapping images later.
- The last line is always: `Current URL: ...`
