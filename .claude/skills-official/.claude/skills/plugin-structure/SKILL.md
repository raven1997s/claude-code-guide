---
name: Plugin Structure
description: This skill should be used when the user asks to "create a plugin", "scaffold a plugin", "understand plugin structure", "organize plugin components", "set up plugin.json", "use ${CLAUDE_PLUGIN_ROOT}", or needs guidance on plugin directory layout.
version: 0.1.0
---

# Plugin Structure for Claude Code

## Overview

Claude Code plugins follow a standardized directory structure with automatic component discovery.

**Key concepts:**
- Conventional directory layout for automatic discovery
- Manifest-driven configuration in `.claude-plugin/plugin.json`
- Component-based organization (commands, agents, skills, hooks)
- Portable path references using `${CLAUDE_PLUGIN_ROOT}`

## Directory Structure

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Required: Plugin manifest
├── commands/                 # Slash commands (.md files)
├── agents/                   # Subagent definitions (.md files)
├── skills/                   # Agent skills (subdirectories)
│   └── skill-name/
│       └── SKILL.md         # Required for each skill
├── hooks/
│   └── hooks.json           # Event handler configuration
├── .mcp.json                # MCP server definitions
└── scripts/                 # Helper scripts and utilities
```

## Plugin Manifest (plugin.json)

The manifest defines plugin metadata. Located at `.claude-plugin/plugin.json`:

### Required Fields

```json
{
  "name": "plugin-name"
}
```

**Name requirements:**
- Use kebab-case format (lowercase with hyphens)
- Must be unique across installed plugins
- Example: `code-review-assistant`, `test-runner`

### Recommended Metadata

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "Brief explanation of plugin purpose",
  "author": {
    "name": "Author Name",
    "email": "author@example.com"
  },
  "homepage": "https://docs.example.com",
  "repository": "https://github.com/user/plugin-name",
  "license": "MIT",
  "keywords": ["testing", "automation"]
}
```

## Component Organization

### Commands
- Location: `commands/` directory
- Format: Markdown files with YAML frontmatter
- Auto-discovery: All `.md` files load automatically

### Agents
- Location: `agents/` directory
- Format: Markdown files with YAML frontmatter
- Auto-discovery: All `.md` files load automatically

### Skills
- Location: `skills/` directory with subdirectories
- Format: Each skill has `SKILL.md` file
- Auto-discovery: All `SKILL.md` files load automatically

### Hooks
- Location: `hooks/hooks.json` or inline in `plugin.json`
- Format: JSON configuration defining event handlers
- Registration: Hooks register automatically when plugin enables

### MCP Servers
- Location: `.mcp.json` at plugin root or inline in `plugin.json`
- Format: JSON configuration for MCP server definitions
- Auto-start: Servers start automatically when plugin enables

## Portable Path References

### ${CLAUDE_PLUGIN_ROOT}

Use `${CLAUDE_PLUGIN_ROOT}` environment variable for all intra-plugin path references:

```json
{
  "command": "bash ${CLAUDE_PLUGIN_ROOT}/scripts/run.sh"
}
```

**Why it matters**: Plugins install in different locations depending on installation method and operating system.

## File Naming Conventions

- **Commands**: kebab-case `.md` files → `code-review.md`
- **Agents**: kebab-case `.md` files → `code-reviewer.md`
- **Skills**: kebab-case directory names → `api-testing/`
- **Scripts**: descriptive kebab-case names → `validate-input.sh`

## Best Practices

DO:
- Use consistent naming across components
- Use descriptive names that indicate purpose
- Always use ${CLAUDE_PLUGIN_ROOT}
- Test on multiple systems
- Document dependencies

DON'T:
- Use hardcoded paths
- Use system-specific features
- Skip testing
