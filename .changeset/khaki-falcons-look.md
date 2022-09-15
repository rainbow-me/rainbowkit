---
'@rainbow-me/rainbowkit': minor
---

Allow custom wallets to automatically hide themselves based on the availability of other wallets in the list. This can be achieved via the new optional `hidden` function on the `Wallet` type.

**Example usage**

This is an example of a custom wallet that hides itself if another injected connector is available.

```ts
import type Wallet from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';

const myCustomWallet: Wallet = {
  hidden: ({ wallets }) => {
    return wallets.some(
      wallet =>
        wallet.installed &&
        (wallet.connector instanceof InjectedConnector ||
          wallet.id === 'coinbase')
    );
  },
  ...etc,
};
```
