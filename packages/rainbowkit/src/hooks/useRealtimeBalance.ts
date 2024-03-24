import type { Address } from 'viem';
import { useBalance } from 'wagmi';
import { useRealtimeBalanceStatus } from '../components/RainbowKitProvider/RealtimeBalanceStatusContext';

export const useRealtimeBalance = (address: Address | undefined) => {
  const { status } = useRealtimeBalanceStatus();

  const balance = useBalance({
    address: status === 'show' && address ? address : undefined,
  });

  return balance;
};
