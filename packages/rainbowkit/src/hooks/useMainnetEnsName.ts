import { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';

export function useMainnetEnsName(address: Address | undefined) {
  const { data: ensName } = useEnsName({
    chainId: mainnet.id,
    address: address,
  });

  return ensName;
}
