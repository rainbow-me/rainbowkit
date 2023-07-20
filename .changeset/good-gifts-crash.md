---
'@rainbow-me/rainbowkit': patch
---

Enkrypt Wallet Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { enkryptWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [enkryptWallet({ chains })],
  },
]);
```
