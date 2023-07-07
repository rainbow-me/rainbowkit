---
'@rainbow-me/rainbowkit': patch
---

Decoupled `chains` between `WagmiConfig` and `RainbowKitProvider` so that dApps can now supply a subset of supported chains to `RainbowKitProvider` to limit the chains a user can switch between, while maintaining a shared `WagmiConfig`.
