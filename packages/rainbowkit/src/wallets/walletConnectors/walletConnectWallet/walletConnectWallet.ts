import type { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type WalletConnectWalletOptions = {};

export const walletConnectWallet = (): Wallet => {
  const getUri = (uri: string) => uri;

  return {
    id: 'walletConnect',
    name: 'WalletConnect',
    installed: undefined,
    iconUrl: async () => (await import('./walletConnectWallet.svg')).default,
    iconBackground: '#3b99fc',
    qrCode: { getUri },
    createConnector: getWalletConnectConnector(),
  };
};
