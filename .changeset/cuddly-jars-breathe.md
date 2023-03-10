---
'@rainbow-me/rainbowkit': patch
---

MEW Wallet Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { mewWallet } from '@rainbow-me/rainbowkit/wallets';
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      mewWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);
```
