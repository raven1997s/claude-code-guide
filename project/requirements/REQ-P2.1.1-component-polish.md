# REQ-P2.1.1: 基础组件视觉优化

> **需求ID**: REQ-P2.1.1
> **父需求**: REQ-P2.1 (全局体验优化)
> **状态**: 🟢 已定义
> **优先级**: Must Have (Phase 1)
> **前置需求**: REQ-UI.1 ~ REQ-UI.4 (Sprint UI)
> **预估工时**: 1.5 MD
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名用户，我希望界面中的卡片、按钮、输入框等基础组件有精致的视觉效果和清晰的交互反馈，这样我就能感受到产品的专业性和用心程度。

**业务价值**:
- 提升产品的视觉精致度，从"Clean Minimal"到"Premium Experience"
- 增强用户交互的确定性和愉悦感
- 建立统一的设计语言，提升品牌认知度

**优化范围**:
1. 卡片组件 (Card) - 4 级视觉层次系统
2. 按钮组件 (Button) - 5 状态完整反馈
3. 输入框组件 (Input) - 焦点/错误/辅助信息层次
4. 列表组件 (List) - hover/选中/空状态优化

---

## 🎨 设计规格

### 1. 卡片组件优化 (4 级视觉层次)

#### 当前问题
- 阴影过轻，层次感不足
- hover 效果不够明显
- 不同类型卡片缺乏差异化

#### 设计方案

**Level 1: 基础卡片** (默认状态)
```css
.card-base {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg); /* 16px */
  box-shadow: var(--shadow-sm); /* 0 2px 8px rgba(0,0,0,0.04) */
  padding: var(--spacing-6); /* 24px */
  transition: all var(--duration-base) var(--ease-out); /* 200ms ease-out */
}
```

**Level 2: 悬停状态**
```css
.card-base:hover {
  border-color: var(--color-primary-300); /* 浅紫色边框 */
  box-shadow: var(--shadow-md); /* 0 4px 16px rgba(0,0,0,0.08) */
  transform: translateY(-2px); /* 轻微抬升 */
}
```

**Level 3: 重点卡片** (Featured)
```css
.card-featured {
  background: linear-gradient(135deg,
    var(--color-bg-elevated) 0%,
    var(--color-primary-50) 100% /* 淡紫色渐变 */
  );
  border: 1px solid var(--color-primary-200);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.15); /* 主色阴影 */
}

.card-featured:hover {
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
  transform: translateY(-3px);
}
```

**Level 4: 强调卡片** (Highlight - 用于 CTA)
```css
.card-highlight {
  background: linear-gradient(135deg,
    var(--color-primary-500) 0%,
    var(--color-primary-600) 100% /* 深紫色渐变 */
  );
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4); /* 强烈阴影 */
}

.card-highlight:hover {
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.5);
  transform: translateY(-4px);
}
```

#### 验收标准 (Acceptance Criteria)

**AC1: 基础卡片**
- Given 用户查看任何卡片
- When 默认状态
- Then 应该有浅色边框和轻微阴影
- And 圆角应该是 16px

**AC2: 卡片悬停**
- Given 用户鼠标悬停在卡片上
- When 观察 200ms 后
- Then 应该有紫色边框和中等阴影
- And 卡片应该向上抬升 2px

**AC3: 重点卡片**
- Given 用户查看推荐内容卡片
- When 观察卡片样式
- Then 应该有淡紫色渐变背景
- And 阴影应该带紫色色调

**AC4: 深色主题**
- Given 用户切换到深色主题
- When 查看所有级别卡片
- Then 卡片层次应该依然清晰
- And 阴影应该使用深色适配的不透明度

---

### 2. 按钮组件优化 (5 状态完整反馈)

#### 当前问题
- focus 状态不够明显（键盘导航困难）
- active 状态缺乏"按下"的物理反馈
- 加载状态不够优雅

#### 设计方案

**状态 1: 默认 (Default)**
```css
.btn {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md); /* 12px */
  color: var(--color-text-primary);
  padding: var(--spacing-3) var(--spacing-5); /* 12px 20px */
  font-size: var(--font-md); /* 16px */
  font-weight: var(--font-weight-medium); /* 500 */
  transition: all var(--duration-fast) var(--ease-out); /* 150ms */
  cursor: pointer;
  min-height: 44px; /* 移动端触摸目标 */
  min-width: 44px;
}
```

**状态 2: 悬停 (Hover)**
```css
.btn:hover {
  background: var(--color-primary-50); /* 淡紫色背景 */
  border-color: var(--color-primary-300);
  color: var(--color-primary-600);
  transform: translateY(-1px); /* 轻微抬升 */
  box-shadow: var(--shadow-sm);
}
```

