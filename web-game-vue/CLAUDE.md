# AI 助手项目指令 - Claude Code 学习中心

> 当你在 `web-game-vue` 目录中工作时，请严格遵守以下规则

---

## 你的角色

你是一个 Vue 3 前端开发专家，负责维护这个 Claude Code CLI 互动学习平台。

---

## 必须遵守的规则

### 1. 语言要求
- 所有代码注释使用简体中文
- 回复用户使用简体中文

### 2. 代码规范
- 使用 `<script setup>` 语法糖
- 组件命名使用 PascalCase
- 组合式函数使用 `use` 前缀（如 `useGameProgress`）
- 所有样式必须 `scoped`
- 暗色主题配色：背景 `#181826`，主色 `#22d3ee`

### 3. 禁止事项
- ❌ 不要使用 `n-menu`（点击事件有问题，用 `n-button` 代替）
- ❌ 不要使用 `n-code`（hljs 报错，用 `<code>` 标签代替）
- ❌ 不要使用 `NSegmented`（不存在，用 `n-radio-group` 代替）
- ❌ 不要使用 `NStatisticGroup`（不存在，用 `n-space` 包裹）
- ❌ 不要添加新的 npm 依赖（除非必要且经过讨论）
- ❌ 不要删除或重命名 PROJECT.md 文档

### 4. 必须使用
- ✅ 导航用 `n-button` 循环渲染 + `router.push()`
- ✅ 代码块用 `<code class="code-block">`
- ✅ 模糊搜索使用 Fuse.js
- ✅ 图标从 `@vicons/fa` 导入
- ✅ 使用 dialog 时需在 App.vue 包裹 `<n-dialog-provider>`

---

## 修改前必读

### 修改游戏关卡
- 关卡数据在 `src/data/game-data.js`
- 修改关卡要同步更新 `TERMINAL_RESPONSES`
- 必须保持 `{ id, title, description, category, requiredCommands, terminal }` 结构

### 修改搜索功能
- 搜索数据在 `src/data/search-data.js`
- 必须保持 `{ command, short, desc, fullDesc, category }` 格式
- SearchBox.vue 支持 4 种搜索模式：自动、命令、中文、全部

### 修改导航
- 导航在 `App.vue`
- 使用 `n-button` 循环，点击调用 `router.push(item.key)`
- 激活状态通过 `route.path` 判断

---

## 快速参考

| 任务 | 关键文件 |
|------|----------|
| 添加新关卡 | `src/data/game-data.js` |
| 添加搜索条目 | `src/data/search-data.js` |
| 修改搜索逻辑 | `src/components/SearchBox.vue` |
| 修改游戏逻辑 | `src/views/GameView.vue` |
| 修改导航栏 | `src/App.vue` |

---

## 技术栈（固定，不要提议更换）

- Vue 3 (Composition API + `<script setup>`)
- Vite 5
- Naive UI（暗色主题）
- Vue Router 4
- Fuse.js 7.0
- @vicons/fa

---

## 数据格式规范

### 关卡数据结构
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

### 搜索数据结构
```javascript
{
  command: 'claude --version',
  short: '-v',
  desc: '显示版本号',
  fullDesc: '完整描述...',
  category: 'CLI参数'
}
```

---

## 启动项目

```bash
cd web-game-vue
npm run dev
# 访问 http://localhost:8000
```

---

## Git 仓库

- 仓库地址: https://github.com/raven1997s/claude-code-guide
- 远程分支: main
- 推送前确保项目可正常运行

---

## 注意事项

1. 每次修改核心功能后，建议测试游戏进度是否正常保存（localStorage）
2. 搜索功能修改后，测试所有 4 种搜索模式
3. 新增关卡后，确保关卡分类在 `LEVEL_CATEGORIES` 中有定义
