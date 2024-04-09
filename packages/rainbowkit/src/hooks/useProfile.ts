import { Address } from 'viem';
import { useBalance } from 'wagmi';
import { useMainnetEnsAvatar } from './useMainnetEnsAvatar';
import { useMainnetEnsName } from './useMainnetEnsName';

interface UseProfileParameters {
  address?: Address;
  showBalance?: boolean;
}

export function useProfile({ address, showBalance }: UseProfileParameters) {
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { data: balance } = useBalance({
    address: showBalance ? address : undefined,
  });

  return { ensName, ensAvatar, balance };
}
