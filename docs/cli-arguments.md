# CLI 参数完整参考

Claude Code 支持丰富的命令行参数，用于控制会话行为。

## 基础用法

```bash
claude [options] [command] [prompt]
```

## 核心选项

### 启动模式

| 参数 | 简写 | 说明 |
|------|------|------|
| `--print` | `-p` | 打印响应后退出（非交互模式） |
| `--continue` | `-c` | 继续最近的对话 |
| `--resume [id]` | `-r` | 恢复会话，可选指定会话 ID |
| `--fork-session` | | 恢复时创建新会话而非复用原 ID |
| `--no-session-persistence` | | 禁用会话持久化 |
| `--session-id <uuid>` | | 使用指定的会话 ID |

```bash
# 非交互模式
claude -p "列出当前目录文件"

# 继续上次对话
claude -c

# 恢复特定会话
claude -r abc123-def4-5678

# 恢复时创建新分支会话
claude -r --fork-session

# 禁用会话保存（敏感操作）
claude --no-session-persistence -p "删除所有日志"
```

### 模型与 Agent

| 参数 | 说明 |
|------|------|
| `--model <model>` | 指定模型（sonnet/opus/haiku 或完整名称） |
| `--agent <agent>` | 使用特定 Agent |
| `--agents <json>` | 定义自定义 Agents（JSON 格式） |
| `--fallback-model <model>` | 当主模型过载时的备用模型 |
| `--betas <betas...>` | 启用 Beta 功能（API Key 用户） |

```bash
# 使用模型别名
claude --model sonnet
claude --model opus
claude --model haiku

# 使用完整模型名
claude --model claude-sonnet-4-5-20250929

# 使用自定义 Agent
claude --agent reviewer "审查这段代码"

# 定义临时 Agent
claude --agents '{"expert": {"description": "代码专家", "prompt": "你是一位资深工程师"}}' --agent expert

# 设置备用模型
claude --model sonnet --fallback-model haiku
```

### 权限与安全

| 参数 | 说明 |
|------|------|
| `--permission-mode <mode>` | 权限模式 |
| `--dangerously-skip-permissions` | **危险**：跳过所有权限检查 |
| `--allow-dangerously-skip-permissions` | 允许使用跳过权限选项 |

**权限模式：**
- `default` - 默认，询问权限
- `acceptEdits` - 自动接受文件编辑
- `bypassPermissions` - 跳过权限检查（危险）
- `delegate` - 委托模式
- `dontAsk` - 不询问
- `plan` - 计划模式

```bash
# 自动接受编辑（适合开发环境）
claude --permission-mode acceptEdits

# 跳过所有权限检查（仅沙箱环境！）
claude --dangerously-skip-permissions
```

### 工具控制

| 参数 | 说明 |
|------|------|
| `--allowed-tools <tools...>` | 允许的工具列表 |
| `--disallowed-tools <tools...>` | 禁止的工具列表 |
| `--tools <tools...>` | 指定可用工具集 |
| `--add-dir <dirs...>` | 额外允许工具访问的目录 |

```bash
# 只允许读取操作
claude --allowed-tools Read,Glob,Grep

# 禁止 Bash 工具
claude --disallowed-tools Bash

# 自定义工具集
claude --tools "Read,Grep,Bash(git:*)"

# 允许访问其他目录
claude --add-dir /shared/project
```

### 系统提示词

| 参数 | 说明 |
|------|------|
| `--system-prompt <prompt>` | 完全替换系统提示词 |
| `--append-system-prompt <prompt>` | 追加到默认系统提示词 |

```bash
# 设置角色
claude --system-prompt "你是一位 Python 专家，专注于 Django 开发"

# 追加指令
claude --append-system-prompt "所有代码必须包含类型注解"
```

### MCP 服务器

| 参数 | 说明 |
|------|------|
| `--mcp-config <configs...>` | 从 JSON 文件或字符串加载 MCP |
| `--strict-mcp-config` | 只使用指定的 MCP 配置 |

```bash
# 从文件加载
claude --mcp-config .mcp.json

# 从 JSON 字符串加载
claude --mcp-config '{"server": {"command": "python", "args": ["-m", "server"]}}'

# 严格模式（忽略其他 MCP 配置）
claude --strict-mcp-config my-mcp.json
```

