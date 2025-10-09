import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WindowProvider } from '../../../types/utils';

export type NovaWalletOptions = DefaultWalletOptions;

function isNovaWallet(ethereum?: WindowProvider['ethereum']): boolean {
  if (ethereum?.isNovaWallet) return true;

  return false;
}

export const novaWallet = ({
  projectId,
  walletConnectParameters,
}: NovaWalletOptions): Wallet => {
  const isNovaWalletInjected =
    typeof window !== 'undefined' ? isNovaWallet(window.ethereum) : false;

  const shouldUseWalletConnect = !isNovaWalletInjected;

  const getUriMobile = (uri: string) => {
    return `novawallet://wc?uri=${encodeURIComponent(uri)}`;
  };

  const mobileConnector = {
    getUri: shouldUseWalletConnect ? getUriMobile : undefined,
  };

  return {
    id: 'nova',
    name: 'Nova Wallet',
    rdns: 'io.novawallet',
    iconUrl: async () => (await import('./novaWallet.svg')).default,
    iconBackground: '#fff',
    installed: isNovaWalletInjected || undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=io.novafoundation.nova.market',
      ios: 'https://apps.apple.com/us/app/nova-polkadot-wallet/id1597119355',
      mobile: 'https://nova-wallet.app.link',
      qrCode: 'https://nova-wallet.app.link',
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl:
              'https://docs.novawallet.io/nova-wallet-wiki/dapps/using-walletconnect-for-dapps',
            steps: [
              {
                description: 'wallet_connectors.nova.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.nova.qr_code.step1.title',
              },
              {
                description: 'wallet_connectors.nova.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.nova.qr_code.step2.title',
              },
              {
                description: 'wallet_connectors.nova.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.nova.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    mobile: mobileConnector,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          namespace: 'ethereum',
        }),
  };
};
