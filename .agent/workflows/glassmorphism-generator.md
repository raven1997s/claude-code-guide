---
description: 生成现代磨砂玻璃效果 CSS
---

# 玻璃拟态生成器 (Glassmorphism)

生成用于现代 Web 设计的磨砂玻璃效果 CSS。

## 使用方法

描述你想要的应用场景：
```
生成一个深色主题的玻璃拟态卡片样式，用于弹窗背景。
```

## CSS 模板

```css
.glass-panel {
  /* 核心属性 */
  background: rgba(255, 255, 255, 0.05); /*极其透明的背景*/
  backdrop-filter: blur(16px);           /*磨砂模糊度*/
  -webkit-backdrop-filter: blur(16px);   /*Safari 支持*/
  
  /* 边框与光效 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.15); /*顶部高光*/
  border-left: 1px solid rgba(255, 255, 255, 0.15); /*左侧高光*/
  
  /* 阴影 */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  
  /* 圆角 */
  border-radius: 16px;
}

/* 深色模式变体 */
@media (prefers-color-scheme: dark) {
  .glass-panel {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.05);
  }
}
```

## 参数调整指南

1.  **模糊度 (Blur)**: 
    - 推荐值: `8px` - `24px`
    - 值越大，背景越模糊，文字可读性越好。

2.  **透明度 (Transparency)**:
    - 浅色模式: `rgba(255, 255, 255, 0.4)` ~ `0.8`
    - 深色模式: `rgba(0, 0, 0, 0.2)` ~ `0.6`
    - 越透明背景越清晰，但需注意文字对比度。

3.  **饱和度 (Saturation)**:
    - 为了增加通透感，可以添加 `backdrop-filter: blur(16px) saturate(180%)`。

## 常见应用场景

- **侧边栏 (Sidebar)**
- **模态框 (Modal)**
- **浮动导航栏 (Floating Navbar)**
- **Dashboard 卡片**
