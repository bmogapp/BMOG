---
name: test
description: Detect the test framework, run the relevant tests, and parse failures.
  Use when user says "test", "run tests", or after changing code that has coverage.
allowed-tools: Read, Glob, Bash(npx jest *), Bash(npm test *)
---

1. Detect test framework from package.json (jest by default for this project)
2. If specific files changed, run their corresponding test files first
3. Otherwise run the full suite: `npx jest`
4. Parse failures: file, test name, expected vs actual
5. Do not attempt fixes unless asked — report findings first

Output: pass/fail count, then a list of failures with file:line
Summary: "X passed, Y failed" or "All tests passed"
