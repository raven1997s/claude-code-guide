# REQ-P2.1.4: 可访问性优化 (Accessibility)

> **需求ID**: REQ-P2.1.4
> **父需求**: REQ-P2.1 (全局体验优化)
> **状态**: 🟢 已定义
> **优先级**: Should Have (Phase 1)
> **前置需求**: REQ-P2.1.1 (基础组件优化)
> **预估工时**: 0.75 MD
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名使用辅助技术（屏幕阅读器、键盘导航）的用户，我希望这个网站完全可访问，这样我就能和其他用户一样获得完整的学习体验。

**业务价值**:
- 符合 WCAG 2.1 AA 级别标准，满足法律和道德要求
- 扩大用户群体，服务于有视觉、运动、认知障碍的用户
- 提升所有用户的体验（可访问性是通用的用户体验）

**优化范围**:
1. ARIA 标签完整覆盖
2. 键盘导航完整支持
3. 焦点管理优化
4. 颜色对比度优化
5. 屏幕阅读器友好

---

## 🎯 WCAG 2.1 AA 合规清单

### 原则 1: 感知性 (Perceivable)

#### 1.1 文本替代
- ✅ 所有图片有 `alt` 属性
- ✅ 装饰性图片使用 `alt=""` 或 `role="presentation"`
- ✅ 图标按钮有 `aria-label`

#### 1.2 时基媒体
- N/A（本项目无音视频内容）

#### 1.3 适应性
- ✅ 响应式设计已完成 (REQ-UI.4)
- ✅ 支持横向/纵向滚动

#### 1.4 可辨别性
- ✅ 颜色不是传递信息的唯一方式
- ✅ 文字对比度 ≥ 4.5:1

---

## 🔧 详细优化方案

### 1. ARIA 标签完整覆盖

#### 按钮组件
```vue
<template>
  <!-- 图标按钮必须有 aria-label -->
  <button
    :aria-label="ariaLabel || label"
    :aria-disabled="disabled"
    :aria-pressed="pressed"
    :class="['btn', buttonClass]"
    :disabled="disabled"
    @click="handleClick"
  >
    <n-icon v-if="icon" :component="icon" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  label: String,
  ariaLabel: String, // 优先使用 ariaLabel
  icon: Object,
  disabled: Boolean,
  pressed: Boolean, // 用于切换按钮
  buttonClass: String
})
</script>
```

#### 输入框组件
```vue
<template>
  <div class="input-group">
    <label
      v-if="label"
      :id="labelId"
      :class="['input-label', { required }]"
    >
      {{ label }}
    </label>

    <input
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :class="['input', { 'is-error': isError }]"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="label || ariaLabel"
      :aria-invalid="isError"
      :aria-describedby="helperId"
      :aria-required="required"
      @focus="handleFocus"
      @blur="handleBlur"
    >

    <p
      v-if="helperText && !isError"
      :id="helperId"
      class="input-helper"
    >
      {{ helperText }}
    </p>

    <p
      v-if="isError && errorText"
      :id="errorId"
      class="input-error"
      role="alert"
      aria-live="assertive"
    >
      {{ errorText }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: String,
  type: { type: String, default: 'text' },
  label: String,
  ariaLabel: String,
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

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
const labelId = `label-${inputId}`
const helperId = `helper-${inputId}`
const errorId = `error-${inputId}`
</script>
```

#### 弹窗/模态框
```vue
<template>
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="show"
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
        @click="handleOverlayClick"
        @keydown.esc="close"
      >
        <div
          ref="modalRef"
          class="modal-content"
          role="document"
          @click.stop
        >
          <header class="modal-header">
            <h2 :id="titleId">{{ title }}</h2>
            <button
              class="modal-close"
              aria-label="关闭对话框"
              @click="close"
            >
              <n-icon :component="CloseIcon" />
            </button>
          </header>

          <div :id="descId" class="modal-body">
            <slot></slot>
          </div>

          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:show', 'close'])

const modalRef = ref(null)
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
const descId = `modal-desc-${Math.random().toString(36).substr(2, 9)}`

function close() {
  emit('update:show', false)
  emit('close')
}

function handleOverlayClick() {
  close()
}

// 焦点陷阱管理
let previousActiveElement = null

watch(() => props.show, async (isOpen) => {
  if (isOpen) {
    // 保存当前焦点元素
    previousActiveElement = document.activeElement

    // 等待 DOM 更新后聚焦到模态框
    await nextTick()
    if (modalRef.value) {
      modalRef.value.focus()
    }

    // 禁止背景滚动
    document.body.style.overflow = 'hidden'
  } else {
    // 恢复之前的焦点
    if (previousActiveElement) {
      previousActiveElement.focus()
    }

    // 恢复背景滚动
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: var(--spacing-4);
}

.modal-content {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  outline: none; /* 自定义焦点样式 */
}

.modal-content:focus-visible {
  box-shadow:
    0 0 0 3px var(--color-primary-100),
    var(--shadow-xl);
}
</style>
```

