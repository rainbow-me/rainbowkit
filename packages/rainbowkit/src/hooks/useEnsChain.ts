import { chain } from 'wagmi';
import { useRainbowKitChains } from './../components/RainbowKitProvider/RainbowKitChainContext';

export function useEnsChain() {
  const rainbowKitChains = useRainbowKitChains();

  const chainId = chain.mainnet.id;
  const enabled = rainbowKitChains.some(
    rainbowKitChain => rainbowKitChain.id === chainId
  );

  return { chainId, enabled };
}
