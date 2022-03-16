import { useConnect } from 'wagmi';
import { WalletConnectorConfig } from './wallet';

export interface WalletConnector
  extends Omit<WalletConnectorConfig, 'connector'> {
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
        ...(connector._wallet as WalletConnectorConfig),
        connect: () => connect(connector),
        ready: (connector._wallet.installed ?? true) && connector.ready,
      };
    });
}
