---
description: CSS 动画代码片段库
---

# CSS 动画代码片段

常用动画效果的代码片段，可直接复制使用。

## 已有动画 (animations.css)

```css
/* 页面切换 */
.page-enter-active / .page-leave-active

/* 元素进入 */
.animate-fade-in-up
.animate-fade-in-scale
.animate-bounce-in

/* 微交互 */
.animate-click      /* 按钮点击 */
.animate-success-pulse
.animate-spin       /* 加载旋转 */
.animate-shake      /* 抖动提示 */

/* Hover 效果 */
.hover-lift         /* 抬升 4px */
.hover-glow         /* 蓝色光晕 */
.hover-scale        /* 缩放 1.02 */
.hover-3d           /* 3D 倾斜 */

/* 渐变动画 */
.animate-gradient   /* 背景渐变流动 */

/* 数字/文字 */
.animate-number-pop /* 数字弹出 */
.animate-checkmark  /* 对勾动画 */
.animate-celebrate  /* 庆祝动画 */
```

## 新增动画片段

### 1. 打字机效果
```css
.typewriter {
  overflow: hidden;
  border-right: 2px solid var(--color-primary-500);
  white-space: nowrap;
  animation: 
    typing 3.5s steps(40, end),
    blink 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  50% { border-color: transparent }
}
```

### 2. 波浪效果
```css
.wave {
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: translateY(0) }
  50% { transform: translateY(-10px) }
}
```

### 3. 心跳效果
```css
.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1) }
  14% { transform: scale(1.15) }
  28% { transform: scale(1) }
  42% { transform: scale(1.15) }
}
```

### 4. 闪烁高亮
```css
.flash {
  animation: flash 1s ease-in-out;
}

@keyframes flash {
  0%, 50%, 100% { opacity: 1 }
  25%, 75% { opacity: 0.5 }
}
```

### 5. 滑入效果
```css
.slide-in-left {
  animation: slideInLeft 0.3s ease-out;
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0 }
  to { transform: translateX(0); opacity: 1 }
}

.slide-in-right {
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0 }
  to { transform: translateX(0); opacity: 1 }
}
```

### 6. 弹性下落
```css
.drop-bounce {
  animation: dropBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes dropBounce {
  0% { transform: translateY(-100px); opacity: 0 }
  60% { transform: translateY(20px) }
  100% { transform: translateY(0); opacity: 1 }
}
```

## 使用方式

1. 直接添加类名：`<div class="animate-fade-in-up">`
2. 复制 @keyframes 到 animations.css
3. 使用 Vue transition 组件