### 配置管理

| 参数 | 说明 |
|------|------|
| `--settings <file-or-json>` | 从文件或 JSON 加载额外设置 |
| `--setting-sources <sources>` | 设置来源（user,project,local） |
| `--plugin-dir <paths...>` | 临时加载插件目录 |

```bash
# 从文件加载设置
claude --settings ./custom-settings.json

# 从 JSON 字符串加载
claude --settings '{"allowedTools": ["Read"]}'

# 只加载用户设置
claude --setting-sources user

# 临时加载插件
claude --plugin-dir ./custom-plugins
```

### 输出格式

| 参数 | 说明 |
|------|------|
| `--output-format <format>` | 输出格式（text/json/stream-json） |
| `--input-format <format>` | 输入格式（text/stream-json） |
| `--json-schema <schema>` | JSON Schema 验证 |
| `--include-partial-messages` | 包含部分消息块 |

```bash
# JSON 输出
claude -p "你好" --output-format json

# 流式 JSON
claude -p "分析代码" --output-format stream-json

# 结构化输出
claude -p "获取天气" --json-schema '{"type":"object","properties":{"temp":{"type":"number"}}}'

# 流式输入
echo '{"prompt":"你好"}' | claude --input-format stream-json --output-format stream-json
```

### 调试与日志

| 参数 | 简写 | 说明 |
|------|------|------|
| `--debug [filter]` | `-d` | 启用调试模式，可选过滤 |
| `--verbose` | | 覆盖详细模式设置 |
| `--mcp-debug` | | **已弃用**，使用 --debug |
| `--chrome` | | 启用 Chrome 集成 |
| `--no-chrome` | | 禁用 Chrome 集成 |

```bash
# 启用所有调试
claude --debug

# 只调试 API 和 Hooks
claude --debug api,hooks

# 排除 statsig 和 file
claude --debug "!statsig,!file"
```

### 成本控制

| 参数 | 说明 |
|------|------|
| `--max-budget-usd <amount>` | 最大 API 调用花费（美元） |

```bash
# 限制花费 $1
claude --max-budget-usd 1 -p "分析整个项目"
```

### IDE 集成

| 参数 | 说明 |
|------|------|
| `--ide` | 启动时自动连接 IDE |

```bash
# 自动连接 VSCode
claude --ide
```

### 其他选项

| 参数 | 简写 | 说明 |
|------|------|------|
| `--version` | `-v` | 输出版本号 |
| `--help` | `-h` | 显示帮助 |
| `--disable-slash-commands` | | 禁用所有斜杠命令 |

## 子命令

### mcp - MCP 服务器管理

```bash
claude mcp [options] [command]
```

参见 [MCP 文档](mcp.md)

### plugin - 插件管理

```bash
claude plugin [options] [command]
```

参见 [插件文档](plugins.md)

### 其他子命令

```bash
claude setup-token           # 设置长期认证令牌
claude doctor                # 检查更新器健康状态
claude update                # 检查并安装更新
claude install [target]      # 安装原生构建
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 |
| `CLAUDE_API_KEY` | Claude API 密钥（备用） |
| `PATH` | 查找 claude 可执行文件 |

## 实用示例

### 开发工作流

```bash
# 1. 启动会话，自动接受编辑
claude --permission-mode acceptEdits

# 2. 使用特定模型和 Agent
claude --model sonnet --agent reviewer

# 3. 继续之前的对话
claude -c

# 4. 恢复特定会话并创建分支
claude -r session-id --fork-session
```

### CI/CD 集成

```bash
# 非交互式代码审查
claude -p "审查这个 PR" --output-format json > review.json

# 限制预算的自动化任务
claude --max-budget-usd 0.5 -p "生成文档" --output-format text

# 使用备用模型确保可用性
claude --model sonnet --fallback-model haiku -p "分析代码"
```

### 调试

```bash
# 调试 API 调用
claude --debug api

# 调试 Hooks
claude --debug hooks

# 详细输出
claude --debug --verbose
```
