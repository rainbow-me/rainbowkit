---
'@rainbow-me/rainbowkit': patch
---

Fix the `@rainbow-me/rainbowkit/styles.css` import for tooling that doesn't support the `exports` field in `package.json`.

Some older build/test tools have issues when importing RainbowKit styles due to lack of support for the `exports` field, which we previously used to publicly alias `@rainbow-me/rainbowkit/dist/index.css` as `@rainbow-me/rainbowkit/styles.css`.

To fix this, we now copy the CSS file into the root of the package as part of our build process so that it can be imported without an alias.
