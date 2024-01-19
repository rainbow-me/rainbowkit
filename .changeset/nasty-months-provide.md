---
"@rainbow-me/rainbowkit": patch
"example": patch
---

Added `useRefetchBalance` hook to support realtime balance in rainbowkit. The returned hook function should be called upon a successful transaction.

Example usage:

```
  import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
  } from "wagmi";
  import { useRefetchBalance, ConnectButton } from '@rainbow-me/rainbowkit';

  const YourApp = () => {
    const refetchBalance = useRefetchBalance();

    const { config: sendTransactionConfig } = usePrepareSendTransaction({
      to: "<to_address>",
      value: "<value>",
    });

    const { data: transactionData, sendTransaction } = useSendTransaction(
      sendTransactionConfig
    );

    useWaitForTransaction({
      hash: transactionData?.hash,
      onSuccess: refetchBalance,
    });

    return (
      <div>
        <ConnectButton />
        <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
          Send Transaction
        </button>
      </div>
    );
  };
```
