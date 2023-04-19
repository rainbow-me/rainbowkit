---
'@rainbow-me/rainbowkit': patch
---

Trust Wallet Support

The `trustWallet` wallet connector now includes support for the Trust Wallet browser extension.

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { trustWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, projectId, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [trustWallet({ projectId, chains })],
  },
]);
```
