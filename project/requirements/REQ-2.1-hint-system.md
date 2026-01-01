# REQ-2.1: 关卡提示系统 (Hint System)

> **需求ID**: REQ-2.1
> **状态**: 🟢 已定义
> **优先级**: Must Have
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名正在学习 Claude Code CLI 的开发者，当我在某个关卡卡住超过 2 分钟时，我希望获得渐进式的提示帮助，这样我既能保持学习的挑战性，又不会因为完全无法理解而放弃学习。

**业务价值**:
- 降低关卡放弃率，目标提升完课率 30%
- 减少用户挫败感，提升学习体验
- 保持适度挑战，避免"直接给答案"破坏学习效果

---

## 🎯 功能规格

### 1. 提示触发逻辑 (Multi-Trigger System)

#### 触发条件 (满足任一即触发)

| 触发类型 | 条件 | 时间阈值 | 适用场景 |
|---------|------|----------|----------|
| **时间触发** | 在关卡停留超过 X 分钟 | 90秒 (可配置) | 用户思考但未操作 |
| **错误触发** | 连续输入错误命令 ≥ N 次 | 3次 (可配置) | 用户尝试但方向错误 |
| **主动触发** | 用户点击"获取提示"按钮 | 立即 | 用户明确需要帮助 |

#### 配置参数
```javascript
// 扩展 game-data.js 中每个关卡的数据结构
{
  id: 1,
  name: "初出茅庐",
  // 新增字段
  hintConfig: {
    enabled: true,
    timeThreshold: 90,    // 秒
    errorThreshold: 3,    // 次数
    hints: [
      {
        level: 1,
        text: "提示: 使用 --version 参数查看版本信息",
        trigger: "time",  // 时间触发
        delay: 30         // 额外延迟显示
      },
      {
        level: 2,
        text: "提示: 输入 claude --help 可以查看所有可用参数",
        trigger: "error", // 错误触发
        minErrors: 2      // 至少2次错误后显示
      },
      {
        level: 3,
        text: "答案: 直接输入 claude --version 即可",
        trigger: "manual" // 仅主动触发
      }
    ]
  }
}
```

---

### 2. 渐进式提示层级 (Progressive Disclosure)

#### Level 1: 轻度提示 (Light Hint)
- **触发**: 自动触发 (时间/错误)
- **内容**: 仅提示关键参数或概念
- **示例**: "提示: 注意命令的 `-c` 参数"
- **视觉**: 蓝色 `n-alert` (info 类型)

#### Level 2: 中度提示 (Medium Hint)
- **触发**: 在 Level 1 显示后 30秒仍未完成
- **内容**: 引导用户查阅帮助文档
- **示例**: "提示: 使用 `claude --help` 查看 `-c` 的含义"
- **视觉**: 黄色 `n-alert` (warning 类型)

#### Level 3: 重度提示 (Direct Answer)
- **触发**: 仅在用户主动点击"查看答案"或连续错误 ≥ 5次
- **内容**: 直接给出完整命令
- **示例**: "答案: `claude -c` (继续上次对话)"
- **视觉**: 绿色 `n-alert` (success 类型) + 虚线边框强调

#### 提示状态管理
```javascript
// GameView.vue 中的状态管理
const hintState = ref({
  currentLevel: 0,      // 当前显示的提示层级
  showTime: null,       // Level 1 显示时间
  lastErrorCount: 0,    // 上次错误计数
  isManuallyTriggered: false // 是否主动触发
})
```

---

### 3. UI/UX 设计

#### 提示显示位置
- **位置**: 终端组件上方，任务说明卡片下方
- **组件**: 使用 Naive UI `n-alert` + `n-collapse`
- **动画**: 渐入效果 (`fade-in` 0.3s ease)

#### 交互元素
```vue
<template>
  <!-- 提示容器 -->
  <div v-if="shouldShowHint" class="hint-container">
    <n-alert
      :type="hintType"
      :closable="true"
      @close="dismissHint"
    >
      <template #header>
        <n-space align="center">
          <n-icon :component="LightbulbIcon" />
          <span>提示 ({{ currentHintLevel }}/3)</span>
        </n-space>
      </template>

      <!-- 渐进式提示内容 -->
      <n-collapse v-if="currentHintLevel > 1">
        <n-collapse-item title="查看之前的提示" name="previous">
          <div v-for="(hint, idx) in hints.slice(0, currentHintLevel - 1)" :key="idx">
            {{ hint.text }}
          </div>
        </n-collapse-item>
      </n-collapse>

      <div class="hint-text">{{ currentHint.text }}</div>

      <!-- 操作按钮 -->
      <template #action>
        <n-space>
          <n-button
            v-if="currentHintLevel < 3"
            size="small"
            @click="showNextHint"
          >
            需要更多提示
          </n-button>
          <n-button
            size="small"
            type="warning"
            @click="showAnswer"
          >
            直接看答案
          </n-button>
          <n-button
            size="small"
            quaternary
            @click="dismissHint"
          >
            不需要提示，关闭
          </n-button>
        </n-space>
      </template>
    </n-alert>
  </div>
</template>
```

#### 状态变化
| 状态 | 触发条件 | 显示内容 |
|------|----------|----------|
| **Hidden** | 关卡开始，未满足触发条件 | 不显示提示 |
| **Level 1 Shown** | 时间 > 90s 或错误 ≥ 3次 | 显示轻度提示 |
| **Level 2 Shown** | Level 1 显示后 30s 未完成 | 显示中度提示 |
| **Level 3 Shown** | 用户主动点击"直接看答案" | 显示完整答案 |
| **Dismissed** | 用户点击关闭 | 提示隐藏，不再自动显示 |

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: 时间触发功能
- **Given** 用户进入关卡且未执行任何命令
- **When** 停留时间超过 90秒
- **Then** 应该自动显示 Level 1 提示
- **And** 提示内容来自 `hintConfig.hints[0]`
- **And** 使用 `info` 类型的 `n-alert` 显示

