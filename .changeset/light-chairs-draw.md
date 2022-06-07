---
'@rainbow-me/create-rainbowkit': patch
---

Fix npm user agent detection

We try to detect the package manager being used for the init/create script but we were failing to detect npm correctly, instead falling through to using `pnpm`, `yarn` or `npm` (in that order) depending on availability. The logic for detecting npm has now been fixed.
