---
name: ultrawork
description: Maximum parallelism with parallel agent orchestration
---

# Ultrawork Skill

Maximum throughput execution using aggressive parallelization.

## When to Use

- User says "ultrawork", "ulw", "maximum parallel", "full parallel"
- Many independent tasks
- Need fastest possible completion
- Resources available for parallel work

## When NOT to Use

- Tasks have dependencies
- Limited compute resources
- Need careful sequential validation

## Strategy

1. **Identify all tasks**: List everything that needs doing
2. **Group by independence**: Cluster tasks with no dependencies
3. **Maximize parallel groups**: Run as many concurrently as possible
4. **Monitor progress**: Track completion of each group
5. **Handle failures**: Retry failed tasks
6. **Consolidate results**: Merge all outputs

## Parallelization Limits

- Max 6 concurrent child agents
- Group tasks by type for efficiency
- Monitor system resources

## Output Format

```
## Ultrawork Execution

### Task Groups
Group 1: [tasks] - [status]
Group 2: [tasks] - [status]
...

### Results
- Task 1: [result]
- Task 2: [result]

### Summary
[Total completed, failed, retried]
```

## Example Usage

User: "ultrawork refactor all utility functions"

Result: All utility files refactored in parallel.
