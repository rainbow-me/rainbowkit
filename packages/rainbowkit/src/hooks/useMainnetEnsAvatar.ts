import { useEnsAvatar } from 'wagmi';
import { useMainnet } from './useMainnet';

export function useMainnetEnsAvatar(address: string | undefined) {
  const { chainId, enabled } = useMainnet();

  const { data: ensAvatar } = useEnsAvatar({
    address,
    chainId,
    enabled,
  });

  return ensAvatar;
}
