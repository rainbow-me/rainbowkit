import { useConfig } from "wagmi";

export function useChainId(): number | null {
  const { chains } = useConfig();
  return /* activeChain?.id */ 1 ?? null;
}
