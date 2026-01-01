# 项目协作中心 (Project Collaboration Hub)

> **团队理念**: 效率第一！顶级 AI 团队，拒绝拖延，拒绝借口，只看结果。
>
> **工作准则**: 今天能完成的绝不拖到明天。每个任务都要有明确的截止时间。

> **所属项目**: [Claude Code CLI Guide & Game]
>
> **团队构成**: 项目经理 (统筹) + 产品经理 + 前端开发 + 功能测试
>
> **当前版本**: v2.0 (Vue 3 重构版)
>
> **仓库地址**: https://github.com/raven1997s/claude-code-guide

---

## ⚡ 效率准则

### 时间观念
- **今日事今日毕**: 所有任务必须在承诺的时间内完成，逾期需提前预警
- **精确预估**: 所有任务预估精确到 0.25 MD (2 小时)，拒绝模糊的"大概几天"
- **立即响应**: 团队沟通 @ 提及必须在 30 分钟内响应

### 交付标准
- **前端开发**: 代码必须 ESLint 0 errors, 0 warnings 才算完成
- **产品经理**: 需求必须包含验收标准才算定义完成
- **功能测试**: Bug 报告必须包含复现步骤才算有效报告

### 工作时间
- **冲刺模式**: 关键任务期间保持专注，可并行推进
- **质量优先**: 速度不能牺牲质量，返工比慢工更浪费时间

---

## 📁 文件说明

| 文件 | 角色 | 用途 |
|------|------|------|
| **[STRUCTURE.md](./STRUCTURE.md)** | 📖 文件结构 | Project 文件夹完整结构说明和维护规范 |
| **[PROJECT_MANAGER.md](./PROJECT_MANAGER.md)** | 项目经理 (交付与统筹) | Sprint 规划、进度管理、风险控制、质量门禁 |
| **[PRODUCT_MANAGER.md](./PRODUCT_MANAGER.md)** | 产品经理 (PM) | 需求定义、优先级决策、产品路线图、用户价值 |
| **[FRONTEND_DEV.md](./FRONTEND_DEV.md)** | 前端开发 | 技术实现、代码质量、组件开发、性能优化 |
| **[QA_TESTER.md](./QA_TESTER.md)** | 功能测试 (QA) | 功能测试、缺陷管理、用户体验保障 |
| **[ROADMAP.md](./ROADMAP.md)** | 产品路线图 | 长期产品规划、Phase 划分、里程碑 |

### 需求文档
- **需求索引**: [requirements/README.md](./requirements/README.md)
- **Phase 0**: Sprint UI (已完成 ✅)
- **Phase 1**: 全局体验优化 (进行中 🟢)
- **Phase 2**: 搜索与游戏化 (待开始 🔴)
- **Phase 3**: UX 改进 (待定义 🔴)

> 💡 **提示**: 查看 [STRUCTURE.md](./STRUCTURE.md) 了解完整的文件目录结构

---

## 🔄 团队协作流程

### 1. 需求定义阶段
```
产品经理 → 定义需求 (REQ-X.X)
         ↓
       评审会议 (PM + 产品 + 开发 + 测试)
         ↓
       前端开发 → 技术可行性评估
         ↓
       功能测试 → 可测性分析
         ↓
       项目经理 → 确认排期
```

### 2. 开发阶段
```
前端开发 → 编写代码 → 自测 → 提交 PR
         ↓
       功能测试 → 执行测试 → 报告缺陷
         ↓
       前端开发 → 修复缺陷 → 重新测试
         ↓
       项目经理 → 代码审查 → 批准合并
```

### 3. 发布阶段
```
项目经理 → 发布决策 → 创建 Release
         ↓
       功能测试 → 冒烟测试 → 确认发布
         ↓
       产品经理 → 用户反馈收集 → 下一迭代
```

---

## 💬 沟通规范

### @ 提及机制
在各自的文件中更新状态时，使用 `@角色` 提及相关方：

```markdown
@前端开发 需求 [REQ-X.X] 已定义完毕，请评估技术可行性

@功能测试 功能 [DEV-X.X] 已开发完成，请开始测试

@产品经理 测试中发现 [REQ-X.X] 存在问题，建议调整需求

@项目经理 任务 [DEV-X.X] 遇到技术难题，需要协调资源
```

### 文件更新频率
| 文件 | 更新频率 | 更新触发条件 |
|------|----------|--------------|
| PROJECT_MANAGER.md | 每周 / 里程碑 | Sprint 开始/结束、风险变化 |
| PRODUCT_MANAGER.md | 按需 | 新需求定义、优先级调整 |
| FRONTEND_DEV.md | 每日 / 任务完成 | 开发进度更新、技术难题 |
| QA_TESTER.md | 测试周期 | 测试完成、缺陷发现 |

---

## 📊 当前项目状态