**状态 3: 焦点 (Focus) - 可访问性关键**
```css
.btn:focus-visible {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow:
    0 0 0 3px var(--color-primary-100), /* 外圈光晕 */
    var(--shadow-sm); /* 原有阴影 */
}

/* 仅在键盘导航时显示 (鼠标点击不触发) */
.btn:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

**状态 4: 激活 (Active)**
```css
.btn:active {
  transform: translateY(0); /* 消除抬升 */
  box-shadow: var(--shadow-inner); /* 内阴影效果 */
  background: var(--color-primary-100);
}
```

**状态 5: 禁用 (Disabled)**
```css
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn:disabled:hover {
  /* 禁用状态下不应该有 hover 效果 */
  transform: none;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
}
```

#### 按钮类型 (3 种)

**Primary 按钮**
```css
.btn-primary {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  background: var(--color-primary-600);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.btn-primary:active {
  background: var(--color-primary-700);
}
```

**Ghost 按钮**
```css
.btn-ghost {
  background: transparent;
  border-color: var(--color-border-subtle);
  box-shadow: none;
}

.btn-ghost:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-default);
}
```

**Text 按钮**
```css
.btn-text {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  padding: var(--spacing-2) var(--spacing-3);
}

.btn-text:hover {
  background: var(--color-bg-tertiary);
}
```

#### 加载状态
```vue
<template>
  <button :class="['btn', 'btn-primary', { 'is-loading': loading }]" :disabled="loading">
    <span v-if="loading" class="btn-spinner"></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped>
.btn.is-loading {
  pointer-events: none;
  opacity: 0.8;
  position: relative;
}

.btn.is-loading .btn-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: var(--radius-full);
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

#### 验收标准

**AC1: 默认状态**
- Given 用户查看按钮
- When 按钮处于默认状态
- Then 应该有边框和合适的内边距
- And 最小尺寸应该是 44x44px

**AC2: Hover 状态**
- Given 用户鼠标悬停在按钮上
- When 观察 150ms 后
- Then 应该有紫色背景和抬升效果
- And Primary 按钮阴影应该加深

**AC3: Focus 状态**
- Given 用户使用 Tab 键导航到按钮
- When 观察按钮样式
- Then 应该有明显的紫色光晕 (3px)
- And 光晕颜色应该是 var(--color-primary-100)

**AC4: Active 状态**
- Given 用户点击按钮
- When 观察按下效果
- Then 按钮应该消除抬升效果
- And 应该有内阴影（按下感）

**AC5: 加载状态**
- Given 用户触发异步操作
- When 按钮处于加载状态
- Then 应该显示旋转的加载图标
- And 按钮应该是禁用状态

**AC6: 触摸目标**
- Given 用户在移动端
- When 测量所有按钮
- Then 所有按钮应该 ≥44x44px
- And 按钮间距应该 ≥8px

---

### 3. 输入框组件优化

#### 当前问题
- focus 状态不够明显
- 错误状态不够醒目
- label、helper、error 层次不清晰

#### 设计方案

**5 种状态**

```css
/* 1. 默认状态 */
.input {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md); /* 12px */
  padding: var(--spacing-3) var(--spacing-4); /* 12px 16px */
  font-size: var(--font-md); /* 16px (防止 iOS 缩放) */
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-out);
  width: 100%;
}

/* 2. Hover 状态 */
.input:hover {
  border-color: var(--color-primary-300);
}

/* 3. Focus 状态 */
.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100); /* 蓝色光晕 */
}

/* 4. Error 状态 */
.input.is-error {
  border-color: var(--color-error);
  background: var(--color-error-light);
}

.input.is-error:focus {
  box-shadow: 0 0 0 3px var(--color-error-light);
}

/* 5. Disabled 状态 */
.input:disabled {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-subtle);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

**标签系统** (3 级层次)

```css
/* Level 1: Label (最重要) */
.input-label {
  display: block;
  font-size: var(--font-sm); /* 14px */
  font-weight: var(--font-weight-medium); /* 500 */
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2); /* 8px */
}

/* 必填标记 */
.input-label.required::after {
  content: ' *';
  color: var(--color-error);
}

/* Level 2: Helper text (辅助信息) */
.input-helper {
  display: block;
  font-size: var(--font-sm); /* 14px */
  color: var(--color-text-secondary);
  margin-top: var(--spacing-2); /* 8px */
}

/* Level 3: Error message (错误提示) */
.input-error {
  display: flex;
  align-items: center;
  gap: var(--spacing-1); /* 4px */
  font-size: var(--font-sm); /* 14px */
  color: var(--color-error);
  margin-top: var(--spacing-2); /* 8px */
}

