---
"@rainbow-me/rainbowkit": patch
---
Deprecates wallet grouping by removing `WalletList` from primary APIs. `connectorsForWallets` now takes an array of `Wallet` objects and `getDefaultWallets` returns wallets directly. Group-related locale keys and the "Installed" list were removed.
