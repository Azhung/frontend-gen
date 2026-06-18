# Testing (on demand, tiered, without breaking "runs out of the box")

Whether to write tests, and how far to go, depends on whether the project contains "logic that can go wrong." **Tests are an enhancement; they must never leave a beginner with a project that won't install or won't run**—so by default follow the tiers below, and don't mindlessly apply the full suite.

## First decide whether to test

| Project situation | Testing strategy |
| --- | --- |
| Purely presentational static site (official site, portfolio, landing page, almost no logic) | **Can skip automated tests**; rely on the browser self-check from `quality-gates.md` |
| Has pure logic (formatting, filtering, slug lookup, price/score calculation in `lib/`) | Write **unit tests** for `lib/` (best value for the effort) |
| Has key reusable components (forms, card lists, tabs, modals) | Add **component tests** as appropriate |
| Has core user flows (checkout, multi-step forms, login state switching, complex interactions) | Add **E2E** for the 1–2 most critical flows |
| User **explicitly requests** test coverage | Apply the corresponding tier per their request |

Principle: **ensure it runs out of the box first, then talk about tests**. Don't force Playwright onto a static official site and get the beginner stuck on environment setup.

## How to do each tier (stay lightweight)

### Unit tests (first choice, covering pure functions in `lib/`)
- Tool: **Vitest** (integrates well with both Vite/Next, fast startup).
- Test only the input→output and edge cases of pure functions (empty arrays, not found, invalid input).
- Scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

```ts
import { describe, it, expect } from "vitest";
import { bySlug } from "../lib/content";

describe("bySlug", () => {
  it("returns the matching item on a hit", () => {
    expect(bySlug([{ slug: "a" }], "a")).toEqual({ slug: "a" });
  });
  it("returns null when not found", () => {
    expect(bySlug([{ slug: "a" }], "x")).toBeNull();
  });
});
```

### Component tests (optional)
- Tool: Vitest + `@testing-library/react`.
- Test only components with real behavior: rendering key content, state changes after click/input, empty states appearing. Don't test purely static presentational components.

### E2E (only for complex-interaction projects)
- Tool: **Playwright**. Cover only the 1–2 most core user paths (e.g., "home → detail → submit form").
- Don't aim for full-site coverage; E2E is slow and brittle, so covering the critical paths is enough.

## Delivery conventions
- If you wrote tests, configure the scripts in `package.json` and write "how to run the tests (e.g. `npm test`)" in the delivery notes.
- Before delivery, **at least make the tests you wrote pass** (green); if they fail, fix them first.
- For projects without automated tests, you must do a round of real-browser self-check per the "self-check and fix" section of `quality-gates.md` as a substitute.
- Note in `docs/frontend-map.md` a line on "what was tested and how to run it," to make later handoff easier.
