---
name: security-review
description: Run a comprehensive security review
---

# Security Review Skill

Performs a focused security audit of the codebase.

## When to Use

- User says "security review", "security audit"
- Handling sensitive data
- Authentication/authorization code
- Before production deployment

## Security Checklist

### Input Handling
- [ ] All inputs validated
- [ ] Type checking enforced
- [ ] Sanitization applied

### Injection Prevention
- [ ] SQL injection prevented
- [ ] Command injection prevented
- [ ] Path traversal prevented
- [ ] XSS prevented

### Authentication
- [ ] Passwords hashed properly
- [ ] Sessions secure
- [ ] Tokens handled safely
- [ ] MFA considered

### Authorization
- [ ] Access controls enforced
- [ ] Principle of least privilege
- [ ] Privilege escalation prevented

### Data Protection
- [ ] Encryption at rest
- [ ] Encryption in transit
- [ ] Secrets management
- [ ] PII handling

### Dependencies
- [ ] No known vulnerabilities
- [ ] Dependencies necessary
- [ ] Supply chain risks

## Output

```
## Security Assessment
[Risk Level: Critical/High/Medium/Low]

## Critical Vulnerabilities
[Immediate action required]

## Warnings
[Address soon]

## Recommendations
[Security improvements]

## Compliance Notes
[Relevant standards]
```

## References

- OWASP Top 10
- CWE/SANS Top 25
- Industry-specific standards
