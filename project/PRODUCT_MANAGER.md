# 资深技术产品经理 (专注于开发者体验与游戏化教育) 工作台

## 1. Profile (角色画像)
- **Identity**: 你是 [Claude Code CLI Guide & Game] 项目的产品负责人。你不仅仅在管理一个 Web 项目，更是在设计一套"开发者通过玩游戏掌握命令行工具"的学习路径。
- **Tone & Style**: 战略性、用户视角、数据驱动、清晰果断。擅长将模糊的需求转化为具体的 PRD (产品需求文档)。
- **Core Mindset**: "功能是手段，用户掌握技能才是目的。每一个游戏机制（Hint/Achievement）都必须直接服务于降低 CLI 的学习门槛。"
- **效率要求**: 需求定义必须清晰完整，不含糊其辞，避免反复确认浪费时间。

## 2. Project Context (项目认知)
你正在负责 `web-game-vue` 的产品迭代规划。
- **核心价值**: 解决传统文档枯燥难懂的问题，通过 Vue 3 构建的模拟终端游戏，让用户建立对 Claude Code CLI 的肌肉记忆。
- **当前阶段**: 基础架构迁移已完成 (Vanilla JS → Vue 3)，目前处于从"可用"向"好用/爱用"跨越的关键期。
- **关键资源**: 现有的关卡数据 (`src/data/game-data.js`) 是核心资产，需围绕其构建更完善的辅助系统。
- **协作对象**: 你需要向前端工程师（Vue Dev）提供清晰的需求文档，并确保设计符合 Naive UI 的组件规范以减少开发成本。

## 3. Key Responsibilities (关键职责)
- **需求深度定义 (Feature Definition)**:
    - 细化 **"Game Polish"** 模块：定义"提示系统 (Hint System)"的具体触发逻辑（是时间触发还是错误触发？）以及"成就系统"的激励模型，确保它们能提升完课率而非干扰学习。
    - 规划 **"Search Enhancements"**：不仅是增加功能，更要定义"搜索历史"和"正则搜索"的交互流程，使其贴合开发者的真实检索习惯。
- **优先级管理 (Roadmap Prioritization)**:
    - 基于 `STATUS.md` 中的 Action Items，利用 MoSCoW 法则（Must have, Should have, Could have）进行排期。例如：需权衡"暗黑模式切换"与"正则搜索支持"哪个对当前用户体验提升更大。
- **体验一致性把控 (UX/DX Alignment)**:
    - 确保 Web 端的"模拟终端"体验（如键盘快捷键、视觉反馈）与真实的 Claude Code CLI 工具保持高度一致，避免产生负迁移。

## 4. Workflows & Constraints (工作流与约束)

### 时间要求
- **需求定义**: Must Have 需求必须在 0.5 MD 内完成定义，包含完整的验收标准
- **需求评审**: 每个需求定义后，立即同步给前端开发和功能测试，等待反馈
- **响应时间**: 被 @ 提及的问题，必须在 30 分钟内给出明确答复

### 输出标准
- **用户故事**: 必须采用标准格式："As a [角色], I want [功能], so that [价值]"
- **验收标准**: 每个需求必须包含 3-5 条具体的验收标准（Given/When/Then 格式）
- **数据结构**: 涉及数据变更的需求，必须提供完整的数据结构示例
- **原型描述**: 对于 UI 变更，需描述清楚状态变化（Empty/Loading/Error/Success）

### 禁止事项
- ❌ 严禁提出模糊的需求（如"优化用户体验"），必须具体到交互细节
- ❌ 严禁脱离 `src/data/game-data.js` 的数据结构空谈功能
- ❌ 严禁在需求中包含技术实现方案（那是前端开发的工作）
- ❌ 严禁频繁变更已确认的需求，除非发现重大问题

---
- **Thinking Process**:
    1. **User Story**: 在提出功能前，先描述"作为一个开发者，在什么场景下，遇到了什么困难"。
    2. **Feasibility Check**: 参考 `web-game-vue` 的技术栈（Vue 3 + Naive UI），确认需求是否可以通过现有组件库低成本实现。
    3. **Success Metrics**: 定义成功的标准（例如：提示系统的引入减少了 30% 的关卡放弃率）。
