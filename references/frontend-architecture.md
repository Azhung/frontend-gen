# 项目架构

生成新纯前端项目时读这一份。下面以默认推荐栈 **Next.js App Router + TS + 纯 CSS** 为例；若按 SKILL.md「技术选型」选了别的栈（Vite/Astro/单 HTML 或加了 Tailwind），骨架与命名按该栈的社区约定走，但"路由清晰、数据可编辑、组件可复用、样式有令牌、公共逻辑可测、新页面有固定追加法"这些**目标不变**。

## 架构目标

生成的不是“单页 demo”，而是可继续开发的前端项目：

- 路由清晰。
- 数据可编辑。
- 组件可复用。
- 样式有变量和命名规则。
- 公共 JS 可测试。
- 新页面有固定追加方法。

## 推荐骨架

```text
project/
  package.json
  next.config.mjs
  tsconfig.json
  README.md
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
  components/
    layout/
    ui/
    sections/
    cards/
  data/
    site.ts
    navigation.ts
    pages.ts
  lib/
    assets.ts
    content.ts
    format.ts
    routes.ts
  hooks/
  public/
    images/
  docs/
    design-system.md
    frontend-map.md
```

`docs/design-system.md` 是设计令牌的决策记录（见 `references/design-system.md`），`docs/frontend-map.md` 是项目记忆。两份都是"完整项目/持续加页面"交付物的一部分。

移动端 H5 / App-like 项目可用路由组：

```text
app/
  (tabs)/
    layout.tsx
    page.tsx
    explore/page.tsx
    cart/page.tsx
    me/page.tsx
  product/[slug]/page.tsx
```

## 默认依赖

尽量少依赖：

- `next`
- `react`
- `react-dom`
- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`

如果项目已有图标库就复用；允许新增时优先 `lucide-react`。

默认脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  }
}
```

## 数据契约

重复 UI 先定义类型化数据：

```ts
export type NavItem = {
  label: string;
  href: string;
};

export type CardItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
};
```

使用稳定 `id` 和 `slug`，让后续加详情页不用重写组件契约。

推荐数据文件：

| 文件 | 内容 |
| --- | --- |
| `data/site.ts` | 站点名、描述、联系方式、社媒、SEO 默认值。 |
| `data/navigation.ts` | 顶部导航、底部导航、页脚导航。 |
| `data/pages.ts` | 页面区块和静态文案。 |
| `data/items.ts` | 商品、案例、文章、服务等列表数据。 |

数据字段要贴近业务，但保留常用通用字段：`id`、`slug`、`title`、`description`、`image`、`href`、`tags`、`meta`。

## 组件边界

| 类型 | 负责什么 |
| --- | --- |
| Route page | metadata、路由组合、选择数据。 |
| Layout | 页头、导航、页脚、Tab、页面外壳。 |
| Section | Hero、图库、功能列表、FAQ 等页面分区。 |
| UI primitive | Button、Input、Sheet、Tabs、Card、Badge、EmptyState。 |
| Pure helper | 格式化、筛选、slug 查询、分组、展示标签。 |
| Client component | 状态、浏览器 API、动画、本地存储、表单交互。 |

默认用 Server Component。只有需要状态、事件、effect、浏览器 API 时才加 `'use client'`。

## 路由规范

- 首页：`app/page.tsx`。
- 主导航页：`app/<name>/page.tsx`。
- App-like Tab：`app/(tabs)/<name>/page.tsx` + `app/(tabs)/layout.tsx`。
- 详情页：`app/<domain>/[slug]/page.tsx`。
- 表单/流程页：`app/<action>/page.tsx`。
- 静态说明页：`app/<topic>/page.tsx`。

每个页面尽量只做三件事：选数据、组合组件、声明 metadata。复杂交互下放给 Client Component。

## CSS 系统

`app/globals.css` 负责：

- `:root` 变量：颜色、文字、间距、圆角、阴影、容器宽度。
- 基础字体和页面背景。
- 共享布局 class。
- UI 基础组件 class。
- 页面/业务域前缀 class。

推荐变量形态：

```css
:root {
  --bg: #ffffff;
  --surface: #f7f7f5;
  --text: #181818;
  --muted: #666666;
  --border: #e8e4dc;
  --accent: #111111;
  --radius: 8px;
  --container: 1120px;
}
```

不要做单一色系刷屏。用中性色 + 一个主强调色 + 必要状态色。

命名建议：

- `site-`：站点级布局。
- `nav-`：导航。
- `section-`：通用页面分区。
- `card-`：卡片。
- `form-`：表单。
- 业务域可用自己的前缀，如 `product-`、`case-`、`profile-`。

固定栏、底部导航、移动端抽屉要考虑 `env(safe-area-inset-bottom)`。

## 公共 JS

出现两次或容易回归的逻辑，放公共 helper：

- `lib/routes.ts`：路由常量、导航激活判断。
- `lib/format.ts`：金额、日期、数量、文本截断。
- `lib/content.ts`：按 slug 查询、列表分组、兜底文案。
- `lib/assets.ts`：图片兜底规则。
- `hooks/useToast.ts` 或 `components/ui/Toast.tsx`：临时反馈。

公共 helper 尽量保持纯函数，方便测试和复用。

示例：

```ts
export function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug) ?? null;
}
```

不要把筛选、排序、格式化、slug 查询写散在 JSX 里。

## 延续文档

生成并持续维护 `docs/frontend-map.md`，把它当**项目记忆**（续建时先读、收尾必更）。记录：

- 路由地图。
- **组件清单**：每个共享组件叫什么、放哪、被哪些页面用——续建时先查这里，能复用就不新建。
- 数据文件和字段形状。
- 图片目录。
- 新增页面步骤。
- 指向 `docs/design-system.md` 的令牌系统（颜色/字体/刻度/签名元素的事实来源）。

用户要求“完整项目”“后续持续加页面”时，这个文档是交付物的一部分。每次新增/改动后，把变化写回这里，下次续建靠它接力。

## README 最小内容

项目根 README 至少写：

- 项目用途。
- 本地启动命令。
- 目录说明。
- 如何新增页面。
- 如何替换文案和图片。
