import { useAccount } from 'wagmi';

export function useChainId(): number | null {
  const { chain: activeChain } = useAccount();
  return activeChain?.id ?? null;
}
