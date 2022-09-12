---
'@rainbow-me/rainbowkit': patch
---

Fix the `@rainbow-me/rainbowkit/styles.css` import for Jest, and other tooling that doesn't support the `exports` field in `package.json`.

Jest currently has issues when importing RainbowKit styles due to lack of support for the `exports` field, which we use to publicly alias `@rainbow-me/rainbowkit/dist/index.css` as `@rainbow-me/rainbowkit/styles.css`. To fix this, we now include a `styles.css` _directory_ in the RainbowKit package containing a `package.json` file whose `main` field points to `"../dist/index.css"`.
