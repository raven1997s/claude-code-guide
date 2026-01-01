# REQ-UI.3: 深色/浅色主题切换

> **需求ID**: REQ-UI.3
> **状态**: 🟢 已定义
> **优先级**: Must Have (Sprint UI)
> **前置需求**: REQ-UI.1 (Design Tokens)
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名用户，我希望能根据环境光线切换深色/浅色主题，这样我在夜间使用时能保护眼睛，提升舒适度。

**业务价值**:
- 提升用户体验，满足不同场景需求
- 符合现代应用的标配功能
- 提升产品的专业感和竞争力

---

## 🎨 设计规格

### 1. 主题切换按钮

#### 位置与样式

**按钮位置**: 导航栏右侧，搜索按钮旁边

```vue
<template>
  <div class="theme-switcher">
    <n-button
      circle
      quaternary
      @click="toggleTheme"
      :aria-label="currentTheme === 'light' ? '切换到深色主题' : '切换到浅色主题'"
    >
      <template #icon>
        <!-- 浅色主题图标: 太阳 -->
        <n-icon v-if="currentTheme === 'light'" :component="SunIcon" />
        <!-- 深色主题图标: 月亮 -->
        <n-icon v-else :component="MoonIcon" />
      </template>
    </n-button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 按钮样式 */
.theme-switcher :deep(.n-button) {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  transition: all var(--duration-base) var(--ease-out);
}

.theme-switcher :deep(.n-button:hover) {
  background: var(--color-bg-tertiary);
  transform: rotate(15deg);
}

/* 图标动画 */
.theme-switcher .n-icon {
  font-size: 20px;
  transition: all var(--duration-base) var(--ease-out);
}

.theme-switcher :deep(.n-button:hover) .n-icon {
  transform: scale(1.1);
}
</style>
```

#### 图标选择
- **浅色主题**: ☀️ 太阳图标 (`fa-sun`)
- **深色主题**: 🌙 月亮图标 (`fa-moon`)

---

### 2. 主题切换动画

#### 过渡效果
```css
/* 全局主题切换过渡 */
* {
  transition-property:
    background-color,
    border-color,
    color,
    box-shadow,
    fill,
    stroke;
  transition-duration: 300ms;
  transition-timing-function: var(--ease-out);
}

/* 特殊元素不需要过渡 (性能优化) */
img,
video,
canvas {
  transition: none !important;
}
```

#### 切换动画步骤
1. **用户点击按钮** → 按钮旋转 15deg
2. **图标缩放** → 从 1.0 → 1.2 → 1.0
3. **DOM 属性切换** → `data-theme` 从 "light" → "dark"
4. **CSS 变量更新** → 所有颜色变量自动更新
5. **页面渐变** → 300ms 过渡动画

---

### 3. 主题持久化

#### LocalStorage 存储
```javascript
const THEME_STORAGE_KEY = 'claude_theme_preference'

// 保存主题偏好
function saveThemePreference(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

// 加载主题偏好
function loadThemePreference() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'light'
}

// 初始化主题
onMounted(() => {
  const savedTheme = loadThemePreference()
  setTheme(savedTheme)
})
```

#### 系统主题检测 (可选)
```javascript
// 检测系统主题偏好
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

// 监听系统主题变化
function watchSystemTheme(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    callback(e.matches ? 'dark' : 'light')
  })
}
```

---

### 4. 主题色彩定义

