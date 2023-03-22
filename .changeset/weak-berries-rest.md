---
'@rainbow-me/rainbowkit': patch
---

RainbowKit dApps that use `getDefaultWallets` or `injectedWallet` will now more eagerly display the fallback `injectedWallet` connector to better support dApp Browsers when a branded connector is unavailable.
