import { useEnsName } from 'wagmi';
import { useEnsChain } from './useEnsChain';

export function useChainEnsName(address: string | undefined) {
  const { chainId, enabled } = useEnsChain();

  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled,
  });

  return ensName;
}
