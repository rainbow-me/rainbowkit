import { Address } from 'viem';
import { useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export function useMainnetEnsName(address: Address | undefined) {
  const { data: ensName } = useEnsName({
    chainId: mainnet.id,
    address,
  });

  return ensName;
}
