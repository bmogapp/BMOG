---
name: docs
description: Update JSDoc/docstrings, README, and CHANGELOG for recent changes.
  Use when user says "docs", "document this", or after finishing a feature that's user-facing.
allowed-tools: Read, Edit, Bash(git diff *), Bash(git log *)
---

1. Check the current diff for exported functions/components missing JSDoc
2. Add concise JSDoc only where behavior isn't obvious from the signature
3. Update README.md if setup steps, commands, or architecture changed
4. Append an entry to CHANGELOG.md under "Unreleased" if one exists

Summary: list files touched and what was documented
