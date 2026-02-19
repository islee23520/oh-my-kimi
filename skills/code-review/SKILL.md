---
name: code-review
description: Run a comprehensive code review
---

# Code Review Skill

Performs a thorough multi-perspective code review.

## When to Use

- User says "review code", "code review"
- Before merging significant changes
- After major refactoring
- For security-critical code

## Review Process

1. **Style Review**
   - Naming conventions
   - Code formatting
   - Idiomatic patterns

2. **Quality Review**
   - Logic correctness
   - Edge cases
   - Error handling
   - Maintainability

3. **Security Review**
   - Input validation
   - Injection risks
   - Auth/authz
   - Secrets handling

4. **Performance Review**
   - Algorithmic complexity
   - Resource usage
   - Potential bottlenecks

## Output

```
## Code Review Summary
[Overall recommendation: Approve / Request Changes]

## Critical Issues
[MUST fix]

## Warnings
[Should fix]

## Suggestions
[Nice to have]

## Positive Aspects
[What's done well]
```

## Execution

Run reviews in parallel where possible:
- Style + Quality (quick)
- Security (thorough)
- Performance (if needed)

Consolidate findings into unified report.
