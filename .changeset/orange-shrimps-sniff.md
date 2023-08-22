---
'@rainbow-me/rainbowkit': patch
---

FoxWallet Support

**Example Usage**

```tsx
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { foxWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, projectId, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [foxWallet({ projectId, chains })],
  },
]);
```
