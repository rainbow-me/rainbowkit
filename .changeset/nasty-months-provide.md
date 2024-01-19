---
"@rainbow-me/rainbowkit": patch
"example": patch
---

Added `useRefetchBalance` hook to support realtime balance updates in rainbowkit. The hook should be called upon a successful transaction like.

Example usage:

```
  import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
  } from "wagmi";
  import { useRefetchBalance } from "./hooks/useRefetchBalance";

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
      <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send Transaction
      </button>
    );
  };
```