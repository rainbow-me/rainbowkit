import { useNetwork } from 'wagmi';

export function useChainId(): number | null {
  const { chain: activeChain } = useNetwork();
  return activeChain?.id ?? null;
}
