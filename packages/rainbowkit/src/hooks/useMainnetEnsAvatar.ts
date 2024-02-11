import { GetEnsNameReturnType, normalize } from 'viem/ens';
import { useEnsAvatar } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export function useMainnetEnsAvatar(name: GetEnsNameReturnType | undefined) {
  const { data: ensAvatar } = useEnsAvatar({
    chainId: mainnet.id,
    name: name ? normalize(name) : undefined,
  });

  return ensAvatar;
}
