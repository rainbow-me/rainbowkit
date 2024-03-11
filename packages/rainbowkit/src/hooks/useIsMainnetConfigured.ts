import { mainnet } from 'wagmi/chains';
import { useRainbowKitChains } from '../components/RainbowKitProvider/RainbowKitChainContext';

export function useIsMainnetConfigured() {
  const rainbowKitChains = useRainbowKitChains();

  const chainId = mainnet.id;

  const configured = rainbowKitChains.some(
    (rainbowKitChain) => rainbowKitChain.id === chainId,
  );

  return configured;
}
