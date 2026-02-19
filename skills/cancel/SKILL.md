---
name: cancel
description: Cancel any active execution modes
---

# Cancel Skill

Stops active execution modes and cleans up state.

## When to Use

- User says "cancel", "stop", "abort"
- Task is complete (cleanup)
- Work is blocked and cannot proceed
- Need to start fresh

## When NOT to Use

- Work is still in progress and viable
- Just need to pause (use interrupt)

## Actions

1. **Stop active modes**: Set `active: false` on all mode states
2. **Clean up state**: Archive completed work
3. **Release resources**: Stop any background processes
4. **Report status**: What was cancelled

## State Cleanup

For each active mode:
- Read state file
- Set `active: false`
- Set `cancelled_at: <timestamp>`
- Write updated state

## Output

```
Cancelled modes:
- autopilot: [phase] - [items completed]
- ralph: [iteration] - [items completed]
```

## Recovery

After cancel:
- Review `.kimiplugin/state/` for partial results
- Can resume from checomkoint if needed
- Or start fresh with new plan