.input-error::before {
  content: '⚠';
  font-size: var(--font-md); /* 16px */
}
```

#### Vue 组件实现

```vue
<template>
  <div class="input-group">
    <label v-if="label" :class="['input-label', { required: required }]">
      {{ label }}
    </label>

    <input
      v-model="inputValue"
      :type="type"
      :class="['input', { 'is-error': isError }]"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="label"
      :aria-invalid="isError"
      :aria-describedby="helperId"
      :aria-required="required"
      @focus="handleFocus"
      @blur="handleBlur"
    >

    <p v-if="helperText && !isError" :id="helperId" class="input-helper">
      {{ helperText }}
    </p>

    <p v-if="isError && errorText" class="input-error">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  label: String,
  placeholder: String,
  helperText: String,
  errorText: String,
  isError: Boolean,
  disabled: Boolean,
  required: Boolean
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const helperId = computed(() => `input-helper-${Math.random().toString(36).substr(2, 9)}`)

function handleFocus(event) {
  emit('focus', event)
}

function handleBlur(event) {
  emit('blur', event)
}
</script>

<style scoped>
/* 见上面的 CSS */
</style>
```

#### 验收标准

**AC1: 默认状态**
- Given 用户查看输入框
- When 输入框为空
- Then 应该有边框和合适的内边距
- And Placeholder 应该是次要颜色

**AC2: Focus 状态**
- Given 用户点击输入框
- When 观察焦点状态
- Then 应该有明显的紫色边框
- And 应该有 3px 的紫色光晕

**AC3: Error 状态**
- Given 输入框验证失败
- When 显示错误状态
- Then 边框应该是红色
- And 应该显示错误消息和图标

**AC4: 标签层次**
- Given 查看输入框的标签
- When 对比 label、helper、error
- Then label 应该最粗最黑
- And helper 应该是灰色
- And error 应该是红色

**AC5: 深色主题**
- Given 用户切换到深色主题
- When 测试 focus 状态
- Then 光晕应该依然明显
- And 对比度应该符合 WCAG AA

---

### 4. 列表组件优化

#### 当前问题
- 列表项 hover 效果不明显
- 选中状态不够突出
- 空状态不够友好

#### 设计方案

**列表项状态** (3 状态)

```css
/* 默认状态 */
.list-item {
  padding: var(--spacing-4) var(--spacing-6); /* 16px 24px */
  border-bottom: 1px solid var(--color-border-subtle);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
  position: relative;
}

/* Hover 状态 */
.list-item:hover {
  background: var(--color-primary-50); /* 淡紫色背景 */
}

.list-item:hover::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-primary-500); /* 左侧紫色条 */
}

/* 选中状态 */
.list-item.is-selected {
  background: var(--color-primary-100); /* 更深的紫色 */
  color: var(--color-primary-700);
  font-weight: var(--font-weight-medium);
}

.list-item.is-selected::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-primary-600); /* 更深的紫色条 */
}
```

**空状态优化**

```vue
<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon }}</div>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
    <n-button
      v-if="actionText"
      type="primary"
      size="large"
      @click="$emit('action')"
    >
      {{ actionText }}
    </n-button>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📭'
  },
  title: {
    type: String,
    default: '暂无内容'
  },
  description: String,
  actionText: String
})

defineEmits(['action'])
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-8); /* 64px 32px */
  color: var(--color-text-secondary);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-4);
  opacity: 0.6;
}

.empty-title {
  font-size: var(--font-xl); /* 20px */
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.empty-description {
  font-size: var(--font-md); /* 16px */
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-6) 0;
  line-height: 1.6;
}
</style>
```

#### Stagger 进入动画

```vue
<template>
  <transition-group name="list" tag="div" class="list">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="['list-item', { 'is-selected': item.id === selectedId }]"
      :style="{ animationDelay: `${index * 50}ms` }"
      @click="selectItem(item.id)"
    >
      {{ item.label }}
    </div>
  </transition-group>
</template>

