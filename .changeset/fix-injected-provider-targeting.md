---
"@rainbow-me/rainbowkit": patch
---

Fixed a crash that could occur when selecting a wallet while multiple browser wallet extensions were installed and the specific injected wallet was missing. Wallet-specific injected connectors now bind only to their matching provider instead of falling back to available defaults.
