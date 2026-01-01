# REQ-P2.1.5: 性能优化

> **需求ID**: REQ-P2.1.5
> **父需求**: REQ-P2.1 (全局体验优化)
> **状态**: 🟢 已定义
> **优先级**: Must Have (Phase 1)
> **前置需求**: REQ-P2.1.2 (动画过渡系统)
> **预估工时**: 0.5 MD
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名用户，我希望网站加载快速、交互流畅，这样我就能高效地学习，不会因为性能问题而感到沮丧。

**业务价值**:
- 提升用户体验和留存率
- 改善 SEO 排名（Core Web Vitals 是排名因素）
- 降低用户流失率
- 支持更多用户（包括低端设备和慢速网络）

**优化目标**:
1. Lighthouse 性能分数 ≥ 90
2. 首次内容绘制 (FCP) ≤ 1.5s
3. 最大内容绘制 (LCP) ≤ 2.5s
4. 首次输入延迟 (FID) ≤ 100ms
5. 累积布局偏移 (CLS) ≤ 0.1

---

## 🎯 Core Web Vitals 目标

| 指标 | 当前值 | 目标值 | 状态 |
|------|--------|--------|------|
| **FCP** (First Contentful Paint) | 未知 | ≤ 1.5s | 🔴 待优化 |
| **LCP** (Largest Contentful Paint) | 未知 | ≤ 2.5s | 🔴 待优化 |
| **FID** (First Input Delay) | 未知 | ≤ 100ms | 🔴 待优化 |
| **CLS** (Cumulative Layout Shift) | 未知 | ≤ 0.1 | 🔴 待优化 |
| **TTI** (Time to Interactive) | 未知 | ≤ 3.5s | 🔴 待优化 |

---

## 🔧 详细优化方案

### 1. Vite 构建优化

#### vite.config.js 配置
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  // 构建优化
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // Vue 核心单独打包
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // Naive UI 单独打包
          'naive-ui': ['naive-ui'],
          // 图标单独打包
          'icons': ['@vicons/fa'],
          // Fuse.js 单独打包
          'search': ['fuse.js']
        }
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console
        drop_debugger: true
      }
    },

    // chunk 大小警告阈值
    chunkSizeWarningLimit: 500
  },

  // 开发服务器配置
  server: {
    port: 8000,
    host: true
  },

  // 预加载配置
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'naive-ui',
      'fuse.js'
    ]
  }
})
```

---

### 2. 路由懒加载

#### router/index.js
```javascript
import { createRouter, createWebHistory } from 'vue-router'

// 懒加载页面组件
const HomeView = () => import('@/views/HomeView.vue')
const GameView = () => import('@/views/GameView.vue')
const SearchView = () => import('@/views/SearchView.vue')
const ReferenceView = () => import('@/views/ReferenceView.vue')
const CheatsheetView = () => import('@/views/CheatsheetView.vue')
const VSCodeTutorialView = () => import('@/views/VSCodeTutorialView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '首页' }
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
    meta: { title: '游戏学习' }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: { title: '命令搜索' }
  },
  // ...
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 滚动行为优化
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
```

---

### 3. 图片优化

#### 图片懒加载指令
```javascript
// directives/lazyLoad.js
export default {
  mounted(el, binding) {
    // 创建 IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 图片进入视口，加载图片
            const img = entry.target
            img.src = binding.value
            img.classList.add('is-loaded')
            observer.unobserve(img)
          }
        })
      },
      {
        // 稍微提前加载（提前 100px）
        rootMargin: '100px'
      }
    )

    // 观察图片元素
    observer.observe(el)

    // 保存 observer 引用以便清理
    el._lazyLoadObserver = observer
  },

  unmounted(el) {
    // 清理 observer
    if (el._lazyLoadObserver) {
      el._lazyLoadObserver.disconnect()
    }
  }
}
```

#### 使用示例
```vue
<template>
  <img
    v-lazyLoad="imageSrc"
    :alt="imageAlt"
    class="lazy-image"
  >
</template>

