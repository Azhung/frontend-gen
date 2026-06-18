# frontend-gen

`frontend-gen` 是一个 Codex Skill，用来根据参考 HTML、截图、图片、文案、需求说明或一句话想法，生成或继续扩展纯前端 React / Next.js 项目。

它适合：

- 从零搭建 Next.js App Router 前端项目
- 把 HTML / 旧原型重构成可维护的 React / Next 项目
- 根据截图、图片、文案和需求生成 PC 网页、响应式官网、移动 H5、作品集、工具型前端
- 持续追加页面，并保持统一的路由、组件、数据和样式结构

## Codex 安装

把整个 `frontend-gen` 文件夹复制到 Codex skills 目录：

```bash
mkdir -p ~/.codex/skills
cp -R frontend-gen ~/.codex/skills/
```

安装后重启 Codex。

确认目录结构类似：

```text
~/.codex/skills/frontend-gen/
  SKILL.md
  agents/
  references/
```

> 注意：必须复制整个文件夹，不能只复制 `SKILL.md`。

## Claude Code 安装

如果使用 Claude Code，也可以把整个 `frontend-gen` 文件夹复制到 Claude skills 目录：

```bash
mkdir -p ~/.claude/skills
cp -R frontend-gen ~/.claude/skills/
```

安装后重启 Claude Code。

确认目录结构类似：

```text
~/.claude/skills/frontend-gen/
  SKILL.md
  agents/
  references/
```

说明：

- `SKILL.md` 和 `references/` 是核心内容，Claude Code 可以使用。
- `agents/openai.yaml` 是 Codex / OpenAI 的界面元数据，Claude Code 可以忽略，保留也不影响使用。
- 普通 Claude 网页版通常不能直接安装本地 skill 文件夹；可以把 `SKILL.md` 内容复制到 Project instructions 或聊天上下文中使用。

## 使用

从零生成项目：

```text
使用 $frontend-gen，从零搭建一个 Next.js 纯前端项目。

项目类型：PC 响应式官网
页面：首页、产品列表、产品详情、关于我们、联系我们
要求：TypeScript、普通 CSS、组件封装、data 静态数据、lib 公共函数、可继续加页面
```

根据 HTML 生成项目：

```text
使用 $frontend-gen，根据这个 HTML 生成一个可维护的 Next.js 前端项目。

要求：
- 不要把 HTML 原样塞进一个大组件
- 提取路由、组件、data、lib、public 图片
- 生成 docs/frontend-map.md
- 启动 dev server，给我本地访问地址
```

继续追加页面：

```text
使用 $frontend-gen，给当前项目新增 /cases 案例列表页和 /cases/[slug] 案例详情页。

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
  docs/frontend-map.md
```

默认技术选择：

- Next.js App Router
- React
- TypeScript
- 普通 CSS
- 静态 / 模拟数据
- 本地状态

除非明确要求，否则不会主动引入后端、数据库、登录服务、支付服务、Tailwind、shadcn 或大型 UI 套件。

## 交付约定

使用这个 Skill 时，Codex 应该：

- 生成完整可运行项目，而不是代码片段
- 抽取组件、数据和公共函数
- 写清楚后续如何加页面、改文案、换图片
- 跑类型检查和构建
- 启动本地 dev server
- 最终回复最后一行输出当前访问地址

示例：

```text
当前访问地址：http://localhost:3000
```

如果无法启动：

```text
当前访问地址：未启动（原因：依赖安装失败）
```

## Skill 文件结构

```text
frontend-gen/
  SKILL.md
  agents/
    openai.yaml
  references/
    design-craft.md
    frontend-architecture.md
    page-expansion.md
    qiusite-lessons.md
    quality-gates.md
    source-intake.md
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

不适合单独完成：

- 真实后端
- 数据库
- 支付
- 登录鉴权服务
- CMS 管理后台

这些能力可以后续在前端项目基础上单独设计和实现。
