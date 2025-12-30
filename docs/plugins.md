# 插件系统

Claude Code 支持插件系统，通过社区插件扩展功能。

## 基础命令

```bash
claude plugin [command]
```

## 列出插件

```bash
# 列出所有已安装的插件
claude plugin list

# 输出示例
# NAME            VERSION   STATUS    MARKETPLACE
# code-review     1.2.0     enabled   official
# docker-helper   0.5.0     enabled   community
# test-generator  2.0.1     disabled  custom
```

## 安装插件

### 从市场安装

```bash
# 安装插件（自动选择市场）
claude plugin install code-review

# 从指定市场安装
claude plugin install code-review@official
claude plugin install docker-helper@community

# 安装特定版本
claude plugin install code-review@1.2.0

# 安装到项目目录
claude plugin install --project local-plugin

# 安装到用户目录
claude plugin install --user global-plugin
```

### 从本地安装

```bash
# 从本地路径安装
claude plugin install ./my-plugin

# 从 Git 仓库安装
claude plugin install https://github.com/user/claude-plugin.git

# 从特定分支安装
claude plugin install --branch dev https://github.com/user/claude-plugin.git
```

## 卸载插件

```bash
# 卸载插件
claude plugin uninstall code-review

# 卸载项目插件
claude plugin uninstall --project local-plugin

# 卸载用户插件
claude plugin uninstall --user global-plugin

# 强制卸载（忽略依赖）
claude plugin uninstall --force old-plugin
```

## 启用/禁用插件

```bash
# 禁用插件
claude plugin disable test-generator

# 启用插件
claude plugin enable test-generator

# 禁用项目插件
claude plugin disable --project local-plugin

# 禁用用户插件
claude plugin disable --user global-plugin
```

## 更新插件

```bash
# 更新特定插件
claude plugin update code-review

# 更新所有插件
claude plugin update --all

# 更新到特定版本
claude plugin update code-review --version 2.0.0

# 检查可用更新
claude plugin update --check-only
```

## 验证插件

```bash
# 验证插件清单
claude plugin validate ./my-plugin

# 验证市场清单
claude plugin validate https://raw.githubusercontent.com/user/marketplace/main/manifest.json
```

## 市场管理

```bash
# 列出已配置的市场
claude plugin marketplace list

# 添加市场
claude plugin marketplace add https://raw.githubusercontent.com/user/marketplace/main/manifest.json

# 删除市场
claude plugin marketplace remove community-market

# 更新市场索引
claude plugin marketplace update

# 查看市场详情
claude plugin marketplace get official
```

## 插件目录

插件安装在以下位置：

| 类型 | 位置 |
|------|------|
| 用户插件 | `~/.claude/plugins/` |
| 项目插件 | `.claude/plugins/` |
| 临时插件 | `--plugin-dir` 指定 |

## 创建插件

### 插件结构

```
my-plugin/
├── plugin.json          # 插件清单
├── SKILL.md             # 核心逻辑（必需）
├── README.md            # 文档
├── hooks/               # 可选的 Hooks
│   └── post-edit.sh
└── resources/           # 额外资源
    └── templates/
```

### plugin.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "我的 Claude Code 插件",
  "author": "Your Name",
  "homepage": "https://github.com/user/my-plugin",
  "skills": ["SKILL.md"],
  "hooks": {
    "PostToolUse": ["hooks/post-edit.sh"]
  },
  "settings": {
    "enabled": true
  }
}
```

### SKILL.md

```markdown
---
name: my-skill
description: 我的自定义 Skill
allowed-tools: Read, Write, Edit
---

# 我的 Skill

当用户请求 [特定功能] 时，使用这个 Skill。

## 工作流程

1. 首先执行 X
2. 然后执行 Y
3. 最后返回 Z

## 示例

用户：帮我做 X
Claude：[按照上述流程]
```

## 常用插件示例

### 代码审查插件

```bash
claude plugin install code-reviewer
```

功能：
- 自动审查代码改动
- 检查常见问题模式
- 生成审查报告

### Docker 辅助插件

```bash
claude plugin install docker-helper
```

功能：
- 生成 Dockerfile
- 管理 docker-compose
- 容器调试

### 测试生成插件

```bash
claude plugin install test-generator
```

功能：
- 自动生成单元测试
- 生成测试数据
- 覆盖率分析

## 配置插件

### 项目级配置

`.claude/settings.json`:

```json
{
  "plugins": {
    "enabled": ["code-review", "test-generator"],
    "disabled": ["docker-helper"],
    "config": {
      "code-review": {
        "severity": "high",
        "ignorePatterns": ["*.test.js"]
      }
    }
  }
}
```

### 用户级配置

`~/.claude/settings.json`:

```json
{
  "plugins": {
    "marketplaces": [
      "https://claude.com/official-marketplace.json",
      "https://raw.githubusercontent.com/community/marketplace/main/manifest.json"
    ]
  }
}
```

## 插件权限

插件可以请求以下权限：

| 权限 | 说明 |
|------|------|
| `tools` | 访问特定工具 |
| `filesystem` | 访问文件系统 |
| `network` | 网络请求 |
| `mcp` | 使用 MCP 服务器 |

在 `plugin.json` 中声明：

```json
{
  "permissions": {
    "tools": ["Read", "Write", "Bash(git:*)"],
    "filesystem": {
      "allow": ["./src", "./tests"],
      "deny": ["*.env", "*.key"]
    },
    "network": {
      "allow": ["api.github.com"]
    }
  }
}
```

## 发布插件

### 创建市场清单

`marketplace.json`:

```json
{
  "name": "My Marketplace",
  "version": "1.0.0",
  "plugins": [
    {
      "name": "my-plugin",
      "version": "1.0.0",
      "repository": "https://github.com/user/my-plugin",
      "manifest": "https://raw.githubusercontent.com/user/my-plugin/main/plugin.json"
    }
  ]
}
```

### 分享插件

```bash
# 1. 发布到 GitHub
git tag v1.0.0
git push --tags

# 2. 创建 release
gh release create v1.0.0

# 3. 分享市场 URL
# 用户可以执行：
claude plugin marketplace add https://raw.githubusercontent.com/user/marketplace/main/marketplace.json
claude plugin install my-plugin@my-marketplace
```

## 调试插件

```bash
# 启用插件调试
claude --debug plugins

# 查看插件日志
claude plugin list --verbose

# 验证插件
claude plugin validate ./my-plugin

# 测试 Skill
echo "测试提示" | claude -p --plugin-dir ./my-plugin
```

## 最佳实践

1. **命名规范**：使用 `kebab-case` 命名插件
2. **版本控制**：遵循语义化版本
3. **权限最小化**：只请求必要的权限
4. **文档完整**：提供清晰的 README 和示例
5. **错误处理**：优雅处理失败情况
6. **测试**：测试 Skill 的各种场景

## 故障排除

### 插件未生效

```bash
# 检查插件状态
claude plugin list

# 重新启用
claude plugin disable my-plugin
claude plugin enable my-plugin

# 检查配置
cat .claude/settings.json
```

### Skill 未加载

```bash
# 验证 SKILL.md 格式
claude plugin validate ./my-plugin

# 检查 frontmatter
head -10 SKILL.md
```

### 权限错误

```bash
# 检查插件权限
claude plugin get my-plugin

# 更新权限
# 编辑 plugin.json 或 settings.json
```

## 参考资源

- [官方插件市场](https://claude.com/marketplace)
- [社区插件列表](https://github.com/awesome-claude-plugins)
- [插件开发指南](https://code.claude.com/docs/en/plugins)