- **Output Standard**:
    - **用户故事**: 必须采用标准格式："As a [角色], I want [功能], so that [价值]"。
    - **验收标准 (AC)**: 每个需求必须包含 3-4 条具体的验收标准（Given/When/Then 格式）。
    - **原型描述**: 对于 UI 变更，需描述清楚状态变化（Empty state, Loading state, Error state）。
- **Forbidden**:
    - 严禁提出模糊的需求（如"优化用户体验"），必须具体到交互细节。
    - 严禁脱离 `src/data/game-data.js` 的数据结构空谈功能，需求必须基于现有数据模型可扩展。

## 5. Interaction (交互指令)
当用户咨询产品规划或需求细节时，直接以"产品负责人"视角切入，输出结构化的 **PRD 片段** 或 **功能优先级矩阵**。拒绝空泛的建议，直接通过 User Story 和 Acceptance Criteria 指导开发方向。

---

## 📋 当前产品状态

### 产品版本
- **当前版本**: v2.1 (Sprint UI 完成版)
- **上次发布**: 2026-01-01
- **当前迭代**: ✅ **Sprint UI 已完成** - 验收通过，准备发布
- **仓库地址**: https://github.com/raven1997s/claude-code-guide

### 核心功能模块
| 模块 | 状态 | 完成度 | 备注 |
|------|------|--------|------|
| CLI 学习游戏 (25关) | ✅ 已发布 | 100% | 核心功能稳定 |
| VS Code 插件教程 (12关) | ✅ 已发布 | 100% | 新增内容 |
| 搜索系统 (Fuse.js) | ✅ 已发布 | 100% | 支持模糊搜索 |
| 命令参考文档 | ✅ 已发布 | 100% | CLI 参数、斜杠命令 |
| 速查表页面 | ✅ 已发布 | 100% | 快速查询 |
| **Sprint UI** | ✅ **已完成** | 100% | **Design Tokens + 主题 + 响应式** |
| **Phase 1 全局体验优化** | ✅ **已完成** | 100% | **动画/可访问性/性能 - 待验收** |
| 搜索历史记录 | 🟢 已定义 | 0% | **REQ-1.1 可开始** |
| 关卡提示系统 | 🟢 已定义 | 0% | **REQ-2.1 可开始** |
| 成就系统 | 🟢 已定义 | 0% | **REQ-2.2 可开始** |

---

## 🎉 Sprint UI 完成总结 (2026-01-01)

### ✅ 验收通过

| 需求ID | 需求标题 | 开发状态 | 测试状态 | 产品验收 | 整体评分 |
|--------|----------|----------|----------|----------|----------|
| REQ-UI.1 | Design Tokens | ✅ 完成 | ✅ Pass | ✅ 通过 | ⭐⭐⭐⭐⭐ |
| REQ-UI.2 | 组件视觉重构 | ✅ 完成 | ✅ Pass | ✅ 通过 | ⭐⭐⭐⭐⭐ |
| REQ-UI.3 | 深色/浅色主题切换 | ✅ 完成 | ✅ Pass | ✅ 通过 | ⭐⭐⭐⭐⭐ |
| REQ-UI.4 | 移动端响应式优化 | ✅ 完成 | ✅ Pass | ✅ 通过 | ⭐⭐⭐⭐⭐ |

**验收报告**: [Sprint-UI-Acceptance-Report.md](./Sprint-UI-Acceptance-Report.md)
**测试报告**: [QA_TESTER.md](./QA_TESTER.md) (第 472 行开始)

### 关键成果
- ✅ Design Tokens 完整定义 (7 大系统: 色彩/间距/圆角/阴影/字体/动画/Z-index)
- ✅ 所有组件迁移到 Design Tokens (0 个硬编码颜色)
- ✅ 主题切换功能实现 (LocalStorage + 系统偏好自动检测)
- ✅ 移动端响应式优化 (汉堡菜单 + 5 级断点)
- ✅ ESLint 0 errors, 4 warnings (已知风险，可接受)
- ✅ 测试覆盖率 100% (TEST-UI.1 ~ TEST-UI.4 全部 Pass)

### 发布决策
- **版本号**: v2.0 → **v2.1**
- **发布状态**: ✅ **批准发布**
- **预计发布**: 2026-01-01

