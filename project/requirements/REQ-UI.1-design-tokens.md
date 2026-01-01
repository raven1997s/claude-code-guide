# REQ-UI.1: 设计系统基础 (Design Tokens)

> **需求ID**: REQ-UI.1
> **状态**: 🟢 已定义
> **优先级**: Must Have (Sprint UI 最高优先级)
> **创建时间**: 2026-01-01
> **产品负责人**: PM
> **设计师**: (待确认)

---

## 📋 需求概述

**用户故事**:
> 作为一名前端开发者，我需要一套统一的设计变量系统（Design Tokens），这样整个产品的视觉风格保持一致，维护成本降低，且后续主题切换功能易于实现。

**业务价值**:
- 统一视觉语言，提升品牌一致性
- 降低设计和开发协作成本
- 为深色主题等扩展功能打下基础

---

## 🎨 设计规格

### 1. 色彩系统 (Color System)

#### 主色调 (Primary Colors)
```css
/* Indigo 主题色 */
--color-primary-50: #eef2ff;
--color-primary-100: #e0e7ff;
--color-primary-200: #c7d2fe;
--color-primary-300: #a5b4fc;
--color-primary-400: #818cf8;
--color-primary-500: #6366f1;  /* 主色 */
--color-primary-600: #4f46e5;  /* 悬停 */
--color-primary-700: #4338ca;
--color-primary-800: #3730a3;
--color-primary-900: #312e81;
```

#### 语义化颜色 (Semantic Colors)
```css
/* 功能色 */
--color-success: #10b981;       /* 成功、完成 */
--color-warning: #f59e0b;       /* 警告、待处理 */
--color-error: #ef4444;         /* 错误、失败 */
--color-info: #3b82f6;          /* 信息、提示 */
```

#### 中性色 (Neutral Colors - 浅色主题)
```css
/* 背景色 */
--color-bg-base: #ffffff;               /* 主背景 */
--color-bg-secondary: #f8f9fc;          /* 次级背景 */
--color-bg-tertiary: #f1f5f9;           /* 三级背景 */
--color-bg-elevated: #ffffff;           /* 悬浮卡片 */

/* 文字色 */
--color-text-primary: #1a1a2e;          /* 主文字 */
--color-text-secondary: #64748b;        /* 次级文字 */
--color-text-tertiary: #94a3b8;         /* 三级文字 */
--color-text-disabled: #cbd5e1;         /* 禁用文字 */

/* 边框色 */
--color-border-default: rgba(0, 0, 0, 0.08);
--color-border-strong: rgba(0, 0, 0, 0.12);
--color-border-subtle: rgba(0, 0, 0, 0.04);
```

#### 深色主题色彩映射
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
}
```

---

### 2. 间距系统 (Spacing System)

**设计原则**: 基于 4px 基准网格，保证视觉节奏感

```css
/* 间距 Scale */
--spacing-0: 0;
--spacing-1: 4px;    /* 极小间距 */
--spacing-2: 8px;    /* 小间距 */
--spacing-3: 12px;   /* 中小间距 */
--spacing-4: 16px;   /* 中等间距 */
--spacing-5: 20px;   /* 中大间距 */
--spacing-6: 24px;   /* 大间距 */
--spacing-8: 32px;   /* 超大间距 */
--spacing-10: 40px;  /* 特大间距 */
--spacing-12: 48px;  /* 极大间距 */
--spacing-16: 64px;  /* 巨大间距 */
```

**使用指南**:
- 组件内边距: `var(--spacing-4)` ~ `var(--spacing-6)`
- 卡片间距: `var(--spacing-6)` ~ `var(--spacing-8)`
- 区块间距: `var(--spacing-8)` ~ `var(--spacing-12)`

---

### 3. 圆角系统 (Border Radius)

```css
--radius-none: 0;
--radius-sm: 8px;      /* 小按钮、标签 */
--radius-md: 12px;     /* 卡片、输入框 */
--radius-lg: 16px;     /* 大卡片、模态框 */
--radius-xl: 20px;     /* 特大圆角 */
--radius-full: 9999px; /* 圆形按钮、头像 */
```

**使用指南**:
- 按钮/标签: `var(--radius-sm)`
- 输入框: `var(--radius-md)`
- 卡片: `var(--radius-md)` 或 `var(--radius-lg)`
- 模态框: `var(--radius-lg)`

---

### 4. 阴影系统 (Box Shadow)

```css
/* 阴影等级 */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);

/* 内阴影 */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.04);

/* 彩色阴影 (强调色) */
--shadow-primary: 0 4px 16px rgba(99, 102, 241, 0.2);
```

**深色主题阴影**:
```css
[data-theme="dark"] {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
}
```

---

### 5. 字体系统 (Typography)

```css
/* 字体族 */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
             sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New',
             monospace;

/* 字号 Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */

/* 字重 */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* 行高 */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

### 6. 动画系统 (Animation)

