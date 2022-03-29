---
'@rainbow-me/rainbowkit': patch
---

Update `Wallet` API

Note that this only affects consumers that have created custom wallets. All built-in wallets have been updated to use the new API.

- The `Wallet` type is now an object rather than a function. Static properties (`id`, `name`, etc.) have been left at the top level, while the `connector` and connection method configuration has been moved to the `wallet.getConnector()` function. This allows consumers to tell wallet instances apart without having to instantiate their connectors.
  - `connector` has been moved to `createConnector().connector`
  - `qrCode` has been moved to `createConnector().qrCode`
  - `qrCode.logoUri` has been renamed to `qrCode.iconUrl` for consistency.
  - `instructions` has been moved to `createConnector().qrCode.instructions` and is now an object with a `steps` array where each item has a `step` property that is either `"install"`, `"create"`, or `"scan"`.
  - `getMobileConnectionUri` has been moved to `createConnector().mobile.getUri`
- `ready` has been renamed to `installed` to differentiate it from wagmi’s `ready` concept.
- `downloadUrls` has been restructured into an object with optional values `android`, `ios`, `browserExtension`, `qrCode` (link from scanning QR code on desktop).
