# Claude Code 速查表

## CLI 启动

```bash
# 基础
claude                              # 启动交互式会话
claude "prompt"                      # 直接提问
claude -p "prompt"                   # 打印模式（非交互）

# 会话管理
claude -c                            # 继续上次对话
claude -r [id]                       # 恢复会话
claude --fork-session                # 恢复时创建新分支

# 模型与 Agent
claude --model sonnet                # 使用 Sonnet 模型
claude --agent reviewer              # 使用特定 Agent
claude --fallback-model haiku        # 设置备用模型

# 权限
claude --permission-mode acceptEdits # 自动接受编辑
```

## 文件引用

```bash
# 文件
@file.py                     # 引用整个文件
@file.py:10-30              # 引用行范围
@src/                       # 引用目录

# 选择器
#selection                  # IDE 选中的文本
#function:main             # 引用函数
#class:User                # 引用类

# 组合
@app.py:50-100 #selection   # 文件 + 选择
```

## 会话内命令

```bash
/help        # 帮助
/clear       # 清除上下文
/commit      # Git 提交
/tasks       # 任务列表
/exit        # 退出
```

## MCP 管理

```bash
claude mcp list                            # 列出服务器
claude mcp add name -- command args        # 添加服务器
claude mcp remove name                     # 删除服务器
claude mcp get name                        # 查看详情
```

## 插件管理

```bash
claude plugin list                         # 列出插件
claude plugin install name                 # 安装插件
claude plugin uninstall name               # 卸载插件
claude plugin enable name                  # 启用插件
claude plugin disable name                 # 禁用插件
claude plugin update --all                 # 更新所有
```

## 常用选项

```bash
# 输出
--output-format json          # JSON 输出
--output-format stream-json   # 流式 JSON

# 调试
--debug                       # 启用调试
--debug api,hooks             # 调试特定模块

# 工具控制
--allowed-tools Read,Write    # 允许的工具
--disallowed-tools Bash       # 禁止的工具

# 其他
--max-budget-usd 1.0          # 限制花费
--no-session-persistence      # 不保存会话
```

## 模型别名

```bash
sonnet    # Claude 3.5 Sonnet
opus      # Claude 3 Opus
haiku     # Claude 3.5 Haiku
```

## 权限模式

```bash
default        # 询问（默认）
acceptEdits    # 自动接受编辑
bypassPermissions # 跳过所有检查
delegate       # 委托模式
dontAsk        # 不询问
plan           # 计划模式
```

## 快捷键

```bash
Ctrl+C    # 中断生成
Ctrl+D    # 退出
Ctrl+L    # 清屏
↑/↓       # 历史命令
Tab       # 自动补全
```

## 配置文件

```bash
~/.claude/settings.json        # 用户设置
.claude/settings.json          # 项目设置
.claude/settings.local.json    # 本地设置（不提交）
.mcp.json                      # MCP 配置
```
