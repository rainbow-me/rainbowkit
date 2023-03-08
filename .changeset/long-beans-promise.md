---
'@rainbow-me/rainbowkit': minor
---

The wagmi peer dependency has been updated to `0.12.x`.

RainbowKit has adopted the `WalletConnectLegacyConnector` connector in `wagmi` for continued WalletConnect v1 support. Support for WalletConnect v2 and `WalletConnectConnector` will soon be available as a patch release, without breaking changes.

Wallets will be transitioned automatically in future releases.

Follow the steps below to migrate.

#### 1. Upgrade RainbowKit and `wagmi` to their latest version

```bash
npm i @rainbow-me/rainbowkit@^0.12.0 wagmi@^0.12.0
```
