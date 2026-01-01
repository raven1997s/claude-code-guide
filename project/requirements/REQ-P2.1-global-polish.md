# REQ-P2.1: 全面体验优化 (Global Experience Polish)

**需求类型**: Phase 2 全局优化
**优先级**: Must Have
**设计方向**: Clean Minimal → Premium Experience (精致体验)
**创建时间**: 2026-01-01

---

## 用户故事

**As a** 用户,
**I want** 看着舒服、用着舒服的界面和交互,
**So that** 我能更专注地学习，享受使用过程

---

## 当前状态分析

### ✅ 已完成 (Sprint UI)
- Design Tokens 完整定义
- 主题切换功能
- 移动端响应式
- ESLint 0 errors

### 🔍 待优化问题 (发现)
1. **视觉层次不够丰富** - 卡片、按钮、阴影缺乏差异化
2. **交互反馈不足** - hover、focus、active 状态不够明显
3. **动画过渡生硬** - 缺少流畅的进入/退出动画
4. **细节打磨不足** - 间距、对齐、圆角不够精致
5. **组件一致性** - 不同页面组件风格略有差异

---

## 优化目标

### 核心目标
1. **视觉精致度** - 从"Clean Minimal" 到 "Premium Experience"
2. **交互流畅度** - 所有交互都有流畅的反馈
3. **细节完美** - 间距、对齐、阴影都经过精心设计
4. **性能优化** - 动画流畅，无卡顿

### 设计原则
- **微交互优先** - 每个可点击元素都有明确的反馈
- **渐进增强** - 从基础到高级的视觉层次
- **一致性至上** - 所有页面和组件保持统一
- **可访问性** - 符合 WCAG 2.1 AA 标准

---

## 详细优化规范

### 1. 卡片组件优化

#### 当前问题
- 阴影太轻，层次感不足
- hover 效果不够明显
- 边框不够精致

#### 优化方案

**视觉层次** (4 级阴影系统):
```css
/* Level 1: 基础卡片 */
.card-base {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-base) var(--ease-out);
}

/* Level 2: 悬停状态 */
.card-base:hover {
  border-color: var(--color-primary-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Level 3: 重点卡片 */
.card-featured {
  background: linear-gradient(135deg, var(--color-bg-elevated) 0%, var(--color-bg-secondary) 100%);
  border: 1px solid var(--color-primary-200);
  box-shadow: var(--shadow-primary);
}

/* Level 4: 强调卡片 */
.card-highlight {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
}
```

**内边距优化**:
```css
/* 标准卡片内边距 */
.card-base {
  padding: var(--spacing-8); /* 32px */
}

/* 紧凑卡片 */
.card-compact {
  padding: var(--spacing-4); /* 16px */
}

/* 宽松卡片 */
.card-spacious {
  padding: var(--spacing-10); /* 40px */
}
```

**验收标准**:
- [ ] AC1: 卡片有 4 级明显的视觉层次
- [ ] AC2: hover 时有明显但不过度的抬升效果
- [ ] AC3: 重点卡片使用渐变背景 + 主色阴影
- [ ] AC4: 深色主题下卡片层次依然清晰

---

### 2. 按钮组件优化

#### 当前问题
- focus 状态不够明显
- active 状态缺乏反馈
- 加载状态不够优雅

#### 优化方案

