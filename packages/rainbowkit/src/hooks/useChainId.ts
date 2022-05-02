import { useNetwork } from 'wagmi';

export function useChainId(): number | null {
  const { activeChain } = useNetwork();
  return activeChain?.id ?? null;
}
