---
'@rainbow-me/rainbowkit': minor
---

The Steakwallet backwards compatibility layer has been removed. Omni should be used instead, available via the new `@rainbow-me/rainbowkit/wallets` entry point.

```diff
-import { wallet } from '@rainbow-me/rainbowkit';
+import { omniWallet } from '@rainbow-me/rainbowkit/wallets';

const wallets = [
-  wallet.steak({ chains }),
+  omniWallet({ chains }),
];
```
