# REQ-UI.2: 核心组件视觉重构

> **需求ID**: REQ-UI.2
> **状态**: 🟢 已定义
> **优先级**: Must Have (Sprint UI)
> **前置需求**: REQ-UI.1 (Design Tokens)
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名用户，我希望看到现代、清爽、统一的界面设计，这样我能更专注地学习内容，不被视觉干扰影响学习体验。

**业务价值**:
- 提升产品视觉质感,增强用户信任感
- 统一设计语言,降低认知负荷
- 为后续功能扩展提供稳定的视觉基础

---

## 🎨 设计规格

### 1. 导航栏重构 (`App.vue`)

#### 当前问题
- 背景纯色,缺乏层次感
- 悬停效果不明显
- 无毛玻璃效果

#### 重构目标

**视觉样式**:
```css
.navbar {
  /* 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  /* 底部边框 */
  border-bottom: 1px solid var(--color-border-default);

  /* 阴影 */
  box-shadow: var(--shadow-xs);

  /* 内边距 */
  padding: var(--spacing-4) var(--spacing-6);
}
```

**导航按钮样式**:
```css
.nav-button {
  /* 文字样式 */
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-sm);

  /* 内边距 */
  padding: var(--spacing-2) var(--spacing-3);

  /* 圆角 */
  border-radius: var(--radius-sm);

  /* 过渡动画 */
  transition: all var(--duration-base) var(--ease-out);
}

.nav-button:hover {
  /* 悬停效果 */
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  transform: translateY(-2px);
}

.nav-button.active {
  /* 激活状态 */
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
}
```

**Ghost 效果** (现有功能保留):
```css
.nav-button.ghost {
  background: transparent;
  border: 1px solid var(--color-border-subtle);
}

.nav-button.ghost:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-200);
  color: var(--color-primary-600);
}
```

---

### 2. 首页重构 (`HomeView.vue`)

#### Hero 区域

**当前问题**:
- ASCII Logo 占用空间大,移动端显示不佳
- 标题不够突出

**重构目标**:
```vue
<template>
  <div class="hero-section">
    <!-- 移除 ASCII Logo,使用大标题 -->
    <h1 class="hero-title">
      Claude Code
      <span class="gradient-text">CLI 学习指南</span>
    </h1>

    <p class="hero-subtitle">
      通过互动游戏和实战教程,掌握 Claude Code 命令行工具
    </p>

    <!-- CTA 按钮组 -->
    <n-space :size="3">
      <n-button type="primary" size="large">
        开始学习
      </n-button>
      <n-button size="large" ghost>
        查看文档
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>
.hero-section {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(135deg, #f8f9fc 0%, #f0f2f5 100%);
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  line-height: var(--leading-tight);
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
```

---

#### 特性卡片重构

**当前问题**:
- 卡片背景不统一
- 阴影效果不明显

**重构目标**:
```css
.feature-card {
  /* 卡片基础样式 */
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);

  /* 阴影 */
  box-shadow: var(--shadow-sm);

  /* 过渡动画 */
  transition: all var(--duration-base) var(--ease-out);
}

.feature-card:hover {
  /* 悬停效果 */
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  border-color: var(--color-primary-200);
}

.feature-icon {
  /* 图标容器 */
  width: 64px;
  height: 64px;
  background: var(--color-primary-50);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-4);

  /* 图标颜色 */
  color: var(--color-primary-600);
  font-size: 28px;
}

.feature-title {
  /* 卡片标题 */
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
}

.feature-description {
  /* 卡片描述 */
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

---

#### 统计卡片重构

**当前问题**:
- 数字不够突出

**重构目标**:
```css
.stat-card {
  background: linear-gradient(135deg,
    var(--color-primary-500) 0%,
    var(--color-primary-700) 100%
  );
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  color: #ffffff;
}

.stat-number {
  /* 数字样式 */
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--spacing-1);
}

.stat-label {
  /* 标签样式 */
  font-size: var(--text-sm);
  opacity: 0.9;
}
```

---

### 3. 游戏页重构 (`GameView.vue`)

#### 关卡卡片重构

**当前问题**:
- 圆角不统一
- 完成状态不够明显

**重构目标**:
```css
.level-card {
  /* 卡片基础 */
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-5);

  /* 过渡动画 */
  transition: all var(--duration-base) var(--ease-out);
  cursor: pointer;
}

.level-card:hover {
  /* 悬停效果 */
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--color-primary-300);
}

.level-card.completed {
  /* 完成状态 */
  border-color: var(--color-success);
  background: linear-gradient(135deg,
    rgba(16, 185, 129, 0.05) 0%,
    rgba(16, 185, 129, 0.1) 100%
  );
}

.level-card.locked {
  /* 锁定状态 */
  opacity: 0.5;
  pointer-events: none;
}
```

---

#### 终端组件重构

**当前问题**:
- 背景色与主题不统一

**重构目标**:
```css
.terminal-component {
  /* 终端背景 (深色) */
  background: #1a1a2e;
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  color: #e2e8f0;

  /* 字体 */
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);

  /* 阴影 */
  box-shadow: var(--shadow-lg);
}

.terminal-output {
  /* 终端输出 */
  color: #10b981;
  margin-bottom: var(--spacing-3);
}

