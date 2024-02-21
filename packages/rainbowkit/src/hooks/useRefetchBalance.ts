import { useRealtimeBalanceStatus } from '../components/RainbowKitProvider/RealtimeBalanceStatusContext';

export const useRefetchBalance = () => {
  const { setStatus } = useRealtimeBalanceStatus();

  const refetchBalance = () => {
    setStatus('refetch');
  };

  return { refetchBalance };
};
