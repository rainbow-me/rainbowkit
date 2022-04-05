---
'@rainbow-me/rainbowkit': patch
---

Update `Wallet` API.

Note that this only affects consumers that have created custom wallets. All built-in wallets have been updated to use the new API.

- The `iconUrl` property now optionally accepts an async function that returns a string (`() => Promise<string>`). This is to support bundling lazy-loadable Base64 images in JavaScript when publishing to npm. All built-in wallets are now using this feature to delay loading of images until after app hydration.
- The `iconBackground` property has been added to improve the visual appearance of wallet icons while loading.
- The `createConnector().qrCode.iconUrl` property has been removed in order to simplify the API and the QR code UI logic since none of the built-in wallets made use of it, but it may be reintroduced in the future if deemed necessary.
