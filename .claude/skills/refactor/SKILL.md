---
name: refactor
description: Refactor code safely in small steps. Use when user says "refactor",
  "clean this up", or "simplify" without changing behavior.
allowed-tools: Read, Edit, Grep, Glob, Bash(npx tsc *), Bash(npx jest *)
---

1. Define scope — which files/functions are in play, confirm with user if ambiguous
2. Run existing tests first to establish a passing baseline
3. Make small, incremental changes — one logical change at a time
4. After each step, update all callers/call sites that reference the changed code
5. Re-run type check and tests after each step before moving to the next

Summary: what was refactored and confirmation tests still pass
