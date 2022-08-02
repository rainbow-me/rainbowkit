import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

export type ConnectionStatus = 'disconnected' | 'loading' | 'connected';

export function useConnectionStatus({
  authEnabled,
}: {
  authEnabled: boolean;
}): ConnectionStatus {
  const { isConnected } = useAccount();
  const session = useSession();

  if (!isConnected) {
    return 'disconnected';
  }

  if (!authEnabled) {
    return 'connected';
  }

  if (session.status === 'loading') {
    return 'loading';
  }

  return session.status === 'authenticated' ? 'connected' : 'disconnected';
}
