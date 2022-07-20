import { useEnsAvatar } from 'wagmi';
import { useEnsChain } from './useEnsChain';

export function useMainnetEnsAvatar(addressOrName: string | undefined) {
  const { chainId, enabled } = useEnsChain();

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName,
    chainId,
    enabled,
  });

  return ensAvatar;
}
