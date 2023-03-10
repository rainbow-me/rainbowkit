---
'@rainbow-me/rainbowkit': minor
---

Bitski Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { bitskiWallet } from '@rainbow-me/rainbowkit/wallets';
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      bitskiWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);
```
