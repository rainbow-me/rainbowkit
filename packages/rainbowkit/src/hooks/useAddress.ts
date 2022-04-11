import { useAccount } from 'wagmi';

export function useAddress(): string | null {
  const [{ data: accountData }] = useAccount();
  return accountData?.address ?? null;
}
