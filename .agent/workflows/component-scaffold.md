---
description: 快速生成 Vue 3 组件模板
---

# Vue 3 组件脚手架

生成符合项目规范的 Vue 3 组件代码。

## 使用方法

告诉我要生成的组件名称和用途：
```
生成一个名为 UserCard 的组件，用于展示用户头像和昵称，包含 hover 效果。
```

## 组件标准模板

```vue
<template>
  <div class="component-name">
    <!-- Header -->
    <div class="header">
      <n-icon :component="UserIcon" size="24" class="icon" />
      <h3 class="title">{{ title }}</h3>
    </div>

    <!-- Content -->
    <div class="content">
      <slot></slot>
    </div>
    
    <!-- Footer -->
    <div v-if="showFooter" class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { User as UserIcon } from '@vicons/fa'

// Props 定义
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

// Emits 定义
const emit = defineEmits(['click', 'update'])

// 状态与计算属性
const titleClass = computed(() => {
  return props.showFooter ? 'has-footer' : ''
})

// 方法
function handleClick() {
  emit('click')
}
</script>

<style scoped>
.component-name {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  transition: all var(--duration-base) var(--ease-out);
}

.component-name:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: rgba(99, 102, 241, 0.2);
}

.header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-3);
}

.title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.icon {
  color: var(--color-primary-500);
}

.content {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.footer {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--color-border-subtle);
}
</style>
```

## 规范检查点
- [ ] 使用 `<script setup>`
- [ ] 使用 Naive UI 组件和 @vicons/fa 图标
- [ ] Props 定义明确类型和默认值
- [ ] 样式使用 Design Tokens (var(--color-...))
- [ ] 包含 hover 交互效果
