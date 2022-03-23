import { Connector, useConnect } from 'wagmi';
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
  const { connectAsync, connectors } = useConnect();

  return (
    connectors as (Connector<any, any> & { _wallet: WalletConnectorInstance })[]
  )
    .filter(connector => connector._wallet)
    .map(connector => {
      return {
        ...(connector._wallet as WalletConnectorInstance),
        connect: () => connectAsync(connector),
        ready: (connector._wallet.installed ?? true) && connector.ready,
      };
    });
}
