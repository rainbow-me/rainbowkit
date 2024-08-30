import { type GetEnsNameReturnType, normalize } from 'viem/ens';
import { useEnsAvatar } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useIsMainnetConfigured } from './useIsMainnetConfigured';

export function useMainnetEnsAvatar(name: GetEnsNameReturnType | undefined) {
  const mainnetConfigured = useIsMainnetConfigured();

  const safeNormalize = (ensName: string) => {
    try {
      return normalize(ensName);
    } catch {
      /* ignore */
    }
  };

  const { data: ensAvatar } = useEnsAvatar({
    chainId: mainnet.id,
    name: name ? safeNormalize(name) : undefined,
    query: {
      enabled: mainnetConfigured,
    },
  });

  return ensAvatar;
}
