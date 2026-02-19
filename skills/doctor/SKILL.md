---
name: doctor
description: Diagnose and fix kimiplugin installation issues
---

# Doctor Skill

Diagnoses and helps fix kimiplugin installation issues.

## When to Use

- User says "doctor", "diagnose", "fix installation"
- kimiplugin not working
- Setup issues
- Missing components

## Diagnostics

1. **Environment**
   - Node.js version (>= 18)
   - npm/pnpm/yarn availability
   - Platform compatibility

2. **Installation**
   - Package installed globally?
   - Binary in PATH?
   - Version matches?

3. **Configuration**
   - Config directory exists?
   - Prompts installed?
   - Skills installed?
   - AGENTS.md present?

4. **Kimi CLI**
   - Kimi CLI installed?
   - Authentication configured?
   - Working directory correct?

## Fixes

Common issues and fixes:

| Issue | Fix |
|-------|-----|
| Not in PATH | `npm install -g kimiplugin` |
| Missing prompts | `kp setup --force` |
| Corrupted config | Remove `~/.kimi/config.json`, re-run setup |
| Old version | `npm update -g kimiplugin` |

## Output

```
## Diagnosis Results

### Checks
- [✓/✗] Check name: result

### Issues Found
[Description of problems]

### Recommended Fixes
[Step-by-step solutions]

### Verification
[How to confirm fixed]
```

## Usage

Simply run: `kp doctor`
Or ask: "doctor check my installation"
