---
"@rainbow-me/rainbowkit": patch
---

Fixed a bug where wagmi would throw `ChainNotConfiguredError` if `mainnet` is not configured as a chain. This is happening when fetching ens name and ens avatar.
