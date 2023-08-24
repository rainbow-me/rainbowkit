import { useEnsName } from 'wagmi';
import { useMainnet } from './useMainnet';

export function useMainnetEnsName(address: string | undefined) {
  const { chainId, enabled } = useMainnet();

  const { data: ensName } = useEnsName({
    // @ts-ignore
    address,
    chainId,
    enabled,
  });

  return ensName;
}
