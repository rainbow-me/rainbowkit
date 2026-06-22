import type { Address } from 'viem';
import { useBalance } from 'wagmi';
import { useMainnetEnsAvatar } from './useMainnetEnsAvatar';
import { useMainnetEnsName } from './useMainnetEnsName';

interface UseProfileParameters {
  address?: Address;
  includeBalance?: boolean;
}

export function useProfile({ address, includeBalance }: UseProfileParameters) {
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: Boolean(includeBalance && address),
    },
  });

  return { ensName, ensAvatar, balance };
}
