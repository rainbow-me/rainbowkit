---
"@rainbow-me/rainbowkit": patch
---

The `coinbaseWallet` connector now supports additional SDK configuration options to enable [Paymasters](https://docs.base.org/identity/smart-wallet/guides/paymasters) and [Sub Accounts](https://docs.base.org/identity/smart-wallet/guides/sub-accounts) for your dapp.

```tsx
import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';

// Configure Paymaster for gas sponsorship
coinbaseWallet.paymasterUrls = {
  [base.id]: '...'
};

// Enable Sub Accounts
coinbaseWallet.subAccounts = {
  enableAutoSubAccounts: true,
  defaultSpendLimits: {
    // ...
  }
};
```
