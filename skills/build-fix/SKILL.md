---
name: build-fix
description: Fix build and type errors with minimal changes
---

# Build Fix Skill

Systematically resolves build errors and type issues.

## When to Use

- User says "fix build", "type errors", "build errors"
- Compilation is failing
- Type checker reports errors
- CI/CD build broken

## When NOT to Use

- Runtime errors (use debugger)
- Logic bugs (use executor)

## Fix Process

1. **Identify Errors**
   - Run build/type check
   - Capture all error messages
   - Group by error type

2. **Prioritize**
   - Root cause errors first
   - Cascade errors last
   - Group similar errors

3. **Fix Systematically**
   - Fix one error type at a time
   - Verify each fix
   - Re-run build to check

4. **Common Fixes**
   - Missing imports
   - Type mismatches
   - Missing properties
   - Syntax errors
   - Configuration issues

## Verification

After each fix:
```bash
# TypeScript
npx tsc --noEmit

# Build
npm run build
```

## Output

```
## Build Fix Summary

### Errors Found
- [Error type]: [count]

### Fixes Applied
- `file.ts:42`: [what was fixed]

### Verification
[Build status after fixes]
```

## Limits

- Max 10 fix cycles
- If stuck, escalate with:
  - Error messages
  - What was tried
  - Current state
