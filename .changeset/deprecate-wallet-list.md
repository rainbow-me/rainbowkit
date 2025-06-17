---
"@rainbow-me/rainbowkit": patch
---
Deprecate wallet grouping. `connectorsForWallets` now accepts either a flat wallet array or the old `WalletList` type, though the latter is deprecated. `getDefaultWallets` returns a flat wallet array. Removed the Installed group and related translations.
