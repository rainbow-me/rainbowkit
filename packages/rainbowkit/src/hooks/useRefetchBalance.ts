import { useRealtimeBalanceStatus } from '../components/RainbowKitProvider/RealtimeBalanceStatusContext';

export const useRefetchBalance = () => {
  const { setStatus } = useRealtimeBalanceStatus();

  return () => {
    setStatus('refetch');
  };
};
