---
'@rainbow-me/rainbowkit': patch
---

Support custom wallet groups

Custom wallets must now be defined in a grouped format. The `Wallets` type is provided to support this.

**Example usage**

```tsx
import { wallet, Wallets } from '@rainbow-me/rainbowkit';

const wallets: Wallets = [
  {
    groupName: 'Suggested',
    wallets: [wallet.rainbow({ chains, infuraId })],
  },
];
```