#### 加载状态
```vue
<template>
  <div
    v-if="loading"
    role="status"
    aria-live="polite"
    aria-busy="true"
    class="loading-indicator"
  >
    <div class="loading-spinner"></div>
    <p class="loading-text">{{ loadingText }}</p>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
  loadingText: {
    type: String,
    default: '正在加载...'
  }
})
</script>

<style scoped>
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-8);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border-default);
  border-top-color: var(--color-primary-500);
  border-radius: var(--radius-full);
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

---

### 2. 键盘导航完整支持

#### 全局键盘快捷键
```javascript
// composables/useKeyboardShortcuts.js
import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts(shortcuts) {
  function handleKeydown(event) {
    // 检查是否在输入框中
    const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
      document.activeElement?.tagName
    )

    for (const [key, handler] of Object.entries(shortcuts)) {
      const [keyCombo, ...modifiers] = key.split('+')

      // 检查修饰键
      const hasCtrl = modifiers.includes('ctrl')
      const hasShift = modifiers.includes('shift')
      const hasAlt = modifiers.includes('alt')
      const hasMeta = modifiers.includes('meta')

      if (
        (!hasCtrl || event.ctrlKey) &&
        (!hasShift || event.shiftKey) &&
        (!hasAlt || event.altKey) &&
        (!hasMeta || event.metaKey) &&
        event.key.toLowerCase() === keyCombo.toLowerCase()
      ) {
        // 如果在输入框中且不是允许的快捷键，则忽略
        if (isInputActive && !modifiers.includes('allowInInput')) {
          continue
        }

        event.preventDefault()
        handler(event)
        break
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
```

#### 使用示例
```vue
<script setup>
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import { useRouter } from 'vue-router'

const router = useRouter()

useKeyboardShortcuts({
  'Escape': () => {
    // 关闭所有弹窗
  },
  '/+allowInInput': () => {
    // 聚焦搜索框
    document.querySelector('.search-input')?.focus()
  },
  'ctrl+k': () => {
    // 打开命令面板
    openCommandPalette()
  },
  'ArrowDown': () => {
    // 导航到下一项
    navigateToNext()
  },
  'ArrowUp': () => {
    // 导航到上一项
    navigateToPrev()
  },
  'Enter': () => {
    // 激活选中项
    activateSelected()
  }
})
</script>
```

#### 焦点可见性优化
```css
/* 全局焦点样式 */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* 按钮焦点样式 */
button:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  box-shadow:
    0 0 0 3px var(--color-primary-100),
    var(--shadow-sm);
}

/* 链接焦点样式 */
a:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* 移除鼠标点击后的焦点（仅保留键盘导航） */
:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
```

---

### 3. 焦点管理优化

#### 焦点陷阱 Composable
```javascript
// composables/useFocusTrap.js
import { onMounted, onUnmounted, watch } from 'vue'

export function useFocusTrap(containerRef, isActive) {
  let previousActiveElement = null
  let focusableElements = []
  let firstElement = null
  let lastElement = null

  function getFocusableElements() {
    if (!containerRef.value) return []

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ]

    return Array.from(
      containerRef.value.querySelectorAll(focusableSelectors.join(','))
    )
  }

  function handleTabKey(event) {
    if (!isActive.value) return

    focusableElements = getFocusableElements()
    firstElement = focusableElements[0]
    lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift+Tab: 从第一个元素跳到最后一个
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab: 从最后一个元素跳到第一个
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
  }

  watch(isActive, (active) => {
    if (active) {
      // 激活焦点陷阱
      previousActiveElement = document.activeElement

      // 等待 DOM 更新后聚焦到第一个元素
      setTimeout(() => {
        firstElement = getFocusableElements()[0]
        firstElement?.focus()
      }, 100)

      document.addEventListener('keydown', handleTabKey)
    } else {
      // 退出焦点陷阱
      document.removeEventListener('keydown', handleTabKey)

      // 恢复之前的焦点
      if (previousActiveElement) {
        previousActiveElement.focus()
      }
    }
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleTabKey)
  })
}
```

#### 使用示例
```vue
<template>
  <div
    ref="modalRef"
    class="modal"
  >
    <!-- 模态框内容 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFocusTrap } from '@/composables/useFocusTrap'

const modalRef = ref(null)
const isOpen = ref(false)