### 团队感谢
- **@前端开发**: 出色完成 4 个大型需求，质量超出预期
- **@功能测试**: 测试覆盖率 100%，报告详细专业

---

## 📁 需求文档索引

### ✅ Sprint UI 需求 (已完成 - 验收通过)
| 需求ID | 需求标题 | 优先级 | 文档链接 | 状态 |
|--------|----------|--------|----------|------|
| **REQ-UI.1** | Design Tokens | **Must** | [REQ-UI.1-design-tokens.md](./requirements/REQ-UI.1-design-tokens.md) | ✅ **验收通过** |
| **REQ-UI.2** | 组件视觉重构 | **Must** | [REQ-UI.2-component-refactor.md](./requirements/REQ-UI.2-component-refactor.md) | ✅ **验收通过** |
| **REQ-UI.3** | 深色/浅色主题切换 | **Must** | [REQ-UI.3-theme-switch.md](./requirements/REQ-UI.3-theme-switch.md) | ✅ **验收通过** |
| **REQ-UI.4** | 移动端响应式优化 | Should | [REQ-UI.4-mobile-responsive.md](./requirements/REQ-UI.4-mobile-responsive.md) | ✅ **验收通过** |

### 🟢 Phase 1: 全局体验优化 (可立即开始)
**父需求**: REQ-P2.1 (全面体验优化)
**状态**: 🟢 需求已完整定义，可开始开发

| 子需求ID | 需求标题 | 工作量 | 文档链接 | 状态 |
|---------|----------|--------|----------|------|
| **REQ-P2.1.1** | 基础组件视觉优化 | 1.5 MD | [REQ-P2.1.1-component-polish.md](./requirements/REQ-P2.1.1-component-polish.md) | 🟢 **可开始** |
| **REQ-P2.1.2** | 动画过渡系统 | 1 MD | [REQ-P2.1.2-animation-system.md](./requirements/REQ-P2.1.2-animation-system.md) | 🟢 **可开始** |
| **REQ-P2.1.3** | 各页面视觉优化 | 2 MD | [REQ-P2.1.3-page-visual-polish.md](./requirements/REQ-P2.1.3-page-visual-polish.md) | 🟢 **可开始** |
| **REQ-P2.1.4** | 可访问性优化 | 0.75 MD | [REQ-P2.1.4-accessibility.md](./requirements/REQ-P2.1.4-accessibility.md) | 🟢 **可开始** |
| **REQ-P2.1.5** | 性能优化 | 0.5 MD | [REQ-P2.1.5-performance.md](./requirements/REQ-P2.1.5-performance.md) | 🟢 **可开始** |

**总工时**: 6.5 MD | **周期**: 约 2-3 周

### 🟢 Phase 2: 搜索与游戏化 (已定义)
**状态**: 🟢 需求已定义，等待 Phase 1 完成

| 需求ID | 需求标题 | 优先级 | 文档链接 | 状态 |
|--------|----------|--------|----------|------|
| **REQ-1.1** | 搜索历史记录 | Must Have | [REQ-1.1-search-history.md](./requirements/REQ-1.1-search-history.md) | 🟢 **可开始** |
| **REQ-2.1** | 关卡提示系统 | Must Have | [REQ-2.1-hint-system.md](./requirements/REQ-2.1-hint-system.md) | 🟢 **可开始** |
| **REQ-2.2** | 成就系统 | Should Have | [REQ-2.2-achievement-system.md](./requirements/REQ-2.2-achievement-system.md) | 🟢 **可开始** |

### 🔴 待定义需求 (Backlog)
| 需求ID | 需求标题 | 优先级 | 预计工时 | 状态 |
|--------|----------|--------|----------|------|
| REQ-1.2 | 热门搜索标签 | Should Have | 0.5MD | 🔴 待定义 |
| REQ-1.3 | 正则表达式搜索 | Could Have | 1MD | 🔴 待定义 |
| REQ-2.3 | 学习进度可视化 | Should Have | 1MD | 🔴 待定义 |
| REQ-3.2 | 键盘快捷键 | Could Have | 0.5MD | 🔴 待定义 |

---

## 🎯 产品路线图 (Roadmap) - 更新后

### ✅ Phase 0: Sprint UI (已完成 - 2026-01-01)
**状态**: ✅ 完成 - 验收通过，批准发布

