import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type GateWalletOptions = DefaultWalletOptions;

export const gateWallet = ({
  projectId,
  walletConnectParameters,
}: GateWalletOptions): Wallet => {
  const isGateInjected = hasInjectedProvider({ namespace: 'gatewallet' });
  const shouldUseWalletConnect = !isGateInjected;

  return {
    id: 'gate',
    name: 'Gate Wallet',
    rdns: 'io.gate.wallet',
    iconUrl: async () => (await import('./gateWallet.svg')).default,
    iconAccent: '#fff',
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.gateio.gateio',
      ios: 'https://apps.apple.com/us/app/gate-io-buy-bitcoin-crypto/id1294998195',
      mobile: 'https://www.gate.io/mobileapp',
      qrCode: 'https://www.gate.io/web3',
      chrome:
        'https://chromewebstore.google.com/detail/gate-wallet/cpmkedoipcpimgecpmgpldfpohjplkpp',
      browserExtension: 'https://www.gate.io/web3',
    },
    mobile: {
      getUri: shouldUseWalletConnect
        ? (uri: string) => {
            return isAndroid()
              ? uri
              : `gtweb3wallet://wc?uri=${encodeURIComponent(uri)}`;
          }
        : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://www.gate.io/learn',
            steps: [
              {
                description: 'wallet_connectors.gate.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.gate.qr_code.step1.title',
              },
              {
                description: 'wallet_connectors.gate.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.gate.qr_code.step2.title',
              },
              {
                description: 'wallet_connectors.gate.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.gate.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://www.gate.io/learn',
        steps: [
          {
            description: 'wallet_connectors.gate.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.gate.extension.step1.title',
          },
          {
            description: 'wallet_connectors.gate.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.gate.extension.step2.title',
          },
          {
            description: 'wallet_connectors.gate.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.gate.extension.step3.title',
          },
        ],
      },
    },

    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ namespace: 'gatewallet' }),
  };
};
