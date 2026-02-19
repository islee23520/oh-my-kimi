---
name: ralph
description: Self-referential persistence loop until task completion
---

# Ralph Skill

Persistent execution mode that continues working until the task is complete.

## When to Use

- User says "ralph", "don't stop", "must complete", "keep going"
- Task must be completed regardless of obstacles
- User wants hands-off until completion
- Multiple iterations likely needed

## Core Principle

> Keep working until the task is done. Do not stop for errors, blockers, or fatigue.

## Execution Loop

```
while (task_not_complete && iterations < max) {
  1. Assess current state
  2. Identify next action
  3. Execute action
  4. Verify result
  5. If blocked: find workaround
  6. If error: fix and retry
}
```

## State Management

- Track: `iteration`, `current_phase`, `blockers`, `completed_items`
- Persist: State to `.kimiplugin/state/ralph-state.json`
- Resume: Read state on restart

## Blocker Resolution

When blocked:
1. Analyze the blocker
2. Try 3 different approaches
3. If still blocked: escalate to user with:
   - What was tried
   - Why it failed
   - What input is needed

## Verification

Before claiming completion:
- [ ] All requirements met
- [ ] Tests pass
- [ ] No errors
- [ ] Output verified

## Example Usage

User: "ralph fix all TypeScript errors"

Result: Continues iterating through all errors until none remain.
