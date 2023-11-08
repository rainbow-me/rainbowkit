import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';

export function useMainnetEnsName(address: string | undefined) {
  const { data: ensName } = useEnsName({
    chainId: mainnet.id,
    address: address as `0x`,
  });

  return ensName;
}
