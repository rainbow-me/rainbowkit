import { useNetwork } from 'wagmi';

export function useChainId(): number | null {
  const [{ data: networkData }] = useNetwork();
  return networkData?.chain?.id ?? null;
}
