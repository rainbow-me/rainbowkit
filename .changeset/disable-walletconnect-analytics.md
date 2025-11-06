---
"@rainbow-me/rainbowkit": patch
---

Disable WalletConnect Pulse analytics by default for GDPR compliance. Analytics tracking now requires explicit opt-in by setting `walletConnectParameters: { disableProviderPing: false }`.
