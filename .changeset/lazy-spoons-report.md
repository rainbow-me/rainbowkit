---
'@rainbow-me/rainbowkit': patch
---

Fix WalletConnect in Brave when a large number of WalletConnect-based wallets have been configured

Brave’s fingerprint prevention logic silently blocks WebSocket connections if too many are opened in the same session. Since we create a fresh WalletConnect connector instance for each wallet, consumers that have configured a large number of wallets can inadvertently break the connection flow in Brave.

To fix this, we now share WalletConnect connector instances between wallets when the connectors are being provided with the same options.
