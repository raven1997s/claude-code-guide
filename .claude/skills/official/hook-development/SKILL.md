---
name: Hook Development
description: This skill should be used when the user asks to "create a hook", "add a PreToolUse/PostToolUse/Stop hook", "validate tool use", "implement prompt-based hooks", or mentions hook events. Provides comprehensive guidance for creating and implementing Claude Code plugin hooks.
version: 0.1.0
---

# Hook Development for Claude Code Plugins

## Overview

Hooks are event-driven automation scripts that execute in response to Claude Code events.

**Key capabilities:**
- Validate tool calls before execution (PreToolUse)
- React to tool results (PostToolUse)
- Enforce completion standards (Stop, SubagentStop)
- Load project context (SessionStart)

## Hook Types

### Prompt-Based Hooks (Recommended)

Use LLM-driven decision making for context-aware validation:

```json
{
  "type": "prompt",
  "prompt": "Evaluate if this tool use is appropriate: $TOOL_INPUT",
  "timeout": 30
}
```

### Command Hooks

Execute bash commands for deterministic checks:

```json
{
  "type": "command",
  "command": "bash ${CLAUDE_PLUGIN_ROOT}/scripts/validate.sh",
  "timeout": 60
}
```

## Hook Events

### PreToolUse
Execute before any tool runs. Use to approve, deny, or modify tool calls.

### PostToolUse
Execute after tool completes. Use to react to results, provide feedback, or log.

### Stop
Execute when main agent considers stopping. Use to validate completeness.

### SubagentStop
Execute when subagent considers stopping.

### UserPromptSubmit
Execute when user submits a prompt. Use to add context, validate, or block prompts.

### SessionStart
Execute when Claude Code session begins. Use to load context and set environment.

### SessionEnd
Execute when session ends. Use for cleanup, logging, and state preservation.

## Best Practices

DO:
- Use prompt-based hooks for complex logic
- Use ${CLAUDE_PLUGIN_ROOT} for portability
- Validate all inputs in command hooks
- Quote all bash variables

DON'T:
- Use hardcoded paths
- Trust user input without validation
- Create long-running hooks
