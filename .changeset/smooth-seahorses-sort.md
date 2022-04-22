---
'@rainbow-me/rainbowkit': patch
---

Add recent transaction support

You can now opt in to displaying recent transactions within RainbowKit’s account modal. Note that all transactions must be manually registered with RainbowKit in order to be displayed.

First enable the `showRecentTransactions` option on `RainbowKitProvider`.

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider showRecentTransactions={true} {...etc}>
      {/* ... */}
    </RainbowKitProvider>
  );
};
```

Transactions can then be registered with RainbowKit using the `useAddRecentTransaction` hook.

```tsx
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export default () => {
  const addRecentTransaction = useAddRecentTransaction();

  return (
    <button
      onClick={() => {
        addRecentTransaction({
          hash: '0x...',
          description: '...',
        });
      }}
    >
      Add recent transaction
    </button>
  );
};
```

Once a transaction has been registered with RainbowKit, its status will be updated upon completion.

By default the transaction will be considered completed once a single block has been mined on top of the block in which the transaction was mined, but this can be configured by specifying a custom `confirmations` value.

```tsx
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export default () => {
  const addRecentTransaction = useAddRecentTransaction();

  return (
    <button
      onClick={() => {
        addRecentTransaction({
          hash: '0x...',
          description: '...',
          confirmations: 100,
        });
      }}
    >
      Add recent transaction
    </button>
  );
};
```
