# SEO 优化（官网/落地页/内容站：直接动手做，不只是提示）

只要项目是**官网、落地页、作品集、内容/列表站**这类要被搜索引擎和分享卡片收录的，SEO 基础就**默认做掉**（不是等用户问）。纯内部工具/单页交互无 SEO 诉求的可跳过本篇。

下面以 Next.js App Router 为例；其它框架用等价手段（`<head>` 标签、`react-helmet`、Astro 的 frontmatter 等）。

## 必做清单（基础，默认全做）

1. **每页 metadata**：标题、描述各页不同、贴内容。标题模板 `页面名 · 站点名`。
   ```ts
   // app/layout.tsx
   export const metadata = {
     metadataBase: new URL("https://example.com"),
     title: { default: "站点名 — 一句话定位", template: "%s · 站点名" },
     description: "150 字内、含关键信息的站点描述",
   };
   // app/about/page.tsx
   export const metadata = { title: "关于我们", description: "本页描述" };
   ```
   描述集中放 `data/site.ts`，各页引用，别散写。
2. **Open Graph + Twitter Card**（决定微信/X/FB 分享卡片好不好看）：
   ```ts
   openGraph: { title: "...", description: "...", url: "/", siteName: "站点名",
     images: [{ url: "/og.png", width: 1200, height: 630 }], type: "website" },
   twitter: { card: "summary_large_image", title: "...", description: "...", images: ["/og.png"] },
   ```
   放一张 `public/og.png`（1200×630）；没有素材就用品牌色 + 站点名生成一张占位。
3. **语义化 HTML**：`header/nav/main/section/article/footer`、标题层级 `h1→h2→h3` 不跳级、每页**仅一个 `h1`**。
4. **图片**：都带贴切 `alt`（装饰图用空 `alt=""`）；定宽高比防 CLS；首屏图 `priority`，其余懒加载。
5. **canonical**：每页规范链接，避免重复内容（`alternates: { canonical: "/path" }`）。
6. **sitemap.xml + robots.txt**：
   ```ts
   // app/sitemap.ts
   export default function sitemap() {
     return [{ url: "https://example.com/", lastModified: new Date() } /* 列出各路由 */];
   }
   // app/robots.ts
   export default function robots() {
     return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://example.com/sitemap.xml" };
   }
   ```
7. **lang 与基础可访问性**：`<html lang="zh-CN">`；可点元素可聚焦、focus 可见（a11y 也利于 SEO）。

## 视情况做（按业务）
- **结构化数据 JSON-LD**：本地商家、文章、产品、FAQ、面包屑等——能拿富媒体结果时才加，别硬塞。
- **性能（影响排名与体验）**：控制首屏体积、字体 `font-display: swap`、避免巨图、移动端达标。
- 多语言站点用 `alternates.languages` 做 hreflang。

## 交付与防漂移
- `metadataBase` / 站点 URL / 默认描述集中在 `data/site.ts`，换域名只改一处。
- 新增页面时**顺手补该页 metadata 并更新 sitemap**（写进 `page-expansion.md` 的清单意识里）。
- 交付说明里写一句"SEO 做了哪些、上线前要把 `metadataBase`/OG 图换成真实的"。

## 验收（并入 quality-gates）
- 每个页面有独立 title/description；首屏有 `h1`；图片有 alt。
- 有 sitemap.xml、robots.txt、canonical；OG 图存在且 1200×630。
- 站点 URL/描述来自 `data/site.ts`，没有写死散落。
