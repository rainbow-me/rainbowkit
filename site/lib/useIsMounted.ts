import { useCallback, useEffect, useState } from 'react';

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return useCallback(() => isMounted, [isMounted]);
}
