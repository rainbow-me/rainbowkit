import { useConnect } from 'wagmi';
import { WalletConnectorInstance } from './WalletConnectorInstance';

export interface WalletConnector extends WalletConnectorInstance {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
  showWalletConnectModal?: () => void;
}

export function useWalletConnectors(): WalletConnector[] {
  const [{ data: connectData }, connect] = useConnect();

  return connectData.connectors
    .filter(connector => connector._wallet)
    .map(connector => {
      const wallet = connector._wallet as WalletConnectorInstance;

      return {
        ...wallet,
        connect: () => connect(connector),
        ready: (wallet.installed ?? true) && connector.ready,
        showWalletConnectModal: wallet.walletConnectModalConnector
          ? () => connect(wallet.walletConnectModalConnector)
          : undefined,
      };
    });
}
