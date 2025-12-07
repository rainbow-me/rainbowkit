import { type Address, formatUnits } from 'viem';
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
  const { data: balanceData } = useBalance({
    address: includeBalance ? address : undefined,
  });

  // Format balance using viem's formatUnits (wagmi v3 no longer returns formatted)
  const balance = balanceData
    ? {
        ...balanceData,
        formatted: formatUnits(balanceData.value, balanceData.decimals),
      }
    : undefined;

  return { ensName, ensAvatar, balance };
}
