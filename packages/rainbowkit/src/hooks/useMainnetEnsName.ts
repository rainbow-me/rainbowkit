import { useEnsName } from 'wagmi';
import { useMainnet } from './useMainnet';

export function useMainnetEnsName(address: string | undefined) {
  const { chainId, enabled } = useMainnet();

  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled,
  });

  return ensName;
}
