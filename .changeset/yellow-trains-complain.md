---
"@rainbow-me/rainbowkit": patch
---

Fixed a bug where `eth_getBalance` would be called when `showBalance` was set to `false`. Optimized additional provider calls to fetch wallet balances only when a user interacts with the Account modal.
