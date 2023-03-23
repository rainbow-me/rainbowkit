---
'@rainbow-me/rainbowkit': patch
---

Dawn Wallet Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { dawnWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [dawnWallet({ chains })],
  },
]);
```
