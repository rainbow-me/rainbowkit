---
'@rainbow-me/rainbowkit': patch
---

Update custom wallet API

Note that this only affects consumers that have created custom wallets. All built-in wallets have been updated to use the new API.

- `ready` has been renamed to `installed` to differentiate it from wagmi’s `ready` concept.
- `instructions` has been moved to `qrCode.instructions` and is now an object with a `steps` array where each item has a `step` property that is either `"install"`, `"create"`, or `"scan"`.
- `downloadUrls.desktop` has been replaced with a single `downloadUrls.browserExtension` property, deprecating the `downloadUrls.desktop.mobileCompanion` property.
- `getMobileConnectionUri` has been moved to `mobile.getUri`
- `qrCode.logoUri` has been renamed to `qrCode.iconUrl` for consistency.
