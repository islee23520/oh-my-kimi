---
name: team
description: N coordinated agents on shared task list
---

# Team Skill

Spawns parallel workers to tackle tasks concurrently.

## When to Use

- User says "team", "swarm", "parallel", "coordinated team"
- Multiple independent tasks
- Need to work on different parts simultaneously
- Time-critical execution

## When NOT to Use

- Single sequential task
- Tasks have tight dependencies
- Simple quick task

## Usage

```bash
omk team [ralph] <N>:<agent-type> "<task description>"
```

Examples:
- `omk team 3:executor "find and fix bugs"`
- `omk team ralph 2:architect "design API"`

## How It Works

1. **Parse args**: Extract worker count, agent type, task
2. **Create state**: Set up team directory structure
3. **Divide work**: Split task into subtasks
4. **Spawn workers**: Each worker gets a subtask
5. **Coordinate**: Workers report progress
6. **Complete**: Collect results

## Team Structure

```
.kimiplugin/state/team/{team-name}/
├── config.json       # Team configuration
├── workers/
│   ├── worker-0/
│   │   ├── config.json   # Worker task
│   │   └── result.json   # Worker output
│   └── worker-1/
│       └── ...
```

## Commands

- `omk team 3:executor "task"` - Start team
- `omk team status <name>` - Check status
- `omk team shutdown <name>` - Stop team

## Best Practices

- Divide tasks clearly
- Minimize dependencies between workers
- Define clear success criteria
- Use appropriate agent types
