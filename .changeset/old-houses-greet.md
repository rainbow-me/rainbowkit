---
'@rainbow-me/create-rainbowkit': patch
---

Fix install step in Yarn

The `install` command for `@rainbow-me/create-rainbowkit` was failing when using `yarn create` because Yarn uses `add` instead of `install`, so we now use the correct command when Yarn is detected.