### 整体健康度
| 维度 | 状态 | 说明 |
|------|------|------|
| **进度** | 🟢 正常 | Phase 0 (Sprint UI) 已完成 |
| **质量** | 🟢 优秀 | ESLint 0 errors, 0 warnings |
| **风险** | 🟢 低 | 无已知阻塞问题 |
| **交付** | 🟢 就绪 | Phase 1 需求已定义，可开始开发 |

### Phase 进度
| Phase | 名称 | 状态 | 完成度 |
|-------|------|------|--------|
| **Phase 0** | Sprint UI | ✅ 已完成 | 100% |
| **Phase 1** | 全局体验优化 | 🟢 进行中 | 0% |
| **Phase 2** | 搜索与游戏化 | 🔴 待开始 | 0% |
| **Phase 3** | UX 改进 | 🔴 待定义 | 0% |

### 当前待办
- [x] **Phase 0**: Sprint UI - 设计系统重构 ✅ 已完成
- [ ] **Phase 1**: 全局体验优化 - 🟢 需求已定义，可开始开发
  - [ ] 基础组件优化 (1.5 MD)
  - [ ] 动画过渡系统 (1 MD)
  - [ ] 各页面视觉优化 (2 MD)
  - [ ] 可访问性优化 (0.75 MD)
  - [ ] 性能优化 (0.5 MD)
- [ ] **Phase 2**: 搜索与游戏化 - 部分需求已定义
- [ ] **Phase 3**: UX 改进 - 待定义

> 📋 **详细需求**: 见 [requirements/README.md](./requirements/README.md)

---

## 🎯 团队工作准则

### 项目经理
- ✅ 每周输出项目状态周报 (红绿灯机制)
- ✅ 识别关键路径，确保核心功能不被阻塞
- ✅ 强制执行 CI/CD 质量门禁

### 产品经理
- ✅ 使用 MoSCoW 方法 (Must/Should/Could/Won't) 定义优先级
- ✅ 需求必须包含验收标准 (Acceptance Criteria)
- ✅ 变更需求时先评估对 Deadline 的影响

### 前端开发
- ✅ 代码必须通过 ESLint + Prettier 检查
- ✅ 遵循 Vue 3 Composition API 规范
- ✅ 遇到技术难题及时上报，不要自行"硬扛"

### 功能测试
- ✅ 测试用例必须包含：步骤、预期结果、实际结果
- ✅ 缺陷必须包含：复现步骤、截图/录屏、严重程度
- ✅ 发现 Critical 级别缺陷立即阻塞发布

---

## 🛑 紧急情况处理

### 当出现 Critical 缺陷时
1. **功能测试**: 立即 `@项目经理` 和 `@前端开发`
2. **前端开发**: 评估修复时间 (30分钟内响应)
3. **项目经理**: 决策是否回滚版本
4. **产品经理**: 评估用户影响，准备公告 (如需)

### 当需求变更时
1. **产品经理**: 在文件中更新需求，并 `@前端开发` 和 `@项目经理`
2. **前端开发**: 评估对当前开发进度的影响
3. **项目经理**: 重新评估排期，确认是否调整 Sprint

---

## 📚 项目文档索引

### 核心文档
| 文档 | 路径 | 说明 |
|------|------|------|
| 项目状态追踪 | [STATUS.md](../STATUS.md) | 项目整体进度、已完成/待办事项 |
| 技术文档 | [web-game-vue/PROJECT.md](../web-game-vue/PROJECT.md) | 技术栈、项目结构、核心功能 |
| AI 助手指令 | [web-game-vue/CLAUDE.md](../web-game-vue/CLAUDE.md) | Claude Code 工作指引 |
| 根目录 README | [README.md](../README.md) | 项目介绍、快速启动 |

### 外部资源
- **Git 仓库**: https://github.com/raven1997s/claude-code-guide
- **Issues**: https://github.com/raven1997s/claude-code-guide/issues
- **Vue 3 文档**: https://cn.vuejs.org/
- **Naive UI**: https://www.naiveui.com/

---

## 🚀 快速开始

### 新成员入职
1. 阅读 [web-game-vue/PROJECT.md](../web-game-vue/PROJECT.md) 了解技术架构
2. 阅读自己角色的文件 (如 [FRONTEND_DEV.md](./FRONTEND_DEV.md))
3. 阅读 [STATUS.md](../STATUS.md) 了解当前进度
4. 启动项目: `cd web-game-vue && npm run dev`

### 恢复工作流程
```bash
# 1. 拉取最新代码
git pull

# 2. 查看项目状态
cat STATUS.md

# 3. 查看角色任务
cat project/[YOUR_ROLE].md

# 4. 开始工作
cd web-game-vue && npm run dev
```

---

**最后更新**: 2026-01-01
**文档维护**: 项目经理 (全局统筹)
