import { useConnection } from 'wagmi';

export function useChainId(): number | null {
  const { chain: activeChain } = useConnection();
  return activeChain?.id ?? null;
}
