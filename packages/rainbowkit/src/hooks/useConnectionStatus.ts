import { useAccount } from 'wagmi';
import { useAuthenticationStatus } from '../components/RainbowKitProvider/AuthenticationContext';

export type ConnectionStatus =
  | 'disconnected'
  | 'loading'
  | 'unauthenticated'
  | 'connected';

export function useConnectionStatus(): ConnectionStatus {
  const authenticationStatus = useAuthenticationStatus();
  const { isConnected } = useAccount();

  if (!isConnected) {
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
