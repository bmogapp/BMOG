---
name: security
description: Security review focused on payments and auth. Use when user mentions
  "security", or when changes touch TapPay, Supabase Auth, Firebase, or Edge Functions.
allowed-tools: Read, Grep, Glob, Bash(git diff *)
---

Scope the review to the current diff, then check:

1. Injection: raw SQL, unsanitized Supabase RPC params, command injection in Edge Functions
2. Sensitive data: API keys, tokens, or PII logged or hardcoded
3. Dependencies: newly added packages with known CVEs or unpinned versions
4. Config: RLS policies on touched tables, TapPay/Firebase credentials never exposed client-side beyond what's required

Output as checklist grouped by severity: CRITICAL / WARNING / INFO
Summary: "X critical, Y warnings, Z info"
