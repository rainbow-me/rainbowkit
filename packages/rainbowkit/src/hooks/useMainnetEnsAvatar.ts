import { GetEnsNameReturnType, normalize } from 'viem/ens';
import { useEnsAvatar } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useIsMainnetConfigured } from './useIsMainnetConfigured';

export function useMainnetEnsAvatar(name: GetEnsNameReturnType | undefined) {
  const mainnetConfigured = useIsMainnetConfigured();

  const { data: ensAvatar } = useEnsAvatar({
    chainId: mainnet.id,
    name: name ? normalize(name) : undefined,
    query: {
      enabled: mainnetConfigured,
    },
  });

  return ensAvatar;
}
