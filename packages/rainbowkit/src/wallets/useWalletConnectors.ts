import { useEffect } from 'react';
import { Connector, useConnect } from 'wagmi';
import { WalletConnectorInstance } from './WalletConnectorInstance';

export interface WalletConnector extends WalletConnectorInstance {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
  onConnecting?: (fn: () => void) => void;
  showWalletConnectModal?: () => void;
}

export function useWalletConnectors(): WalletConnector[] {
  const { connectAsync, connector, connectors } = useConnect();

  useEffect(() => () => {
    connector?.off('connecting');
  });

  return (
    connectors as (Connector<any, any> & { _wallet: WalletConnectorInstance })[]
  )
    .filter(connector => connector._wallet)
    .map(connector => {
      const wallet = connector._wallet as WalletConnectorInstance;

      return {
        ...wallet,
        connect: () => connectAsync(connector),
        onConnecting: fn => connector.on('connecting', fn),
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
