# Extending and Collaborating (When It Goes Beyond This Skill: Hand Off, Don't Refuse)

frontend-gen focuses on "generating/refining frontend projects," but users may come in from any direction—they want to deploy/go live, connect to or generate a backend, reproduce a UI from Figma. When you hit these, **don't stop at "I don't do that"**; catch it and let the user push the project from a single sentence all the way to going live, right inside this skill.

## General Collaboration Protocol (Three Steps)

1. **First, see what you've got on hand**: Is this capability already available as a skill or MCP (check the available skills list / configured MCPs)? If so, use it directly.
2. **If not, "discover + install with consent"**: Go to a skill index (such as awesome-claude-skills) or an MCP registry to find a **verified** `owner/repo` or server, **first tell the user what to install and why**, then install it after they agree—for skills use `npx skills add <owner/repo> -a claude-code` (project-level) or `-g` (global); for MCP, guide them to add the server in the Claude config. **Do not hardcode unverified repo names.**
3. **Hand off execution**: Use that skill/MCP to complete that part, then return to this skill to keep refining the project, and note one line in `docs/frontend-map.md` (what deploy/backend/design source was used).

## Scenario A: Deploy / Go Live

- Triggers: deploy, go live, deploy, publish online, put on a server.
- The artifact is a buildable project; deployment is a handoff. Pick the easiest path based on the stack:
  - Pure static / SSG (websites, portfolios) → **Netlify drag-and-drop**, **Cloudflare Pages / GitHub Pages** (easiest for beginners).
  - Next.js (including SSR/API) → **Vercel** (one-click via GitHub).
- Approach: if a deploy-type skill/CLI is available, use it; otherwise give beginners **step-by-step illustrated instructions they can follow** (sign up → connect repo or drag the build artifact → get the URL), or install a deploy skill with consent.
- Be honest: deployment requires logging into an account/authorization; the skill cannot fabricate credentials on their behalf. Guide the user to log in, let them fill in the keys themselves, and don't write them into the codebase.

## Scenario B: Backend / Real API / Generating Backend Code

- Triggers: connect a backend, need a database, login, payments, real API, replace fake data with real data, generate backend code.
- This skill is pure frontend + mock data, but **deliberately hides the data behind the type contract in `lib/content.ts`**—that is the "seam" for connecting a backend: when the backend is ready, only the data source changes, while components and pages stay untouched.
- Approach:
  - Connecting to an **existing API**: replace the mock in `lib/content.ts` with a fetch to the real API, keeping the return type identical, with zero changes to pages; put base URL/key in env.
  - **Lightweight backend** (form submission, simple read/write): you can spin up a shell with Next API routes / server actions; but leave the real business logic/database/auth to a backend-type skill.
  - **Standalone backend service / generating backend code**: discover and (with consent) install or invoke a backend-generation skill to do it; this skill keeps the data contract stable so frontend and backend line up.
- Always make clear how the frontend connects: the API shape, env configuration, loading state, and error state.

## Scenario C: Reproduce a UI from Figma

- Triggers: build from this Figma, reproduce the design, figma.com link, design-to-code, pull layers/images/icons.
- Approach:
  1. **Connect Figma**: guide the user to add the official **Figma MCP (Dev Mode MCP)** server and open the target file / select nodes in Figma; or use a Figma-related skill already in the environment (such as `figma-use`, `figma-generate-design`).
  2. **Fetch design context**: through the MCP/skill, pull node structure, dimensions, color and font variables, spacing, and export images and SVG icons.
  3. **Map into the design token system**: **map** Figma's variables/styles **to `:root` tokens** (colors/font sizes/spacing/radii), and export images and icons to `public/`—the reproduced UI naturally enters this skill's token system, consistent across pages and extensible (see `references/design-system.md`).
  4. Use this skill's components/data/routing to turn the design into a **maintainable project**, instead of cramming one design into a single component.
- When MCP is not connected: have the user provide screenshots/exported images + key values, extract per `references/source-intake.md`, and you can still do it—just less precise than with MCP.

## Principles

- **Catch any entry direction**: a single sentence, one Figma, an old site, an API doc—all first map back to "generate or refine this frontend project," and fill the missing capabilities per the protocol above, rather than leaving the user stuck at the boundary.
- Before installing any skill/MCP, first make clear what to install and why, **with consent**; accounts/keys are provided by the user.
- Write the handed-off parts back to `docs/frontend-map.md` so the next handoff has a record to go on.
