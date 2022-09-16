---
'@rainbow-me/rainbowkit': patch
---

Automatically hide "Injected Wallet" option if another injected wallet in the list is available

**Migration guide**

Previously we provided instructions for manually calculating whether the "Injected Wallet" option should be visible.

```ts
const needsInjectedWalletFallback =
  typeof window !== 'undefined' &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.metaMask({ chains }),
      wallet.coinbase({ appName: 'My RainbowKit App', chains }),
      wallet.metaMask({ chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
    ],
  },
]);
```

This manual logic should no longer be needed since it's now handled automatically, meaning that the previous example could be simplified in the following way.

```ts
const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.metaMask({ chains }),
      wallet.coinbase({ appName: 'My RainbowKit App', chains }),
      wallet.metaMask({ chains }),
      wallet.injected({ chains }),
    ],
  },
]);
```

In addition, since the "Injected Wallet" option is only rendered when necessary based on the end user's browser environment, it's recommended that you place it at the start of the list to ensure it's visible.

```ts
const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      wallet.injected({ chains }),
      wallet.rainbow({ chains }),
      wallet.metaMask({ chains }),
      wallet.coinbase({ appName: 'My RainbowKit App', chains }),
      wallet.metaMask({ chains }),
    ],
  },
]);
```
