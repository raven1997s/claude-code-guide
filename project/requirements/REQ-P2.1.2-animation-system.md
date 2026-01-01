# REQ-P2.1.2: 动画过渡系统

> **需求ID**: REQ-P2.1.2
> **父需求**: REQ-P2.1 (全局体验优化)
> **状态**: 🟢 已定义
> **优先级**: Must Have (Phase 1)
> **前置需求**: REQ-UI.1 ~ REQ-UI.4 (Sprint UI)
> **预估工时**: 1 MD
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名用户，我希望页面切换和元素交互有流畅的动画效果，这样我就能感受到产品的精致感和现代感，使用体验更加愉悦。

**业务价值**:
- 提升产品的现代感和精致度
- 增强用户交互的确定性和愉悦感
- 引导用户注意力，改善信息层次
- 建立品牌差异化和竞争优势

**设计原则**:
1. **流畅优先** - 所有动画保持 60fps
2. **自然感知** - 使用物理缓动函数 (ease-out)
3. **快速响应** - 动画时长控制在 150-300ms
4. **目的明确** - 每个动画都有明确的功能目的

---

## 🎨 动画系统架构

### 1. 全局动画变量

#### Design Tokens 扩展

```css
:root {
  /* ========================================
    动画时长系统
    ======================================== */
  --duration-instant: 50ms;   /* 即时反馈 */
  --duration-fast: 150ms;     /* 快速过渡 */
  --duration-base: 200ms;     /* 基础过渡 */
  --duration-slow: 300ms;     /* 慢速过渡 */
  --duration-slower: 500ms;   /* 更慢过渡 */
  --duration-slowest: 800ms;  /* 最慢过渡 */

  /* ========================================
    缓动函数系统
    ======================================== */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);    /* 推荐用于进入动画 */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹性效果 */

  /* ========================================
    特殊动画
    ======================================== */
  --animation-slide-up: slideUp var(--duration-base) var(--ease-out);
  --animation-slide-down: slideDown var(--duration-base) var(--ease-out);
  --animation-fade-in: fadeIn var(--duration-base) var(--ease-out);
  --animation-fade-out: fadeOut var(--duration-base) var(--ease-in);
  --animation-scale-in: scaleIn var(--duration-base) var(--ease-out);
  --animation-scale-out: scaleOut var(--duration-base) var(--ease-in);
}

/* ========================================
  Keyframes 定义
  ======================================== */

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}
```

---

### 2. 页面切换动画

#### Vue Router 集成

**App.vue 修改**:
```vue
<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-layout>
      <n-layout-header bordered class="header">
        <!-- ... -->
      </n-layout-header>

      <n-layout-content>
        <!-- 添加页面切换动画 -->
        <router-view v-slot="{ Component, route }">
          <transition
            :name="getTransitionName(route)"
            mode="out-in"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter"
          >
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/**
 * 根据路由层级决定动画方向
 */
function getTransitionName(targetRoute) {
  const routeDepth = (path) => path.split('/').length

  const currentDepth = routeDepth(route.path)
  const targetDepth = routeDepth(targetRoute.path)

  if (targetDepth > currentDepth) {
    return 'page-forward' // 进入更深页面：从右向左
  } else if (targetDepth < currentDepth) {
    return 'page-backward' // 返回上一级：从左向右
  } else {
    return 'page-fade' // 同级页面：淡入淡出
  }
}

function handleBeforeEnter(el) {
  // 可以在这里添加进入前的逻辑
  el.style.scrollTop = 0
}

function handleEnter(el, done) {
  // 动画进入完成
  setTimeout(done, 300)
}

function handleAfterEnter(el) {
  // 动画完成后可以做一些清理工作
}
</script>

<style scoped>
/* ========================================
  页面切换动画
  ======================================== */

/* 前进动画 (从右向左) */
.page-forward-enter-active {
  animation: slideInRight var(--duration-slow) var(--ease-out);
}

.page-forward-leave-active {
  animation: slideOutLeft var(--duration-slow) var(--ease-in);
}

/* 后退动画 (从左向右) */
.page-backward-enter-active {
  animation: slideInLeft var(--duration-slow) var(--ease-out);
}

.page-backward-leave-active {
  animation: slideOutRight var(--duration-slow) var(--ease-in);
}

/* 淡入淡出动画 */
.page-fade-enter-active {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

.page-fade-leave-active {
  animation: fadeOut var(--duration-slow) var(--ease-in);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
```

