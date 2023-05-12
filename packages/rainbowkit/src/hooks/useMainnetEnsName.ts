import { useEnsName } from 'wagmi';
import { useMainnet } from './useMainnet';

export function useMainnetEnsName(address: `0x${string}` | undefined) {
  const { chainId, enabled } = useMainnet();

  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled,
  });

  return ensName;
}
