import { WalletConnectParameters } from 'wagmi/connectors';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface WalletConnectWalletOptions {
  projectId: string;
  walletConnectParameters?: WalletConnectParameters;
}

// Used for maintance purposes for `connectorsForWallets` logic
export const walletConnecWalletId = 'walletConnect';

export const walletConnectWallet = ({
  projectId,
  walletConnectParameters,
}: WalletConnectWalletOptions): Wallet => {
  const getUri = (uri: string) => uri;

  return {
    id: walletConnecWalletId,
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
