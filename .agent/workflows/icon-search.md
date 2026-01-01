---
description: 快速搜索和使用图标
---

# 图标搜索指南

当前项目使用 `@vicons/fa` (Font Awesome) 图标库。

## 已安装图标库

```javascript
import { IconName } from '@vicons/fa'
```

## 常用图标分类

### 导航类
- `Home` - 首页
- `Search` - 搜索
- `Book` - 文档
- `Gamepad` - 游戏
- `Terminal` - 终端
- `ArrowLeft/Right` - 箭头

### 操作类
- `Check` - 确认/完成
- `Times` - 关闭/取消
- `Plus` - 添加
- `Copy` - 复制
- `Edit` - 编辑
- `Trash` - 删除

### 状态类
- `CheckCircle` - 成功
- `ExclamationTriangle` - 警告
- `TimesCircle` - 错误
- `InfoCircle` - 信息
- `QuestionCircle` - 帮助
- `Spinner` - 加载中

### 主题类
- `Sun` - 浅色模式
- `Moon` - 深色模式

### 游戏类
- `Trophy` - 奖杯
- `Star` - 星星
- `Medal` - 奖章
- `Bolt` - 闪电
- `Fire` - 火焰
- `Lock` / `LockOpen` - 锁定/解锁

## 使用示例

```vue
<script setup>
import { NIcon } from 'naive-ui'
import { Home, Search, Terminal } from '@vicons/fa'
</script>

<template>
  <n-icon :component="Home" size="24" />
</template>
```

## 搜索更多图标

访问 Font Awesome 官网查找图标名称：
https://fontawesome.com/icons

注意：@vicons/fa 使用 PascalCase 命名，如 `chevron-right` → `ChevronRight`
