---
"@rainbow-me/rainbowkit": patch
"site": patch
---

The `WalletButton` component made the connect modal appear empty when trying to connect. This happened because of a mix up between EIP-6963 and RainbowKit connectors. The problem was finding the correct `wallet.id`. `WalletButton` uses RainbowKit's id, but EIP-6963 uses `rdns` for its id. We now don't merge EIP-6963 and RainbowKit connectors if user interacts with `WalletButton` component.