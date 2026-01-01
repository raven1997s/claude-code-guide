---
description: 生成多层细腻柔和的阴影
---

# 层叠阴影生成器 (Layered Shadows)

生成多层叠加的柔和阴影，模拟真实光源，提升界面深度感。

## 使用方法

描述所需的阴影强度和光源方向：
```
生成一个适合大型模态框的柔和阴影，光源来自正上方。
```

## CSS 模板

### 1. 浮起效果 (Elevation Low) - 用于卡片/按钮
```css
.shadow-layered-sm {
  box-shadow:
    0px 0.5px 0.6px hsl(var(--shadow-color) / 0.1),
    0px 1.6px 1.8px -0.8px hsl(var(--shadow-color) / 0.1),
    0px 4px 4.5px -1.7px hsl(var(--shadow-color) / 0.1);
}
```

### 2. 悬浮效果 (Elevation Medium) - 用于 Hover / Dropdown
```css
.shadow-layered-md {
  box-shadow:
    0px 0.6px 0.7px hsl(var(--shadow-color) / 0.11),
    0px 1.8px 2px -0.4px hsl(var(--shadow-color) / 0.11),
    0px 3.4px 3.8px -0.9px hsl(var(--shadow-color) / 0.11),
    0px 6.8px 7.7px -1.3px hsl(var(--shadow-color) / 0.11),
    0px 12.3px 13.9px -1.7px hsl(var(--shadow-color) / 0.11);
}
```

### 3. 模态框效果 (Elevation High) - 用于 Modal / Drawer
```css
.shadow-layered-lg {
  box-shadow:
    0px 0.7px 0.8px hsl(var(--shadow-color) / 0.12),
    0px 2.2px 2.5px -0.3px hsl(var(--shadow-color) / 0.12),
    0px 4.2px 4.7px -0.5px hsl(var(--shadow-color) / 0.12),
    0px 6.9px 7.8px -0.8px hsl(var(--shadow-color) / 0.12),
    0px 11px 12.4px -1px hsl(var(--shadow-color) / 0.12),
    0px 17.1px 19.3px -1.3px hsl(var(--shadow-color) / 0.12),
    0px 25.9px 29.2px -1.5px hsl(var(--shadow-color) / 0.12),
    0px 38.2px 43.1px -1.8px hsl(var(--shadow-color) / 0.12);
}
```

## 配置变量

为了方便适配深色模式，建议定义 CSS 变量：

```css
:root {
  --shadow-color: 220deg 3% 15%; /* 灰黑色阴影 */
}

@media (prefers-color-scheme: dark) {
  :root {
    --shadow-color: 220deg 60% 5%; /* 深色背景下的阴影，通常更深更浓 */
  }
}
```

## 阴影原理

这种技术通过叠加 3-8 层不同偏移和模糊半径的阴影，来模拟真实世界中的光线散射，比单一的 `box-shadow` 看起来更加自然和平滑。
