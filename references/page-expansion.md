# 继续加页面

给已有生成项目继续加页面时读这一份。

## 先判断扩展类型

| 需求 | 做法 |
| --- | --- |
| 加一个静态页面 | 新增 route + 复用 Section/UI + 更新导航。 |
| 加一个列表页 | 先扩 `data/` 类型和数据，再建列表组件。 |
| 加详情页 | 建 `[slug]` route，用 `lib/content.ts` 查数据。 |
| 加流程页 | 拆成步骤数据、表单组件、状态 helper。 |
| 加很多同类页面 | 先抽数据模型和通用布局，再批量建 route。 |

## 扩展流程

1. 有 `docs/frontend-map.md` 就先读。
2. 找最相近的已有 route 和共享组件。
3. 判断是静态页、列表页、详情页、表单页还是流程页。
4. 先扩数据模型，再写页面 JSX。
5. 复用现有页面外壳、导航、分区组件和 UI primitives。
6. 需要被访问时，才更新导航。
7. 补 metadata、空状态和缺图兜底。
8. 跑类型检查/构建。
9. 更新 `docs/frontend-map.md`。

## 路由选择

| 页面类型 | 路由模式 |
| --- | --- |
| 主导航页面 | `app/<name>/page.tsx` 或 `app/(tabs)/<name>/page.tsx` |
| 详情页 | `app/<domain>/[slug]/page.tsx` |
| 表单/流程页 | `app/<action>/page.tsx` |
| 静态说明/帮助页 | `app/<topic>/page.tsx` |
| 嵌套栏目 | `app/<domain>/<section>/page.tsx` |

没有共享布局、导航或 metadata 需求时，不要随便建 route group。

## 组件抽取

出现这些情况就抽组件：

- 同一分区出现在两个页面。
- 卡片、列表、表格有重复数据形状。
- 某个视觉基础件以后大概率复用。
- 一个页面有多个独立交互。

真正唯一的页面文案和小布局可以留在 page 内。

## 详情页模式

推荐结构：

```text
data/items.ts
lib/content.ts
app/items/page.tsx
app/items/[slug]/page.tsx
components/items/ItemCard.tsx
components/items/ItemDetail.tsx
```

详情页找不到 slug 时，使用 `notFound()` 或项目已有空状态，不要渲染半空页面。

## 数据扩展

- 新字段只有兼容旧数据时才设 optional。
- 优先用 `slug`、`label`、`title`、`description`、`image`、`href`、`tags`、`meta`。
- 有顺序的内容用数组。
- 让运营/用户改文案时尽量不用碰组件结构。
- 新增枚举型字段时，把展示文案放进 helper，不要在多个组件里写三元表达式。

## 回归检查

- 导航高亮仍然正确。
- 固定头部/底部不遮挡内容。
- 卡片有稳定高度或宽高比。
- 长标题换行正常。
- 缺图片不破版。
- 移动端和桌面端都合理。
- 新页面刷新直达可用。
- 新增数据不会破坏旧组件。
- `docs/frontend-map.md` 和真实路由一致。