#### 验收标准

**AC1: 页面切换动画**
- Given 用户在不同页面间导航
- When 观察页面切换
- Then 应该有流畅的过渡动画
- And 动画时长应该是 300ms

**AC2: 动画方向正确性**
- Given 用户进入更深页面（如首页 → 游戏页 → 关卡页）
- When 观察动画方向
- Then 新页面应该从右向左进入

**AC3: 同级页面动画**
- Given 用户在同级页面间切换（如游戏页 → 搜索页）
- When 观察动画效果
- Then 应该使用淡入淡出动画

**AC4: 动画流畅度**
- Given 用户进行页面切换
- When 使用 DevTools 测试帧率
- Then 动画应该保持 60fps

---

### 3. 列表进入动画 (Stagger)

#### 通用 Stagger 列表组件

```vue
<template>
  <transition-group
    :name="transitionName"
    tag="div"
    :class="classList"
  >
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="itemClass"
      :style="{ animationDelay: `${index * staggerDelay}ms` }"
    >
      <slot :item="item" :index="index">
        {{ item }}
      </slot>
    </div>
  </transition-group>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemClass: {
    type: String,
    default: 'list-item'
  },
  staggerDelay: {
    type: Number,
    default: 50 // 每个元素延迟 50ms
  },
  transitionName: {
    type: String,
    default: 'stagger-fade'
  },
  classList: {
    type: [String, Array, Object],
    default: 'stagger-list'
  }
})
</script>

<style scoped>
/* ========================================
  Stagger 列表动画
  ======================================== */

.stagger-fade-enter-active {
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

/* Slide 版本 */
.stagger-slide-enter-active {
  animation: slideIn var(--duration-base) var(--ease-out) backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale 版本 */
.stagger-scale-enter-active {
  animation: scaleIn var(--duration-base) var(--ease-bounce) backwards;
}
</style>
```

#### 使用示例

```vue
<template>
  <div class="search-results">
    <StaggerList
      :items="searchResults"
      item-class="result-card"
      :stagger-delay="50"
      transition-name="stagger-fade"
    >
      <template #default="{ item }">
        <div class="result-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </template>
    </StaggerList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StaggerList from '@/components/StaggerList.vue'

const searchResults = ref([
  { id: 1, title: '结果 1', description: '...' },
  { id: 2, title: '结果 2', description: '...' },
  // ...
])
</script>
```

#### 验收标准

**AC1: Stagger 效果**
- Given 列表加载或更新
- When 观察列表进入动画
- Then 列表项应该逐个进入
- And 每个应该延迟 50ms

**AC2: 动画流畅度**
- Given 列表有 20+ 项
- When 测试动画性能
- Then 动画应该保持 60fps

**AC3: 不同场景适配**
- Given 搜索结果、关卡列表等不同列表
- When 使用 StaggerList 组件
- Then 应该可以通过 props 自定义动画

---

### 4. 微交互动画

#### 按钮点击反馈

```vue
<template>
  <button
    :class="['btn', buttonClass, { 'is-clicking': isClicking }]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  buttonClass: {
    type: String,
    default: 'btn-primary'
  }
})

const emit = defineEmits(['click'])

const isClicking = ref(false)

function handleClick(event) {
  // 触发点击动画
  isClicking.value = true
  setTimeout(() => {
    isClicking.value = false
  }, 150)

  emit('click', event)
}
</script>

<style scoped>
/* 点击动画 */
.btn.is-clicking {
  animation: buttonClick var(--duration-fast) var(--ease-out);
}

@keyframes buttonClick {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
</style>
```

#### 复制成功反馈

```vue
<template>
  <n-button
    :type="type"
    @click="handleCopy"
  >
    <template #icon>
      <n-icon :component="isCopied ? CheckIcon : CopyIcon" />
    </template>
    {{ isCopied ? '已复制!' : '复制' }}
  </n-button>
</template>

<script setup>
import { ref } from 'vue'
import { Copy as CopyIcon, Check as CheckIcon } from '@vicons/fa'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'primary'
  }
})

const isCopied = ref(false)

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.text)

    // 显示成功动画
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style scoped>
/* 复制成功动画 */
.n-button.is-copied {
  animation: copySuccess var(--duration-base) var(--ease-bounce);
  background: var(--color-success) !important;
  border-color: var(--color-success) !important;
}

@keyframes copySuccess {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
```