#### 浅色主题 (默认)
```css
:root,
[data-theme="light"] {
  /* 背景色 */
  --color-bg-base: #ffffff;
  --color-bg-secondary: #f8f9fc;
  --color-bg-tertiary: #f1f5f9;
  --color-bg-elevated: #ffffff;

  /* 文字色 */
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #64748b;
  --color-text-tertiary: #94a3b8;
  --color-text-disabled: #cbd5e1;

  /* 边框色 */
  --color-border-default: rgba(0, 0, 0, 0.08);
  --color-border-strong: rgba(0, 0, 0, 0.12);
  --color-border-subtle: rgba(0, 0, 0, 0.04);

  /* 阴影 */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

#### 深色主题
```css
[data-theme="dark"] {
  /* 背景色 */
  --color-bg-base: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-tertiary: #334155;
  --color-bg-elevated: #1e293b;

  /* 文字色 */
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-tertiary: #64748b;
  --color-text-disabled: #475569;

  /* 边框色 */
  --color-border-default: rgba(255, 255, 255, 0.1);
  --color-border-strong: rgba(255, 255, 255, 0.15);
  --color-border-subtle: rgba(255, 255, 255, 0.05);

  /* 阴影 (深色主题阴影更深) */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

---

### 5. 组件主题适配

#### 终端组件 (特殊处理)
```css
/* 终端组件保持深色,不受主题影响 */
.terminal-component {
  --terminal-bg: #1a1a2e;
  --terminal-text: #e2e8f0;
  --terminal-accent: #10b981;
  background: var(--terminal-bg);
  color: var(--terminal-text);
}

/* 深色主题下终端稍微亮一点 */
[data-theme="dark"] .terminal-component {
  --terminal-bg: #252540;
  --terminal-text: #f1f5f9;
}
```

#### 卡片组件
```css
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  color: var(--color-text-primary);
}

[data-theme="dark"] .card {
  /* 深色主题卡片稍微调亮边框 */
  border-color: var(--color-border-strong);
}
```

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: 主题切换按钮
- **Given** 用户访问任何页面
- **When** 查看导航栏右侧
- **Then** 应该显示主题切换按钮
- **And** 按钮应该是圆形 (40x40px)
- **And** 浅色主题显示太阳图标,深色主题显示月亮图标

### AC2: 主题切换功能
- **Given** 用户在浅色主题
- **When** 点击主题切换按钮
- **Then** 页面应该切换到深色主题
- **And** 切换动画应该在 300ms 内完成
- **And** 所有颜色应该平滑过渡
- **And** 按钮图标应该从太阳变为月亮

### AC3: 主题持久化
- **Given** 用户切换到深色主题
- **When** 刷新页面
- **Then** 页面应该保持深色主题
- **And** 主题偏好应该保存在 LocalStorage
- **And** 按钮图标应该是月亮

### AC4: 全局主题一致性
- **Given** 用户切换到深色主题
- **When** 浏览所有页面
- **Then** 所有页面应该使用深色主题
- **And** 导航栏、卡片、文字颜色应该统一
- **And** 不应该有颜色闪烁或错乱

### AC5: 终端组件特殊处理
- **Given** 用户切换到深色主题
- **When** 查看终端组件
- **Then** 终端背景应该保持深色
- **And** 深色主题下终端应该稍微亮一点
- **And** 终端文字应该清晰可读

### AC6: 可访问性
- **Given** 用户使用主题切换按钮
- **When** 检查可访问性
- **Then** 按钮应该有 `aria-label` 属性
- **And** 文字对比度应该符合 WCAG AA (≥4.5:1)
- **And** 键盘焦点应该清晰可见

---

## 🎨 UI/UX 要求

### Empty State
- 不适用

### Loading State
- 不适用

### Error State
- **场景**: LocalStorage 不可用
- **降级方案**: 使用默认浅色主题,显示警告提示

### Success State
- 主题切换完成,显示 `n-message` 成功提示 (可选)

---

## 🔧 技术约束

### 必须使用
- CSS 自定义属性 (CSS Variables)
- LocalStorage API
- Vue 3 Composition API

### 浏览器兼容性
- Chrome ≥ 71
- Firefox ≥ 65
- Safari ≥ 12.1
- Edge ≥ 79

### 性能要求
- 主题切换延迟 ≤ 100ms
- 过渡动画帧率 ≥ 60fps
- 不影响页面其他交互

---

## 📊 数据模型

### LocalStorage 数据结构
```typescript
interface ThemePreference {
  theme: 'light' | 'dark' | 'auto';  // auto = 跟随系统
  timestamp: number;                  // 最后切换时间
}
```

---

## 🚧 依赖项

### 前置需求
- REQ-UI.1 (Design Tokens) - **必须先完成**

### 需要协调
- **@设计师**: 确认深色主题色彩方案
- **@前端开发**: 确认 Naive UI 主题定制方式

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **主题切换速度** | N/A | ≤ 100ms | 切换按钮点击到主题变化 |
| **用户使用率** | N/A | ≥ 30% | 深色主题用户占比 |
| **用户满意度** | 未知 | ≥ 4.5/5 | 用户反馈评分 |

---

## 🔄 迭代计划

### Phase 1: 基础功能 (本次迭代)
- [ ] 实现主题切换按钮
- [ ] 实现主题切换逻辑
- [ ] 实现主题持久化
- [ ] 定义浅色/深色主题色彩

### Phase 2: 优化
- [ ] 添加系统主题检测
- [ ] 优化过渡动画
- [ ] 细节调整 (阴影、边框)

### Phase 3: 高级功能
- [ ] 添加自动切换 (根据时间)
- [ ] 添加自定义主题色
- [ ] 主题预览功能

---

## 📚 参考资料

### 设计参考
- **Dark Mode Best Practices**: https://www.designsystems.com/dark-mode/
- **Material Design Dark Theme**: https://m3.material.io/styles/color/dark-theme

### 技术实现
- **CSS Variables for Theming**: https://css-tricks.com/dark-mode-and-css-variables/
- **Naive UI Theme**: https://www.naiveui.com/zh-CN/os-theme/docs/dark-mode

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 等待 REQ-UI.1 完成后开始实现