---
'@rainbow-me/rainbowkit': patch
---

Improve deep linking support for WalletConnect-based wallets on iOS

We now store the wallet’s universal link URL in local storage so that WalletConnect can use it for deep linking. This is typically handled by the official WalletConnect modal, but we need to handle it ourselves when rendering custom QR codes within RainbowKit.
