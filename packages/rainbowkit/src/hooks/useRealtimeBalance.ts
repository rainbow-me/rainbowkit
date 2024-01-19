import { useBalance } from 'wagmi';
import { useRealtimeBalanceStatus } from '../components/RainbowKitProvider/RealtimeBalanceStatusContext';

export const useRealtimeBalance = (
  parameters: Parameters<typeof useBalance>[0],
): ReturnType<typeof useBalance>['data'] => {
  const { status } = useRealtimeBalanceStatus();

  const { data: balanceData } = useBalance({
    ...parameters,
    address:
      status === 'show' && parameters?.address ? parameters.address : undefined,
    // wagmi caches balance data which means we would have to set it to 0
    cacheTime: 0,
  });

  return balanceData;
};
