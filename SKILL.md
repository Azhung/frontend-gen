---
name: frontend-gen
description: 【生成/完善前端项目 · Frontend project generator】从一句话、参考 HTML、截图、Figma 设计稿、文案或旧原型，生成、重构、复刻或持续扩展纯前端 React/Next.js（或按需 Vite/Astro/纯 HTML）项目。适用：官网、落地页、H5、作品集、工具站、后台前端、原型/设计稿转项目、继续加页面、改版、按 Figma 还原 UI、响应式自适应、加 SEO、部署上线、对接真实后端——即使没明说“生成项目”也应触发。先查环境(含没装 Node 的小白引导)→选技术栈→锁定可复用的设计令牌系统(不漂移、不像 AI 套模板)→生成或续建(frontend-map 项目记忆、先读后改不重建)→交互/动效/图标→分级测试→SEO→自检修复→部署/后端/Figma 衔接其他 skill 或 MCP。 EN: End-to-end skill to generate, refactor, clone, or continuously extend pure-frontend React/Next.js (or Vite/Astro/plain HTML) projects from a one-line idea, reference HTML, screenshot, Figma design, copy, or old prototype. Use for websites, landing pages, marketing pages, portfolios, dashboard UI, design-to-code, Figma-to-UI, adding pages, redesigns, responsive layout, SEO, deployment, and wiring real backends — trigger even when the user does not explicitly say “generate a project”. Locks a reusable design-token system (no drift, no generic AI look), treats the project as sustainable engineering (project memory, read-before-edit, never rebuild), covers interaction/motion/icons, testing, SEO and self-repair, and hands off to other skills/MCP for deploy, backend, and Figma.
---

# Frontend Generation

> **Language**: Respond in the user's own language (Chinese, English, etc.) and write UI copy in their language. For non-technical users, explain in plain words, not jargon. Keep a CJK font stack in the design tokens so Chinese/Japanese/Korean text renders well even when the rest is English.

## Overview

Turn any input — even a single sentence — into a pure-frontend project that looks intentionally designed, runs immediately, and can be maintained going forward. The default output is Next.js App Router + TypeScript + plain CSS, using static/mock data, shared components, global style variables, clear routing, and a structure that supports continuously adding pages.

Four core principles, in priority order:

1. **It runs on the first try.** Beginner-facing: what you deliver must be a complete, installable project that opens with `npm run dev`, with no steps left for the user to fill in and no errors.
2. **System first, then pages.** Before writing any styles, lock in a design-token system (personality + color + type + scales + one signature element), written into `docs/design-system.md` and `:root`. This is both the source of "looks designed, not like an AI template" and the foundation for keeping many pages from drifting — every later page draws its values from this system instead of inventing a new aesthetic.
3. **Extensible and maintainable.** Build an extensible skeleton first, then the details: content goes in `data/`, rules in `lib/`, repeated UI in `components/`.
4. **Treat it as sustainable engineering, not a one-off demo.** `frontend-map.md` is the project's memory: read it first to decide "new build" vs "extend", and always update it at the end. When extending, reuse existing tokens/shell/components; never rebuild the project and never invent a new structure per page.

## Read as needed

