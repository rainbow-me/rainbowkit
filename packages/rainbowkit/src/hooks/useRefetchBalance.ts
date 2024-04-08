import { useCallback } from 'react';
import { useRealtimeBalanceStatus } from '../components/RainbowKitProvider/RealtimeBalanceStatusContext';

export const useRefetchBalance = () => {
  const { setStatus } = useRealtimeBalanceStatus();

  const refetchBalance = useCallback(() => {
    setStatus('refetch');
  }, [setStatus]);

  return { refetchBalance };
};
