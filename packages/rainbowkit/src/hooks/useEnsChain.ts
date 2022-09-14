import { Chain, useProvider, chain as wagmiChains } from 'wagmi';
import { useEnsChainId } from '../components/RainbowKitProvider/RainbowKitChainContext';

export function useEnsChain() {
  const chainId = useEnsChainId();

  // Because the generic for 'useProvider' is defaulting to 'unknown'
  // and the return type is being resolved as 'any', we're having to
  // manually define the Provider type, so this code is more defensive
  // than necessary in case the manual typing is ever incorrect.
  // If we're unable to resolve a list of chains, or the chains are
  // an invalid type, we'll silently bail out.
  const provider = useProvider<{ chains?: Chain[] }>();
  const chains = Array.isArray(provider.chains) ? provider.chains : [];
  const defaulChainId = wagmiChains.mainnet.id;
  // Enable ENS when ensChain is set in RainbowKitProvider or
  // when mainnet is in the list of configured chains
  const enabled =
    chainId !== undefined || chains?.some(chain => chain?.id === defaulChainId);

  return { chainId: chainId ?? defaulChainId, enabled };
}