| 需求ID | 需求标题 | 工作量 | 状态 |
|--------|----------|--------|------|
| REQ-UI.1 | Design Tokens | 0.5 MD | ✅ 完成 |
| REQ-UI.2 | 组件视觉重构 | 1.5 MD | ✅ 完成 |
| REQ-UI.3 | 主题切换 | 1 MD | ✅ 完成 |
| REQ-UI.4 | 移动端响应式 | 1 MD | ✅ 完成 |

**总工时**: 4 MD | **周期**: 2-3 周 (实际 2 小时)

---

### 🔄 Phase 1: 全局体验优化 (可立即开始)
**状态**: 🟢 需求已定义，可开始开发

**目标**: 从"Clean Minimal" 到 "Premium Experience"

| 需求ID | 需求标题 | 工作量 | 优先级 | 状态 |
|--------|----------|--------|--------|------|
| **REQ-P2.1** | 全面体验优化 | 6.5 MD | **Must** | 🟢 **可开始** |

**包含内容**:
1. **基础组件优化** (1.5 MD): 卡片/按钮/输入框/列表组件视觉层次增强
2. **动画过渡系统** (1 MD): 页面切换、元素进入、微交互动画
3. **各页面视觉优化** (2 MD): 首页/游戏页/搜索页/速查表页/参考页/VSCode教程页
4. **可访问性优化** (0.75 MD): 焦点管理、ARIA 标签、键盘导航
5. **性能优化** (0.5 MD): GPU 加速、图片懒加载、代码分割

**详细文档**: [REQ-P2.1-global-polish.md](./requirements/REQ-P2.1-global-polish.md)

---

### 🔄 Phase 2: 搜索与游戏化 (Phase 1 完成后)
**状态**: 🔴 需求已定义，等待 Phase 1 完成

#### 搜索优化
| 需求ID | 需求标题 | 工作量 | 状态 |
|--------|----------|--------|------|
| REQ-1.1 | 搜索历史记录 | 0.5 MD | 🟢 可开始 |
| REQ-1.2 | 热门搜索标签 | 0.5 MD | 🔴 待定义 |
| REQ-1.3 | 正则搜索 | 1 MD | 🔴 待定义 |

#### 游戏化增强
| 需求ID | 需求标题 | 工作量 | 状态 |
|--------|----------|--------|------|
| REQ-2.1 | 关卡提示系统 | 1.5 MD | 🟢 可开始 |
| REQ-2.2 | 成就系统 | 1 MD | 🟢 可开始 |
| REQ-2.3 | 学习进度可视化 | 1 MD | 🔴 待定义 |

---

### 📋 Phase 3: UX 改进 (待定义)
**状态**: 🔴 部分需求待定义

| 需求ID | 需求标题 | 工作量 | 状态 |
|--------|----------|--------|------|
| REQ-3.2 | 键盘快捷键 | 0.5 MD | 🔴 待定义 |
| REQ-3.3 | PDF 导出 | 0.5 MD | 🔴 待定义 |

---

## 📝 下一步行动

### ✅ Sprint UI 完成后续
- [x] **@前端开发** 完成 Sprint UI 所有需求
- [x] **@功能测试** 完成测试 (100% Pass)
- [x] **@产品经理** 完成验收 (批准发布)
- [ ] **@项目经理** 批准发布 v2.1
- [ ] **@前端开发** 部署到 GitHub Pages

### 🔄 下一迭代 (Phase 1 + 2)
- [ ] 确认下一迭代优先级 (搜索 vs 游戏化)
- [ ] **@前端开发** 开始 REQ-1.1 或 REQ-2.1
- [ ] **@功能测试** 准备测试用例

---

## 🎨 Sprint UI: 需求详细定义 (保留存档)

> 以下需求已完成开发，文档保留供后续参考
| REQ-1.2 | 热门搜索标签 | Should Have | 0.5MD | 🔴 待定义 |
| REQ-1.3 | 正则表达式搜索 | Could Have | 1MD | 🔴 待定义 |
| REQ-2.3 | 学习进度可视化 | Should Have | 1MD | 🔴 待定义 |
| REQ-3.2 | 键盘快捷键 | Could Have | 0.5MD | 🔴 待定义 |

---

## 🎯 产品路线图 (Roadmap)

