# Verify & Audit (tiered — keep everyday output fast)

Two levels of verification. **Default is light and runs every time; the deep audit is opt-in** so normal generation stays fast and dependencies stay minimal.

## Level 1 — Light self-check (default, every run, fast)

Already required by `quality-gates.md`. Adds one cheap static check:

- Browser self-check: no console errors, key interactions work, no breakage at 3 widths.
- **`design-lint` (bundled, static, milliseconds)** — detect design-token drift (hardcoded colors instead of `:root` tokens):
  ```bash
  node scripts/design-lint.mjs <projectDir>
  ```
  Fix or tokenize anything it reports; suppress a deliberate literal with `/* design-lint-ok */`. This makes "no drift" a verifiable gate, not a slogan, at near-zero cost.

That's it for the default path — no heavy deps, no extra minutes.

## Level 2 — Deep audit (opt-in only)

Run this **only** when: the user asks for it, the project is going to production / is a real website, or a quality gate is explicitly requested. **Do not run it on every quick generation** — it adds minutes and tools.

Use no-install / `npx` tooling so nothing heavy is added to the project's `package.json`.

1. **Accessibility (axe-core)** — run axe against each route in a headless browser.
   - Pass bar (default): **0 serious/critical** violations.
   - Common auto-fixes: missing `alt`, low contrast, missing labels/roles, non-focusable controls.
2. **Performance** — from the production build + a headless measure.
   - Cheap signals first: build output JS size (warn if first-load JS is large for a content site), image dimensions/format.
   - If deeper: `npx lighthouse <url> --only-categories=performance,accessibility --quiet` for LCP / CLS / scores.
   - Pass bar (default, tune per project): LCP < 2.5s, CLS < 0.1, no oversized first-load bundle.
3. **Visual** — screenshot each key route at 375 / 768 / 1280; confirm no overflow/overlap/broken images.

### Closed loop (capped — don't loop forever)

```
run audits → if any fail: locate root cause → fix source → re-run → at most 2 fix passes
```

If it still fails after 2 passes, **stop and report honestly**: list the remaining violations, why, and the suggested fix — don't silently ship or fake a pass.

## Reporting

- Light path: one line, e.g. `design-lint: clean · self-check: ok at 3 widths`.
- Deep path: a short scorecard — a11y (violations), perf (LCP/CLS/bundle), visual (3 widths) — plus what was fixed and anything still open.
- Note in `docs/frontend-map.md` which level was run, so the next session knows the baseline.

## Why this design
- **Fast by default**: only the light path runs every time; `design-lint` is static and instant.
- **Not bloated**: this file is read only when auditing; deep-audit tools are `npx`/dev-only, never added to project deps.
- **Wow when it matters**: for a real ship, the closed loop with real a11y/perf/visual metrics is the part that turns "looks done" into "measurably correct".
