---
name: tdd
description: Test-Driven Development enforcement
---

# TDD Skill

Enforces test-first development workflow.

## When to Use

- User says "tdd", "test first", "test-driven"
- Want to ensure test coverage
- Implementing new features
- Refactoring existing code

## TDD Cycle

```
RED -> GREEN -> REFACTOR
```

1. **RED**: Write a failing test
   - Test describes desired behavior
   - Run test to confirm it fails
   - Commit: "Add failing test for [feature]"

2. **GREEN**: Make the test pass
   - Write minimal code to pass
   - Don't worry about quality yet
   - Run test to confirm pass
   - Commit: "Make test pass for [feature]"

3. **REFACTOR**: Clean up
   - Improve code quality
   - Keep tests passing
   - Commit: "Refactor [feature]"

## Rules

- NO production code without failing test
- Write only enough test to fail
- Write only enough code to pass
- Refactor only with passing tests

## Output

```
## TDD Session

### Tests Added
- [test name]: [status]

### Implementation
[What was implemented]

### Refactoring
[What was cleaned up]

### Coverage
[Metrics if available]
```

## Example

User: "tdd implement user registration"

Result: Tests written first, then implementation, then refactoring.
