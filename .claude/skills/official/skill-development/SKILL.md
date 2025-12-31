---
name: Skill Development
description: This skill should be used when the user wants to "create a skill", "add a skill to plugin", "write a new skill", "improve skill description", or needs guidance on skill structure.
version: 0.1.0
---

# Skill Development for Claude Code Plugins

## About Skills

Skills are modular, self-contained packages that extend Claude's capabilities by providing specialized knowledge, workflows, and tools.

### What Skills Provide

1. Specialized workflows - Multi-step procedures for specific domains
2. Tool integrations - Instructions for working with specific file formats
3. Domain expertise - Company-specific knowledge, schemas, business logic
4. Bundled resources - Scripts, references, and assets

### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/          - Executable code
    ├── references/       - Documentation
    └── assets/           - Templates, images
```

## Skill Creation Process

### Step 1: Understanding with Concrete Examples

Identify concrete examples of how the skill will be used:
- What functionality should the skill support?
- What would users say that should trigger this skill?

### Step 2: Planning Reusable Contents

Analyze each example to identify:
- Scripts needed for repeated code
- References needed for documentation
- Assets needed for templates

### Step 3: Create Skill Structure

```bash
mkdir -p plugin-name/skills/skill-name/{references,examples,scripts}
touch plugin-name/skills/skill-name/SKILL.md
```

### Step 4: Edit the Skill

**Writing Style:** Use imperative/infinitive form (verb-first), not second person.

**Description (Frontmatter):** Use third-person with specific trigger phrases:
```yaml
---
name: Skill Name
description: This skill should be used when the user asks to "specific phrase 1", "specific phrase 2"
version: 0.1.0
---
```

**Keep SKILL.md lean:** Target 1,500-2,000 words. Move detailed content to references/.

### Step 5: Validate and Test

- Check structure: Skill directory with SKILL.md
- Validate frontmatter: Has name and description
- Check trigger phrases: Description includes specific user queries
- Verify writing style: Uses imperative form
- Test progressive disclosure: SKILL.md is lean

### Step 6: Iterate

Use the skill on real tasks and improve based on performance.

## Progressive Disclosure

### What Goes in SKILL.md
- Core concepts and overview
- Essential procedures and workflows
- Quick reference tables
- Keep under 3,000 words

### What Goes in references/
- Detailed patterns and advanced techniques
- Comprehensive API documentation
- Migration guides
- Edge cases and troubleshooting

## Best Practices

DO:
- Use third-person in description
- Include specific trigger phrases
- Keep SKILL.md lean
- Use progressive disclosure
- Write in imperative form
- Reference supporting files

DON'T:
- Use second person anywhere
- Have vague trigger conditions
- Put everything in SKILL.md
- Leave resources unreferenced