<script setup>
import { ref } from 'vue'
import lazyLoad from '@/directives/lazyLoad'

const imageSrc = ref('/path/to/image.jpg')
const imageAlt = ref('图片描述')
</script>

<style scoped>
.lazy-image {
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
  background: var(--color-bg-tertiary);
  min-height: 200px;
}

.lazy-image.is-loaded {
  opacity: 1;
}
</style>
```

#### 响应式图片
```vue
<template>
  <picture>
    <!-- WebP 格式（更小） -->
    <source
      :srcset="`${imageUrl}.webp`"
      type="image/webp"
    >
    <!-- 传统格式后备 -->
    <img
      :src="`${imageUrl}.jpg`"
      :alt="alt"
      loading="lazy"
      decoding="async"
      :width="width"
      :height="height"
    >
  </picture>
</template>
```

---

### 4. 动画性能优化

#### GPU 加速
```css
/* ✅ 使用 transform 和 opacity (GPU 加速) */
.animate-gpu {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* ❌ 避免使用触发重排的属性 */
.bad-animate {
  /* 这些属性会触发 layout，性能差 */
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

#### 减少重绘
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

#### 减少动画偏好支持
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

### 5. 资源预加载

#### index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- DNS 预解析 -->
  <link rel="dns-prefetch" href="//cdn.jsdelivr.net">

  <!-- 预连接到重要域名 -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>

  <!-- 预加载关键字体 -->
  <link rel="preload" as="font" href="/fonts/main.woff2" type="font/woff2" crossorigin>

  <!-- 预加载关键脚本 -->
  <link rel="modulepreload" href="/src/main.js">

  <!-- 预加载关键样式 -->
  <link rel="preload" href="/src/styles/design-tokens.css" as="style">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

### 6. 搜索性能优化

#### Fuse.js 搜索优化
```javascript
// composables/useSearch.js
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'

export function useSearch(data) {
  const searchQuery = ref('')
  const searchResults = ref([])

  // 配置 Fuse.js（优化性能）
  const fuse = new Fuse(data, {
    keys: [
      { name: 'title', weight: 0.5 }, // 标题权重更高
      { name: 'command', weight: 0.3 },
      { name: 'description', weight: 0.2 }
    ],
    threshold: 0.3, // 降低阈值以提高准确性
    distance: 100,
    minMatchCharLength: 2, // 最少输入 2 个字符才开始搜索
    useExtendedSearch: false // 关闭扩展搜索以提高性能
  })

  // 防抖搜索
  let searchTimeout = null
  const search = (query) => {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
      if (!query || query.length < 2) {
        searchResults.value = []
        return
      }

      const results = fuse.search(query)
      searchResults.value = results.slice(0, 20) // 限制结果数量
    }, 300) // 300ms 防抖
  }

  // 监听搜索输入
  watch(searchQuery, (newQuery) => {
    search(newQuery)
  })

  return {
    searchQuery,
    searchResults
  }
}
```

---

### 7. 虚拟滚动 (大列表优化)

#### 虚拟列表组件
```vue
<template>
  <div
    ref="containerRef"
    class="virtual-list"
    @scroll="handleScroll"
  >
    <div
      class="virtual-list-spacer"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        class="virtual-list-content"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="virtual-list-item"
          :style="{ height: `${itemHeight}px` }"
        >
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: Number,
    default: 60
  },
  containerHeight: {
    type: Number,
    default: 600
  }
})

const containerRef = ref(null)
const scrollTop = ref(0)

const totalHeight = computed(() => props.items.length * props.itemHeight)
const visibleCount = computed(() => Math.ceil(props.containerHeight / props.itemHeight) + 2)

const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - 1)
})

const endIndex = computed(() => {
  return Math.min(props.items.length, startIndex.value + visibleCount.value)
})

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value)
})

function handleScroll(event) {
  scrollTop.value = event.target.scrollTop
}
</script>

<style scoped>
.virtual-list {
  height: v-bind('containerHeight + "px"');
  overflow: auto;
  position: relative;
}

.virtual-list-spacer {
  position: relative;
}

.virtual-list-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list-item {
  box-sizing: border-box;
}
</style>
```

---

### 8. 性能监控

#### Performance API 监控
```javascript
// utils/performance.js
export function measurePerformance() {
  // 测量页面加载性能
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0]

    console.log('=== 性能数据 ===')
    console.log('DNS 查询:', perfData.domainLookupEnd - perfData.domainLookupStart, 'ms')
    console.log('TCP 连接:', perfData.connectEnd - perfData.connectStart, 'ms')
    console.log('请求响应:', perfData.responseEnd - perfData.requestStart, 'ms')
    console.log('DOM 解析:', perfData.domComplete - perfData.domInteractive, 'ms')
    console.log('页面加载:', perfData.loadEventEnd - perfData.loadEventStart, 'ms')
  })

  // 测量资源加载
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) {
        console.warn('慢速资源:', entry.name, entry.duration, 'ms')
      }
    }
  })

  observer.observe({ entryTypes: ['resource'] })

  // 测量长任务
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('长任务检测:', entry.duration, 'ms', entry.name)
      }
    })

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (e) {
      // 某些浏览器不支持 longtask
    }
  }
}

// 测量 Core Web Vitals
export function measureCoreWebVitals() {
  // FCP (First Contentful Paint)
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FCP:', entry.startTime, 'ms')
    }
  }).observe({ entryTypes: ['paint'] })

  // LCP (Largest Contentful Paint)
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log('LCP:', lastEntry.startTime, 'ms')
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  // FID (First Input Delay)
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime, 'ms')
    }
  }).observe({ entryTypes: ['first-input'] })

  // CLS (Cumulative Layout Shift)
  let clsValue = 0
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        console.log('CLS:', clsValue)
      }
    }
  }).observe({ entryTypes: ['layout-shift'] })
}
```

#### main.js 中启用
```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 开发环境启用性能监控
if (import.meta.env.DEV) {
  import('./utils/performance.js').then(({ measurePerformance, measureCoreWebVitals }) => {
    measurePerformance()
    measureCoreWebVitals()
  })
}

const app = createApp(App)
app.mount('#app')
```

---

## ✅ 总体验收标准

### AC1: Lighthouse 性能分数
- Given 运行 Lighthouse 测试
- When 查看性能分数
- Then 分数应该 ≥ 90

### AC2: Core Web Vitals
- Given 运行 Web Vitals 测试
- When 查看各项指标
- Then FCP ≤ 1.5s, LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1

### AC3: 动画流畅度
- Given 页面有多个动画
- When 测试动画帧率
| Then 所有动画应该保持 60fps

### AC4: 资源加载
- Given 打开 Network 面板
- When 查看资源加载时间
- Then 首屏资源应该在 2s 内加载完成

---

## 📊 性能测试计划

### 测试工具
- **Lighthouse**: Chrome DevTools > Lighthouse
- **WebPageTest**: https://www.webpagetest.org/
- **Chrome DevTools Performance**: 录制和分析页面性能
- **Bundle Analyzer**: vite-plugin-visualizer

### 测试场景

| 场景 | 描述 | 目标 | 状态 |
|------|------|------|------|
| 首次访问 | 冷加载首页 | Lighthouse ≥ 90 | 🔴 待测试 |
| 路由切换 | 页面间导航 | < 100ms | 🔴 待测试 |
| 搜索性能 | 输入搜索词 | < 300ms 响应 | 🔴 待测试 |
| 列表滚动 | 长列表滚动 | 60fps | 🔴 待测试 |

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **Lighthouse Performance** | 未知 | ≥ 90 | Chrome DevTools |
| **FCP** | 未知 | ≤ 1.5s | Web Vitals |
| **LCP** | 未知 | ≤ 2.5s | Web Vitals |
| **FID** | 未知 | ≤ 100ms | Web Vitals |
| **CLS** | 未知 | ≤ 0.1 | Web Vitals |
| **动画帧率** | 未知 | 60fps | DevTools Performance |

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 开始性能优化
