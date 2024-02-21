---
"@rainbow-me/rainbowkit": patch
---

Add Ronin Wallet Support

**Example usage**

```ts
import {
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { roninWallet } from "@rainbow-me/rainbowkit/wallets";
const { wallets } = getDefaultWallets({ appName, chains });
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [roninWallet({ chains })],
  },
]);
```
