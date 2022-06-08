import { useEffect, useRef } from 'react';
import { useConnect } from 'wagmi';

export function useOnDisconnected(callback: () => void) {
  const { isDisconnected } = useConnect();

  // Ensure callback is executed once on disconnect
  const callbackAlreadyExecutedRef = useRef(false);

  useEffect(() => {
    if (isDisconnected) {
      if (callbackAlreadyExecutedRef.current) {
        return;
      }

      callbackAlreadyExecutedRef.current = true;
      callback();
    } else {
      callbackAlreadyExecutedRef.current = false;
    }
  }, [isDisconnected, callback]);
}
