---
"@rainbow-me/rainbowkit": patch
---

Fixed an issue where `metaMaskWallet` would cause the app to crash if MetaMask, Coinbase, and Rainbow wallets were installed. This happened due to a conflict with `window.ethereum.providers`, which caused an infinite loop when these wallets overrode each other.
