---
name: plan
description: Strategic planning with task decomposition
---

# Plan Skill

Creates detailed, actionable plans for complex tasks.

## When to Use

- User says "plan this", "let's plan", "create a plan"
- Complex multi-step task
- Need to coordinate multiple agents
- Unclear how to approach a problem

## When NOT to Use

- Simple, single-step task
- User wants immediate execution
- Task is already well-defined

## Planning Process

1. **Understand the Goal**
   - Clarify what success looks like
   - Identify constraints
   - Note any deadlines

2. **Assess Current State**
   - What's already done?
   - What resources exist?
   - What's the starting point?

3. **Decompose into Tasks**
   - Break into small, actionable items
   - Size: ideally 30min - 2hr each
   - Make them specific and verifiable

4. **Sequence Tasks**
   - Identify dependencies
   - Find parallelizable work
   - Mark critical path

5. **Identify Risks**
   - What could go wrong?
   - How to mitigate?
   - What needs external input?

6. **Create Output**
   - Write to `.kimiplugin/plans/{plan-name}.md`
   - Include all sections
   - Make it executable

## Output Format

```markdown
# Plan: [Name]

## Goal
[Clear statement]

## Current State
[Starting point]

## Tasks

### Phase 1: [Name]
- [ ] [Task] - [estimated time] - [dependencies]

### Phase 2: [Name]
- [ ] [Task] - [estimated time] - [dependencies]

## Risks
| Risk | Mitigation |
|------|------------|
| ... | ... |

## Success Criteria
[How we'll know it's done]
```

## Example Usage

User: "plan this: build a user authentication system"

Result: Detailed plan with phases for setup, registration, login, sessions, and security.
