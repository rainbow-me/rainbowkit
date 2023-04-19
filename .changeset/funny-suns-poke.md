---
'@rainbow-me/rainbowkit': patch
---

Phantom Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { phantomWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, projectId, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [phantomWallet({ chains })],
  },
]);
```