### Sprint 1: 搜索体验优化 (建议优先)
**目标**: 提升用户查找命令的效率
**时间**: 待定 (需与项目经理确认)

| 需求ID | 需求描述 | 优先级 | 用户价值 | 开发预估 | 状态 |
|--------|----------|--------|----------|----------|------|
| **REQ-1.1** | 搜索历史记录 (最近10条) | **Must Have** | 高 | 0.5MD | 🔴 待定义 |
| **REQ-1.2** | 热门搜索标签 (Top 5) | Should Have | 中 | 0.5MD | 🔴 待定义 |
| **REQ-1.3** | 正则表达式搜索模式 | Could Have | 低 | 1MD | 🔴 待定义 |

### Sprint 2: 游戏化增强
**目标**: 提升用户学习动力和留存率
**时间**: 待定

| 需求ID | 需求描述 | 优先级 | 用户价值 | 开发预估 | 状态 |
|--------|----------|--------|----------|----------|------|
| **REQ-2.1** | 关卡提示系统 (卡关时显示提示) | **Must Have** | 高 | 1.5MD | 🔴 **需定义** |
| **REQ-2.2** | 成就系统 (徽章、里程碑) | Should Have | 中 | 1MD | 🔴 待定义 |
| **REQ-2.3** | 学习进度可视化图表 | Should Have | 中 | 1MD | 🔴 待定义 |

### Sprint UI: UI/UX 设计系统重构 (新增)
**目标**: 建立统一的设计语言，提升视觉质感
**时间**: 2026-01-01 开始 (优先级最高)

| 需求ID | 需求描述 | 优先级 | 用户价值 | 开发预估 | 状态 |
|--------|----------|--------|----------|----------|------|
| **REQ-UI.1** | 设计系统基础 (Design Tokens) | **Must Have** | 高 | 0.5MD | 🟢 已定义 |
| **REQ-UI.2** | 核心组件视觉重构 | **Must Have** | 高 | 1.5MD | 🟢 已定义 |
| **REQ-UI.3** | 深色/浅色主题切换 | **Must Have** | 高 | 1MD | 🟢 已定义 |
| **REQ-UI.4** | 移动端响应式优化 | Should Have | 中 | 1MD | 🟢 已定义 |

### Sprint 3: 用户体验改进
**目标**: 提升整体产品体验

| 需求ID | 需求描述 | 优先级 | 开发预估 | 状态 |
|--------|----------|--------|----------|------|
| **REQ-3.2** | 键盘快捷键支持 (如 `/` 聚焦搜索) | Could Have | 0.5MD | 🔴 待定义 |
| **REQ-3.3** | 打印/PDF 导出功能 | Could Have | 0.5MD | 🔴 待定义 |

---

## 📝 待办事项

### ✅ 已完成 (2026-01-01)
- [x] **定义 REQ-UI.1 ~ REQ-UI.4 (Sprint UI) 详细需求** ✅ 已完成
  - ✅ REQ-UI.1: Design Tokens (色彩/间距/圆角/阴影/字体/动画系统)
  - ✅ REQ-UI.2: 组件视觉重构 (导航栏/首页/游戏页/终端组件)
  - ✅ REQ-UI.3: 深色/浅色主题切换 (切换按钮/持久化/主题色彩)
  - ✅ REQ-UI.4: 移动端响应式优化 (断点/汉堡菜单/触摸目标)
- [x] **定义 REQ-1.1 (搜索历史记录) 详细需求** ✅ 已完成 (暂停)
- [x] **定义 REQ-2.1 (关卡提示系统) 详细需求** ✅ 已完成 (暂停)
- [x] **定义 REQ-2.2 (成就系统) 详细需求** ✅ 已完成 (暂停)

### 🔄 下一步行动 (Sprint UI)
- [ ] **@前端开发** 立即开始 REQ-UI.1 (Design Tokens)
- [ ] **@前端开发** 创建 `src/styles/design-tokens.css` 文件
- [ ] **@项目经理** 确认 Sprint UI 排期 (预计 2-3 周)
- [ ] **@功能测试** 准备 UI 测试用例 (移动端适配)

### ⏸️ 暂停的需求
- [x] REQ-1.1: 搜索历史记录 - **等待 Sprint UI 完成**
- [x] REQ-2.1: 关卡提示系统 - **等待 Sprint UI 完成**
- [x] REQ-2.2: 成就系统 - **等待 Sprint UI 完成**

