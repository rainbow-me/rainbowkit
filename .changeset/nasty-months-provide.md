---
"@rainbow-me/rainbowkit": patch
"example": patch
"site": patch
---

Added `useRefetchBalance` hook which allows balance refresh support for `<RainbowKitProvider>` components.

The `refetchBalance` function from the hook should be called upon a successful transaction.

**Example usage**

```tsx
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { useRefetchBalance } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';
import { useEffect } from 'react';

const YourApp = () => {
  const { refetchBalance } = useRefetchBalance();

  const { data: hash, sendTransaction } = useSendTransaction();

  const { data: txReceipt } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (txReceipt?.status === 'success') refetchBalance();
  }, [txReceipt]);

  return (
    <button
      onClick={() =>
        sendTransaction({
          to: '<your_address>',
          value: parseEther('<ether>'),
        })
      }
    >
      Send Transaction
    </button>
  );
};
```
