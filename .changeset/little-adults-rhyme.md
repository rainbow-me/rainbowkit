---
"@rainbow-me/rainbowkit": patch
"example": patch
---

Added `preference` property to `coinbaseWallet`. You can now enable coinbase smart wallet feature like so:

```tsx
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

// Enable coinbase smart wallet feature
coinbaseWallet.preference = 'smartWalletOnly';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    {
      groupName: 'Popular',
      wallets: [coinbaseWallet],
    },
  ],
  chains: [mainnet],
});
```