useFocusTrap(modalRef, isOpen)
</script>
```

---

### 4. 颜色对比度优化

#### 对比度检查清单

| 元素 | 前景色 | 背景色 | 对比度 | 标准 | 状态 |
|------|--------|--------|--------|------|------|
| 主标题 | `--color-text-primary` | `--color-bg-base` | 16.1:1 | ≥4.5:1 | ✅ Pass |
| 正文 | `--color-text-primary` | `--color-bg-base` | 16.1:1 | ≥4.5:1 | ✅ Pass |
| 次要文字 | `--color-text-secondary` | `--color-bg-base` | 4.7:1 | ≥4.5:1 | ✅ Pass |
| 主按钮 | `#ffffff` | `--color-primary-500` | 6.3:1 | ≥4.5:1 | ✅ Pass |
| 链接 | `--color-primary-600` | `--color-bg-base` | 5.2:1 | ≥4.5:1 | ✅ Pass |

#### 深色主题对比度检查

| 元素 | 前景色 | 背景色 | 对比度 | 标准 | 状态 |
|------|--------|--------|--------|------|------|
| 主标题 | `--color-text-primary` | `--color-bg-base` | 15.8:1 | ≥4.5:1 | ✅ Pass |
| 正文 | `--color-text-primary` | `--color-bg-base` | 15.8:1 | ≥4.5:1 | ✅ Pass |
| 次要文字 | `--color-text-secondary` | `--color-bg-base` | 5.1:1 | ≥4.5:1 | ✅ Pass |
| 主按钮 | `#ffffff` | `--color-primary-600` | 5.8:1 | ≥4.5:1 | ✅ Pass |

---

### 5. 屏幕阅读器友好

#### 跳过导航链接
```vue
<template>
  <div>
    <!-- 跳过导航链接（键盘用户可见） -->
    <a href="#main-content" class="skip-link">
      跳过导航，直接到主要内容
    </a>

    <!-- 导航 -->
    <nav class="navbar">
      <!-- ... -->
    </nav>

    <!-- 主要内容 -->
    <main id="main-content">
      <!-- ... -->
    </main>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-600);
  color: #ffffff;
  padding: var(--spacing-3) var(--spacing-4);
  text-decoration: none;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
</style>
```

#### 页面标题层级
```vue
<template>
  <article>
    <h1>主标题（每页唯一）</h1>

    <section>
      <h2>第一节</h2>
      <p>内容...</p>

      <h3>子节 1.1</h3>
      <p>内容...</p>
    </section>

    <section>
      <h2>第二节</h2>
      <p>内容...</p>
    </section>
  </article>
</template>
```

#### 语义化 HTML
```vue
<template>
  <!-- 使用语义化标签 -->
  <header>网站头部</header>
  <nav>导航</nav>
  <main>主要内容</main>
  <article>文章内容</article>
  <section>内容区块</section>
  <aside>侧边栏</aside>
  <footer>网站底部</footer>
</template>
```

---

## ✅ 总体验收标准

### AC1: 键盘导航完整性
- Given 用户仅使用键盘
- When 测试核心功能
- Then 所有交互元素应该可以通过 Tab 键访问
- And Enter/Space 应该可以激活按钮
- And Esc 应该可以关闭弹窗

### AC2: 屏幕阅读器支持
- Given 用户使用屏幕阅读器
- When 浏览页面
- Then 所有交互元素应该有正确的标签
- And 表单元素应该有描述性 label
- And 状态变化应该被通知

### AC3: 颜色对比度
- Given 用户查看页面内容
- When 测试对比度
- Then 所有文字对比度应该 ≥ 4.5:1
- And 大文字对比度应该 ≥ 3:1

### AC4: 焦点管理
- Given 用户使用键盘导航
- When 切换焦点
- Then 焦点应该清晰可见
| And 模态框应该有焦点陷阱

### AC5: Lighthouse 可访问性评分
- Given 运行 Lighthouse 测试
- When 查看可访问性分数
- Then 分数应该 ≥ 95

---

## 📊 测试计划

### 测试工具
- **Lighthouse**: Chrome DevTools > Lighthouse > Accessibility
- **axe DevTools**: Chrome 扩展，自动化可访问性测试
- **NVDA / JAWS**: Windows 屏幕阅读器测试
- **VoiceOver**: macOS/iOS 屏幕阅读器测试

### 浏览器快捷键测试

| 功能 | 快捷键 | 预期行为 | 状态 |
|------|--------|----------|------|
| 聚焦搜索 | `/` | 搜索框获得焦点 | 🔴 待测试 |
| 关闭弹窗 | `Esc` | 关闭当前弹窗 | 🔴 待测试 |
| 导航列表 | `↑` / `↓` | 上下选择 | 🔴 待测试 |
| 激活项 | `Enter` | 激活选中项 | 🔴 待测试 |
| 切换主题 | `Ctrl+Shift+T` | 切换深浅主题 | 🔴 待测试 |

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **Lighthouse Accessibility** | 未知 | ≥ 95 | Chrome DevTools |
| **键盘导航覆盖率** | 60% | 100% | 手动测试 |
| **屏幕阅读器兼容性** | 部分 | 完全 | NVDA/VoiceOver |

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 开始可访问性优化
