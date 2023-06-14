---
'@rainbow-me/rainbowkit': patch
---

Support for WalletConnect v2 is now standard in RainbowKit.

Every dApp that relies on WalletConnect now needs to obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.

This must be completed before WalletConnect v1 bridge servers are shutdown on June 28, 2023.

Upgrade RainbowKit and provide the `projectId` to `getDefaultWallets` and individual RainbowKit wallet connectors like the following:

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

You can read the full migration guide [here](https://www.rainbowkit.com/guides/walletconnect-v2).

**Advanced options**

If a dApp requires supporting a legacy wallet that has not yet migrated to WalletConnect v2, the WalletConnect version can be overriden.

```ts
metaMaskWallet(options: {
  chains: Chain[];
  walletConnectVersion: '1',
});
```

Once the WalletConnect v1 servers are shutdown, a [custom bridge server](https://docs.walletconnect.com/1.0/bridge-server) is required.

```ts
walletConnectWallet(options: {
  chains: Chain[];
  version: '1',
  options: {
    bridge: 'https://bridge.myhostedserver.com',
  },
});

customWallet(options: {
  chains: Chain[];
  walletConnectVersion: '1',
  walletConnectOptions: {
    bridge: 'https://bridge.myhostedserver.com',
  },
});
```

Reference the [docs](https://www.rainbowkit.com/docs/custom-wallet-list#walletconnect) for additional supported options.
