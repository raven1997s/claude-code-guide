---
description: 截取页面对比优化前后效果
---

# UI 截图对比

使用浏览器截取页面效果，对比优化前后变化。

## 使用方法

### 1. 启动开发服务器
// turbo
```bash
cd web-game-vue && npm run dev
```

### 2. 截取当前状态
告诉我需要截取的页面：
```
截取首页 Hero 区域，保存为 before_hero.png
```

### 3. 进行优化修改
描述你需要的优化...

### 4. 截取优化后效果
```
截取首页 Hero 区域，保存为 after_hero.png
```

### 5. 生成对比报告
我会将截图添加到 walkthrough.md 中，展示对比效果。

## 常用截图场景

| 场景 | 页面 | URL |
|------|------|-----|
| 首页 Hero | WelcomeView | http://localhost:8000/ |
| 游戏关卡 | GameView | http://localhost:8000/game |
| 搜索结果 | SearchView | http://localhost:8000/search |
| 速查表 | CheatsheetView | http://localhost:8000/cheatsheet |
| VS Code 教程 | VSCodeTutorialView | http://localhost:8000/vscode-tutorial |

## 截图检查点

- [ ] 浅色主题效果
- [ ] 深色主题效果
- [ ] hover 交互状态
- [ ] 移动端响应式 (375px)
- [ ] 平板端响应式 (768px)
