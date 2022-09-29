---
'@rainbow-me/rainbowkit': minor
---

Support tree shaking of individual wallets by exposing them as separate imports via the new `@rainbow-me/rainbowkit/wallets` entry point.

In order to reduce bundle size, you can now select the individual wallets you want to import into your application.

Note that since wallets are no longer namespaced via the `wallet` object, all wallets now have a `Wallet` suffix.

```diff
-import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
+import { connectorsForWallets } from '@rainbow-me/rainbowkit';
+import {
+  injectedWallet,
+  rainbowWallet,
+  metaMaskWallet,
+  coinbaseWallet,
+  walletConnectWallet,
+} from '@rainbow-me/rainbowkit/wallets';

const wallets = [
-  wallet.injected({ chains }),
-  wallet.rainbow({ chains }),
-  wallet.metaMask({ chains }),
-  wallet.coinbase({ chains, appName: 'My App' }),
-  wallet.walletConnect({ chains }),
+  injectedWallet({ chains }),
+  rainbowWallet({ chains }),
+  metaMaskWallet({ chains }),
+  coinbaseWallet({ chains, appName: 'My App' }),
+  walletConnectWallet({ chains }),
];
```
