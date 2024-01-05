import { WalletConnectParameters } from 'wagmi/connectors';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface WalletConnectWalletOptions {
  projectId: string;
  walletConnectParameters?: WalletConnectParameters;
}

// Used for maintance purposes for `connectorsForWallets` logic
// wcId = "WalletConnect id"
export const wcId = 'walletConnect';

export const walletConnectWallet = ({
  projectId,
  walletConnectParameters,
}: WalletConnectWalletOptions): Wallet => {
  const getUri = (uri: string) => uri;

  return {
    id: wcId,
    name: 'WalletConnect',
    installed: true,
    iconUrl: async () => (await import('./walletConnectWallet.svg')).default,
    iconBackground: '#3b99fc',
    qrCode: { getUri },
    createConnector: getWalletConnectConnector({
      projectId,
      walletConnectParameters,
    }),
  };
};
