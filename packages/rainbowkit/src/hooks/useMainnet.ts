import type { Chain } from 'wagmi';
import { usePublicClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export function useMainnet() {
  const chainId = mainnet.id;

  const provider = usePublicClient();
  const chains: Chain[] = Array.isArray(provider.chains) ? provider.chains : [];
  const enabled = chains?.some(chain => chain?.id === chainId);

  return { chainId, enabled };
}
