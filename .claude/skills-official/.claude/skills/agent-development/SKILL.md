---
name: Agent Development
description: This skill should be used when the user asks to "create an agent", "add an agent", "write a subagent", "agent frontmatter", "when to use description", "agent examples", "agent tools", "agent colors", "autonomous agent", or needs guidance on agent structure, system prompts, triggering conditions, or agent development best practices for Claude Code plugins.
version: 0.1.0
---

# Agent Development for Claude Code Plugins

## Overview

Agents are autonomous subprocesses that handle complex, multi-step tasks independently. Understanding agent structure, triggering conditions, and system prompt design enables creating powerful autonomous capabilities.

**Key concepts:**
- Agents are FOR autonomous work, commands are FOR user-initiated actions
- Markdown file format with YAML frontmatter
- Triggering via description field with examples
- System prompt defines agent behavior
- Model and color customization

## Agent File Structure

### Complete Format

```markdown
---
name: agent-identifier
description: Use this agent when [triggering conditions]. Examples:

<example>
Context: [Situation description]
user: "[User request]"
assistant: "[How assistant should respond and use this agent]"
<commentary>
[Why this agent should be triggered]
</commentary>
</example>

model: inherit
color: blue
tools: ["Read", "Write", "Grep"]
---

You are [agent role description]...
```

## Frontmatter Fields

### name (required)
- Format: lowercase, numbers, hyphens only
- Length: 3-50 characters
- Examples: `code-reviewer`, `test-generator`, `api-docs-writer`

### description (required)
- Defines when Claude should trigger this agent (MOST CRITICAL FIELD)
- Must include triggering conditions and multiple `<example>` blocks
- Format: "Use this agent when [conditions]. Examples: ..."

### model (required)
- `inherit` - Use same model as parent (recommended)
- `sonnet` - Balanced
- `opus` - Most capable, expensive
- `haiku` - Fast, cheap

### color (required)
- Options: `blue`, `cyan`, `green`, `yellow`, `magenta`, `red`

### tools (optional)
- Array of tool names
- Default: all tools if omitted

## Best Practices

DO:
- Include 2-4 concrete examples in description
- Write specific triggering conditions
- Use `inherit` for model unless specific need
- Choose appropriate tools (least privilege)

DON'T:
- Use generic descriptions without examples
- Omit triggering conditions
- Give all agents same color
- Grant unnecessary tool access
