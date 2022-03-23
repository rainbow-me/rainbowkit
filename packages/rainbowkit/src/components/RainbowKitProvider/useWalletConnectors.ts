import { Connector, useConnect } from 'wagmi';
import { WalletConnectorInstance } from './wallet';

export interface WalletConnector extends WalletConnectorInstance {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
  showWalletConnectModal?: () => void;
}

export function useWalletConnectors(): WalletConnector[] {
  const { connectAsync, connectors } = useConnect();

  return (
    connectors as (Connector<any, any> & { _wallet: WalletConnectorInstance })[]
  )
    .filter(connector => connector._wallet)
    .map(connector => {
      const wallet = connector._wallet as WalletConnectorInstance;

      return {
        ...wallet,
        connect: () => connectAsync(connector),
        ready: (wallet.installed ?? true) && connector.ready,
        showWalletConnectModal: wallet.walletConnectModalConnector
          ? () =>
              connectAsync(
                wallet.walletConnectModalConnector as Connector<any, any>
              )
          : undefined,
      };
    });
}
