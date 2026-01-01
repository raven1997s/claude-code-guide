# REQ-UI.4: 移动端响应式优化

> **需求ID**: REQ-UI.4
> **状态**: 🟢 已定义
> **优先级**: Should Have (Sprint UI)
> **前置需求**: REQ-UI.1 (Design Tokens)
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名移动端用户，我希望在手机和平板上也能正常使用这个学习平台，这样我就能随时随地学习 Claude Code CLI 命令。

**业务价值**:
- 扩大用户覆盖面，支持多设备学习
- 提升用户满意度和留存率
- 符合现代 Web 应用的移动优先趋势

---

## 📱 响应式断点

### 断点定义

```css
/* 断点系统 */
--breakpoint-xs: 375px;   /* 小屏手机 (iPhone SE) */
--breakpoint-sm: 640px;   /* 大屏手机 */
--breakpoint-md: 768px;   /* 平板 (iPad) */
--breakpoint-lg: 1024px;  /* 小屏笔记本 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏桌面 */

/* 媒体查询 Mixin */
@media (max-width: 640px) {
  /* 移动端样式 */
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* 平板样式 */
}

@media (min-width: 1025px) {
  /* 桌面样式 */
}
```

---

## 🎨 各页面响应式设计

### 1. 导航栏 (`App.vue`)

#### 移动端适配
```css
/* 移动端 (≤ 640px) */
@media (max-width: 640px) {
  .navbar {
    /* 减少内边距 */
    padding: var(--spacing-3) var(--spacing-4);

    /* 隐藏部分导航项 */
  }

  .navbar-logo {
    /* Logo 缩小 */
    font-size: var(--text-base);
  }

  .nav-links {
    /* 使用汉堡菜单 */
    display: none; /* 默认隐藏 */
  }

  .nav-menu-toggle {
    /* 显示汉堡菜单按钮 */
    display: flex;
  }
}

/* 平板 (641px ~ 1024px) */
@media (min-width: 641px) and (max-width: 1024px) {
  .navbar {
    padding: var(--spacing-3) var(--spacing-5);
  }

  .nav-links {
    /* 减少间距 */
    gap: var(--spacing-4);
  }
}

/* 桌面 (≥ 1025px) */
@media (min-width: 1025px) {
  .nav-menu-toggle {
    display: none; /* 隐藏汉堡菜单 */
  }

  .nav-links {
    display: flex; /* 显示完整导航 */
  }
}
```

#### 汉堡菜单实现
```vue
<template>
  <!-- 移动端菜单按钮 -->
  <n-button
    v-if="isMobile"
    text
    @click="showMobileMenu = true"
    class="menu-toggle"
  >
    <template #icon>
      <n-icon :component="MenuIcon" size="24" />
    </template>
  </n-button>

  <!-- 移动端菜单抽屉 -->
  <n-drawer
    v-model:show="showMobileMenu"
    :width="280"
    placement="right"
  >
    <n-drawer-content>
      <n-space vertical :size="2">
        <n-button
          v-for="item in navItems"
          :key="item.path"
          text
          size="large"
          @click="navigate(item.path)"
        >
          <template #icon>
            <n-icon :component="item.icon" />
          </template>
          {{ item.label }}
        </n-button>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)
const showMobileMenu = ref(false)
</script>
```

---

### 2. 首页 (`HomeView.vue`)

#### Hero 区域响应式
```css
/* 移动端 */
@media (max-width: 640px) {
  .hero-section {
    padding: var(--spacing-12) var(--spacing-4);
  }

  .hero-title {
    font-size: var(--text-2xl);  /* 24px */
    line-height: var(--leading-tight);
  }

  .hero-subtitle {
    font-size: var(--text-base); /* 16px */
  }

  .hero-cta {
    /* 按钮垂直排列 */
    flex-direction: column;
    gap: var(--spacing-3);
  }

  .hero-cta .n-button {
    width: 100%; /* 全宽按钮 */
  }
}

/* 平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  .hero-title {
    font-size: var(--text-3xl); /* 30px */
  }
}

/* 桌面 */
@media (min-width: 1025px) {
  .hero-title {
    font-size: var(--text-4xl); /* 36px */
  }
}
```

#### 特性卡片网格
```css
.features-grid {
  /* 默认: 移动端单列 */
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
}

/* 平板: 2 列 */
@media (min-width: 641px) and (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-6);
  }
}

/* 桌面: 3 列 */
@media (min-width: 1025px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-8);
  }
}
```

---

### 3. 游戏页 (`GameView.vue`)

#### 关卡卡片网格
```css
.level-grid {
  /* 移动端: 2 列 (小卡片) */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3);
}

/* 平板: 3 列 */
@media (min-width: 641px) and (max-width: 1024px) {
  .level-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-4);
  }
}

/* 桌面: 4 列 */
@media (min-width: 1025px) {
  .level-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-5);
  }
}

/* 超大屏: 5 列 */
@media (min-width: 1536px) {
  .level-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

#### 终端组件适配
```css
/* 移动端终端 */
@media (max-width: 640px) {
  .terminal-component {
    /* 减少内边距 */
    padding: var(--spacing-4);

    /* 字号缩小 */
    font-size: 13px;
    line-height: 1.6;
  }

  .terminal-input {
    /* 输入框字号 */
    font-size: 14px;
  }
}
```

---

### 4. 搜索页 (`SearchView.vue`)

#### 搜索框响应式
```css
/* 移动端 */
@media (max-width: 640px) {
  .search-input {
    /* 全宽搜索框 */
    width: 100%;
    font-size: var(--text-base); /* 16px (防止 iOS 缩放) */
  }

  .search-mode-toggle {
    /* 模式切换按钮改为下拉 */
    display: none; /* 隐藏单选按钮组 */
  }

  /* 显示下拉选择器 */
  .search-mode-select {
    display: block;
    width: 100%;
    margin-top: var(--spacing-2);
  }
}

