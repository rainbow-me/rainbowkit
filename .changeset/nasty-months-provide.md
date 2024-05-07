---
"@rainbow-me/rainbowkit": patch
---

Added real-time balance fetching based on the [Recent Transaction](https://www.rainbowkit.com/docs/recent-transactions) API. As a transaction is confirmed on-chain, the user's gas balance will be updated to reflect the transaction.

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
