---
name: Plugin Settings
description: This skill should be used when the user asks about "plugin settings", "store plugin configuration", "user-configurable plugin", ".local.md files", "plugin state files", or wants to make plugin behavior configurable.
version: 0.1.0
---

# Plugin Settings Pattern for Claude Code Plugins

## Overview

Plugins can store user-configurable settings and state in `.claude/plugin-name.local.md` files within the project directory.

**Key characteristics:**
- File location: `.claude/plugin-name.local.md` in project root
- Structure: YAML frontmatter + markdown body
- Purpose: Per-project plugin configuration and state
- Lifecycle: User-managed (not in git, should be in `.gitignore`)

## File Structure

### Basic Template

```markdown
---
enabled: true
setting1: value1
setting2: value2
numeric_setting: 42
list_setting: ["item1", "item2"]
---

# Additional Context

This markdown body can contain:
- Task descriptions
- Additional instructions
- Prompts to feed back to Claude
```

## Reading Settings Files

### From Hooks (Bash Scripts)

```bash
#!/bin/bash
STATE_FILE=".claude/my-plugin.local.md"

# Quick exit if file doesn't exist
if [[ ! -f "$STATE_FILE" ]]; then
  exit 0  # Plugin not configured, skip
fi

# Parse YAML frontmatter
FRONTMATTER=$(sed -n '/^---$/,/^---$/{ /^---$/d; p; }' "$STATE_FILE")

# Extract individual fields
ENABLED=$(echo "$FRONTMATTER" | grep '^enabled:' | sed 's/enabled: *//')

if [[ "$ENABLED" != "true" ]]; then
  exit 0  # Disabled
fi
```

### From Commands

Commands can read settings files to customize behavior.

### From Agents

Agents can reference settings in their instructions.

## Best Practices

### File Naming
- Use `.claude/plugin-name.local.md` format
- Match plugin name exactly
- Use `.local.md` suffix for user-local files

### Gitignore
Always add to `.gitignore`:
```gitignore
.claude/*.local.md
.claude/*.local.json
```

### Defaults
Provide sensible defaults when settings file doesn't exist.

### Restart Requirement
Settings changes require Claude Code restart. Document this in README.
