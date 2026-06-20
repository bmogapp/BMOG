---
name: pr
description: Push the current branch and open a pull request. Use when user says
  "create a PR", "open a PR", or "push this".
allowed-tools: Read, Bash(git *), Bash(gh pr create *)
---

1. Run `git status` and `git log` to confirm branch state and commits to include
2. Push the current branch (ask before pushing if not already confirmed)
3. Create the PR with `gh pr create` using a HEREDOC body:

   ## Summary
   - bullet points of what changed and why

   ## Test plan
   - checklist of how this was verified

4. Return the PR URL
