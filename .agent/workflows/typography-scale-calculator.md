---
description: 基于黄金比率生成字体排版系统
---

# 排版比例计算器 (Typography Scale)

生成和谐的字体大小阶梯，建立视觉韵律。

## 使用方法

指定基准字号和比例因子：
```
基准字号 16px，使用完美五度 (1.5) 比例生成 CSS 变量。
```

## 常用比例因子

| 名称 | 比率 | 适用场景 |
|------|------|----------|
| Minor Third | 1.200 | 移动端 / 紧凑型 UI |
| Major Third | 1.250 | 通用 Web 应用 (Bootstrap 默认) |
| Perfect Fourth | 1.333 | 博客 / 文档类 |
| Golden Ratio | 1.618 | 高级展示型 / 艺术类 |

## CSS 输出模板 (Major Third - 1.250)

```css
:root {
  /* 基准字号 */
  --text-base-size: 16px;
  
  /* 比例因子: 1.250 */
  --text-xs:   0.8rem;   /* ~12.8px */
  --text-sm:   0.64rem;  /* ~10.24px (很少用) */
  
  --text-md:   1rem;     /* 16px (Body) */
  --text-lg:   1.25rem;  /* 20px (H6) */
  --text-xl:   1.563rem; /* 25px (H5) */
  --text-2xl:  1.953rem; /* 31.25px (H4) */
  --text-3xl:  2.441rem; /* 39.06px (H3) */
  --text-4xl:  3.052rem; /* 48.83px (H2) */
  --text-5xl:  3.815rem; /* 61.04px (H1) */
}

/* 响应式调整 (Mobile 使用较小比例 1.2) */
@media (max-width: 768px) {
  :root {
    --text-xl:   1.44rem;
    --text-2xl:  1.728rem;
    --text-3xl:  2.074rem;
    --text-4xl:  2.488rem;
    --text-5xl:  2.986rem;
  }
}
```

## 流体排版 (Fluid Typography)

现代方案，使用 `clamp()` 实现平滑缩放：

```css
:root {
  --text-base: clamp(1rem, 0.9vw + 0.8rem, 1.125rem);
  --h1: clamp(2.5rem, 5vw + 1rem, 4.5rem);
}
```
