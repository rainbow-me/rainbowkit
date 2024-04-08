import { useAccount } from 'wagmi';
import { useAuthenticationStatus } from '../components/RainbowKitProvider/AuthenticationContext';
import { useRainbowKitWagmiState } from '../components/RainbowKitProvider/RainbowKitWagmiStateProvider';

export type ConnectionStatus =
  | 'disconnected'
  | 'loading'
  | 'unauthenticated'
  | 'connected';

export function useConnectionStatus(): ConnectionStatus {
  const authenticationStatus = useAuthenticationStatus();
  const { isConnected } = useAccount();
  const { isDisconnecting } = useRainbowKitWagmiState();

  if (!isConnected || isDisconnecting) {
    return 'disconnected';
  }

  if (!authenticationStatus) {
    return 'connected';
  }

  if (
    authenticationStatus === 'loading' ||
    authenticationStatus === 'unauthenticated'
  ) {
    return authenticationStatus;
  }

  return 'connected';
}