- Design-token system (lock first, reuse across pages, prevent drift): `references/design-system.md`
- Design craft (design feel + avoiding AI slop): `references/design-craft.md`
- Interaction / motion / icons (restrained, serves understanding, consistent icon family): `references/interaction-motion.md`
- Organizing source material: `references/source-intake.md`
- Project architecture: `references/frontend-architecture.md`
- Adding pages (extend / prevent drift): `references/page-expansion.md`
- Testing (as needed, tiered, doesn't break runs-out-of-the-box): `references/testing.md`
- SEO optimization (a must for websites/landing pages; actually do it): `references/seo.md`
- Extend & hand off (deploy / backend / Figma — how to hand off and install other skills/MCP when out of scope): `references/extend-and-handoff.md`
- Verify & audit (tiered: fast default check + design-lint; opt-in deep a11y/perf/visual audit): `references/verify-audit.md`
- Delivery acceptance: `references/quality-gates.md`

## When to use

- The user provided reference HTML, screenshots, images, copy, page requirements, or an old prototype, and wants a React/Next frontend.
- The user wants a "pure-frontend project", "a static version first", "generate pages from materials", or "keep adding pages later".
- The user wants to turn a single-page prototype into a multi-page project architecture.
- The user wants to add pages, components, or data to an already-generated project.

## Scope & handoff (don't refuse when out of scope — hand off)

The core of this skill is "generate/improve a frontend project". The following go beyond the core, but **don't stop at "I can't do that" — hand off to the right skill/MCP per `references/extend-and-handoff.md` or guide the user**, so the project can go all the way to launch:

- **Deploy / go live** → recommend the simplest path per stack (static → Netlify/Cloudflare Pages, Next → Vercel); use a deploy skill if available, otherwise give the beginner steps or install one with consent.
- **Real backend / database / generating backend code** → keep this skill pure-frontend plus the `lib/content.ts` data seam, and hand the backend to a backend skill; when wiring an existing API, only swap the data source — components don't change.
- **Reproduce UI from Figma** → guide connecting the Figma MCP (or use a figma-related skill), pull nodes/variables/images/icons, **map them into the design-token system**, then build a maintainable project.
- **An existing mature codebase that requires following its framework** → read the existing project's conventions first and follow them; don't force the default skeleton.
- Only when the goal truly is "pixel-perfect reproduction of a single static visual" and a maintainable project isn't needed should you consider a pure visual-reproduction flow; this skill focuses on "maintainable project generation".

## Beginner-friendly: runs out of the box

The user likely doesn't code and won't fix the environment themselves. What you deliver must be a complete, ready-to-run project:

- **Check the runtime environment first; don't assume Node is installed**: before starting, run `node -v && npm -v`.
  - If missing/too old, walk this **install fallback chain** — always **with the user's consent**, and remember the AI can run CLI installs but **cannot click through GUI installers**, so step down the chain until one works:
    1. **Version manager, no admin needed (preferred — most AI-runnable end-to-end):** macOS/Linux — install nvm (`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`) then `nvm install --lts`; Windows — use `nvm-windows`. Avoids admin prompts; the AI can run the whole thing.
    2. **Package manager, if one already exists:** macOS `brew install node`; Windows `winget install OpenJS.NodeJS.LTS`; Linux the distro package manager (`apt`/`dnf`/…, may need `sudo`). Use only if that manager is already installed.
    3. **GUI installer — the user does this step:** if no CLI path works, give the [nodejs.org](https://nodejs.org) LTS link + the simplest click-through steps and explain the AI can't click a `.pkg`/`.msi`; the user installs, then comes back.
    4. **Zero-Node fallback:** if none of the above is possible (restricted/sandboxed, no install rights), deliver a pure static single-HTML version that needs no Node, and say so honestly.
    After any install, re-run `node -v && npm -v` to confirm before continuing.
  - Use whatever package manager is present (if pnpm/yarn exists, use it); don't force npm. If the port is taken, switch ports and say so.
  - A pure static single-page approach (a single HTML file) **needs no Node** — a reasonable fallback when a beginner has zero environment.
- No matter how brief the input, generate a **complete, runnable** project — don't give only fragments and don't leave TODO-style half-finished work.
- When the input is one sentence or vague, **don't stop to wait for clarification**: pick the most reasonable project type from the content (website / H5 / portfolio / tool / list+detail), write the assumptions into `docs/frontend-map.md`, and just build it. Only ask one question when "what kind of project this even is" is genuinely undeterminable and would decide the overall architecture.
- Dependencies must install and versions must be complete: provide `package.json`, `tsconfig.json`, `next.config.mjs` in full.
- Actually start the dev server to verify it opens, then give the user the local URL. If it doesn't run, fix it until it does — don't hand errors to the user.
- The final reply must always end with the current running URL, in the format: `Current URL: http://localhost:xxxx`. If it couldn't start, write: `Current URL: not started (reason: ...)`.
- Explain things in plain language: how to open it, which file to edit to change copy or images — don't assume the user knows the terms.

## Defaults

- **Stack is not locked; recommend per need and let the user choose**: when extending, read the existing project first and follow the stack and styling it already uses; don't force a switch. For a new build, recommend a **stack + 1 alternative** by project type and let the user pick; if a beginner doesn't choose, use the recommended default and just build (don't stall). See "Tech selection" below.
- **Default recommendation** (no clear preference): Next.js App Router + TypeScript + plain CSS (consistent output, reliable to start, SEO-friendly).
- **Styling as needed**: default to plain CSS + `:root` tokens; when the project type or user preference fits, or the existing project already uses it, Tailwind etc. are fine — don't reject what the user wants for the sake of "purity".
- Default to TypeScript (unless the user/existing project clearly uses JS).
- Stay pure-frontend: static data, local state, mock APIs, `public/` static assets; don't add a backend, database, payments, or auth services on your own.
- Prefer usable pages over vague landing pages, unless the user explicitly asks for a landing page.
- When materials are incomplete, you may generate a reasonable version first, but content, images, and data must be centrally managed for easy replacement later.
- **Responsive and mobile-first by default**: every page must hold up at three widths (phone/tablet/desktop); prefer fluid techniques (`clamp()`, `auto-fit/minmax`) and write fewer breakpoints, taking breakpoints only from the unified tokens. See the responsive section in `references/design-system.md`.

## Tech selection (for new builds)

If there's an existing project, follow it; only for a new build recommend by type, giving the user a "recommended + alternative" pick — if a beginner doesn't choose, use the recommended one and build:

| Project type | Recommended | Alternative | Notes |
| --- | --- | --- | --- |
| Website / landing / portfolio (SEO/first-screen heavy) | Next.js App Router + plain CSS | + Tailwind | Needs metadata/SSG/SEO; Next fits best |
| Multi-page content site / list+detail | Next.js App Router | Astro | Content-type, good for SEO and static generation |
| H5 / app-like marketing page | Next.js `(tabs)` + plain CSS | Vite + React | Single device, light interaction |
| Pure tool / single-page interaction (no SEO need) | Vite + React + TS | Next.js | Fast startup, lighter build |
| Minimal static page (no build need) | Single HTML + CSS + JS | Next.js | Don't put a heavy framework on one static page |

Use Tailwind, UI kits, etc. only when the user/existing project fits; don't reject them for "purity", and don't force a heavy framework onto a small project.

## Design defaults

Design feel isn't optional, and it must be "system first, pages second". For a new project, read `references/design-system.md` to lock the token system, then `references/design-craft.md` for the craft, and stick to:

- **Lock the system first**: before writing styles, set the personality in one sentence, produce a set of design tokens (neutral scale + one restrained primary accent, typeface pairing, type scale, spacing scale, radius/shadow/motion levels), and pick **one "signature element"** — bold there, quiet and restrained everywhere else. Write the system into `docs/design-system.md` and the `:root` of `app/globals.css`.
- **Reuse across pages**: afterward every page and component draws values from these tokens, no ad-hoc color tweaks or one-off font sizes. This is the basis for multi-page consistency and no drift.
- **Two-pass method**: once the tokens are drafted, first self-check against the "three generic AI default looks" (list in `references/design-system.md`), then write code; if you hit one, change it to a choice that fits this business.
- **Signature + restraint**: spend boldness only on the one signature element and keep the surroundings quiet; avoid purple-blue gradients, gradient text, screen-full rounded corners with big shadows and glassmorphism, the Hero→three-cards→testimonials→CTA formula, emoji as icons, and fake placeholder copy.
- **Self-check**: strip the content and look at just the skeleton — the interface should still be recognizable as "this business", not a generic template you could drop onto any business.

## Progress & ETA (tell the user where things stand)

Right after deciding new-build vs extend, tell the user the plan in one line — how many steps and a rough time estimate — then emit a short progress marker as you enter each step, so they always know where things are and what's left. Be honest that times are estimates; `npm install`, the build, network, and the optional deep audit are what dominate and vary.

Rough estimates (state a range, not a false-precision number):

| Task | Steps | Rough ETA (dominated by install/build/network) |
| --- | --- | --- |
| New build (Next + install + build + verify) | ~7 | ~3–8 min |
| Extend an existing project (add a page) | ~3 | ~1–3 min |
| Zero-Node single-HTML fallback | ~1 | < 1 min |
| + optional deep audit | +1 | +1–3 min |

Format:
- Start line: `Plan: 7 steps · est. ~4–8 min (npm install/network dominates)`
- Per step: `▸ [3/7] Lock the design system…`
- If a step runs long (install, build, audit) or hits a snag, say so instead of going silent or pretending it's instant.

## Workflow

This is an execution checklist, not a suggestion.

0. **First decide: new build or extend (this determines the whole path)**
   - The current directory/project **already has `docs/frontend-map.md` or `package.json`** → this is **extend**: read `docs/frontend-map.md` and `docs/design-system.md` first, and per `references/page-expansion.md` add pages/components incrementally onto the existing project, **reusing existing tokens and shell — never re-scaffold the project, never start a new aesthetic**. Then jump to the incremental implementation after step 5.
   - Otherwise it's a **new build**: follow the full 1→7 flow below.
   - If you can't tell, read the user's wording: "add an X page / on the current project…" = extend; "build an X site / make a project from this" = new build.

1. **Confirm the brief**
   - Look at reference HTML, screenshots, images, copy, requirements, brand info, the page list, and the target device.
   - If there are local files, read them before designing.
   - If online URLs or latest info are involved, verify online first.
   - Don't stop when the input is brief: pick the most reasonable project type, write down assumptions, and just build.
   - When info is missing but not blocking, write the assumptions explicitly and continue.

2. **Lock the design system (system first, then pages)**
   - Read `references/design-system.md` and `references/design-craft.md`.
   - Write the project's personality in one sentence, and produce the full token set: neutral scale + one primary accent, typeface pairing, type scale, spacing scale, radius/shadow/motion levels, **responsive tokens (breakpoints + container + fluid type/grid)**; and pick **one signature element**.
   - Self-check against the "three generic AI default looks" to confirm each choice fits this business, not a generic default.
   - Write the system into **both** `docs/design-system.md` (the human-readable decision record) and the `:root` of `app/globals.css` (the machine-facing tokens). Every later page draws only from here.

3. **Define routing**
   - Write a short page map first.
   - Name routes close to the business, not just for technical convenience.
   - Decide which pages share navigation, header, footer, bottom tabs, or shell layout.

4. **Build the skeleton**
   - Use `app/`, `components/`, `lib/`, `data/`, `public/`.
   - Put repeated content into typed data files first; don't scatter it across JSX.
   - Put presentation rules, mapping rules, and formatting rules in `lib/`.
   - Styles use only the tokens locked into `:root` in step 2; don't write scattered hex or magic numbers in components; if something is missing, add a level back into the token system rather than hardcoding it ad hoc.

5. **Build shared UI first (including interaction/motion/icons)**
   - Build the page shell, navigation, buttons, cards, sections, media containers, empty states, and form controls first.
   - Extract a component the second time a piece of UI appears; page-level base structures can be extracted early.
   - Use design variables throughout, with complete `hover/focus-visible/active/disabled` plus empty/loading/error states.
   - Per `references/interaction-motion.md`: keep motion **restrained** (only one main entrance moment, token durations, respect `prefers-reduced-motion`, no full-screen fly-ins); use a **consistent icon family** (e.g. lucide), draw custom/brand icons as inline SVG, and **don't use emoji as functional icons**.

6. **Implement pages**
   - Each route page reads centralized data and composes shared components.
   - Cards, images, fixed bars, and grids must have stable sizes or responsive constraints.
   - Provide reasonable placeholders and empty states for missing copy, images, or data.
   - Arrange section order and density by content; don't apply a generic template layout.

7. **Verify delivery + update project memory (must run; must leave a memory)**
   - Run type check / build; if there's no script, `npx tsc --noEmit`.
   - **Testing (as needed, don't break runs-out-of-the-box)**: when the project has logic/critical flows or the user requires it, add tiered tests per `references/testing.md` and run them green; a purely static site can rely on browser self-check only.
   - **SEO (websites/landing/content sites)**: per `references/seo.md`, **actually do** the SEO basics (per-page metadata, OG image, sitemap/robots, semantics, alt), not just advise.
   - **Start the dev server to verify when you can**: if the environment allows, actually start it, confirm it opens, give the local URL, and fix until it runs; when the environment is restricted (e.g. a sandbox can't start servers), at least pass type/build, give the user clear local startup steps and the expected URL, and **honestly state you didn't start it yourself**.
   - Run the "self-check & repair" in `references/quality-gates.md` (no console errors, key interactions work, no breakage at three widths); when you find a bug, "reproduce → locate → fix source → re-verify", don't just check that it "starts"; when stuck, narrow scope or ship a degraded version and say so honestly.
   - **Verify (tiered, see `references/verify-audit.md`)**: by default run the light path — the self-check above plus the fast static `node scripts/design-lint.mjs <projectDir>` to catch design-token drift (cheap, every run). Run the **deep audit** (axe a11y + performance + 3-width visual, capped at 2 fix passes) **only on demand** — when going to production / a real website, or when the user asks. Don't run heavy audits on every quick generation, and don't add audit tools to the project's deps.
   - Then run the delivery checklist in that file (design-system consistency, design feel, avoiding AI slop, SEO).
   - **Closing loop (the key to sustainability)**: write the routes/components/data/token changes from this round back into `docs/frontend-map.md`; if the token system changed, update `docs/design-system.md` too. The next extension relies on these two files to carry on, with no starting over.
   - Explain in plain language which file to edit later to add pages, add data, or swap images.
   - The last line of the final reply must be the current URL: `Current URL: http://localhost:xxxx`; if there's no URL, also state it: `Current URL: not started (reason: ...)`.

## File placement

| Need | Default location |
| --- | --- |
| Route page | `app/<route>/page.tsx` |
| Shared layout | `app/layout.tsx`, `app/(site)/layout.tsx`, `app/(tabs)/layout.tsx` |
| Generic component | `components/` or `app/components/` |
| A business-domain component | `components/<domain>/` |
| Static content / mock data | `data/` |
| Shared JS / pure functions | `lib/` |
| Client-state hook | `hooks/` |
| Images/fonts/static assets | `public/` |
| Global style variables (where tokens live) | `:root` in `app/globals.css` |
| Design-token decision record | `docs/design-system.md` |
| Project memory / maintenance notes | `docs/frontend-map.md` |

## Deliverables

- A runnable frontend project, or incremental changes to an existing project.
- Route pages, shared components, static data, shared helpers, global styles.
- `docs/frontend-map.md`: records routes, components, data, assets, and how to add new pages.
- The local run URL; if it can't start, explain the blocker and what was completed.
- The final reply ends with one line stating the current URL.

## Common mistakes

| Mistake | Right approach |
| --- | --- |
| Dumping reference HTML into one component | Split into routes, data, components, and helpers. |
| Building only the page in front of you | Set up the structure for adding pages later at the same time. |
| Hardcoding all copy in JSX | Put reusable content into `data/`. |
| Generating a style unrelated to the reference material | Extract colors, typography, spacing, and component rhythm from the reference. |
| Applying a generic template (purple-blue gradients, screen-full rounded shadows, Hero→three-cards→CTA) | Set the personality first, arrange by content, follow `references/design-craft.md` to avoid AI slop. |
| Stopping to ask repeatedly because input is too brief | Pick the most reasonable project type, write down assumptions, and just build a complete project. |
| Delivering a project that won't install or won't open | Provide complete deps and config, actually start the dev server to verify before delivering. |
| Adding backend complexity to a frontend need | Use static/mock data and local state. |
| Inventing a separate structure for every new page | Reuse the route map, page shell, components, and data contracts. |
| Not writing a token system, tweaking colors/sizes as you go | Lock `docs/design-system.md` + `:root` tokens first; every page draws from them. |
| When extending, ignoring the existing project and rebuilding (or switching aesthetics) | Read `frontend-map.md` + `design-system.md` first, reuse tokens and shell, add incrementally. |
| Adding ad-hoc hex / magic numbers / new font sizes on a new page | Add a level back into the token system, then reference it; keep cross-page consistency, no drift. |
| Bold elements covering the whole page | Spend boldness on one signature element only, restrained elsewhere. |
| Not updating `frontend-map.md` at the end | Every delivery writes the added routes/components/data/tokens back, to carry on next time. |
