---
'@rainbow-me/rainbowkit': patch
---

`RainbowKitProvider` must now be nested inside `WagmiProvider` since it now makes use of wagmi hooks internally.
