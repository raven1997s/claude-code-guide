---
name: claude-opus-4-5-migration
description: Migrate prompts and code from Claude Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5. Use when the user wants to update their codebase, prompts, or API calls to use Opus 4.5. Handles model string updates and prompt adjustments for known Opus 4.5 behavioral differences. Does NOT migrate Haiku 4.5.
---

# Opus 4.5 Migration Guide

One-shot migration from Sonnet 4.0, Sonnet 4.5, or Opus 4.1 to Opus 4.5.

## Migration Workflow

1. Search codebase for model strings and API calls
2. Update model strings to Opus 4.5
3. Remove unsupported beta headers
4. Add effort parameter set to "high"
5. Summarize all changes made

## Model String Updates

### Target Model Strings (Opus 4.5)

| Platform | Opus 4.5 Model String |
|----------|----------------------|
| Anthropic API (1P) | `claude-opus-4-5-20251101` |
| AWS Bedrock | `anthropic.claude-opus-4-5-20251101-v1:0` |
| Google Vertex AI | `claude-opus-4-5@20251101` |
| Azure AI Foundry | `claude-opus-4-5-20251101` |

### Source Model Strings to Replace

| Source Model | Anthropic API (1P) | AWS Bedrock | Google Vertex AI |
|--------------|-------------------|-------------|------------------|
| Sonnet 4.0 | `claude-sonnet-4-20250514` | `anthropic.claude-sonnet-4-20250514-v1:0` | `claude-sonnet-4@20250514` |
| Sonnet 4.5 | `claude-sonnet-4-5-20250929` | `anthropic.claude-sonnet-4-5-20250929-v1:0` | `claude-sonnet-4-5@20250929` |
| Opus 4.1 | `claude-opus-4-1-20250422` | `anthropic.claude-opus-4-1-20250422-v1:0` | `claude-opus-4-1@20250422` |

Do NOT migrate Haiku models.
