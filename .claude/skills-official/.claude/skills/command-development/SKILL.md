---
name: Command Development
description: This skill should be used when the user asks to "create a slash command", "add a command", "write a custom command", "define command arguments", "use command frontmatter", "organize commands", or needs guidance on slash command structure, YAML frontmatter fields, dynamic arguments.
version: 0.2.0
---

# Command Development for Claude Code

## Overview

Slash commands are frequently-used prompts defined as Markdown files that Claude executes during interactive sessions.

**Key concepts:**
- Markdown file format for commands
- YAML frontmatter for configuration
- Dynamic arguments and file references
- Bash execution for context

## Command Locations

**Project commands**: `.claude/commands/` - Shared with team
**Personal commands**: `~/.claude/commands/` - Available everywhere
**Plugin commands**: `plugin-name/commands/` - Bundled with plugins

## File Format

### Basic Structure

```markdown
---
description: Review code for security issues
allowed-tools: Read, Grep, Bash(git:*)
model: sonnet
---

Review this code for security vulnerabilities...
```

## YAML Frontmatter Fields

### description
Brief description shown in `/help` (under 60 characters)

### allowed-tools
Specify which tools command can use
- `Read, Write, Edit` - Specific tools
- `Bash(git:*)` - Bash with git commands only

### model
Specify model for command execution
- `haiku` - Fast, simple commands
- `sonnet` - Standard workflows
- `opus` - Complex analysis

### argument-hint
Document expected arguments for autocomplete
```yaml
argument-hint: [pr-number] [priority] [assignee]
```

## Dynamic Arguments

### Using $ARGUMENTS
```markdown
Fix issue #$ARGUMENTS following our coding standards.
```

### Positional Arguments
```markdown
Review PR #$1 with priority level $2.
```

### File References
```markdown
Review @$1 for code quality and best practices.
```
