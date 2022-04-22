---
'@rainbow-me/rainbowkit': patch
---

Update `RainbowKitChain` API.

Note that this only affects consumers that have customized chain metadata. All built-in chains have been updated to use the new API.

- The `iconUrl` property now optionally accepts an async function that returns a string (`() => Promise<string>`). This is to support bundling lazy-loadable Base64 images in JavaScript when publishing to npm. All built-in chains are now using this feature to delay loading of images until after app hydration.
- The `iconBackground` property has been added to improve the visual appearance of chain icons while loading.
