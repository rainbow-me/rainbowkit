import { Connector, useConnect } from 'wagmi';
import { WalletInstance } from './Wallet';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
  showWalletConnectModal?: () => void;
}

export function useWalletConnectors({
  groupRecentWallets = true,
}: { groupRecentWallets?: boolean } = {}): WalletConnector[] {
  const [{ data: connectData }, connect] = useConnect();
  const recentWalletIds = getRecentWalletIds();

  const recentConnectors: Connector[] = [];
  const otherConnectors: Connector[] = [];

  connectData.connectors
    .filter(connector => connector._wallet)
    .forEach(connector => {
      const wallet = connector._wallet as WalletInstance;

      if (groupRecentWallets && recentWalletIds.includes(wallet.id)) {
        recentConnectors.push(connector);
      } else {
        otherConnectors.push(connector);
      }
    });

  function connectWallet(walletId: string, connector: Connector) {
    return connect(connector).then(connection => {
      if (connection.data) {
        addRecentWalletId(walletId);
      }

      return connection;
    });
  }

  return [...recentConnectors, ...otherConnectors].map(
    (connector: Connector) => {
      const { groupName, ...wallet } = connector._wallet as WalletInstance;

      return {
        ...wallet,
        connect: () => connectWallet(wallet.id, connector),
        groupName: recentConnectors.includes(connector) ? 'Recent' : groupName,
        ready: (wallet.installed ?? true) && connector.ready,
        showWalletConnectModal: wallet.walletConnectModalConnector
          ? () => connectWallet(wallet.id, wallet.walletConnectModalConnector)
          : undefined,
      };
    }
  );
}
