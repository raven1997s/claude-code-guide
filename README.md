# Claude Code CLI 完全学习指南

> 从零开始掌握 Claude Code 命令行工具

## 简介

[Claude Code](https://claude.ai/code) 是 Anthropic 官方提供的命令行工具，让你直接在终端中使用 Claude 进行代码编写、调试、文件操作等。

## 快速开始

### 安装

```bash
# macOS
brew install --cask claude-code

# Linux
curl -fsSL https://claude.ai/install.sh | bash

# npm
npm install -g @anthropic-ai/claude-code
```

### 启动

```bash
# 交互式会话
claude

# 直接提问
claude "解释这段代码"

# 打印模式（非交互）
claude -p "列出当前目录文件"
```

## 在线学习工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **Web 学习游戏** | Vue 3 互动学习游戏，25 个关卡 | [web-game-vue/](web-game-vue/) |
| 速查表 | 快速参考指南 | [cheatsheet/](cheatsheet/) |

## 文档目录

| 章节 | 描述 |
|------|------|
| [CLI 参数](docs/cli-arguments.md) | 命令行启动参数完整参考 |
| [内置命令](docs/commands/README.md) | 斜杠命令（/help, /clear 等） |
| [文件引用语法](docs/file-references.md) | @文件 和 #选择 语法 |
| [MCP 服务器](docs/mcp.md) | MCP 配置和管理 |
| [插件系统](docs/plugins.md) | 插件安装和管理 |
| [配置文件](docs/configuration.md) | settings.json 配置 |
| [Hooks](docs/hooks.md) | 事件钩子详解 |
| [Skills](docs/skills.md) | 自定义 Skill 创建 |

## 常用命令速查

```bash
# 基础操作
claude                    # 启动交互式会话
claude -p "prompt"        # 非交互式提问
claude -c                 # 继续上次对话
claude -r                 # 恢复会话

# 会话管理
claude --model sonnet     # 指定模型
claude --agent reviewer   # 使用特定 Agent
claude --resume session-id # 恢复特定会话

# MCP 管理
claude mcp list           # 列出 MCP 服务器
claude mcp add name ...   # 添加 MCP 服务器
claude mcp remove name    # 删除 MCP 服务器

# 插件管理
claude plugin list        # 列出插件
claude plugin install xxx # 安装插件
claude plugin uninstall xxx # 卸载插件
```

## 会话内命令

在 Claude Code 交互式会话中，可以使用以下命令：

| 命令 | 功能 |
|------|------|
| `/help` | 显示帮助信息 |
| `/clear` | 清除当前对话上下文 |
| `/commit` | 创建 Git 提交 |
| `/tasks` | 查看任务列表 |
| `/exit` 或 `Ctrl+D` | 退出会话 |

## 项目结构

```
learn_claude/
├── README.md              # 本文件
├── web-game-vue/          # Vue 3 互动学习游戏（推荐）
│   ├── src/               # 源代码
│   ├── package.json       # 依赖配置
│   └── vite.config.js     # Vite 配置
├── web-game/              # 原版游戏（已废弃）
│   └── DEPRECATED.md      # 废弃说明
├── docs/                  # 详细文档
│   ├── cli-arguments.md   # CLI 参数参考
│   ├── commands/          # 内置命令文档
│   ├── features/          # 功能详解
│   ├── guides/            # 使用指南
│   ├── file-references.md # 文件引用语法
│   ├── mcp.md             # MCP 服务器
│   ├── plugins.md         # 插件系统
│   ├── configuration.md   # 配置文件
│   ├── hooks.md           # Hooks 详解
│   └── skills.md          # Skills 创建
├── examples/              # 实用示例
├── cheatsheet/            # 速查表
└── .claude/               # Claude Code 配置示例
    ├── settings.json      # 项目设置
    ├── skills/            # 自定义 Skills
    ├── agents/            # 自定义 Agents
    └── hooks/             # 自定义 Hooks
```

## 核心概念

### 文件引用

```bash
# 引用单个文件
@src/main.py 解释这个文件

# 引用多个文件
@src/main.py @src/utils.py 它们如何协作

# 选择特定行
@src/main.py:15-30 这段代码做什么

# 使用 IDE 选择
# 先在 IDE 中选中代码，然后问：
解释 #selection 是什么意思
```

### 工具权限

Claude Code 在执行危险操作前会请求权限：

- `Bash` - 运行 shell 命令
- `Write` - 创建新文件
- `Edit` - 修改现有文件
- `Network` - 网络请求

### 模型选择

```bash
# 使用别名
claude --model sonnet   # Claude 3.5 Sonnet
claude --model opus     # Claude 3 Opus
claude --model haiku    # Claude 3.5 Haiku

# 使用完整名称
claude --model claude-sonnet-4-5-20250929
```

## 参考资源

- [官方文档](https://code.claude.com/docs)
- [GitHub](https://github.com/anthropics/claude-code)
- [发布页面](https://github.com/anthropics/claude-code/releases)

## 许可证

本项目文档采用 MIT 许可证。
