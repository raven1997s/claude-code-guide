# 需求文档索引

> **最后更新**: 2026-01-01
> **维护者**: 产品经理

> **说明**: 需求文件按 Phase 命名前缀分类：
> - `REQ-UI.*` - Phase 0: Sprint UI (已完成)
> - `REQ-P2.1*` - Phase 1: 全局体验优化 (进行中)
> - `REQ-1.*`, `REQ-2.*` - Phase 2: 搜索与游戏化 (待开始)
> - `REQ-3.*` - Phase 3: UX 改进 (待定义)

---

## 📋 需求文档总览

### Phase 分类

| Phase | 名称 | 状态 | 工作量 | 完成时间 |
|-------|------|------|--------|----------|
| **Phase 0** | Sprint UI | ✅ 已完成 | 4 MD | 2026-01-01 |
| **Phase 1** | 全局体验优化 | 🟢 进行中 | 6.5 MD | - |
| **Phase 2** | 搜索与游戏化 | 🔴 待开始 | TBD | - |
| **Phase 3** | UX 改进 | 🔴 待定义 | TBD | - |

---

## ✅ Phase 0: Sprint UI (已完成)

**目标**: 建立 Clean Minimal 设计语言，实现主题切换

**状态**: ✅ 验收通过 - 批准发布

| 需求ID | 需求标题 | 工作量 | 状态 | 文件 |
|--------|----------|--------|------|------|
| REQ-UI.1 | Design Tokens | 0.5 MD | ✅ 完成 | [REQ-UI.1-design-tokens.md](./REQ-UI.1-design-tokens.md) |
| REQ-UI.2 | 组件视觉重构 | 1.5 MD | ✅ 完成 | [REQ-UI.2-component-refactor.md](./REQ-UI.2-component-refactor.md) |
| REQ-UI.3 | 主题切换 | 1 MD | ✅ 完成 | [REQ-UI.3-theme-switch.md](./REQ-UI.3-theme-switch.md) |
| REQ-UI.4 | 移动端响应式 | 1 MD | ✅ 完成 | [REQ-UI.4-mobile-responsive.md](./REQ-UI.4-mobile-responsive.md) |

**总工时**: 4 MD

**验收报告**: [../archive/reports/Sprint-UI-Acceptance-Report.md](../archive/reports/Sprint-UI-Acceptance-Report.md)

---

## 🟢 Phase 1: 全局体验优化 (进行中)

**目标**: 从 "Clean Minimal" 到 "Premium Experience"

**状态**: 🟢 需求已定义，可开始开发

| 需求ID | 需求标题 | 工作量 | 状态 | 文件 |
|--------|----------|--------|------|------|
| REQ-P2.1 | 全面体验优化 (总需求) | - | ✅ 已定义 | [REQ-P2.1-global-polish.md](./REQ-P2.1-global-polish.md) |
| REQ-P2.1.1 | 基础组件优化 | 1.5 MD | 🟢 可开始 | [REQ-P2.1.1-component-polish.md](./REQ-P2.1.1-component-polish.md) |
| REQ-P2.1.2 | 动画过渡系统 | 1 MD | 🟢 可开始 | [REQ-P2.1.2-animation-system.md](./REQ-P2.1.2-animation-system.md) |
| REQ-P2.1.3 | 各页面视觉优化 | 2 MD | 🟢 可开始 | [REQ-P2.1.3-page-visual-polish.md](./REQ-P2.1.3-page-visual-polish.md) |
| REQ-P2.1.4 | 可访问性优化 | 0.75 MD | 🟢 可开始 | [REQ-P2.1.4-accessibility.md](./REQ-P2.1.4-accessibility.md) |
| REQ-P2.1.5 | 性能优化 | 0.5 MD | 🟢 可开始 | [REQ-P2.1.5-performance.md](./REQ-P2.1.5-performance.md) |

**总工时**: 6.5 MD (约 2-3 周)

**包含内容**:
1. 基础组件优化 (卡片/按钮/输入框/列表) - 4 级视觉层次
2. 动画过渡系统 (页面切换/元素进入/微交互)
3. 各页面视觉优化 (6 个页面的 Hero、卡片、动画)
4. 可访问性优化 (ARIA/焦点/键盘/WCAG 2.1 AA)
5. 性能优化 (GPU 加速/懒加载/代码分割)

---

## 🔴 Phase 2: 搜索与游戏化 (待开始)

**目标**: 提升用户查找命令的效率 + 学习动力

**状态**: 🔴 部分需求已定义，等待 Phase 1 完成

| 需求ID | 需求标题 | 工作量 | 状态 | 文件 |
|--------|----------|--------|------|------|
| REQ-1.1 | 搜索历史记录 | 0.5 MD | 🟢 已定义 | [REQ-1.1-search-history.md](./REQ-1.1-search-history.md) |
| REQ-1.2 | 热门搜索标签 | 0.5 MD | 🔴 待定义 | - |
| REQ-1.3 | 正则表达式搜索 | 1 MD | 🔴 待定义 | - |
| REQ-2.1 | 关卡提示系统 | 1.5 MD | 🟢 已定义 | [REQ-2.1-hint-system.md](./REQ-2.1-hint-system.md) |
| REQ-2.2 | 成就系统 | 1 MD | 🟢 已定义 | [REQ-2.2-achievement-system.md](./REQ-2.2-achievement-system.md) |
| REQ-2.3 | 学习进度可视化 | 1 MD | 🔴 待定义 | - |

**预估工时**: TBD

---

## 🔴 Phase 3: UX 改进 (待定义)

**目标**: 提升整体用户体验

**状态**: 🔴 需求待定义

| 需求ID | 需求标题 | 预估 | 状态 | 文件 |
|--------|----------|------|------|------|
| REQ-3.2 | 键盘快捷键 | 0.5 MD | 🔴 待定义 | - |
| REQ-3.3 | PDF 导出 | 0.5 MD | 🔴 待定义 | - |

---

## 📝 需求文档规范

### 命名规范
```
REQ-{Phase}.{ID}-{title}.md
```

**示例**:
- `REQ-UI.1-design-tokens.md` - Phase 0, UI 需求 #1
- `REQ-P2.1-global-polish.md` - Phase 2.1, 全局优化总需求
- `REQ-2.1-hint-system.md` - Phase 2, 需求 #1

### 文档结构
每个需求文档应包含:
1. **头部信息**: 需求类型、优先级、创建时间
2. **用户故事**: As a... I want... So that...
3. **验收标准**: 具体的、可测试的验收条件
4. **技术实现**: 技术方案、代码示例
5. **测试计划**: 测试场景、测试用例

### 状态流转
```
🔴 待定义 → 🟢 已定义 → 🟡 开发中 → ✅ 已完成 → 📦 已归档
```

---

## 🔗 相关文档

- **团队工作台**:
  - [项目经理](../PROJECT_MANAGER.md)
  - [产品经理](../PRODUCT_MANAGER.md)
  - [前端开发](../FRONTEND_DEV.md)
  - [功能测试](../QA_TESTER.md)

- **项目文档**:
  - [README](../README.md) - 团队协作中心
  - [ROADMAP](../ROADMAP.md) - 产品路线图
  - [STRUCTURE](../STRUCTURE.md) - 文件夹结构说明

---

**维护者**: 产品经理
**最后更新**: 2026-01-01
**下次更新**: Phase 1 完成后
