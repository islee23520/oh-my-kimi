---
name: help
description: Usage guidance for kimiplugin
---

# Help Skill

Provides guidance on using kimiplugin.

## Quick Reference

### Commands
- `omk` - Launch Kimi with context
- `omk setup` - Install prompts, skills, AGENTS.md
- `omk doctor` - Check installation
- `omk team` - Parallel workers
- `omk status` - Show active modes
- `omk cancel` - Cancel active modes

### Agent Prompts
- `/prompts:architect` - Design & analysis
- `/prompts:executor` - Implementation
- `/prompts:planner` - Planning
- `/prompts:debugger` - Bug investigation
- `/prompts:code-reviewer` - Code review
- `/prompts:security-reviewer` - Security audit
- `/prompts:test-engineer` - Testing
- `/prompts:explorer` - Codebase navigation

### Skills
- `$autopilot` - Full autonomous execution
- `$plan` - Strategic planning
- `$team` - Parallel workers
- `$ralph` - Persistent execution
- `$ultrawork` - Maximum parallelism
- `$cancel` - Cancel modes
- `$code-review` - Code review
- `$security-review` - Security audit
- `$build-fix` - Fix build errors
- `$tdd` - Test-driven development

### Project Structure
```
.kimiplugin/
├── state/          # Mode state files
├── plans/          # Planning documents
└── logs/           # Execution logs

~/.kimi/
├── prompts/        # Agent prompts
└── config.json     # Kimi configuration

~/.kimiplugin/
├── skills/         # Workflow skills
└── state/          # Global state
```

## Getting Help

- `omk help` - This help message
- `omk doctor` - Diagnose issues
- Skill files: `~/.kimiplugin/skills/{name}/SKILL.md`

## More Information

See README.md for full documentation.
