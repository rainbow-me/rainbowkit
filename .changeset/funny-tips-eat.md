---
'@rainbow-me/rainbowkit': minor
---

**Breaking:** Removed the `chainId` parameter from `createConnector` on the `Wallet` type (Custom Wallets).

**Note that all built-in wallets are using the new API. Most consumers will be unaffected. This change only affects consumers that have created/consumed [custom wallets](rainbowkit.com/docs/custom-wallets).**

If you previously derived RPC URLs from the `chainId` on `createConnector`, you can now remove that logic as `wagmi` now handles RPC URLs internally when used with `configureChains`.

```diff
import { connectorsForWallets, wallet, Chain, Wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export interface MyWalletOptions {
  chains: Chain[];
}

-const chains = [chain.mainnet]
+const { chains } = configureChains(
+  [chain.mainnet],
+  [
+    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
+    publicProvider(),
+  ]
+);

export const rainbow = ({ chains }: MyWalletOptions): Wallet => ({
  ...
- createConnector: ({ chainId }) => {
+ createConnector: () => {
-   const rpc = chains.reduce(
-     (rpcUrlMap, chain) => ({
-       ...rpcUrlMap,
-       [chainId]: chain.rpcUrls.default,
-     }),
-     {}
-   );
    const connector = new WalletConnectConnector({
      chains,
      options: {
        qrcode: false,
-       rpc,
      },
    });
  }
  ...
}

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      rainbow({ chains }),
    ],
  },
]);
```
