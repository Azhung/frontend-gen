# frontend-gen

> 🌐 **English** · [中文](README.zh-CN.md)

`frontend-gen` is a frontend skill that generates or continuously extends pure-frontend React / Next.js projects from reference HTML, screenshots, images, copy, a requirements note, or a one-line idea. Works with **Claude Code** and **Codex**.

## Why frontend-gen — the pain it solves

- Still agonizing over the **right prompt** to get AI to generate a frontend page or project?
- Still can't get AI to produce a **developer-grade** frontend — not a one-file template that won't even run?
- Not a frontend dev, but need a real, runnable, good-looking project?

This skill is built for exactly that — it turns AI from "spits out snippets" into "ships a real project":

| Your pain | How frontend-gen solves it |
| --- | --- |
| Don't know how to prompt for a good frontend | A built-in end-to-end workflow — even a one-line idea yields a complete project |
| AI dumps one giant file / a template that won't run | Generates a structured, runnable, maintainable project (routes / components / data / lib) |
| Output looks generic, "obviously AI" | Locks a design-token system + anti-AI-slop rules so it looks intentionally designed |
| Add one page and the style drifts / breaks | Project memory + anti-drift: read-before-edit, reuse tokens, never rebuild |
| Generated project won't install / run (no Node) | Environment check + beginner install guidance + a zero-setup single-HTML fallback |
| Don't know how to deploy / connect a backend / rebuild from Figma | Hands off to the right skill/MCP and walks you to launch |
| Not responsive, no SEO | Responsive by default + SEO done automatically for websites |

In short: **describe what you want in one sentence — get a runnable, maintainable, shippable frontend project, even if you don't write frontend code.**

It's good for:

- Building a Next.js App Router frontend project from scratch
- Refactoring HTML / old prototypes into a maintainable React / Next project
- Generating PC web pages, responsive websites, mobile H5, portfolios, and tool-style frontends from screenshots, images, copy, and requirements
- Continuously adding pages while keeping a consistent routing, component, data, and style structure

## Install

**Recommended — install straight from GitHub (Claude Code & Codex):**

```bash
npx skills add Azhung/frontend-gen -a claude-code   # Claude Code (per-project)
npx skills add Azhung/frontend-gen -a codex         # Codex
npx skills add Azhung/frontend-gen -a both -g        # both + global
```

After installing, **start a new session** so it gets picked up.

**Manual (from a local clone):** copy the whole `frontend-gen` folder into the skills directory.

```bash
# Codex
mkdir -p ~/.codex/skills && cp -R frontend-gen ~/.codex/skills/
# Claude Code
mkdir -p ~/.claude/skills && cp -R frontend-gen ~/.claude/skills/
```

Then restart Codex / Claude Code. Make sure the structure looks like:

```text
~/.codex/skills/frontend-gen/   (or ~/.claude/skills/frontend-gen/)
  SKILL.md
  agents/
  references/
```

Notes:

- `SKILL.md` and `references/` are the core content used by both Claude Code and Codex.
- `agents/openai.yaml` is Codex/OpenAI interface metadata; Claude Code ignores it, and keeping it doesn't affect usage.
- **Copy the whole folder, not just `SKILL.md`.**
- The plain Claude.ai web app usually can't install a local skill folder; paste the contents of `SKILL.md` into Project instructions or the chat context instead.

## Usage

Generate a project from scratch:

```text
Use frontend-gen to build a Next.js pure-frontend project from scratch.

Project type: responsive marketing website (PC)
Pages: Home, Product list, Product detail, About, Contact
Requirements: TypeScript, plain CSS, component encapsulation, static data in data/, shared functions in lib/, easy to keep adding pages
```

Generate a project from HTML:

```text
Use frontend-gen to turn this HTML into a maintainable Next.js frontend project.

Requirements:
- Don't dump the HTML into one giant component
- Extract routes, components, data, lib, and public images
- Generate docs/frontend-map.md
- Start the dev server and give me the local URL
```

Keep adding pages:

```text
Use frontend-gen to add a /cases list page and a /cases/[slug] detail page to the current project.

Requirements:
- Read docs/frontend-map.md first
- Reuse existing components and styles
- Put case data in data/cases.ts
- Update the navigation and docs/frontend-map.md
```

## Default output

By default it generates or maintains this structure:

```text
project/
  app/
  components/
  data/
  lib/
  hooks/
  public/
  docs/
    design-system.md
    frontend-map.md
```

Default tech choices (recommended; not locked — see "Tech selection" in SKILL.md):

- Next.js App Router
- React
- TypeScript
- Plain CSS + `:root` design tokens
- Static / mock data
- Local state

It won't add a backend, database, auth, or payment services on its own. Tailwind, shadcn, or large UI kits are used only when the project type or your preference fits, or when an existing project already uses them.

## Delivery conventions

When this skill runs, it should:

- Generate a complete, runnable project, not code fragments
- Extract components, data, and shared functions
- Lock a design-token system first, then keep every page consistent (no drift)
- Cover responsive layout, interaction/motion, and a consistent icon set
- Do SEO basics for websites/landing pages, and add tiered tests when there's real logic
- Run type check and build, start the local dev server, and self-check & repair in the browser
- End the final reply with the current URL on the last line

Example:

```text
Current URL: http://localhost:3000
```

If it can't start:

```text
Current URL: not started (reason: dependency install failed)
```

## Skill file structure

```text
frontend-gen/
  SKILL.md
  agents/
    openai.yaml
  references/
    design-system.md         # lock a design-token system, reuse across pages, prevent drift
    design-craft.md           # design feel + avoiding AI slop
    interaction-motion.md     # restrained interaction, motion & a consistent icon set
    source-intake.md          # organizing source material
    frontend-architecture.md  # project architecture
    page-expansion.md         # adding pages / preventing drift
    testing.md                # tiered, optional testing
    seo.md                    # SEO for websites/landing pages
    extend-and-handoff.md     # deploy / backend / Figma handoff to other skills/MCP
    quality-gates.md          # delivery acceptance
```

## Scope

Good for:

- PC web pages
- Responsive websites
- Mobile H5
- Portfolios
- Tool-style frontends
- Static e-commerce prototypes
- Multi-page content sites

Beyond the frontend itself — **deployment, real backends/APIs, and Figma-to-UI reproduction** — the skill doesn't build these in-house, but it doesn't stop there either: it hands off to the right skill/MCP (or guides you) per `references/extend-and-handoff.md`, keeping a clean data seam so the frontend connects later. Things it deliberately leaves to a dedicated backend skill: real databases, payments, auth, and CMS admin backends.

## Language

The skill responds in the user's own language (Chinese, English, etc.) and keeps a CJK font stack in the design tokens, so it works well for both global and Chinese users.

## License

MIT
