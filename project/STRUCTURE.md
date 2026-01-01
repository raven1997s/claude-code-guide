# Project 文件夹结构说明

> **最后更新**: 2026-01-01
> **维护者**: 项目经理

---

## 📁 目录结构

```
project/
├── README.md                          # 团队协作中心 (首页)
├── ROADMAP.md                         # 产品路线图
│
├── PROJECT_MANAGER.md                 # 项目经理工作台
├── PRODUCT_MANAGER.md                 # 产品经理工作台
├── FRONTEND_DEV.md                    # 前端开发工作台
├── QA_TESTER.md                       # 功能测试工作台
│
├── STRUCTURE.md                       # 本文件 - 文件夹结构说明
│
├── requirements/                      # 📋 需求文档目录
│   ├── README.md                      # 需求索引
│   │
│   ├── REQ-UI.1-design-tokens.md           # Phase 0
│   ├── REQ-UI.2-component-refactor.md      # Phase 0
│   ├── REQ-UI.3-theme-switch.md            # Phase 0
│   ├── REQ-UI.4-mobile-responsive.md       # Phase 0
│   │
│   ├── REQ-P2.1-global-polish.md           # Phase 1 (总需求)
│   ├── REQ-P2.1.1-component-polish.md      # Phase 1
│   ├── REQ-P2.1.2-animation-system.md      # Phase 1
│   ├── REQ-P2.1.3-page-visual-polish.md    # Phase 1
│   ├── REQ-P2.1.4-accessibility.md         # Phase 1
│   ├── REQ-P2.1.5-performance.md           # Phase 1
│   │
│   ├── REQ-1.1-search-history.md           # Phase 2
│   ├── REQ-2.1-hint-system.md              # Phase 2
│   └── REQ-2.2-achievement-system.md       # Phase 2

archive/                               # 📦 归档目录 (位于项目根目录)
└── reports/                           # 验收报告
    ├── Sprint-UI-Acceptance-Report.md     # Phase 0 验收报告
    └── Phase-1-Acceptance-Report.md       # Phase 1 验收报告 (待创建)
```

---

## 📄 文件说明

### 核心文档

| 文件 | 用途 | 维护者 | 更新频率 |
|------|------|--------|----------|
| **README.md** | 团队协作中心，快速导航 | 项目经理 | 每个 Sprint |
| **ROADMAP.md** | 产品路线图，长期规划 | 产品经理 | 每季度 |
| **STRUCTURE.md** | 本文件，文件夹结构说明 | 项目经理 | 按需 |

### 团队工作台

| 文件 | 角色 | 内容 | 更新频率 |
|------|------|------|----------|
| **PROJECT_MANAGER.md** | 项目经理 | Sprint 规划、风险管理、进度追踪 | 每日 |
| **PRODUCT_MANAGER.md** | 产品经理 | 需求定义、路线图、验收标准 | 每周 |
| **FRONTEND_DEV.md** | 前端开发 | 任务队列、技术规范、代码示例 | 每日 |
| **QA_TESTER.md** | 功能测试 | 测试计划、测试用例、Bug 报告 | 每日 |

### 需求文档 (requirements/)

**命名规范**: `REQ-{Phase}.{ID}-{title}.md`

**示例**:
- `REQ-UI.1-design-tokens.md` - Phase 0, UI 需求 #1
- `REQ-P2.1-global-polish.md` - Phase 2.1, 全局优化总需求
- `REQ-P2.1.1-component-polish.md` - Phase 2.1, 子需求 #1

**Phase 划分**:
- **phase-0/**: Sprint UI (已完成 ✅)
- **phase-1/**: 全局体验优化 (进行中 🟢)
- **phase-2/**: 搜索与游戏化 (待开始 🔴)
- **phase-3/**: UX 改进 (待定义 🔴)

### 归档文档 (archive/)

**reports/**: 验收报告
- 每个 Phase 完成后创建
- 包含测试结果、质量指标、遗留问题

**old-requirements/**: 旧版需求文档
- 仅在需求文档格式发生重大变更时使用
- 保留历史版本以供参考

---

## 🔧 维护规范

### 新建需求文档
1. 在 `requirements/phase-X/` 下创建
2. 使用标准命名规范
3. 更新 `requirements/README.md` 索引
4. 在对应角色文件中添加引用

### 归档文档
1. 每个 Phase 完成后：
   - 创建验收报告到 `archive/reports/`
   - 更新 `README.md` 的完成状态
   - 可选：将旧需求移到 `archive/old-requirements/`

### 文件更新优先级
1. **高优先级** (每日更新):
   - `PROJECT_MANAGER.md` (进度、风险)
   - `FRONTEND_DEV.md` (任务状态)
   - `QA_TESTER.md` (测试结果)

2. **中优先级** (每周更新):
   - `PRODUCT_MANAGER.md` (需求状态)
   - `requirements/README.md` (需求索引)

3. **低优先级** (按需更新):
   - `README.md` (重大变更时)
   - `ROADMAP.md` (季度规划)
   - `STRUCTURE.md` (结构调整时)

---

## 📋 快速查找

### 我想要...

**查看当前任务**
→ 见对应角色文件 (PROJECT_MANAGER.md, FRONTEND_DEV.md 等)

**了解需求详情**
→ 见 `requirements/phase-X/REQ-X.X-*.md`

**查看项目进度**
→ 见 PROJECT_MANAGER.md 的 "进度追踪" 章节

**了解产品规划**
→ 见 PRODUCT_MANAGER.md 或 ROADMAP.md

**查看历史报告**
→ 见 [archive/reports/](../archive/reports/)

**查找文件**
→ 见本文件 (STRUCTURE.md) 的目录结构

---

## 🔄 文件关系图

```
README.md (入口)
    ├─→ 各角色文件 (工作台)
    │   ├─→ PROJECT_MANAGER.md
    │   ├─→ PRODUCT_MANAGER.md
    │   ├─→ FRONTEND_DEV.md
    │   └─→ QA_TESTER.md
    │
    └─→ requirements/ (需求详情)
        ├─→ phase-0/ (已完成)
        ├─→ phase-1/ (进行中)
        ├─→ phase-2/ (待开始)
        └─→ phase-3/ (待定义)

archive/ (归档)
    └─→ reports/ (验收报告)
```

---

## 📌 注意事项

### 文件移动
**禁止**随意移动文件到 `archive/`，除非：
- Phase 已完成并通过验收
- 文档格式已更新，旧版本需保留
- 经项目经理和产品经理同意

### 文件删除
**禁止**删除任何文档，除非：
- 文件是重复的
- 经团队全体同意
- 已备份到其他位置

### 文件重命名
如需重命名：
1. 确保所有引用已更新
2. 更新 `README.md` 和索引文件
3. 通知团队成员

---

**维护者**: 项目经理
**最后审核**: 2026-01-01
**下次审核**: Phase 1 完成后