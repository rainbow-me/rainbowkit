import { useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';

export function useOnDisconnected(callback: () => void) {
  const { data, isError, isLoading } = useAccount();
  const disconnected = !data;

  // Ensure callback is executed once on disconnect
  const callbackAlreadyExecutedRef = useRef(false);

  useEffect(() => {
    if (isLoading || isError) {
      return;
    }

    if (disconnected) {
      if (callbackAlreadyExecutedRef.current) {
        return;
      }

      callback();
      callbackAlreadyExecutedRef.current = true;
    } else {
      callbackAlreadyExecutedRef.current = false;
    }
  }, [isLoading, isError, disconnected, callback]);
}
