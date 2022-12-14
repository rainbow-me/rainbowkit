import { Chain, useProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export function useMainnet() {
  const chainId = mainnet.id;

  // Because the generic for 'useProvider' is defaulting to 'unknown'
  // and the return type is being resolved as 'any', we're having to
  // manually define the Provider type, so this code is more defensive
  // than necessary in case the manual typing is ever incorrect.
  // If we're unable to resolve a list of chains, or the chains are
  // an invalid type, we'll silently bail out.
  const provider = useProvider<{ chains?: Chain[] }>();
  const chains = Array.isArray(provider.chains) ? provider.chains : [];
  const enabled = chains?.some(chain => chain?.id === chainId);

  return { chainId, enabled };
}
