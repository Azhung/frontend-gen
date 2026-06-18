# 交互 · 动效 · 图标

页面不止是静态版式——交互、动效、图标决定它"活不活、专不专业"。但**这三样最容易用力过猛变成 AI 味**（满屏飞入、炫技过渡、emoji 当图标）。原则一句话：**服务于理解与反馈，克制、统一、可关闭。**

## 一、交互与状态

可交互的东西必须"看得出能点、点了有反馈"。

- **状态做全**：每个可交互元素都要有 `hover / focus-visible / active / disabled`，以及 `loading / 空 / 错误 / 缺图` 兜底。缺状态的界面显得没做完。
- **焦点可见**：`:focus-visible` 留清晰轮廓（用 `--grass` 类强调色），别为好看删掉。
- **反馈用同一套词**：触发与结果同名——"发布"按钮 → "已发布"提示；"保存" → "已保存"。别中途换词。
- **键盘与触屏**：可 Tab 到、回车/空格可触发；触屏可点区域 ≥ 44px；固定栏留 `env(safe-area-inset-bottom)`。
- **表单**：实时或提交时校验，错误信息贴在字段旁、说清怎么改；提交中禁用按钮并给 loading。
- **客户端边界**：只有需要状态/事件/浏览器 API 的组件才加 `'use client'`；展示型保持 Server Component（见 `frontend-architecture.md`）。

## 二、动效与过渡（克制优先）

### 该动的
- **状态变化**：hover、展开/收起、Tab 切换、弹层进出——用 `transition`，时长 `--dur`(150–250ms)、缓动 `--ease`。
- **一个编排过的入场瞬间**：首屏一次有节制的揭示（如标题 + 主视觉轻微上移淡入）比满屏元素逐个飞入更高级。整页只设计一个"主动效时刻"。
- **滚动揭示**：长页面可让区块进入视口时轻微淡入上移——但**幅度小、只一次、别每个元素都来**。
- **微交互**：按钮按下轻微下沉、卡片 hover 轻微抬起/描边——细微即可。

### 不该动的（AI 味来源）
- 整页元素逐个弹跳飞入；超过 ~300ms 的长动画；无限循环的装饰动画；视差堆砌；炫技过渡。
- 动效不能成为理解内容的障碍或延迟。

### 落地
- 用令牌：`transition: color var(--dur) var(--ease)`，别每处写不同魔法时长。
- 入场/滚动揭示示例（轻量、纯 CSS + 一个小 hook）：

```css
.reveal { opacity: 0; transform: translateY(12px); transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease); }
.reveal.in { opacity: 1; transform: none; }
```

```ts
// hooks/useReveal.ts —— IntersectionObserver，进视口加 .in，只触发一次
"use client";
import { useEffect, useRef } from "react";
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: .15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}
```

- **页面/路由过渡**（可选）：用 CSS View Transitions 或一个简单淡入即可，别做花哨切场。
- **无障碍硬性要求**：一律尊重 `prefers-reduced-motion: reduce`（令牌里已把 `--dur` 归零）；关键信息不能只靠动画传达。

## 三、图标

图标统一与否，直接决定"像不像一套设计"。

- **一套图标族，别混用**：优先用一致的线性图标库（如 `lucide-react`），全站同一族、同一风格；不要这里线性那里面性、这里实心那里描边。
- **图标令牌**：尺寸、线宽统一（如 `--icon-size: 20px; --icon-stroke: 1.75`），跟随字号/气质，别每处随手定。
- **emoji 不是图标**：除非刻意的趣味/国旗场景，UI 功能图标不要用 emoji（这是去 AI 味清单里的点）。
- **自定义 / 品牌图标 = 内联 SVG**：库里没有的、或需要品牌感的，画**内联 SVG**，遵循设计系统的线宽、圆角、强调色（用 `currentColor` 继承文字色，方便统一着色）。
- **"生成"图标的边界**：能用简单几何 + `currentColor` 内联 SVG 表达的（箭头、对勾、logo 母题、分隔母题）就自己画进 `components/ui/icons/` 或 `public/icons/`；复杂插画/写实图标不要硬画成劣质 SVG——交给设计资源或图库。
- **可访问性**：装饰图标 `aria-hidden="true"`；承载信息的图标给 `aria-label` 或配文字。
- **资源放置**：SVG 图标做成小组件（`components/ui/icons/`）或放 `public/icons/`，路径集中，别散落。

## 自检
- 所有可交互元素有 hover/focus/active/disabled + 必要的空/错/加载态。
- 动效有节制：只一个主入场时刻，无满屏飞入，时长用令牌，`prefers-reduced-motion` 生效。
- 图标同族同尺寸同线宽，无 emoji 充当功能图标，装饰图标 `aria-hidden`。
