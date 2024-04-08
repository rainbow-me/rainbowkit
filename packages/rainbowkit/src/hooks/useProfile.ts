import { Address } from 'viem';
import { useMainnetEnsAvatar } from './useMainnetEnsAvatar';
import { useMainnetEnsName } from './useMainnetEnsName';
import { useRealtimeBalance } from './useRealtimeBalance';

interface UseProfileParameters {
  address?: Address;
  showBalance?: boolean;
}

export function useProfile({ address, showBalance }: UseProfileParameters) {
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const balance = useRealtimeBalance({ address, showBalance });

  return { ensName, ensAvatar, balance };
}
