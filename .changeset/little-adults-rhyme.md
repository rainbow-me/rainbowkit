---
"@rainbow-me/rainbowkit": patch
"example": patch
---

The `coinbaseWallet` wallet connector now has a `preference` argument to control whether Smart Wallet is enabled and available for users. Preference based behavior is documented [here](https://www.smartwallet.dev/sdk/makeWeb3Provider#parameters).

Smart Wallet will be enabled by default with `all` in early June, without a further upgrade.

Developers can test Smart Wallet with `sepolia` and `baseSepolia` chains today by setting `smartWalletOnly` like so:

```tsx
import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';

// Enable Coinbase Smart Wallet for testing
coinbaseWallet.preference = 'smartWalletOnly';

// You must manually specify your wallet list with `wallets` in 
// `getDefaultConfig` or `connectorsForWallets` to assign the preference
const config = getDefaultConfig({
  /* ... */
  wallets: [
    {
      groupName: 'Popular',
      wallets: [coinbaseWallet],
    },
  ],
  /* ... */
});
