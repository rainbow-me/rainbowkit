---
'@rainbow-me/rainbowkit': patch
---

All wallet and chain icons are now included within the RainbowKit package.

In order to improve image loading performance and eliminate the dependency on remote URLs, all built-in wallet and chain icons are now included within the RainbowKit package itself as Base64 data URLs. Since this would typically have a negative impact on bundle size, all image loading is done via dynamic imports and deferred until after app hydration.
