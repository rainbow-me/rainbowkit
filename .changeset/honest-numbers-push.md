---
'@rainbow-me/rainbowkit': patch
---

Ensure Brave Wallet and Tokenary aren’t detected as MetaMask

Both Brave Wallet and Tokenary set `window.ethereum.isMetaMask` to `true` which causes issues with the logic for providing the fallback "Injected Wallet" option. Similar to wagmi, we now detect when MetaMask is being impersonated by these wallets.
