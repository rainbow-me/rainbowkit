---
'@rainbow-me/create-rainbowkit': patch
---

Fix crash in Linux/WSL when attempting to rename branch after running `git init`

When scaffolding a new project, we now honor the system default setting rather than forcibly renaming the branch.
