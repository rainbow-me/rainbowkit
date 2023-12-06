import { useEnsName } from 'wagmi';
import { useShowEnsName } from '../components/RainbowKitProvider/ResponsiveRpcSettingsProvider';
import { useMainnet } from './useMainnet';

export function useMainnetEnsName(address: string | undefined) {
  const { chainId, enabled } = useMainnet();

  const showEnsName = useShowEnsName();

  const { data: ensName } = useEnsName({
    address: showEnsName ? address : undefined,
    chainId,
    enabled,
  });

  return ensName;
}
