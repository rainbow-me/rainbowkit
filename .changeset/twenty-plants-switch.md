---
'@rainbow-me/rainbowkit': patch
---

Support custom wallet groups

Custom wallets must now be defined using the `WalletList` type to support grouping.

**Example usage**

```tsx
import { wallet, WalletList } from '@rainbow-me/rainbowkit';

const wallets: WalletList = [
  {
    groupName: 'Suggested',
    wallets: [wallet.rainbow({ chains, infuraId })],
  },
];
```
