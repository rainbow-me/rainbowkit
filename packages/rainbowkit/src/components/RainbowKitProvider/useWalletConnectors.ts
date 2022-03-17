import { useConnect } from 'wagmi';
import { WalletConnectorInstance } from './wallet';

export interface WalletConnector
  extends Omit<WalletConnectorInstance, 'connector'> {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
}

export function useWalletConnectors(): WalletConnector[] {
  const [{ data: connectData }, connect] = useConnect();

  return connectData.connectors
    .filter(connector => connector._wallet)
    .map(connector => {
      return {
        ...(connector._wallet as WalletConnectorInstance),
        connect: () => connect(connector),
        ready: (connector._wallet.installed ?? true) && connector.ready,
      };
    });
}
