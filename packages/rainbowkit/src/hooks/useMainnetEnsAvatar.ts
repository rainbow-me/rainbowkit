import { useEnsAvatar } from 'wagmi';
import { useMainnet } from './useMainnet';

export function useMainnetEnsAvatar(addressOrName: string | undefined) {
  const { chainId, enabled } = useMainnet();

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName,
    chainId,
    enabled,
  });

  return ensAvatar;
}
