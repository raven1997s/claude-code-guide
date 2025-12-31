# Claude Code 学习中心 - Vue 3 版本项目文档

## 项目概述

这是一个 **Vue 3 + Vite + Naive UI** 构建的 Claude Code CLI 互动学习平台，包含：
- 25 个关卡的模拟终端学习游戏
- 完整的命令参考文档
- 模糊搜索功能（Fuse.js）
- 响应式设计

**给 AI 助手**：当你在这个项目中继续对话时，请先阅读本文档以快速了解项目结构。

---

## 快速启动

```bash
cd web-game-vue
npm install
npm run dev
# 访问 http://localhost:8000
```

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.x | 前端框架（Composition API + `<script setup>`） |
| Vite | 5.x | 构建工具 |
| Vue Router | 4.x | 路由管理 |
| Naive UI | latest | UI 组件库（暗色主题） |
| Fuse.js | 7.0 | 模糊搜索 |
| @vicons/fa | latest | Font Awesome 图标 |

---

## 项目结构

```
web-game-vue/
├── index.html                   # HTML 入口
├── package.json                 # 依赖配置
├── vite.config.js              # Vite 配置
├── src/
│   ├── main.js                 # 应用入口，注册 router 和 naive
│   ├── App.vue                 # 根组件（导航栏 + 布局）
│   ├── router/
│   │   └── index.js            # 5 个路由配置
│   ├── views/                  # 页面组件（5 个）
│   │   ├── HomeView.vue        # 首页
│   │   ├── GameView.vue        # 游戏页（25 关卡）
│   │   ├── ReferenceView.vue   # CLI 参数参考
│   │   ├── CheatsheetView.vue  # 速查表
│   │   └── CommandsView.vue    # 斜杠命令
│   ├── components/             # 通用组件（3 个）
│   │   ├── SearchBox.vue       # 搜索组件（核心！支持 4 种模式）
│   │   ├── LevelCard.vue       # 关卡卡片
│   │   └── TerminalComponent.vue # 模拟终端
│   └── data/                   # 静态数据
│       ├── search-data.js      # 搜索数据库（60+ 条命令）
│       └── game-data.js        # 游戏数据（25 关卡）
```

---

## 核心功能说明

### 1. 搜索功能（SearchBox.vue）

**位置**: `src/components/SearchBox.vue`

**特性**:
- 使用 Fuse.js 实现模糊搜索
- 4 种搜索模式：自动、命令、中文、全部
- 实时搜索，无防抖延迟
- 结果按分类分组显示

**使用方式**:
```vue
<SearchBox :data-source="yourDataArray" />
```

**数据格式**:
```javascript
{
  command: 'claude --version',  // 命令
  short: '-v',                   // 短选项
  desc: '显示版本号',            // 简短描述
  fullDesc: '完整描述...',       // 完整描述
  category: 'CLI参数'            // 分类
}
```

### 2. 游戏功能（GameView.vue）

**位置**: `src/views/GameView.vue`

**特性**:
- 25 个关卡，5 大分类
- 模拟终端，支持命令输入
- 进度保存在 localStorage (`claude_game_progress_v4`)
- 必须完成所有 `requiredCommands` 才能过关

**关卡数据结构**:
```javascript
{
  id: 1,
  title: '关卡标题',
  description: '任务描述',
  category: 'CLI命令',
  requiredCommands: ['claude --version'],
  terminal: {
    welcome: '欢迎信息',
    prompts: ['提示1', '提示2']
  }
}
```

**终端响应数据**: `TERMINAL_RESPONSES` 在 `game-data.js` 中定义

### 3. 导航系统

**位置**: `src/App.vue`

**实现方式**:
- 使用 `n-button` 组件循环渲染
- 点击直接调用 `router.push(item.key)`
- 激活状态通过 `route.path` 判断

**重要**: 不要改用 `n-menu`，它的点击事件处理有问题！

---

## 5 个页面说明

| 页面 | 路由 | 功能 |
|------|------|------|
| HomeView | `/ | 首页，展示统计和导航 |
| GameView | `/game` | 25 关卡游戏 |
| ReferenceView | `/reference` | CLI 参数完整参考 |
| CheatsheetView | `/cheatsheet` | 常用命令速查表 |
| CommandsView | `/commands` | 斜杠命令详细说明 |

---

## 重要注意事项

### 已知问题和解决方案

| 问题 | 解决方案 |
|------|----------|
| `n-menu` 点击无效 | 使用 `n-button` 循环代替 |
| `n-code` 报错 `hljs is not set` | 使用 `<code class="code-block">` 代替 |
| `NStatisticGroup` 不存在 | 用 `n-space` 包裹 `n-statistic` |
| `NSegmented` 不存在 | 用 `n-radio-group` + `n-radio-button` 代替 |
| `useDialog()` 报错 | 在 App.vue 中包裹 `<n-dialog-provider>` |

### 组件导入规范

```javascript
// Naive UI 组件按需导入
import { NButton, NInput, NSpace, ... } from 'naive-ui'

// 图标从 @vicons/fa 导入
import { Search as SearchIcon, Home as HomeIcon, ... } from '@vicons/fa'
```

### 样式约定

- 使用 `scoped` 样式
- 暗色主题配色：背景 `#181826`，主色 `#22d3ee`
- 代码块样式：`.code-block` 和 `.command-code`

---

## 数据文件

### search-data.js

包含以下数据集：
- `cliParams` - CLI 启动参数
- `slashCommands` - 斜杠命令
- `quickCommands` - 快速命令
- `fileReferences` - 文件引用语法
- `shortcuts` - 快捷键
- `models` - 模型列表
- `permissionModes` - 权限模式
- `configFiles` - 配置文件

导出 `SEARCH_DATABASE` 和 `ALL_SEARCH_ITEMS`

### game-data.js

包含：
- `LEVELS` - 25 个关卡定义
- `TERMINAL_RESPONSES` - 所有命令的模拟响应
- `LEVEL_CATEGORIES` - 关卡分类

---

## 构建和部署

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## Git 仓库

- **仓库地址**: https://github.com/raven1997s/claude-code-guide
- **远程分支**: main
- **推送方式**: `git push`

---

## 版本历史

### v2.0 - Vue 3 重构版（当前）
- 从 Vanilla JS 迁移到 Vue 3
- 修复所有搜索功能问题
- 组件化架构
- Naive UI 界面

### v1.0 - 原版（已废弃）
- Vanilla JS 实现
- 存在搜索 Bug
- 见 `../archive/web-game/DEPRECATED.md`
