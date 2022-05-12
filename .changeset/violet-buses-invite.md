---
'@rainbow-me/rainbowkit': patch
---

Increase specificity of RainbowKit styles to avoid app styles overriding them

In order to avoid issues with CSS ordering and specificity, we've prepended a data attribute selector to all styles in RainbowKit. This ensures that low-specificity styles like CSS resets won't override RainbowKit styles if they're applied later in the document.
