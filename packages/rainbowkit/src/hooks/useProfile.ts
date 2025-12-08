import { type Address, formatUnits } from 'viem';
import { useBalance } from 'wagmi';
import { useMainnetEnsAvatar } from './useMainnetEnsAvatar';
import { useMainnetEnsName } from './useMainnetEnsName';

interface UseProfileParameters {
  address?: Address;
  includeBalance?: boolean;
}

interface Balance {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

export function useProfile({ address, includeBalance }: UseProfileParameters) {
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { data: rawBalance } = useBalance({
    address: includeBalance ? address : undefined,
  });

  const balance: Balance | undefined = rawBalance
    ? {
        ...rawBalance,
        formatted: formatUnits(rawBalance.value, rawBalance.decimals),
      }
    : undefined;

  return { ensName, ensAvatar, balance };
}
