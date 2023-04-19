---
'@rainbow-me/rainbowkit': patch
---

XDEFI Wallet Support

**Example usage**

```tsx
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { xdefiWallet } from '@rainbow-me/rainbowkit/wallets';
const { wallets } = getDefaultWallets({ appName, projectId, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [xdefiWallet({ chains })],
  },
]);
```
