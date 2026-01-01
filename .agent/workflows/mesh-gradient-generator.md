---
description: 生成流动的多彩网格渐变背景
---

# 网格渐变生成器 (Mesh Gradient)

生成极具现代感的多彩流动网格渐变背景，无需图片，纯 CSS/SVG 实现。

## 使用方法

描述配色和风格：
```
生成一个赛博朋克风格的网格渐变，包含紫色、霓虹蓝和洋红色。
```

## CSS 模拟方案 (Radial Gradient 叠加)

最轻量的方法是使用多个径向渐变叠加：

```css
.mesh-gradient {
  background-color: #0f172a; /* 底色 */
  background-image: 
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%), 
    radial-gradient(at 0% 50%, hsla(280,30%,25%,1) 0, transparent 50%), 
    radial-gradient(at 100% 50%, hsla(280,30%,25%,1) 0, transparent 50%), 
    radial-gradient(at 0% 100%, hsla(220,30%,25%,1) 0, transparent 50%), 
    radial-gradient(at 100% 100%, hsla(240,30%,25%,1) 0, transparent 50%);
    
  /* 模糊融合 */
  filter: blur(40px) saturate(150%);
  opacity: 0.8;
}
```

## 动画效果 (流动感)

通过关键帧改变 `background-position` 或 `transform` 来创建流动效果：

```css
@keyframes mesh-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.mesh-animated {
  background-size: 200% 200%;
  animation: mesh-flow 15s ease infinite;
}
```

## 应用场景

- **Hero Section 背景**
- **Feature Card 背景**
- **全屏登录页背景**