#### 加载状态动画

```vue
<template>
  <button :class="['btn', 'btn-primary', { 'is-loading': loading }]" :disabled="loading">
    <span v-if="loading" class="btn-spinner"></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  loading: Boolean,
  label: {
    type: String,
    required: true
  }
})
</script>

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

**AC1: 按钮点击反馈**
- Given 用户点击按钮
- When 观察点击效果
- Then 按钮应该有缩放动画 (1 → 0.95 → 1)
- And 动画应该在 150ms 内完成

**AC2: 复制成功反馈**
- Given 用户点击复制按钮
- When 复制成功
- Then 图标应该变成对勾
- And 应该有缩放动画
- And 反馈应该持续 2s

**AC3: 加载状态**
- Given 按钮处于加载状态
- When 观察加载动画
- Then 应该显示旋转的 spinner
- And 旋转应该是平滑的 (60fps)

---

### 5. 特殊场景动画

#### Hero 区域渐变动画

```vue
<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <div class="hero-cta">
        <n-button type="primary" size="large">
          开始学习
        </n-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  /* 渐变背景动画 */
  background: linear-gradient(
    135deg,
    var(--color-bg-secondary) 0%,
    var(--color-primary-50) 50%,
    var(--color-bg-secondary) 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
  padding: var(--spacing-16) var(--spacing-8);
  text-align: center;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-title {
  /* 文字渐变进入 */
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInDown var(--duration-slower) var(--ease-out);
}

.hero-subtitle {
  animation: fadeInDown var(--duration-slower) var(--ease-out) 200ms backwards;
}

.hero-cta {
  animation: fadeInUp var(--duration-slower) var(--ease-out) 400ms backwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

#### 数字滚动动画

```vue
<template>
  <div class="stat-number">
    <span ref="numberRef">{{ displayValue }}</span>
    <span v-if="suffix">{{ suffix }}</span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 1000 // 1s
  },
  suffix: String
})

const numberRef = ref(null)
const displayValue = ref(0)

function animateNumber(start, end, duration) {
  const startTime = performance.now()
  const range = end - start

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用 ease-out 缓动
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    displayValue.value = Math.round(start + range * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

watch(() => props.value, (newVal, oldVal) => {
  animateNumber(oldVal || 0, newVal, props.duration)
}, { immediate: true })
</script>

<style scoped>
.stat-number {
  font-size: var(--font-3xl); /* 30px */
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  display: inline-block;
  animation: numberPop var(--duration-base) var(--ease-bounce);
}

@keyframes numberPop {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
</style>
```

#### 验收标准

**AC1: Hero 渐变动画**
- Given 用户访问首页
- When 观察 Hero 区域
- Then 背景应该有缓慢的渐变动画 (10s)
- And 标题和副标题应该依次进入

**AC2: 数字滚动动画**
- Given 统计数字更新
- When 观察数字变化
- Then 数字应该从旧值平滑滚动到新值
- And 动画应该在 1s 内完成

---

## 🎯 性能优化

### GPU 加速

```css
/* ✅ 使用 transform 和 opacity (GPU 加速) */
.animate-gpu {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* ❌ 避免使用触发重排的属性 */
.bad-animate {
  /* 这些属性会触发 layout 重排，性能差 */
  left: 100px;
  top: 100px;
  width: 100px;
  height: 100px;
}

/* ✅ 使用 transform 代替 */
.good-animate {
  transform: translate(100px, 100px);
}
```

### 减少重绘

```css
/* 对大量元素使用 contain */
.card {
  /* 告诉浏览器这个元素的布局不会影响其他元素 */
  contain: layout style paint;
}

/* 使用 transform 代替 position 动画 */
.moving-element {
  /* ✅ GPU 加速 */
  transform: translateX(100px);
}
```

### 动画优化

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

// 使用 IntersectionObserver 懒加载动画
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  const element = document.querySelector('.animate-element')
  if (element) {
    observer.observe(element)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
```

---

## ✅ 总体验收标准

### AC1: 动画流畅度
- Given 用户与任何动画交互
- When 使用 DevTools 测试帧率
- Then 所有动画应该保持 60fps
- And 不应该有卡顿或掉帧

### AC2: 动画时长一致性
- Given 查看所有动画
- When 测量动画时长
- Then 大部分动画应该在 150-300ms 内完成
- And 复杂动画不应该超过 800ms

### AC3: 动画目的性
- Given 观察任何动画
- When 分析动画功能
- Then 每个动画都应该有明确的功能目的
- And 不应该有纯装饰性的无意义动画

### AC4: 性能影响
- Given 页面有多个动画
- When 测试页面性能
- Then Lighthouse 性能分数应该 ≥ 90
- And CPU 使用率应该合理

### AC5: 可访问性
- Given 用户偏好减少动画
- When 检测到 `prefers-reduced-motion`
- Then 应该禁用或简化动画

#### 减少动画实现

```css
/* 响应用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📊 测试计划

### 测试用例

| 测试ID | 测试场景 | 预期结果 | 状态 |
|--------|----------|----------|------|
| TEST-P2.1.2.1 | 页面切换动画 | 流畅过渡 300ms | 🔴 待测试 |
| TEST-P2.1.2.2 | Stagger 列表动画 | 逐个进入 50ms 延迟 | 🔴 待测试 |
| TEST-P2.1.2.3 | 按钮点击反馈 | 缩放动画 150ms | 🔴 待测试 |
| TEST-P2.1.2.4 | 数字滚动动画 | 平滑滚动 1s | 🔴 待测试 |
| TEST-P2.1.2.5 | 动画性能测试 | 60fps 流畅 | 🔴 待测试 |
| TEST-P2.1.2.6 | 减少动画偏好 | 动画禁用/简化 | 🔴 待测试 |

### 性能测试

```javascript
// 使用 Performance API 测试动画性能
function measureAnimationPerformance() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 16.67) { // 超过 16.67ms = 低于 60fps
        console.warn('动画卡顿:', entry)
      }
    }
  })

  observer.observe({ entryTypes: ['measure', 'paint'] })
}
```

---

## 🚧 依赖项

### 前置需求
- ✅ REQ-UI.1 (Design Tokens) - **已完成**
- ✅ REQ-P2.1.1 (基础组件优化) - **应该先完成**

### 需要协调
- **@设计师**: 确认动画细节（时长、缓动等）
- **@前端开发**: 确认技术可行性

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **动画流畅度** | 未知 | 60fps | DevTools Performance |
| **动画性能影响** | 未知 | < 5% | Lighthouse Performance |
| **用户满意度** | 未知 | ≥ 4.5/5 | 用户反馈 |

---

## 🔄 迭代计划

### Day 1-2: 页面切换动画
- [ ] 实现 App.vue 路由动画
- [ ] 测试不同场景的动画方向
- [ ] 验收

### Day 3: Stagger 列表动画
- [ ] 创建 StaggerList 通用组件
- [ ] 实现不同类型的 stagger 效果
- [ ] 验收

### Day 4: 微交互动画
- [ ] 实现按钮点击反馈
- [ ] 实现复制成功反馈
- [ ] 实现加载状态动画
- [ ] 验收

### Day 5: 特殊场景 + 性能优化
- [ ] 实现 Hero 渐变动画
- [ ] 实现数字滚动动画
- [ ] GPU 加速优化
- [ ] 减少动画偏好支持
- [ ] 验收

---

## 📚 参考资料

### 动画设计
- **Motion Design Principles**: https://material.io/design/motion/
- **Animation Guide**: https://www.nngroup.com/articles/animation-purpose/
- **UX Animation**: https://www.smashingmagazine.com/2022/01/designing-better-animations/

### 性能优化
- **Rendering Performance**: https://web.dev/animations-guide/
- **CSS Triggers**: https://csstriggers.com/
- **GPU Acceleration**: https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/

### Vue 动画
- **Vue Transitions**: https://vuejs.org/guide/built-ins/transition.html
- **Transition Group**: https://vuejs.org/guide/built-ins/transition-group.html

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 开始实现动画过渡系统