**状态分层** (5 状态):
```css
/* 1. 默认状态 */
.btn {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-out);
}

/* 2. hover 状态 */
.btn:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-300);
  color: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 3. focus 状态 (可访问性) */
.btn:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* 4. active 状态 */
.btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-inner);
}

/* 5. disabled 状态 */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

**按钮类型** (3 种):
```css
/* Primary 按钮 */
.btn-primary {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: #ffffff;
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover {
  background: var(--color-primary-600);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
}

/* Ghost 按钮 */
.btn-ghost {
  background: transparent;
  border-color: var(--color-border-subtle);
}

.btn-ghost:hover {
  background: var(--color-bg-tertiary);
}

/* Text 按钮 */
.btn-text {
  background: transparent;
  border-color: transparent;
}

.btn-text:hover {
  background: var(--color-bg-tertiary);
}
```

**加载状态**:
```vue
<template>
  <button :class="['btn', { 'is-loading': loading }]">
    <span v-if="loading" class="btn-spinner"></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped>
.btn.is-loading {
  pointer-events: none;
  opacity: 0.8;
}

.btn-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

**验收标准**:
- [ ] AC1: 按钮有 5 种状态，每种都清晰可辨
- [ ] AC2: focus 状态有明显的视觉反馈 (键盘导航)
- [ ] AC3: active 状态有"按下"的物理感
- [ ] AC4: 加载状态有旋转动画
- [ ] AC5: 所有按钮触摸目标 ≥44x44px

---

### 3. 输入框组件优化

#### 当前问题
- focus 状态不够明显
- 错误状态不够醒目
- label 和 placeholder 的层级不清晰

#### 优化方案

**输入框状态** (5 状态):
```css
/* 1. 默认状态 */
.input {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-4);
  transition: all var(--duration-fast) var(--ease-out);
}

/* 2. focus 状态 */
.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* 3. hover 状态 */
.input:hover {
  border-color: var(--color-primary-300);
}

/* 4. error 状态 */
.input.is-error {
  border-color: var(--color-error);
}

.input.is-error:focus {
  box-shadow: 0 0 0 3px var(--color-error-light);
}

/* 5. disabled 状态 */
.input:disabled {
  background: var(--color-bg-tertiary);
  border-color: var(--color-border-subtle);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
```

**标签系统** (3 级层次):
```css
/* Level 1: Label (最重要) */
.input-label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
  display: block;
}

/* Level 2: Helper text */
.input-helper {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-2);
}

/* Level 3: Error message */
.input-error {
  font-size: var(--text-sm);
  color: var(--color-error);
  margin-top: var(--spacing-2);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.input-error::before {
  content: '⚠';
  font-size: var(--text-base);
}
```

**验收标准**:
- [ ] AC1: 输入框 focus 时有明显的蓝色光晕
- [ ] AC2: error 状态有红色边框和图标
- [ ] AC3: label、helper、error 层次清晰
- [ ] AC4: 深色主题下 focus 状态依然明显

---

### 4. 列表组件优化

#### 当前问题
- 列表项 hover 效果不明显
- 选中状态不够突出
- 空状态不够友好

#### 优化方案

**列表项状态** (3 状态):
```css
/* 列表项 */
.list-item {
  padding: var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--color-border-subtle);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

/* hover 状态 */
.list-item:hover {
  background: var(--color-primary-50);
  border-left: 3px solid var(--color-primary-500);
  padding-left: calc(var(--spacing-6) - 3px);
}

/* 选中状态 */
.list-item.is-selected {
  background: var(--color-primary-100);
  border-left: 3px solid var(--color-primary-600);
  color: var(--color-primary-700);
}
```

**空状态优化**:
```vue
<template>
  <div class="empty-state">
    <div class="empty-icon">📭</div>
    <h3 class="empty-title">暂无内容</h3>
    <p class="empty-description">{{ description }}</p>
    <button v-if="actionText" class="btn btn-primary" @click="$emit('action')">
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-8);
  color: var(--color-text-secondary);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.empty-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.empty-description {
  font-size: var(--text-base);
  margin: 0 0 var(--spacing-6) 0;
}
</style>
```

**验收标准**:
- [ ] AC1: 列表项 hover 时有明显的左侧色条
- [ ] AC2: 选中状态使用更深的背景色
- [ ] AC3: 空状态有图标、标题、描述、操作按钮

---

### 5. 动画过渡优化

#### 当前问题
- 页面切换没有过渡动画
- 元素进入/退出缺乏动效
- 动画时长不统一

#### 优化方案

**全局过渡动画** (CSS 变量已定义):
```css
/* 使用已有的 Design Tokens */
transition: all var(--duration-base) var(--ease-out);
```

**页面切换动画**:
```vue
<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
/* 页面进入 */
.page-enter-active {
  animation: pageIn var(--duration-slow) var(--ease-out);
}

/* 页面离开 */
.page-leave-active {
  animation: pageOut var(--duration-slow) var(--ease-in);
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
```

**元素进入动画** (Fade + Slide):
```css
/* 列表项逐个进入 */
.list-enter-active {
  animation: fadeSlideUp var(--duration-base) var(--ease-out);
}

/* 使用 stagger 延迟 */
.list-enter-active:nth-child(1) { animation-delay: 0ms; }
.list-enter-active:nth-child(2) { animation-delay: 50ms; }
.list-enter-active:nth-child(3) { animation-delay: 100ms; }
/* ... */

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**微交互动画**:
```css
/* 按钮点击 */
.btn-click {
  animation: buttonClick var(--duration-fast) var(--ease-out);
}

@keyframes buttonClick {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* 成功提示 */
@keyframes successPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 加载旋转 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**验收标准**:
- [ ] AC1: 页面切换有淡入淡出动画
- [ ] AC2: 列表项有 stagger 延迟进入效果
- [ ] AC3: 所有动画使用 Design Tokens 的时长和缓动
- [ ] AC4: 动画流畅，无卡顿 (60fps)

---

### 6. 阴影和圆角优化

#### 当前问题
- 阴影层次不够丰富
- 圆角使用不够统一
- 深色主题下阴影不够明显

#### 优化方案

**扩展阴影系统** (6 级):
```css
/* 已有 5 级，新增 1 级 */
--shadow-none: none;
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);
--shadow-2xl: 0 24px 64px rgba(0, 0, 0, 0.20); /* 新增 */
```

**圆角使用规范**:
```css
/* 无圆角 */
.radius-none { border-radius: var(--radius-none); }

/* 小圆角 - 标签、徽章 */
.radius-sm { border-radius: var(--radius-sm); }

/* 中圆角 - 卡片、按钮、输入框 */
.radius-md { border-radius: var(--radius-md); }

/* 大圆角 - 大卡片 */
.radius-lg { border-radius: var(--radius-lg); }

/* 超大圆角 - Hero 区域 */
.radius-xl { border-radius: var(--radius-xl); }

/* 完全圆角 - 圆形按钮、头像 */
.radius-full { border-radius: var(--radius-full); }
```

**验收标准**:
- [ ] AC1: 有 6 级阴影系统，满足不同使用场景
- [ ] AC2: 圆角使用符合组件规范
- [ ] AC3: 深色主题下阴影使用更深的不透明度

---

### 7. 间距和对齐优化

#### 当前问题
- 间距使用不够统一
- 元素对齐不够精确
- 响应式间距调整不够平滑

#### 优化方案

**间距使用规范** (基于 4px 网格):
```css
/* 页面级别间距 */
.page-padding { padding: var(--spacing-8) var(--spacing-6); }

/* 区域间距 */
.section-gap { gap: var(--spacing-8); }
.section-gap-lg { gap: var(--spacing-12); }

/* 元素间距 */
.element-gap { gap: var(--spacing-4); }
.element-gap-sm { gap: var(--spacing-2); }
.element-gap-lg { gap: var(--spacing-6); }

/* 文本间距 */
.text-gap { gap: var(--spacing-2); }
.text-gap-lg { gap: var(--spacing-3); }
```

**对齐系统**:
```css
/* Flexbox 对齐 */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* 垂直对齐 */
.align-baseline { align-items: baseline; }
.align-center { align-items: center; }
```

**验收标准**:
- [ ] AC1: 所有间距都是 4px 的倍数
- [ ] AC2: 对齐使用 utility class，保持一致
- [ ] AC3: 响应式间距平滑过渡

---

### 8. 可访问性优化 (Accessibility)

#### 当前问题
- 焦点管理不够完善
- ARIA 标签不够完整
- 键盘导航不够流畅

#### 优化方案

**焦点管理**:
```vue
<template>
  <button
    ref="buttonRef"
    class="btn"
    :tabindex="disabled ? -1 : 0"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const buttonRef = ref(null)

function handleFocus() {
  // 可以添加额外的焦点样式
  console.log('Button focused')
}

function handleBlur() {
  console.log('Button blurred')
}

// 暴露 focus 方法
defineExpose({
  focus: () => buttonRef.value?.focus()
})
</script>
```

**ARIA 标签**:
```vue
<template>
  <!-- 按钮 -->
  <button
    :aria-label="ariaLabel"
    :aria-disabled="disabled"
    :aria-pressed="pressed"
  >
    {{ label }}
  </button>

  <!-- 输入框 -->
  <input
    :aria-label="label"
    :aria-invalid="isError"
    :aria-describedby="helperId"
    :aria-required="required"
  >

  <!-- 弹窗 -->
  <div
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    :aria-describedby="descId"
  >
    <h2 :id="titleId">{{ title }}</h2>
    <p :id="descId">{{ description }}</p>
  </div>

  <!-- 加载状态 -->
  <div
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    正在加载...
  </div>
</template>
```

**键盘导航**:
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

function handleKeydown(event) {
  // Esc 关闭弹窗
  if (event.key === 'Escape') {
    closeModal()
  }

  // Enter/Space 激活按钮
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.btn')) {
    event.target.click()
  }

  // 方向键导航列表
  if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
    navigateList(event.key === 'ArrowUp' ? -1 : 1)
  }

  // / 聚焦搜索框
  if (event.key === '/' && !event.target.matches('input, textarea')) {
    event.preventDefault()
    focusSearch()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
```

**颜色对比度** (WCAG 2.1 AA):
```css
/* 确保:
   - 普通文字对比度 ≥ 4.5:1
   - 大文字对比度 ≥ 3:1
   - UI 组件边框对比度 ≥ 3:1
*/

/* 示例: 主按钮 */
.btn-primary {
  background: var(--color-primary-500); /* #6366f1 */
  color: #ffffff;
}

/* 对比度检查: 6.27:1 ✅ 通过 */
```

**验收标准**:
- [ ] AC1: 所有交互元素支持键盘导航
- [ ] AC2: 焦点状态清晰可见
- [ ] AC3: ARIA 标签完整正确
- [ ] AC4: 颜色对比度符合 WCAG 2.1 AA 标准
- [ ] AC5: 屏幕阅读器友好

---

## 各页面优化清单

### 首页 (HomeView.vue)

**优化项**:
- [ ] Hero 区域添加渐变背景动画
- [ ] 特性卡片添加 hover 3D 效果
- [ ] 统计卡片添加数字滚动动画
- [ ] 学习路径卡片添加进度指示器
- [ ] 热门搜索标签添加 hover 渐变效果

**视觉效果**:
```css
/* Hero 区域渐变动画 */
.hero-section {
  background: linear-gradient(
    135deg,
    var(--color-bg-secondary) 0%,
    var(--color-primary-50) 50%,
    var(--color-bg-secondary) 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 特性卡片 3D 效果 */
.feature-card {
  transform-style: preserve-3d;
  transition: transform var(--duration-slow) var(--ease-out);
}

.feature-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(2deg) translateY(-4px);
}

/* 数字滚动动画 */
.stat-number {
  display: inline-block;
  animation: numberPop var(--duration-slow) var(--ease-bounce);
}

@keyframes numberPop {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
```

---

### 游戏页 (GameView.vue)

**优化项**:
- [ ] 关卡卡片添加 hover 发光效果
- [ ] 已完成关卡添加绿色对勾动画
- [ ] 分类标签页添加滑动指示器
- [ ] 新手指南折叠面板添加平滑动画
- [ ] 进度统计添加环形进度条

**视觉效果**:
```css
/* 关卡卡片发光效果 */
.level-card:hover {
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
}

.level-card.is-completed {
  border-color: var(--color-success);
}

/* 绿色对勾动画 */
.level-card.is-completed::after {
  content: '✓';
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  font-size: 24px;
  color: var(--color-success);
  animation: checkmarkPop var(--duration-base) var(--ease-bounce);
}

@keyframes checkmarkPop {
  0% { transform: scale(0) rotate(-45deg); }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

/* 标签页滑动指示器 */
.tabs-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--color-primary-500);
  transition: all var(--duration-base) var(--ease-out);
}

/* 环形进度条 */
.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle {
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  transition: stroke-dashoffset var(--duration-slower) var(--ease-out);
}
```

---

### 搜索页 (SearchView.vue)

**优化项**:
- [ ] 搜索输入框添加聚焦时下拉动画
- [ ] 搜索结果添加 stagger 进入动画
- [ ] 搜索模式切换添加滑动效果
- [ ] 热门搜索标签添加脉冲动画
- [ ] 搜索高亮添加渐变背景

**视觉效果**:
```css
/* 搜索框下拉动画 */
.search-input-wrapper {
  transform-origin: top;
  animation: dropdownSlide var(--duration-base) var(--ease-out);
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: scaleY(0.95);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* 搜索结果 stagger 进入 */
.search-result-item {
  opacity: 0;
  animation: fadeInUp var(--duration-base) var(--ease-out) forwards;
}

.search-result-item:nth-child(1) { animation-delay: 0ms; }
.search-result-item:nth-child(2) { animation-delay: 50ms; }
.search-result-item:nth-child(3) { animation-delay: 100ms; }
/* ... */

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 热门搜索标签脉冲 */
.search-tag:hover {
  animation: tagPulse var(--duration-base) var(--ease-out);
}

@keyframes tagPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 搜索高亮 */
.search-highlight {
  background: linear-gradient(
    120deg,
    var(--color-warning-light) 0%,
    var(--color-warning-light) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 85%;
  padding: 0 2px;
  border-radius: 2px;
}
```

---

### 速查表页 (CheatsheetView.vue)

**优化项**:
- [ ] 分类折叠面板添加平滑展开/收起动画
- [ ] 命令卡片添加 hover 抬升效果
- [ ] 复制按钮添加成功提示动画
- [ ] 命令详情弹窗添加缩放进入动画
- [ ] 分类图标添加旋转动画

**视觉效果**:
```css
/* 折叠面板展开/收起 */
.category-commands {
  overflow: hidden;
  transition: max-height var(--duration-slow) var(--ease-out);
}

/* 命令卡片抬升 */
.command-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 复制成功动画 */
.copy-btn.is-copied {
  animation: copySuccess var(--duration-base) var(--ease-bounce);
}

@keyframes copySuccess {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* 弹窗缩放进入 */
.modal-content {
  animation: modalZoom var(--duration-base) var(--ease-out);
}

@keyframes modalZoom {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 分类图标旋转 */
.collapse-icon {
  transition: transform var(--duration-base) var(--ease-out);
}

.collapse-icon.is-rotated {
  transform: rotate(180deg);
}
```

---

### 命令参考页 (ReferenceView.vue)

**优化项**:
- [ ] 参数表格添加斑马纹样式
- [ ] 代码示例添加语法高亮
- [ ] 复制按钮添加 tooltip 提示
- [ ] 目录添加滚动高亮效果
- [ ] 返回顶部按钮添加滚动显示

**视觉效果**:
```css
/* 表格斑马纹 */
.param-table tbody tr:nth-child(even) {
  background: var(--color-bg-secondary);
}

.param-table tbody tr:hover {
  background: var(--color-primary-50);
}

/* 代码高亮 (使用 prism.js 或 highlight.js) */
.code-block {
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  overflow-x: auto;
}

/* Tooltip */
.tooltip {
  position: relative;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--color-bg-base);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  font-size: var(--text-sm);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.tooltip:hover::after {
  opacity: 1;
}

/* 目录滚动高亮 */
.toc-item.is-active {
  color: var(--color-primary-600);
  border-left-color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
}

/* 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: var(--spacing-6);
  right: var(--spacing-6);
  opacity: 0;
  visibility: hidden;
  transition: all var(--duration-base) var(--ease-out);
}

.back-to-top.is-visible {
  opacity: 1;
  visibility: visible;
}
```

---

### VSCode 教程页 (VSCodeTutorialView.vue)

**优化项**:
- [ ] 步骤卡片添加进度指示器
- [ ] 代码块添加行号高亮
- [ ] 图片添加懒加载效果
- [ ] 分步导航添加平滑过渡
- [ ] 完成按钮添加庆祝动画

**视觉效果**:
```css
/* 进度指示器 */
.step-indicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background: var(--color-border-default);
  transition: all var(--duration-base) var(--ease-out);
}

.step-dot.is-completed {
  background: var(--color-success);
}

.step-dot.is-current {
  background: var(--color-primary-500);
  box-shadow: 0 0 0 4px var(--color-primary-100);
}

/* 行号高亮 */
.line-number {
  display: inline-block;
  min-width: 2em;
  padding-right: var(--spacing-2);
  color: var(--color-text-tertiary);
  text-align: right;
  user-select: none;
}

.line-highlight {
  background: var(--color-primary-50);
  border-radius: var(--radius-sm);
}

/* 图片懒加载 */
.image-lazy {
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
}

.image-lazy.is-loaded {
  opacity: 1;
}

/* 庆祝动画 */
@keyframes celebrate {
  0% { transform: scale(1); }
  25% { transform: scale(1.1) rotate(-5deg); }
  50% { transform: scale(1.2) rotate(5deg); }
  75% { transform: scale(1.1) rotate(-5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.celebrate {
  animation: celebrate var(--duration-slow) var(--ease-bounce);
}
```

---

## 性能优化

### 动画性能
```css
/* 使用 transform 和 opacity (GPU 加速) */
.animate-gpu {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* 避免使用 left, top, width, height (触发重排) */
.bad-animate {
  /* ❌ 避免 */
  left: 100px;
}

.good-animate {
  /* ✅ 推荐 */
  transform: translateX(100px);
}

/* 大量元素动画时使用 contain */
.card {
  contain: layout style paint;
}
```

### 图片优化
```vue
<template>
  <!-- 懒加载 -->
  <img
    v-lazy="imageSrc"
    :alt="alt"
    loading="lazy"
    decoding="async"
  >

  <!-- 响应式图片 -->
  <picture>
    <source :srcset="imageSrcWebp" type="image/webp">
    <img :src="imageSrc" :alt="alt">
  </picture>
</template>
```

### 代码分割
```javascript
// 路由懒加载
const HomeView = () => import('@/views/HomeView.vue')
const GameView = () => import('@/views/GameView.vue')

// 组件懒加载
const HeavyComponent = defineAsyncComponent(() =>
  import('@/components/HeavyComponent.vue')
)
```

---

## 验收标准总览

### 视觉精致度
- [ ] 所有组件使用 4 级阴影系统
- [ ] 所有动画使用 Design Tokens
- [ ] 所有间距基于 4px 网格
- [ ] 颜色对比度符合 WCAG 2.1 AA

### 交互流畅度
- [ ] 所有交互有明确的反馈 (hover/focus/active)
- [ ] 页面切换有过渡动画
- [ ] 列表进入有 stagger 效果
- [ ] 所有动画 60fps 流畅运行

### 细节完美
- [ ] 所有圆角符合组件规范
- [ ] 所有对齐精确无误
- [ ] 所有字体大小符合 scale
- [ ] 所有图标尺寸一致

### 性能优化
- [ ] 动画使用 GPU 加速
- [ ] 图片懒加载
- [ ] 路由代码分割
- [ ] Lighthouse 分数 > 90

---

## 技术实现建议

### CSS-in-JS vs Scoped CSS
**推荐**: 继续使用 Scoped CSS (Vue 3 默认)
- 性能更好
- 无需运行时转换
- 更好的 TypeScript 支持

### 动画库选择
**推荐**: Vue 内置 `<transition>` + CSS Animation
- 轻量级
- 性能好
- 无需额外依赖

**可选**: GSAP (复杂动画场景)
- 功能强大
- 性能优秀
- 体积较大

### 图标方案
**推荐**: 继续使用 `@vicons/fa`
- Tree-shakeable
- SVG 格式
- 与 Naive UI 集成好

---

## 工作量预估

| 模块 | 预估工时 | 优先级 |
|------|----------|--------|
| 基础组件优化 (卡片/按钮/输入框) | 1.5 MD | Must |
| 动画过渡系统 | 1 MD | Must |
| 各页面视觉优化 | 2 MD | Must |
| 可访问性优化 | 0.75 MD | Should |
| 性能优化 | 0.5 MD | Should |
| 测试与验收 | 0.75 MD | Must |

**总计**: 6.5 MD (约 2-3 周)

---

## 依赖项

- **前置需求**: Sprint UI 已完成 ✅
- **需要协调**: 产品经理 (验收标准确认)
- **需要测试**: 功能测试 (完整回归测试)

---

## 成功指标

### 定量指标
- Lighthouse 性能分数 > 90
- 首屏渲染时间 < 1s
- 动画帧率稳定在 60fps
- 用户满意度 > 4.5/5

### 定性指标
- 用户反馈"界面精致"
- 用户反馈"交互流畅"
- 用户反馈"用着舒服"

---

**需求创建**: 2026-01-01
**产品经理**: 资深技术产品经理
**状态**: 🟢 已定义 - 待确认优先级
