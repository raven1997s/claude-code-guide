---
description: 生成配色方案和 CSS 变量
---

# 配色方案生成器

基于主色生成完整的配色系统。

## 当前项目配色

**主色**: Indigo (#6366f1)

### 已定义色彩 (design-tokens.css)

```css
/* 主色调 */
--color-primary-50: #eef2ff;
--color-primary-100: #e0e7ff;
--color-primary-200: #c7d2fe;
--color-primary-300: #a5b4fc;
--color-primary-400: #818cf8;
--color-primary-500: #6366f1;  /* 基准色 */
--color-primary-600: #4f46e5;
--color-primary-700: #4338ca;
--color-primary-800: #3730a3;
--color-primary-900: #312e81;

/* 语义化颜色 */
--color-success: #10b981;  /* 绿色 - 成功 */
--color-warning: #f59e0b;  /* 橙色 - 警告 */
--color-error: #ef4444;    /* 红色 - 错误 */
--color-info: #3b82f6;     /* 蓝色 - 信息 */
```

## 生成新配色

如需添加新的配色方案，告诉我：

```
生成配色方案：基于 #6366f1 (Indigo)
- 生成 10 级色阶 (50-900)
- 生成亮色/暗色模式变体
- 生成语义化颜色 (success/warning/error)
```

## 常用配色工具

1. **Tailwind CSS Colors**: https://tailwindcss.com/docs/customizing-colors
2. **Coolors**: https://coolors.co/generate
3. **Color Hunt**: https://colorhunt.co/

## 对比度检查

确保文字/背景对比度符合 WCAG 2.1 AA 标准：
- 普通文字: 4.5:1
- 大文字: 3:1

在线工具: https://webaim.org/resources/contrastchecker/
