import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';

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
      mobile: 'https://ciphertrade.org',
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
                description:
                  'wallet_connectors.ciphertrade.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.ciphertrade.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.ciphertrade.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.ciphertrade.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.ciphertrade.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.ciphertrade.qr_code.step3.title',
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