.terminal-input {
  /* 输入框 */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  padding: var(--spacing-3) var(--spacing-4);
  color: #ffffff;

  /* 占位符 */
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}
```

---

### 4. 视觉规范总结

#### 间距规范
| 场景 | 间距值 | 变量 |
|------|--------|------|
| 组件内边距 | 32px | `var(--spacing-8)` |
| 卡片间距 | 24px | `var(--spacing-6)` |
| 元素间距 | 16px | `var(--spacing-4)` |
| 小间距 | 8px | `var(--spacing-2)` |

#### 字号规范
| 场景 | 字号 | 变量 |
|------|------|------|
| 页面标题 | 36px | `var(--text-4xl)` |
| 卡片标题 | 20px | `var(--text-xl)` |
| 正文 | 16px | `var(--text-base)` |
| 辅助文字 | 14px | `var(--text-sm)` |

#### 圆角规范
| 场景 | 圆角 | 变量 |
|------|------|------|
| 按钮/标签 | 8px | `var(--radius-sm)` |
| 卡片 | 12px | `var(--radius-md)` |
| 大卡片/模态框 | 16px | `var(--radius-lg)` |

#### 动画规范
```css
/* 全局过渡 */
* {
  transition: background-color var(--duration-base) var(--ease-out),
              border-color var(--duration-base) var(--ease-out),
              color var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out);
}
```

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: 导航栏重构
- **Given** 用户访问任何页面
- **When** 查看顶部导航栏
- **Then** 应该显示毛玻璃效果 (`backdrop-filter: blur(16px)`)
- **And** 应该有底部边框 (`1px solid var(--color-border-default)`)
- **And** 按钮悬停时有 `translateY(-2px)` 动画

### AC2: 首页 Hero 区域
- **Given** 用户访问首页
- **When** 查看 Hero 区域
- **Then** 应该不显示 ASCII Logo
- **And** 应该显示大标题 (36px+)
- **And** 标题中的"CLI 学习指南"应该有渐变色效果

### AC3: 特性卡片统一
- **Given** 用户查看首页特性卡片
- **When** 检查卡片样式
- **Then** 所有卡片应该使用相同的圆角 (`var(--radius-lg)`)
- **And** 所有卡片应该有相同的内边距 (`var(--spacing-8)`)
- **And** 悬停时应该有阴影提升效果

### AC4: 游戏页关卡卡片
- **Given** 用户查看游戏页关卡列表
- **When** 检查关卡卡片
- **Then** 已完成关卡应该有绿色边框
- **And** 未完成关卡应该有灰色边框
- **And** 锁定关卡应该半透明显示

### AC5: 终端组件样式
- **Given** 用户进入关卡
- **When** 查看终端组件
- **Then** 终端背景应该是深色 (`#1a1a2e`)
- **And** 终端文字应该是浅色 (`#e2e8f0`)
- **And** 应该使用等宽字体 (`var(--font-mono)`)

### AC6: 全局视觉一致性
- **Given** 用户浏览所有页面
- **When** 检查所有组件
- **Then** 所有组件应该使用 Design Tokens
- **And** 不应该有硬编码的颜色/间距/圆角值
- **And** 页面风格应该统一 (色彩、间距、圆角)

---

## 🎨 UI/UX 要求

### Empty State
- 不适用

### Loading State
- 骨架屏使用 `n-skeleton` 组件
- 背景 `var(--color-bg-tertiary)`

### Error State
- 错误提示使用 `var(--color-error)`
- 错误卡片使用红色边框

### Success State
- 成功提示使用 `var(--color-success)`
- 完成状态使用绿色渐变背景

---

## 🔧 技术约束

### 必须使用
- Vue 3 单文件组件 (SFC)
- Design Tokens (REQ-UI.1)
- Naive UI 组件库
- CSS Scoped 样式

### 浏览器兼容性
- 支持所有现代浏览器
- `backdrop-filter` 需要前缀 `-webkit-`
- 降级方案: 不支持毛玻璃时显示纯色背景

### 性能要求
- 页面首屏加载 ≤ 2s
- 动画帧率 ≥ 60fps
- 悬停效果延迟 ≤ 100ms

---

## 📊 数据模型

### 组件样式映射
```typescript
interface ComponentStyleMap {
  navbar: {
    background: 'var(--color-bg-elevated)';
    backdropBlur: 16;
    borderBottom: '1px solid var(--color-border-default)';
  };
  heroTitle: {
    fontSize: 'var(--text-4xl)';
    fontWeight: 'var(--font-weight-bold)';
  };
  featureCard: {
    padding: 'var(--spacing-8)';
    borderRadius: 'var(--radius-lg)';
    boxShadow: 'var(--shadow-sm)';
  };
}
```

---

## 🚧 依赖项

### 前置需求
- REQ-UI.1 (Design Tokens) - **必须先完成**

### 需要协调
- **@设计师**: 确认视觉设计稿
- **@前端开发**: 确认 Naive UI 组件定制方式

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **视觉一致性** | 未知 | 100% | 所有组件使用 Design Tokens |
| **用户满意度** | 未知 | ≥ 4.5/5 | 用户反馈评分 |
| **页面加载速度** | 未知 | ≤ 2s | Lighthouse Performance |

---

## 🔄 迭代计划

### Phase 1: 核心组件 (本次迭代)
- [ ] 重构导航栏 (`App.vue`)
- [ ] 重构首页 Hero 区域
- [ ] 重构特性卡片
- [ ] 重构统计卡片

### Phase 2: 游戏页组件
- [ ] 重构关卡卡片 (`GameView.vue`)
- [ ] 重构终端组件
- [ ] 优化移动端布局

### Phase 3: 其他页面
- [ ] 重构搜索页 (`SearchView.vue`)
- [ ] 重构参考页 (`ReferenceView.vue`)
- [ ] 全局样式审查

---

## 📚 参考资料

### 设计灵感
- **Vercel**: https://vercel.com/ (极简主义)
- **Linear**: https://linear.app/ (现代设计)
- **Notion**: https://notion.so/ (清爽布局)

### Naive UI 定制
- **主题定制**: https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme
- **组件样式覆盖**: https://www.naiveui.com/zh-CN/os-theme/docs/css-variables

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 等待 REQ-UI.1 完成后开始重构