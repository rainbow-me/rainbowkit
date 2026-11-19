---
"@rainbow-me/rainbowkit": patch
---

Stop re-rendering `ConnectButton` whenever the app root re-renders, by keeping `RainbowKitProvider` context values stable.