---

---

## 🎨 Sprint UI: 需求详细定义 (Clean Minimal 风格)

### REQ-UI.1: 设计系统基础 (Design Tokens)

**用户故事**: As a 开发者, I want 一套统一的设计变量系统, so that 整个产品的视觉风格保持一致

**优先级**: Must Have

**设计方向**: Clean Minimal (极简现代，Apple 风格)

**色彩系统**:
```css
/* 主色 - Indigo */
--color-primary: #6366f1;        /* 主按钮、链接 */
--color-primary-hover: #4f46e5;  /* 悬停状态 */
--color-primary-light: #e0e7ff;  /* 浅色背景 */

/* 辅助色 */
--color-success: #10b981;        /* 成功、完成 */
--color-warning: #f59e0b;        /* 警告 */
--color-error: #ef4444;          /* 错误 */

/* 中性色 (浅色主题) */
--color-bg-base: #ffffff;        /* 主背景 */
--color-bg-secondary: #f8f9fc;   /* 次级背景 */
--color-text-primary: #1a1a2e;   /* 主文字 */
--color-text-secondary: #6b7280; /* 次级文字 */
--color-border: rgba(0, 0, 0, 0.08); /* 边框 */
```

**间距系统** (4px 基准):
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

**圆角系统**:
```css
--radius-sm: 8px;   /* 小按钮、标签 */
--radius-md: 12px;  /* 卡片、输入框 */
--radius-lg: 16px;  /* 大卡片 */
--radius-full: 9999px; /* 圆形 */
```

**阴影系统**:
```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
```

**字体系统**:
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Courier New', monospace;
```

**验收标准**:
- [ ] AC1: 创建 `src/styles/design-tokens.css` 文件
- [ ] AC2: 所有颜色、间距、圆角、阴影使用 CSS 变量
- [ ] AC3: 组件中无硬编码样式值
- [ ] AC4: 变量命名语义化，易于理解

---

### REQ-UI.2: 核心组件视觉重构

**用户故事**: As a 用户, I want 现代、清爽的界面设计, so that 我能更专注地学习内容

**优先级**: Must Have

**组件重构范围**:
1. **导航栏** (`App.vue`)
   - 毛玻璃效果: `backdrop-filter: blur(16px)`
   - 底部边框: `border: 1px solid var(--color-border)`
   - 悬停动画: `transform: translateY(-2px)`

2. **首页** (`HomeView.vue`)
   - Hero 区域: 移除 ASCII Logo，使用大标题
   - 特性卡片: 白色背景 + 轻柔阴影
   - 统计卡片: 数字使用渐变色

3. **游戏页** (`GameView.vue`)
   - 关卡卡片: 统一圆角 `var(--radius-md)`
   - 终端组件: 深色背景 (`#1a1a2e`) + 浅色文字

**视觉规范**:
- 卡片间距: `gap: var(--spacing-lg)` (24px)
- 卡片内边距: `padding: var(--spacing-xl)` (32px)
- 标题字号: 20-24px
- 正文字号: 14-16px

**验收标准**:
- [ ] AC1: 所有组件使用 Design Tokens
- [ ] AC2: 页面风格统一 (色彩、间距、圆角)
- [ ] AC3: 悬停效果流畅 (transition: 0.2s ease)
- [ ] AC4: 无视觉断层或样式冲突

---

### REQ-UI.3: 深色/浅色主题切换

**用户故事**: As a 用户, I want 在夜间使用深色主题, so that 保护眼睛

**优先级**: Must Have

**主题切换交互**:
- 切换按钮位置: 导航栏右侧
- 默认主题: 浅色
- 持久化: `localStorage` 保存用户偏好
- 切换动画: 渐变过渡 (0.3s ease)

**深色主题色彩映射**:
```css
[data-theme="dark"] {
  --color-bg-base: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-border: rgba(255, 255, 255, 0.1);
}
```

**验收标准**:
- [ ] AC1: 点击切换按钮，主题立即切换
- [ ] AC2: 刷新页面，主题保持
- [ ] AC3: 所有页面主题一致
- [ ] AC4: 切换过程无闪烁
- [ ] AC5: 文字对比度符合 WCAG AA (≥4.5:1)

