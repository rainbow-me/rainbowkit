---
'@rainbow-me/rainbowkit': patch
---

Add Brave Wallet support

Brave Wallet is now included as part of the default set of wallets returned from `getDefaultWallets`, but note that is only visible within the Brave browser to avoid prompting users to download an entirely different web browser.

Brave Wallet is also included as part of the `wallet` object to support its usage in [custom wallet lists,](https://www.rainbowkit.com/docs/custom-wallet-list) e.g. `wallet.brave({ chains, shimDisconnect: true })`.