/* 桌面 */
@media (min-width: 641px) {
  .search-mode-select {
    display: none;
  }

  .search-mode-toggle {
    display: flex;
  }
}
```

---

### 5. 参考页 (`ReferenceView.vue`)

#### 速查表卡片响应式
```css
/* 移动端 */
@media (max-width: 640px) {
  .cheatsheet-grid {
    /* 单列 */
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  .cheatsheet-card {
    /* 卡片内边距减少 */
    padding: var(--spacing-4);
  }

  .cheatsheet-code {
    /* 代码块字号 */
    font-size: 12px;
    /* 水平滚动 */
    overflow-x: auto;
    white-space: pre;
  }
}

/* 平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  .cheatsheet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 1025px) {
  .cheatsheet-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: 移动端导航栏
- **Given** 用户使用手机访问 (屏幕宽度 ≤ 640px)
- **When** 查看导航栏
- **Then** 应该显示汉堡菜单按钮
- **And** 点击按钮应该展开侧边抽屉菜单
- **And** 导航项应该垂直排列

### AC2: 移动端首页布局
- **Given** 用户使用手机访问首页
- **When** 查看 Hero 区域
- **Then** 标题字号应该缩小到 24px
- **And** CTA 按钮应该垂直排列
- **And** 按钮应该是全宽

### AC3: 平板端首页布局
- **Given** 用户使用平板访问首页 (768px)
- **When** 查看特性卡片
- **Then** 卡片应该排列成 2 列
- **And** 间距应该适配平板

### AC4: 移动端游戏页
- **Given** 用户使用手机访问游戏页
- **When** 查看关卡列表
- **Then** 关卡卡片应该排列成 2 列
- **And** 卡片间距应该减小

### AC5: 横竖屏切换
- **Given** 用户使用手机
- **When** 旋转屏幕 (横竖屏切换)
- **Then** 布局应该自动调整
- **And** 不应该出现元素错位或溢出

### AC6: 触摸目标尺寸
- **Given** 用户使用手机
- **When** 检查所有可点击元素
- **Then** 按钮/链接应该 ≥ 44x44px
- **And** 卡片间距应该足够防止误触

---

## 🎨 UI/UX 要求

### Empty State
- 移动端空状态图片缩小
- 文字字号适配

### Loading State
- 移动端骨架屏高度调整

### Error State
- 错误提示在移动端应该全宽显示

### Success State
- 成功提示在移动端应该使用 `n-message` 顶部提示

---

## 🔧 技术约束

### 必须使用
- CSS Media Queries
- Flexbox / Grid 布局
- Viewport Meta Tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### 浏览器兼容性
- iOS Safari ≥ 12
- Android Chrome ≥ 71
- 支持触摸手势

### 性能要求
- 移动端首屏加载 ≤ 3s
- 滚动帧率 ≥ 60fps
- 触摸响应延迟 ≤ 100ms

---

## 📊 测试设备

### 必须测试的设备
| 设备 | 屏幕尺寸 | 浏览器 | 优先级 |
|------|----------|--------|--------|
| iPhone SE | 375x667 | Safari | 高 |
| iPhone 14 Pro | 393x852 | Safari | 高 |
| Samsung Galaxy S23 | 360x780 | Chrome | 高 |
| iPad Air | 820x1180 | Safari | 中 |
| iPad Pro 12.9" | 1024x1366 | Safari | 中 |
| Desktop | 1920x1080 | Chrome | 低 |

---

## 🚧 依赖项

### 前置需求
- REQ-UI.1 (Design Tokens) - **必须先完成**

### 需要协调
- **@设计师**: 提供移动端设计稿
- **@前端开发**: 确认 Naive UI 移动端组件适配

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **移动端可用性** | 未知 | 100% | 所有核心功能可用 |
| **Lighthouse 移动端评分** | 未知 | ≥ 90 | Google Lighthouse |
| **触摸目标合格率** | 未知 | 100% | ≥ 44x44px 的按钮占比 |
| **移动端加载速度** | 未知 | ≤ 3s | 3G 网络下的首屏加载 |

---

## 🔄 迭代计划

### Phase 1: 基础适配 (本次迭代)
- [ ] 实现导航栏响应式
- [ ] 实现首页响应式
- [ ] 实现游戏页响应式
- [ ] 测试核心设备

### Phase 2: 细节优化
- [ ] 优化移动端触摸交互
- [ ] 优化横竖屏切换
- [ ] 优化移动端性能

### Phase 3: 高级功能
- [ ] 添加移动端手势支持
- [ ] 添加 PWA 支持
- [ ] 优化移动端动效

---

## 📚 参考资料

### 响应式设计
- **Responsive Design**: https://web.dev/responsive-web-design-basics/
- **CSS Grid & Flexbox**: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Mobile First**: https://www.lukew.com/ff/entry.asp?933

### 移动端最佳实践
- **Touch Targets**: https://www.smashingmagazine.com/2012/02/ux-design-for-iphones-and-smartphones/
- **Viewport Meta Tag**: https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 等待 REQ-UI.1 完成后开始实现