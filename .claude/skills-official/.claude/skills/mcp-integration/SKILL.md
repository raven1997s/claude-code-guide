---
name: MCP Integration
description: This skill should be used when the user asks to "add MCP server", "integrate MCP", "configure MCP in plugin", "set up Model Context Protocol", or discusses MCP server types (SSE, stdio, HTTP, WebSocket).
version: 0.1.0
---

# MCP Integration for Claude Code Plugins

## Overview

Model Context Protocol (MCP) enables Claude Code plugins to integrate with external services and APIs by providing structured tool access.

**Key capabilities:**
- Connect to external services (databases, APIs, file systems)
- Provide 10+ related tools from a single service
- Handle OAuth and complex authentication flows
- Bundle MCP servers with plugins for automatic setup

## MCP Server Configuration Methods

### Method 1: Dedicated .mcp.json (Recommended)

Create `.mcp.json` at plugin root:

```json
{
  "database-tools": {
    "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
    "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
  }
}
```

### Method 2: Inline in plugin.json

Add `mcpServers` field to plugin.json:

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server"
    }
  }
}
```

## MCP Server Types

### stdio (Local Process)
Execute local MCP servers as child processes.

```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
  }
}
```

### SSE (Server-Sent Events)
Connect to hosted MCP servers with OAuth support.

```json
{
  "asana": {
    "type": "sse",
    "url": "https://mcp.asana.com/sse"
  }
}
```

### HTTP (REST API)
Connect to RESTful MCP servers with token authentication.

```json
{
  "api-service": {
    "type": "http",
    "url": "https://api.example.com/mcp",
    "headers": {
      "Authorization": "Bearer ${API_TOKEN}"
    }
  }
}
```

## Best Practices

DO:
- Use ${CLAUDE_PLUGIN_ROOT} for portable paths
- Document required environment variables
- Use secure connections (HTTPS/WSS)

DON'T:
- Hardcode absolute paths
- Commit credentials to git
- Use HTTP instead of HTTPS