```css
/* 缓动函数 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* 持续时间 */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

---

## 📁 文件结构

### 创建 Design Tokens 文件
```
web-game-vue/
└── src/
    └── styles/
        ├── design-tokens.css       # Design Tokens 定义
        ├── theme-light.css         # 浅色主题覆盖
        ├── theme-dark.css          # 深色主题覆盖
        └── global.css              # 全局样式
```

### design-tokens.css 示例
```css
:root {
  /* ===== 色彩系统 ===== */
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* 浅色主题默认值 */
  --color-bg-base: #ffffff;
  --color-bg-secondary: #f8f9fc;
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #64748b;

  /* ===== 间距系统 ===== */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* ===== 圆角系统 ===== */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* ===== 阴影系统 ===== */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);

  /* ===== 字体系统 ===== */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Consolas', monospace;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* ===== 动画系统 ===== */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --duration-base: 200ms;
}
```

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: Design Tokens 文件创建
- **Given** 项目根目录存在
- **When** 创建 `src/styles/design-tokens.css` 文件
- **Then** 应该包含所有设计变量定义
- **And** 文件大小 ≤ 10KB
- **And** 变量命名语义化

### AC2: 色彩系统完整性
- **Given** design-tokens.css 文件已创建
- **When** 检查色彩变量
- **Then** 应该包含主色调 (10 个等级)
- **And** 应该包含语义化颜色 (success/warning/error/info)
- **And** 应该包含中性色系统 (背景/文字/边框)
- **And** 应该包含深色主题覆盖

### AC3: 间距系统一致性
- **Given** design-tokens.css 文件已创建
- **When** 检查间距变量
- **Then** 应该基于 4px 基准
- **And** 应该包含 12 个等级 (0 ~ 16)
- **And** 所有间距是 4 的倍数

### AC4: 组件中无硬编码样式
- **Given** 现有组件代码
- **When** 搜索硬编码的颜色/间距
- **Then** 应该找到 0 个硬编码颜色值 (如 #ffffff)
- **And** 应该找到 0 个硬编码间距值 (如 16px)
- **And** 所有样式使用 CSS 变量

### AC5: 主题切换兼容性
- **Given** design-tokens.css 已导入
- **When** 切换 `[data-theme="dark"]` 属性
- **Then** 所有颜色变量应该自动切换
- **And** 间距/圆角/阴影保持一致
- **And** 无需修改组件代码

---

## 🎨 UI/UX 要求

### Empty State
- 不适用 (基础设施)

### Loading State
- 不适用

### Error State
- **场景**: CSS 变量加载失败
- **降级方案**: 提供默认 fallback 值
- **示例**: `color: var(--color-text-primary, #1a1a2e);`

### Success State
- 所有组件正常渲染
- 视觉风格统一

---

## 🔧 技术约束

### 必须使用
- CSS 自定义属性 (CSS Variables)
- `:root` 选择器定义全局变量
- `[data-theme="dark"]` 选择器定义深色主题

### 浏览器兼容性
- Chrome ≥ 71
- Firefox ≥ 65
- Safari ≥ 12.1
- Edge ≥ 79
- **不支持 IE11** (CSS Variables 不兼容)

### 性能要求
- CSS 文件加载时间 ≤ 50ms
- 变量解析延迟 ≤ 10ms
- 主题切换动画 ≥ 60fps

---

## 📊 数据模型

### CSS 变量命名规范
```
--{category}-{property}-{variant}

示例:
--color-primary-500      (色彩-主色-500级)
--spacing-4              (间距-4级)
--radius-md              (圆角-中等)
--shadow-lg              (阴影-大)
--text-lg                (文字-大号)
```

---

## 🚧 依赖项

### 前置需求
- 无 (独立功能)

### 需要协调
- **@设计师**: 确认色彩/间距/圆角是否符合设计规范
- **@前端开发**: 确认 Naive UI 主题定制是否兼容

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **样式一致性** | 未知 | 100% | 所有组件使用 Design Tokens |
| **主题切换速度** | N/A | ≤ 100ms | 切换动画延迟 |
| **维护成本** | 未知 | -50% | 修改主题变量的时间 |

---

## 🔄 迭代计划

### Phase 1: 基础变量 (本次迭代)
- [ ] 创建 design-tokens.css
- [ ] 定义色彩系统
- [ ] 定义间距系统
- [ ] 定义圆角系统
- [ ] 定义阴影系统
- [ ] 定义字体系统

### Phase 2: 主题扩展
- [ ] 创建 theme-dark.css
- [ ] 测试主题切换功能
- [ ] 优化深色主题色彩

### Phase 3: 组件迁移
- [ ] 迁移所有组件使用 Design Tokens
- [ ] 移除硬编码样式
- [ ] 代码审查

---

## 📚 参考资料

### 设计系统参考
- **Material Design 3**: https://m3.material.io/
- **Apple HIG**: https://developer.apple.com/design/human-interface-guidelines/
- **Atlassian Design**: https://atlassian.design/

### CSS Variables 最佳实践
- **MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **CSS Tricks**: https://css-tricks.com/guides/css-custom-properties/

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 请创建 `src/styles/design-tokens.css` 文件