---
'@rainbow-me/rainbowkit': patch
---

Bifrost Wallet Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { bifrostWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [bifrostWallet({ chains })],
  },
]);
```
