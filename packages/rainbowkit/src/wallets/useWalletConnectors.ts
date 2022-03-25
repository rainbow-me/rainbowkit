import { useConnect } from 'wagmi';
import { WalletInstance } from './Wallet';

export interface WalletConnector extends WalletInstance {
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
      const wallet = connector._wallet as WalletInstance;

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
