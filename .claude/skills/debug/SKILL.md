---
name: debug
description: React Native debugging workflow. Use when user reports a bug,
  pastes an error message, or mentions "debug", "broken", "not working".
allowed-tools: Read, Grep, Glob, Bash(git log *), Bash(git diff *)
---

1. Gather evidence: exact error message, stack trace, steps to reproduce
2. Grep for the entry point (component, route, or service named in the error)
3. Trace from the symptom backward — bottom-up — to find the root cause
4. Check recent git history on the affected file for relevant changes
5. Propose the minimal fix; don't refactor unrelated code while debugging

Summary: root cause, file:line, and proposed fix