<style scoped>
/* Stagger 进入动画 */
.list-enter-active {
  animation: fadeInUp var(--duration-base) var(--ease-out) backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

#### 验收标准

**AC1: Hover 效果**
- Given 用户鼠标悬停在列表项上
- When 观察 hover 效果
- Then 背景应该变成淡紫色
- And 左侧应该出现 3px 紫色条

**AC2: 选中状态**
- Given 用户点击列表项
- When 观察选中状态
- Then 背景应该是更深的紫色
- And 左侧紫色条应该更明显
- And 文字应该加粗

**AC3: 空状态**
- Given 列表为空
- When 查看空状态组件
- Then 应该显示图标、标题、描述
- And 应该有操作按钮（如果有）
- And 图标应该是 48px 大小

**AC4: Stagger 动画**
- Given 列表加载
- When 观察列表进入
- Then 列表项应该逐个进入
- And 每个延迟 50ms

---

## 🎨 扩展 Design Tokens

需要在 `design-tokens.css` 中添加以下变量：

```css
:root {
  /* ========================================
    扩展阴影系统 (6 级)
    ======================================== */
  --shadow-none: none;
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);
  --shadow-2xl: 0 24px 64px rgba(0, 0, 0, 0.20); /* 新增 */

  /* 内阴影 (用于 active 状态) */
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);

  /* 主色阴影 (用于强调元素) */
  --shadow-primary: 0 4px 16px rgba(99, 102, 241, 0.15);

  /* ========================================
    扩展间距系统
    ======================================== */
  --spacing-9: 36px;
  --spacing-10: 40px;
  --spacing-11: 44px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* ========================================
    扩展字体系统
    ======================================== */
  --font-weight-medium: 500; /* 新增 */
}

/* 深色主题阴影适配 */
[data-theme="dark"] {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.7);
  --shadow-2xl: 0 24px 64px rgba(0, 0, 0, 0.8);

  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.4);

  --shadow-primary: 0 4px 16px rgba(129, 140, 248, 0.25);
}
```

---

## ✅ 总体验收标准

### AC1: 视觉一致性
- Given 用户浏览整个应用
- When 查看所有组件
- Then 所有卡片应该使用统一的圆角 (12/16px)
- And 所有阴影应该使用统一的 Design Tokens
- And 所有间距应该基于 4px 网格

### AC2: 交互反馈完整性
- Given 用户与任何组件交互
- When 测试 hover/focus/active 状态
- Then 所有交互应该有明确的视觉反馈
- And 反馈应该在 150-200ms 内完成
- And 反馈应该流畅（60fps）

### AC3: 可访问性
- Given 用户使用键盘导航
- When 测试所有交互元素
- Then focus 状态应该清晰可见
- And 所有按钮应该 ≥44x44px
- And 颜色对比度应该符合 WCAG AA

### AC4: 深色主题
- Given 用户切换到深色主题
- When 测试所有组件状态
- Then 组件层次应该依然清晰
- And 阴影应该适配深色背景
- And 对比度应该符合标准

---

## 📊 测试计划

### 测试矩阵

| 组件 | 浏览器 | 状态 |
|------|--------|------|
| 卡片组件 | Chrome/Firefox/Safari/Edge | 🔴 待测试 |
| 按钮组件 | Chrome/Firefox/Safari/Edge | 🔴 待测试 |
| 输入框组件 | Chrome/Firefox/Safari/Edge | 🔴 待测试 |
| 列表组件 | Chrome/Firefox/Safari/Edge | 🔴 待测试 |

### 测试用例
- TEST-P2.1.1.1: 卡片 4 级层次测试
- TEST-P2.1.1.2: 按钮 5 状态测试
- TEST-P2.1.1.3: 输入框 focus/错误状态测试
- TEST-P2.1.1.4: 列表 hover/选中/空状态测试
- TEST-P2.1.1.5: 深色主题兼容性测试

---

## 🚧 依赖项

### 前置需求
- ✅ REQ-UI.1 (Design Tokens) - **已完成**

### 需要协调
- **@设计师**: 确认视觉细节（阴影强度、颜色等）
- **@功能测试**: 准备测试用例

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **视觉一致性** | 70% | 100% | Design Review |
| **交互反馈完整性** | 60% | 100% | 手动测试 |
| **可访问性评分** | 未知 | ≥ 95 | Lighthouse A11y |
| **用户满意度** | 未知 | ≥ 4.5/5 | 用户反馈 |

---

## 🔄 迭代计划

### Day 1-2: 卡片组件
- [ ] 实现 4 级层次系统
- [ ] 测试所有状态
- [ ] 验收

### Day 3-4: 按钮组件
- [ ] 实现 5 状态
- [ ] 实现加载状态
- [ ] 测试键盘导航
- [ ] 验收

### Day 5: 输入框组件
- [ ] 实现 3 级标签系统
- [ ] 实现 focus/错误状态
- [ ] 验收

### Day 6: 列表组件
- [ ] 实现 hover/选中状态
- [ ] 实现空状态组件
- [ ] 实现 stagger 动画
- [ ] 验收

---

## 📚 参考资料

### 设计系统
- **Material Design Buttons**: https://m3.material.io/components/buttons/overview
- **Apple HIG Controls**: https://developer.apple.com/design/human-interface-guidelines/controls

### 可访问性
- **WCAG 2.1 Focus Visible**: https://www.w3.org/WAI/WCAG21/Understanding/focus-visible
- **A11y Project Buttons**: https://www.a11yproject.com/posts/2013-05-11-how-to-hide-content/

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 开始实现基础组件优化
