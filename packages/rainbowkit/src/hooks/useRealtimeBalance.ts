import type { Address } from 'viem';
import { useBalance } from 'wagmi';
import { useRealtimeBalanceStatus } from '../components/RainbowKitProvider/RealtimeBalanceStatusContext';

interface UseRealtimeBalanceParameters {
  address?: Address;
  showBalance?: boolean;
}

export function useRealtimeBalance({
  address,
  showBalance = true,
}: UseRealtimeBalanceParameters) {
  const { status } = useRealtimeBalanceStatus();

  const { data: balanceData } = useBalance({
    address: status === 'show' && showBalance ? address : undefined,
  });

  return balanceData;
}
