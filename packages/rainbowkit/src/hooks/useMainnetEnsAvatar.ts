import { useEnsAvatar } from 'wagmi';
import { useShowEnsAvatar } from '../components/RainbowKitProvider/ResponsiveRpcSettingsProvider';
import { useMainnet } from './useMainnet';

export function useMainnetEnsAvatar(name: string | null | undefined) {
  const { chainId, enabled } = useMainnet();

  const showEnsAvatar = useShowEnsAvatar();

  const { data: ensAvatar } = useEnsAvatar({
    chainId,
    enabled,
    name: !showEnsAvatar ? undefined : name,
  });

  return ensAvatar;
}
