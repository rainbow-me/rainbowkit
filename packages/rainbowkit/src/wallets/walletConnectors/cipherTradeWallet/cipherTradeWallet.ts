import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type CipherTradeWalletOptions = DefaultWalletOptions;

export const cipherTradeWallet = ({
  projectId,
  walletConnectParameters,
}: CipherTradeWalletOptions): Wallet => {
  const isCipherTradeInjected = hasInjectedProvider({ flag: 'isCipherTrade' });
  const shouldUseWalletConnect = !isCipherTradeInjected;

  const getUriMobile = (uri: string) =>
    `ciphertrade://wc?uri=${encodeURIComponent(uri)}`;

  return {
    id: 'ciphertrade',
    name: 'CipherTrade',
    rdns: 'org.ciphertrade.app',
    iconUrl: async () => (await import('./cipherTradeWallet.svg')).default,
    iconBackground: '#131C2B',
    installed: isCipherTradeInjected || undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=org.ciphertrade.app',
      qrCode: 'https://ciphertrade.org',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? getUriMobile : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://ciphertrade.org',
            steps: [
              {
                description: 'Scan this QR code with the CipherTrade app.',
                step: 'scan',
                title: 'Scan with CipherTrade',
              },
            ],
          },
        }
      : undefined,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ flag: 'isCipherTrade' }),
  };
};