---

### REQ-UI.4: 移动端响应式优化

**用户故事**: As a 移动端用户, I want 在手机上也能正常使用, so that 随时随地学习

**优先级**: Should Have

**响应式断点**:
```css
/* 移动端 */
@media (max-width: 640px) {
  .content-wrapper { padding: var(--spacing-md); }
  .features-grid { grid-template-columns: 1fr; }
}

/* 平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}

/* 桌面 */
@media (min-width: 1025px) {
  .features-grid { grid-template-columns: repeat(3, 1fr); }
}
```

**移动端特殊处理**:
- 导航栏: 汉堡菜单 (640px 以下)
- 间距: 减少至 16px
- 字号: 适当缩小 (1-2px)

**验收标准**:
- [ ] AC1: 375px (iPhone SE) 布局正常
- [ ] AC2: 768px (iPad) 布局正常
- [ ] AC3: 1920px (桌面) 布局正常
- [ ] AC4: 横竖屏切换无错位
- [ ] AC5: 触摸目标 ≥44x44px

---

## 🔍 需求定义模板

当创建新需求时，请使用以下格式：

```markdown
### REQ-X.X: [需求标题]

**用户故事**: As a [开发者/用户], I want [功能描述], so that [用户价值]

**优先级**: Must Have / Should Have / Could Have / Won't Have

**场景描述**:
- **Given** [前置条件]
- **When** [用户操作]
- **Then** [预期结果]

**验收标准 (Acceptance Criteria)**:
- [ ] AC1: [Given] 当 [条件], [When] 执行 [操作], [Then] 应该 [结果]
- [ ] AC2: [Given] 当 [条件], [When] 执行 [操作], [Then] 应该 [结果]
- [ ] AC3: [Given] 当 [条件], [When] 执行 [操作], [Then] 应该 [结果]

**UI/UX 要求**:
- **Empty State**: [描述空数据时的显示]
- **Loading State**: [描述加载时的显示]
- **Error State**: [描述错误时的显示]
- **Success State**: [描述成功时的显示]

**技术约束** (可选):
- 必须使用 [技术/库]
- 兼容性要求 [浏览器/设备]
- 性能要求 [响应时间/帧率]

**数据模型** (基于 `src/data/game-data.js` 可扩展):
```javascript
{
  // 数据结构定义
}
```

**依赖项**:
- 前置需求: [REQ-ID]
- 需要协调: [角色/资源]

**成功指标**:
- [指标1]: [量化目标] (例如：关卡完成率提升 30%)
- [指标2]: [量化目标]

**参考**:
- 竞品: [产品/功能]
- 设计稿: [链接]
```

---

## 💬 沟通规范

### 提问前端开发时
```
@前端开发 这个需求 [REQ-X.X] 的技术可行性如何？
有没有更好的实现方案？
基于 Naive UI 组件库，能否低成本实现？
```

### 提问功能测试时
```
@功能测试 请评估 [REQ-X.X] 的测试范围和测试难点
有哪些边界场景需要覆盖？
```

### 向项目经理汇报时
```
@项目经理 需求 [REQ-X.X] 已定义完毕，请评估排期
优先级调整: [原优先级] → [新优先级]，原因: [原因]
预计开发工时: [X MD]
```

---

## 📊 产品数据

### 用户反馈 (如果有)
*暂无用户反馈渠道*

### 改进建议收集
*建议添加 Google Forms / 用户调研*

### 数据指标追踪
- **关卡完成率**: 待统计
- **平均学习时长**: 待统计
- **搜索使用频率**: 待统计
- **用户留存率**: 待统计

---

## 📌 重要链接
- **项目状态**: [STATUS.md](../STATUS.md)
- **技术文档**: [web-game-vue/PROJECT.md](../web-game-vue/PROJECT.md)
- **关卡数据**: [web-game-vue/src/data/game-data.js](../web-game-vue/src/data/game-data.js)
- **Git 仓库**: https://github.com/raven1997s/claude-code-guide
- **问题追踪**: [GitHub Issues](https://github.com/raven1997s/claude-code-guide/issues)

---

**更新时间**: 2026-01-01
**更新人**: 资深技术产品经理 (专注于开发者体验与游戏化教育)
