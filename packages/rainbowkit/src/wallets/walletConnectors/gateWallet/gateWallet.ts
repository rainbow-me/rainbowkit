import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const gateWallet = (): Wallet => {
  return {
    id: 'gate',
    name: 'Gate Wallet',
    rdns: 'io.gate.wallet',
    iconUrl: async () => (await import('./gateWallet.svg')).default,
    iconAccent: '#fff',
    iconBackground: '#fff',
    namespace: 'gatewallet',
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
      getUri: (uri: string) => {
        return isAndroid()
          ? uri
          : `gtweb3wallet://wc?uri=${encodeURIComponent(uri)}`;
      },
    },
    qrCode: {
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
    },
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
  };
};
