# MCP 服务器管理

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) 让 Claude 能够连接外部服务，扩展其能力。

## 基础命令

```bash
claude mcp [command]
```

### 可用命令

| 命令 | 说明 |
|------|------|
| `list` | 列出所有配置的 MCP 服务器 |
| `add` | 添加新的 MCP 服务器 |
| `remove` | 删除 MCP 服务器 |
| `get` | 获取特定服务器详情 |
| `add-json` | 用 JSON 字符串添加服务器 |
| `add-from-claude-desktop` | 从 Claude Desktop 导入 |
| `reset-project-choices` | 重置项目范围的服务器选择 |
| `serve` | 启动 Claude Code MCP 服务器 |
| `help` | 显示帮助 |

## 列出服务器

```bash
# 列出所有服务器
claude mcp list

# 输出示例
# NAME         TRANSPORT   COMMAND
# filesystem   stdio       python -m mcp_server_filesystem
# weather      http        https://api.weather.com/mcp
# github       sse         https://mcp.github.com/sse
```

## 添加服务器

### HTTP 服务器

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

### SSE 服务器

```bash
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

### stdio 服务器（推荐）

```bash
# 基础用法
claude mcp add --transport stdio airtable -- npx -y airtable-mcp-server

# 带环境变量
claude mcp add --transport stdio filesystem --env ALLOWED_PATHS=/Users/user/projects -- python -m mcp_server_filesystem

# 多个参数和环境变量
claude mcp add --transport stdio myserver \
  --env API_KEY=secret \
  --env DEBUG=true \
  -- python -m my_mcp_server --port 8080
```

### 带标头的服务器

```bash
# HTTP/SSE with headers
claude mcp add --transport http private-api \
  --header "Authorization: Bearer token123" \
  --header "X-Custom-Header: value" \
  https://api.example.com/mcp
```

## add-json - JSON 格式添加

使用 JSON 字符串添加服务器配置：

```bash
# stdio 服务器
claude mcp add-json my-server '{
  "command": "python",
  "args": ["-m", "my_mcp_server"],
  "env": {
    "API_KEY": "secret"
  }
}'

# HTTP 服务器
claude mcp add-json api-server '{
  "type": "http",
  "url": "https://api.example.com/mcp",
  "headers": {
    "Authorization": "Bearer token"
  }
}'

# SSE 服务器
claude mcp add-json sse-server '{
  "type": "sse",
  "url": "https://mcp.example.com/sse"
}'
```

## 删除服务器

```bash
# 删除特定服务器
claude mcp remove filesystem

# 强制删除（即使有依赖）
claude mcp remove --force myserver
```

## 查看服务器详情

```bash
# 获取服务器配置
claude mcp get filesystem

# 输出示例
# {
#   "command": "python",
#   "args": ["-m", "mcp_server_filesystem"],
#   "env": {
#     "ALLOWED_PATHS": "/Users/user"
#   }
# }
```

## 从 Claude Desktop 导入

```bash
# 导入所有 MCP 服务器
claude mcp add-from-claude-desktop

# 覆盖现有配置
claude mcp add-from-claude-desktop --force
```

## 重置项目选择

```bash
# 清除项目的所有批准/拒绝记录
claude mcp reset-project-choices
```

## 启动 MCP 服务器

将 Claude Code 作为 MCP 服务器运行：

```bash
# 启动服务器
claude mcp serve

# 指定端口
claude mcp serve --port 3000

# SSE 模式
claude mcp serve --transport sse

# 指定日志级别
claude mcp serve --log-level debug
```

## 项目级 MCP 配置

### `.mcp.json` 文件

在项目根目录创建 `.mcp.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "python",
      "args": ["-m", "mcp_server_filesystem"],
      "env": {
        "ALLOWED_PATHS": ["./src", "./docs"]
      }
    },
    "database": {
      "command": "node",
      "args": ["./mcp-servers/db-server.js"],
      "env": {
        "DB_URL": "postgresql://localhost/mydb"
      }
    }
  }
}
```

### 用户级配置

`~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "global-server": {
      "command": "python",
      "args": ["-m", "my_global_mcp"]
    }
  }
}
```

## 传输类型对比

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| **stdio** | 标准输入/输出 | 本地进程，最常用 |
| **http** | REST API | 远程服务，无状态 |
| **sse** | Server-Sent Events | 远程服务，需要推送 |
| **sdk** | Python SDK 内部 | 自定义工具，见 Agent SDK |

## 使用 MCP 工具

添加 MCP 服务器后，Claude 可以使用其提供的工具：

```bash
# 启动 Claude Code
claude

# 自动可用 MCP 工具
# mcp__filesystem__read_file
# mcp__filesystem__write_file
# mcp__weather__get_current
# 等等

# 示例对话
> 读取 src/main.py 文件
# Claude 使用 mcp__filesystem__read_file 工具
```

## 常用 MCP 服务器

### 文件系统

```bash
claude mcp add --transport stdio filesystem -- \
  npx -y @modelcontextprotocol/server-filesystem /allowed/path
```

### GitHub

```bash
claude mcp add --transport stdio github -- \
  npx -y @modelcontextprotocol/server-github
```

### PostgreSQL

```bash
claude mcp add --transport stdio postgres -- \
  npx -y @modelcontextprotocol/server-postgres \
  "postgresql://user:pass@localhost:5432/db"
```

### Brave Search

```bash
claude mcp add --transport stdio brave-search -- \
  npx -y @modelcontextprotocol/server-brave-search
```

### Puppeteer (浏览器自动化)

```bash
claude mcp add --transport stdio puppeteer -- \
  npx -y @modelcontextprotocol/server-puppeteer
```

## 配置优先级

1. 命令行 `--mcp-config` (最高)
2. 项目 `.mcp.json`
3. 用户 `~/.claude/mcp.json`
4. Claude Desktop 配置 (导入)

## 调试

```bash
# 启用 MCP 调试
claude --debug mcp

# 查看服务器日志
claude mcp list --verbose

# 测试服务器连接
claude mcp test myserver
```

## 最佳实践

1. **环境变量**：敏感信息通过 `--env` 传递，不要写死在配置中
2. **项目级配置**：项目特定的 MCP 放在 `.mcp.json`
3. **限制权限**：文件系统服务器明确 `ALLOWED_PATHS`
4. **错误处理**：使用 `--debug mcp` 排查问题
5. **版本固定**：生产环境固定 MCP 服务器版本

## 故障排除

### 服务器无法启动

```bash
# 查看详细错误
claude --debug mcp

# 测试服务器命令
python -m my_mcp_server --version
```

### 权限问题

```bash
# 确保可执行权限
chmod +x ./mcp-servers/my-server.sh
```

### 环境变量未生效

```bash
# 检查环境变量传递
claude mcp get myserver

# 确保格式正确
claude mcp add-json myserver '{"command": "python", "env": {"KEY": "value"}}'
```

## 参考资源

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/python-sdk)
- [服务器列表](https://github.com/modelcontextprotocol/servers)