### AC2: 错误触发功能
- **Given** 用户在关卡中连续输入错误命令
- **When** 错误次数达到 3次
- **Then** 应该立即显示 Level 1 提示
- **And** 提示中包含"错误触发"标识
- **And** 错误计数重置

### AC3: 渐进式提示层级
- **Given** Level 1 提示已显示
- **When** 用户点击"需要更多提示"按钮
- **Then** 应该显示 Level 2 提示
- **And** 可以折叠查看之前的提示
- **And** 提示类型变为 `warning`

### AC4: 主动触发功能
- **Given** 用户在关卡中遇到困难
- **When** 用户点击"直接看答案"按钮
- **Then** 应该直接显示 Level 3 (完整答案)
- **And** 提示类型为 `success`
- **And** 该关卡不再自动触发提示

### AC5: 提示关闭功能
- **Given** 提示正在显示
- **When** 用户点击关闭按钮或"不需要提示"
- **Then** 提示应该立即隐藏
- **And** 保存用户选择到 LocalStorage
- **And** 该关卡不再自动触发提示

### AC6: 提示数据结构兼容性
- **Given** `game-data.js` 中现有关卡数据
- **When** 某个关卡没有 `hintConfig` 字段
- **Then** 应该使用默认提示配置
- **And** 默认提示为通用提示："尝试查看帮助文档"

---

## 🎨 UI/UX 要求

### Empty State (无提示时)
- 不显示提示容器
- 终端组件正常显示

### Loading State (提示加载时)
- 显示骨架屏 `n-skeleton` (如需异步加载提示)

### Error State (提示配置错误时)
- 显示降级提示："提示功能暂时不可用"
- 使用 `error` 类型 `n-alert`

### Success State (用户完成关卡)
- 提示自动隐藏
- 显示完成卡片 (已有功能)

---

## 🔧 技术约束

### 必须使用
- Vue 3 Composition API (`ref`, `computed`, `watch`)
- Naive UI 组件 (`n-alert`, `n-collapse`, `n-button`)
- LocalStorage API (存储用户提示偏好)

### 兼容性要求
- 支持所有现代浏览器 (Chrome, Firefox, Safari, Edge)
- 不支持 IE11

### 性能要求
- 提示显示延迟 ≤ 100ms
- 不影响终端输入性能

---

## 📊 数据模型

### 扩展 LEVELS 数据结构
```javascript
// src/data/game-data.js
export const LEVELS = [
  {
    id: 1,
    category: "cli",
    name: "初出茅庐",
    // ... 现有字段

    // 新增: 提示配置
    hintConfig: {
      enabled: true,
      timeThreshold: 90,
      errorThreshold: 3,
      hints: [
        {
          level: 1,
          text: "提示: 使用 --version 参数查看版本信息",
          trigger: "auto",
          delay: 0
        },
        {
          level: 2,
          text: "提示: 命令格式是 claude [选项] [参数]",
          trigger: "auto",
          delay: 30
        },
        {
          level: 3,
          text: "答案: claude --version",
          trigger: "manual"
        }
      ]
    }
  },
  // ... 其他关卡
]
```

### LocalStorage 数据结构
```javascript
// 存储用户提示偏好
const HINT_PREFERENCES_KEY = 'claude_game_hint_preferences'

{
  userId: 'anonymous', // 可扩展为用户 ID
  disabledLevels: [1, 5, 12], // 用户手动关闭提示的关卡 ID
  dismissedCount: 5, // 总计关闭次数
  lastUpdated: '2026-01-01T00:00:00Z'
}
```

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **关卡完成率** | ~15% | ≥ 45% | LocalStorage 数据分析 |
| **平均停留时间** | ~3 分钟 | ≥ 6 分钟 | 在关卡停留时长 |
| **提示使用率** | N/A | 60% | 触发提示的用户比例 |
| **提示关闭率** | N/A | ≤ 20% | 用户主动关闭提示比例 |

---

## 🚧 依赖项

### 前置需求
- 无 (独立功能)

### 需要协调
- **@前端开发**: 评估技术实现方案，确认 `n-alert` 组件是否满足需求
- **@功能测试**: 定义测试用例，特别是边界场景 (如用户快速输入命令)

---

## 🔄 迭代计划

### Phase 1: MVP (最小可行产品)
- [ ] 实现时间触发 + 错误触发
- [ ] 实现 3 层渐进式提示
- [ ] 为前 10 个关卡添加提示配置

### Phase 2: 优化
- [ ] 为所有 37 个关卡添加提示配置
- [ ] 添加提示效果分析 (数据追踪)
- [ ] 支持用户自定义触发阈值

### Phase 3: 高级功能
- [ ] AI 生成提示 (根据用户错误模式)
- [ ] 社区提示贡献 (允许用户提交更好的提示)

---

## 📚 参考资料

### 竞品分析
- **Duolingo**: 使用"提示 hearts"机制，用户主动选择是否使用提示
- **Codecademy**: 提供 3 层提示系统，最后一层直接给出答案
- **Vue Mastery**: 使用"_hint"按钮，点击后显示关键信息

### 设计原则
- **Progressive Disclosure**: 信息渐进式披露，避免认知过载
- **Zone of Proximal Development**: 在用户能力边缘提供支持
- **Intrinsic Motivation**: 保持内在动机，避免过度提示破坏挑战性

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 请评估技术可行性，并反馈开发工时预估