# frontend-gen

> 🌐 [English](README.md) · **中文**

`frontend-gen` 是一个前端 Skill，用来根据参考 HTML、截图、图片、文案、需求说明或一句话想法，生成或继续扩展纯前端 React / Next.js 项目。支持 **Claude Code** 和 **Codex**。

## 它解决什么痛点

- 你还在为**生成前端页面/项目的提示词**烦恼吗？
- 你还在为 AI **做不出"前端开发级别"的项目**烦恼吗（生成一堆塞在一个文件里、套模板、还跑不起来）？
- 你不是前端，却需要一个**真实、能跑、好看**的项目？

这个 skill 就是为此而生——让 AI 从"吐代码片段"变成"交付一个真项目"：

| 你的痛点 | frontend-gen 怎么解决 |
| --- | --- |
| 不知道怎么写提示词才能出好前端 | 内置端到端流程，一句话也能产出**完整项目** |
| AI 把代码塞进一个大文件 / 套模板还跑不起来 | 生成**有架构、能跑、可维护**的项目（路由/组件/data/lib） |
| 生成的东西"一眼假"、像 AI 套模板 | 锁定**设计令牌系统 + 去 AI 味**规则，做出有设计感的界面 |
| 加一个页面就乱、风格漂移 | **项目记忆 + 防漂移**：先读后改、复用令牌、绝不重建 |
| 生成的项目装不上 / 跑不起来（没装 Node） | **环境检查 + 小白安装引导 + 零环境单 HTML 兜底** |
| 不会部署 / 接后端 / 按 Figma 还原 | **衔接对应 skill/MCP** 并一步步带你做到上线 |
| 不响应式、没 SEO | **默认自适应 + 官网自动做 SEO** |

一句话：**你只管用一句话描述想要什么，就能拿到一个能跑、可维护、能上线的前端项目——哪怕你不写前端代码。**

它适合：

- 从零搭建 Next.js App Router 前端项目
- 把 HTML / 旧原型重构成可维护的 React / Next 项目
- 根据截图、图片、文案和需求生成 PC 网页、响应式官网、移动 H5、作品集、工具型前端
- 持续追加页面，并保持统一的路由、组件、数据和样式结构

## 安装

**推荐 —— 直接从 GitHub 安装（Claude Code & Codex）：**

```bash
npx skills add Azhung/frontend-gen -a claude-code   # Claude Code（项目级）
npx skills add Azhung/frontend-gen -a codex         # Codex
npx skills add Azhung/frontend-gen -a both -g        # 两者 + 全局
```

安装后**新开一个会话**即可被识别。

**手动安装（本地 clone）：** 把整个 `frontend-gen` 文件夹复制到 skills 目录。

```bash
# Codex
mkdir -p ~/.codex/skills && cp -R frontend-gen ~/.codex/skills/
# Claude Code
mkdir -p ~/.claude/skills && cp -R frontend-gen ~/.claude/skills/
```

然后重启 Codex / Claude Code。确认目录结构类似：

```text
~/.codex/skills/frontend-gen/   （或 ~/.claude/skills/frontend-gen/）
  SKILL.md
  agents/
  references/
```

说明：

- `SKILL.md` 和 `references/` 是核心内容，Claude Code 和 Codex 都会用到。
- `agents/openai.yaml` 是 Codex / OpenAI 的界面元数据，Claude Code 可忽略，保留也不影响使用。
- **必须复制整个文件夹，不能只复制 `SKILL.md`。**
- 普通 Claude 网页版通常不能直接安装本地 skill 文件夹；可以把 `SKILL.md` 内容复制到 Project instructions 或聊天上下文中使用。

## 使用

从零生成项目：

```text
使用 frontend-gen，从零搭建一个 Next.js 纯前端项目。

项目类型：PC 响应式官网
页面：首页、产品列表、产品详情、关于我们、联系我们
要求：TypeScript、普通 CSS、组件封装、data 静态数据、lib 公共函数、可继续加页面
```

根据 HTML 生成项目：

```text
使用 frontend-gen，根据这个 HTML 生成一个可维护的 Next.js 前端项目。

要求：
- 不要把 HTML 原样塞进一个大组件
- 提取路由、组件、data、lib、public 图片
- 生成 docs/frontend-map.md
- 启动 dev server，给我本地访问地址
```

继续追加页面：

```text
使用 frontend-gen，给当前项目新增 /cases 案例列表页和 /cases/[slug] 案例详情页。

要求：
- 先读 docs/frontend-map.md
- 复用现有组件和样式
- 案例数据放 data/cases.ts
- 更新导航和 docs/frontend-map.md
```

## 默认产物

默认生成或维护这种结构：

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

默认技术选择（推荐，但不锁死 —— 见 SKILL.md 的"技术选型"）：

- Next.js App Router
- React
- TypeScript
- 普通 CSS + `:root` 设计令牌
- 静态 / 模拟数据
- 本地状态

不会主动引入后端、数据库、登录、支付服务。只有当项目类型或你的偏好适合、或现有项目已在用时，才用 Tailwind、shadcn 或大型 UI 套件。

## 交付约定

使用这个 Skill 时，它应该：

- 生成完整可运行项目，而不是代码片段
- 抽取组件、数据和公共函数
- 先锁定一套设计令牌系统，再保持每页一致（不漂移）
- 覆盖响应式布局、交互/动效、统一图标族
- 官网/落地页做 SEO 基础；有真实逻辑时按需补分级测试
- 跑类型检查与构建、启动本地 dev server、在浏览器里自检并修复
- 最终回复最后一行输出当前访问地址

示例：

```text
Current URL: http://localhost:3000
```

如果无法启动：

```text
Current URL: not started (reason: dependency install failed)
```

## Skill 文件结构

```text
frontend-gen/
  SKILL.md
  agents/
    openai.yaml
  references/
    design-system.md         # 锁定设计令牌系统、跨页复用、防漂移
    design-craft.md           # 设计感 + 去 AI 味
    interaction-motion.md     # 克制的交互、动效与统一图标族
    source-intake.md          # 资料整理
    frontend-architecture.md  # 项目架构
    page-expansion.md         # 继续加页面 / 防漂移
    testing.md                # 分级、可选的测试
    seo.md                    # 官网/落地页 SEO
    extend-and-handoff.md     # 部署 / 后端 / Figma 衔接其他 skill/MCP
    quality-gates.md          # 交付验收
```

## 适用范围

适用：

- PC 网页
- 响应式官网
- 移动 H5
- 作品集
- 工具型前端
- 静态电商原型
- 多页面内容站

超出前端本身的部分 —— **部署上线、真实后端/接口、按 Figma 还原 UI** —— 本技能不在内部实现，但也不会止步：它会按 `references/extend-and-handoff.md` 衔接对应的 skill/MCP（或引导你），并保留干净的数据接缝，方便前端后续对接。明确交给专门后端 skill 的：真实数据库、支付、鉴权、CMS 管理后台。

## 语言

技能会用用户自己的语言回复（中文、英文等），并在设计令牌里保留中文字体栈，因此对全球用户和中国用户都适用。

## License

MIT
