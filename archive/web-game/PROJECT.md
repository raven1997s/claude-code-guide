# Claude Code 学习中心 - 项目文档

## 项目概述 ✅

创建一个**完整的 Claude Code 学习网站**，包含互动游戏、命令参考、速查表和斜杠命令文档，让初学者在浏览器中全面学习 Claude Code CLI 命令。

## 版本历史

### v2.0 - Vue 3 重构版（当前）🚀
- **框架迁移**: 从 Vanilla JS 迁移到 Vue 3 + Vite
- **UI 组件库**: 采用 Naive UI，开箱即美
- **搜索功能**: 使用 Fuse.js 实现专业模糊搜索
- **代码量减少**: 相比原版减少约 60% 代码
- **维护性提升**: 组件化架构，易于维护和扩展

### v1.0 - 原始版本（已废弃）
- Vanilla JS 实现
- 存在搜索功能 Bug
- 手动 DOM 操作繁琐

## 网站结构 🌐

### 页面组成
1. **首页** - 网站入口，展示学习路径和统计
2. **互动游戏** - 25 个关卡的模拟终端学习游戏
3. **命令参考** - 完整的 CLI 参数文档（含搜索）
4. **速查表** - 快速查找常用命令（含搜索）
5. **斜杠命令** - 会话内命令详细说明（含搜索）

### 导航系统
- Vue Router 路由管理
- 固定顶部导航栏（Naive UI Menu）
- 响应式设计，支持移动端

## 核心功能 ✅

### 1. 搜索功能 🆕
- **Fuse.js 驱动**: 专业模糊搜索库
- **4 种模式**: 自动、命令、中文、全部
- **实时响应**: 输入即搜索，无防抖延迟
- **分类展示**: 结果按类别分组
- **组件复用**: SearchBox 组件，一次写好到处复用

### 2. 学习方式
- ✅ 在网页中操作模拟终端（无需真正安装 Claude）
- ✅ 所有响应都是预存的模拟数据
- ✅ 用户必须在终端正确执行命令才能过关
- ✅ 可以跳过关卡（但不会标记为完成）
- ✅ 提供完整命令参考文档

### 3. 关卡设计原则
- ✅ **CLI 命令关卡**：非交互式命令（`claude -p`, `claude --version` 等）
- ✅ **会话命令关卡**：需要先 `claude` 启动会话，然后在会话中操作
- ✅ 任务描述与终端操作必须一致
- ✅ 每个关卡有明确的 `requiredCommands` 列表

### 4. 验证机制
- ✅ "完成关卡"按钮初始为禁用状态
- ✅ 显示进度：`完成任务 (0/3)`
- ✅ 完成所有必需命令后自动解锁
- ✅ 跳过不会标记关卡为完成

## 当前状态 ✅

### 技术栈
- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI 组件**: Naive UI
- **路由**: Vue Router 4
- **搜索**: Fuse.js 7.0
- **图标**: @vicons/fa (Font Awesome)

### 已完成内容
- ✅ **5 个页面组件**: HomeView, GameView, ReferenceView, CheatsheetView, CommandsView
- ✅ **搜索组件**: SearchBox（支持模糊搜索和模式切换）
- ✅ **25 个关卡**，涵盖所有常用命令
- ✅ **5 大分类**：CLI、会话、Git、MCP、综合挑战
- ✅ **终端模拟**：完整的命令响应系统
- ✅ **响应式 UI**: Naive UI 组件库

### 关卡列表 (1-25)

**CLI 命令 (1-10)**
1. 初出茅庐 - `claude --version`
2. 帮助文档 - `claude --help`
3. 快速提问 - `claude -p`
4. 文件引用 - `@file`
5. 模型 Haiku - `--model haiku`
6. 模型 Sonnet - `--model sonnet`
7. MCP 服务器 - `claude mcp list`
8. 插件管理 - `claude plugin list`
9. 继续对话 - `claude -c`
10. 恢复会话 - `claude -r`

**会话命令 (11-17)**
11. 启动会话 - `claude`
12. 会话帮助 - `/help`
13. 清除上下文 - `/clear`
14. 任务列表 - `/tasks`
15. 多轮对话 - 上下文记忆
16. Git 提交 - `/commit`
17. 提交后对话 - 工作流

**综合挑战 (18-25)**
18. 综合基础 - CLI + 会话
19. 综合提问 - 双模式对比
20. 完整流程 - 全功能演示
21. 命令别名 - help 与 /help
22. 清理对话 - clear 与 /clear
23. 双模型对比 - Haiku vs Sonnet
24. 命令组合 - 多命令练习
25. 终极大师 - 9 个命令组合

## 项目结构 📁

```
web-game-vue/                    # Vue 3 版本（当前开发）
├── index.html                   # HTML 入口
├── package.json                 # 依赖配置
├── vite.config.js              # Vite 配置
├── src/
│   ├── main.js                 # 应用入口
│   ├── App.vue                 # 根组件（含导航）
│   ├── router/
│   │   └── index.js            # 路由配置
│   ├── views/                  # 页面组件
│   │   ├── HomeView.vue        # 首页
│   │   ├── GameView.vue        # 游戏页
│   │   ├── ReferenceView.vue   # 命令参考
│   │   ├── CheatsheetView.vue  # 速查表
│   │   └── CommandsView.vue    # 斜杠命令
│   ├── components/             # 通用组件
│   │   ├── SearchBox.vue       # 搜索组件（核心）
│   │   ├── LevelCard.vue       # 关卡卡片
│   │   └── TerminalComponent.vue # 终端组件
│   └── data/                   # 静态数据
│       ├── search-data.js      # 搜索数据库
│       └── game-data.js        # 游戏数据

web-game/                        # 旧版本（Vanilla JS，已废弃）
├── index.html
├── css/
│   └── style.css
└── js/
    ├── navigation.js
    ├── search.js
    ├── search-data.js
    ├── data.js
    ├── terminal.js
    └── game.js
```

## 快速启动

### Vue 3 版本（推荐）
```bash
cd web-game-vue
npm install
npm run dev
# 访问 http://localhost:8000
```

### 构建生产版本
```bash
npm run build
# 输出到 dist/
```

## 已修复问题 ✅

### v2.0 修复
1. ✅ **搜索功能** - 使用 Fuse.js 完全重写，稳定可靠
2. ✅ **模式切换** - 4 种搜索模式无缝切换
3. ✅ **斜杠命令页面** - 组件化重构，不再空白
4. ✅ **UI 美观度** - Naive UI 组件，现代化设计
5. ✅ **代码维护性** - 组件化架构，易于扩展

### v1.0 遗留问题（已废弃）
- ❌ 搜索功能不工作
- ❌ 模式切换不工作
- ❌ 斜杠命令页面空白

## 备注

- 项目用于学习 Claude Code CLI 命令
- 不需要真实的 API Key
- 所有数据都是模拟的
- 进度保存在浏览器 localStorage (PROGRESS_KEY = 'claude_game_progress_v4')
- Vue 版本使用 Composition API 和 `<script setup>`
