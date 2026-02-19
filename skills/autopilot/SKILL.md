---
name: autopilot
description: Full autonomous execution from idea to working code
---

# Autopilot Skill

Autopilot takes a brief product idea and autonomously handles the full lifecycle: requirements analysis, technical design, planning, implementation, QA cycling, and validation.

## When to Use

- User says "autopilot", "auto pilot", "build me", "create me", "make me"
- Task requires multiple phases: planning, coding, testing
- User wants hands-off execution

## When NOT to Use

- Single focused code change (use executor directly)
- Exploration/brainstorming (respond conversationally)
- Quick fix or small bug

## Execution Protocol

1. **Phase 0 - Expansion**: Turn idea into detailed spec
   - Extract requirements
   - Create technical specification
   - Output: `.kimiplugin/plans/autopilot-spec.md`

2. **Phase 1 - Planning**: Create implementation plan
   - Break down tasks
   - Identify dependencies
   - Output: `.kimiplugin/plans/autopilot-impl.md`

3. **Phase 2 - Execution**: Implement the plan
   - Execute tasks in order
   - Handle dependencies
   - Delegate to executor when appropriate

4. **Phase 3 - QA**: Verify quality
   - Run tests
   - Check for errors
   - Fix issues (up to 5 cycles)

5. **Phase 4 - Validation**: Final review
   - Code review
   - Security check
   - Performance review

6. **Phase 5 - Cleanup**: Clear state
   - Mark as complete
   - Clean up state files

## State Management

Track progress via state files:

- On start: `state_write({mode: "autopilot", active: true, current_phase: "expansion"})`
- On phase change: Update `current_phase`
- On complete: `active: false, current_phase: "complete"`
- On cancel: Clear state

## Example Usage

User: "autopilot a REST API for a bookstore with CRUD operations"

Result: Full implementation with models, controllers, routes, and tests.
