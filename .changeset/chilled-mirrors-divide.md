---
'@rainbow-me/rainbowkit': patch
---

**Support for WalletConnect Cloud `projectId`**

Every dApp that relies on WalletConnect now needs to obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

RainbowKit will enable WalletConnect v2 for supported wallets when `projectId` is specified. If `projectId` is unspecified, RainbowKit will quietly prefer WalletConnect v1.

This must be completed before WalletConnect v1 bridge servers are shutdown on June 28, 2023.

Provide the `projectId` to `getDefaultWallets` and individual RainbowKit wallet connectors like the following:

```ts
const projectId = 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);
```
