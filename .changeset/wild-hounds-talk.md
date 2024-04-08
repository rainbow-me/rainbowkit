---
"@rainbow-me/rainbowkit": patch
---

Introduced optimistic disconnect behavior by monitoring `isDisconnecting` in `RainbowKitWagmiStateProvider`. If `isDisconnecting` is `true`, the `useConnectionStatus` hook will mark its state as `disconnected`.