# SEO Optimization (websites/landing pages/content sites: actually implement, don't just advise)

As long as the project is a **website, landing page, portfolio, or content/listing site**—the kind meant to be indexed by search engines and rendered as share cards—do the SEO basics **by default** (don't wait for the user to ask). Purely internal tools or single-page interactive apps with no SEO needs can skip this section.

The examples below use the Next.js App Router; for other frameworks, use equivalent means (`<head>` tags, `react-helmet`, Astro frontmatter, etc.).

## Must-do checklist (basics, all done by default)

1. **Per-page metadata**: title and description differ per page and match the content. Title template `Page Name · Site Name`.
   ```ts
   // app/layout.tsx
   export const metadata = {
     metadataBase: new URL("https://example.com"),
     title: { default: "Site Name — one-line positioning", template: "%s · Site Name" },
     description: "Site description within 150 chars, including key information",
   };
   // app/about/page.tsx
   export const metadata = { title: "About Us", description: "This page's description" };
   ```
   Centralize descriptions in `data/site.ts` and reference them from each page; don't scatter them around.
2. **Open Graph + Twitter Card** (determines how good the WeChat/X/FB share card looks):
   ```ts
   openGraph: { title: "...", description: "...", url: "/", siteName: "Site Name",
     images: [{ url: "/og.png", width: 1200, height: 630 }], type: "website" },
   twitter: { card: "summary_large_image", title: "...", description: "...", images: ["/og.png"] },
   ```
   Add a `public/og.png` (1200×630); if you have no asset, generate a placeholder using the brand color + site name.
3. **Semantic HTML**: `header/nav/main/section/article/footer`, heading hierarchy `h1→h2→h3` without skipping levels, and **only one `h1`** per page.
4. **Images**: all carry a fitting `alt` (use empty `alt=""` for decorative images); set a fixed aspect ratio to prevent CLS; use `priority` for above-the-fold images and lazy-load the rest.
5. **canonical**: a canonical link per page to avoid duplicate content (`alternates: { canonical: "/path" }`).
6. **sitemap.xml + robots.txt**:
   ```ts
   // app/sitemap.ts
   export default function sitemap() {
     return [{ url: "https://example.com/", lastModified: new Date() } /* list each route */];
   }
   // app/robots.ts
   export default function robots() {
     return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://example.com/sitemap.xml" };
   }
   ```
7. **lang and basic accessibility**: `<html lang="zh-CN">`; clickable elements are focusable, focus is visible (a11y also helps SEO).

## Do as appropriate (per business)
- **Structured data JSON-LD**: local business, articles, products, FAQ, breadcrumbs, etc.—add it only when you can earn rich results, don't force it in.
- **Performance (affects ranking and experience)**: control above-the-fold weight, `font-display: swap` for fonts, avoid huge images, meet mobile standards.
- Multilingual sites use `alternates.languages` for hreflang.

## Delivery and drift prevention
- `metadataBase` / site URL / default description are centralized in `data/site.ts`; switching domains means changing only one place.
- When adding a page, **fill in that page's metadata and update the sitemap as you go** (build this into the checklist mindset in `page-expansion.md`).
- In the delivery notes, include a line on "what SEO was done, and that `metadataBase`/OG image must be swapped for the real ones before going live."

## Acceptance (folded into quality-gates)
- Every page has its own title/description; the above-the-fold area has an `h1`; images have alt.
- sitemap.xml, robots.txt, and canonical exist; the OG image exists and is 1200×630.
- Site URL/description come from `data/site.ts`, not hardcoded and scattered around.
