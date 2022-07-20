import { useEnsName } from 'wagmi';
import { useEnsChain } from './useEnsChain';

export function useMainnetEnsName(address: string | undefined) {
  const { chainId, enabled } = useEnsChain();

  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled,
  });

  return ensName;
}
