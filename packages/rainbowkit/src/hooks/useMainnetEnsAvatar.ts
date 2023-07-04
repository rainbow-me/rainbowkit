import { useEnsAvatar } from 'wagmi';
import { useMainnet } from './useMainnet';

export function useMainnetEnsAvatar(name: string | null | undefined) {
  const { chainId, enabled } = useMainnet();

  const { data: ensAvatar } = useEnsAvatar({
    chainId,
    enabled,
    name,
  });

  return ensAvatar;
}
