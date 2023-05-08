---
'@rainbow-me/rainbowkit': patch
---

Detecting MetaMask in `window.ethereum.providers` for wallets that support the `ethereum.providers` standard.

Overriding Wagmi's `getProvider` logic for MetaMask to ensure that MetaMask is preferred when available, and RainbowKit's MetaMask button continues to act as a fallback for users that rely on wallets that override `window.ethereum`.
