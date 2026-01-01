---
description: 生成游戏关卡配置数据
---

# 游戏关卡生成器

快速生成符合 `game-data.js` 结构的关卡配置 JSON。

## 使用方法

描述关卡的主题和教学目标：
```
生成一个关于 "Git Branch" 的关卡，教用户如何创建和切换分支。
```

## 关卡数据模板

```javascript
{
  id: "level-x",
  title: "关卡标题",
  description: "简短描述关卡的主要学习内容。",
  task: "具体的任务指令，告诉用户要做什么。",
  
  // 初始终端输出
  initialOutput: [
    { type: "text", content: "欢迎来到新关卡！" },
    { type: "info", content: "本关卡将学习..." }
  ],
  
  // 验证逻辑
  validation: (input, state) => {
    // 检查用户输入
    const cmd = input.trim().toLowerCase();
    
    // 成功条件
    if (cmd === 'expected-command') {
      return {
        success: true,
        message: "太棒了！你已经掌握了...",
        output: [
          { type: "success", content: "操作成功！" },
          { type: "text", content: "详细的执行结果..." }
        ]
      };
    }
    
    // 常见错误提示（Hint System）
    if (cmd.startsWith('wrong')) {
      return {
        success: false,
        message: "尝试使用...",
        hint: "提示：你可以查看帮助文档..."
      };
    }
    
    return { success: false, message: "命令无法识别，请重试。" };
  },
  
  // 提示列表
  hints: [
    "第一个提示：尝试输入...",
    "第二个提示：命令格式是..."
  ],
  
  // 解锁成就（可选）
  achievement: "branch-master"
}
```

## 常用验证模式

### 1. 简单的命令匹配
```javascript
if (cmd === 'git status') { ... }
```

### 2. 正则表达式匹配
```javascript
if (/^git commit -m ".+"$/.test(cmd)) { ... }
```

### 3. 多步骤状态检查
```javascript
// 需要配合 state 管理
if (cmd === 'git add .') {
  state.staged = true;
  return { success: false, message: "文件已暂存，现在提交它..." };
}
if (cmd.startsWith('git commit') && state.staged) {
  return { success: true, ... };
}
```
