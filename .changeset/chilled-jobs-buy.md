---
'@rainbow-me/rainbowkit': patch
---

Make `getDefaultWallets` return an object containing `connectors` and `wallets`

In order to streamline the setup process, the `getDefaultWallets` function now returns an object containing both `connectors` and `wallets` properties. This means that most consumers will no longer need to use the `connectorsForWallets` function, accessing the generated `connectors` value instead.

**Migration guide**

```diff
-import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
+import { getDefaultWallets } from '@rainbow-me/rainbowkit';

-const wallets = getDefaultWallets({
+const { connectors } = getDefaultWallets({
  /* ... */
});

-const connectors = connectorsForWallets(wallets);
```

If you were modifying the wallet list returned from `getDefaultWallets`, you’ll need to destructure the `wallets` property from the returned object.

```diff
import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';

-const wallets = getDefaultWallets({
+const { wallets } = getDefaultWallets({
  /* ... */
});

const connectors = connectorsForWallets(wallets);
```
