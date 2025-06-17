import type { Wallet } from '../../Wallet';

export const zealWallet = (): Wallet => {
  return {
    id: 'zeal',
    name: 'Zeal',
    rdns: 'app.zeal',
    iconUrl: async () => (await import('./zealWallet.svg')).default,
    iconBackground: '#fff0',
    iconAccent: '#00FFFF',
    downloadUrls: {
      browserExtension: 'https://zeal.app',
      chrome:
        'https://chromewebstore.google.com/detail/zeal-wallet/heamnjbnflcikcggoiplibfommfbkjpj',
      android: 'https://play.google.com/store/apps/details?id=app.zeal.wallet',
      ios: 'https://testflight.apple.com/join/MP72Ytw8',
      mobile: 'https://zeal.app',
      qrCode: 'https://zeal.app',
    },
    flag: 'isZeal',
    mobile: {
      getUri: (uri: string) => {
        return `zeal://wc?uri=${encodeURIComponent(uri)}`;
      },
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://zeal.app',
        steps: [
          {
            description: 'wallet_connectors.zeal.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.zeal.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.zeal.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.zeal.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.zeal.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.zeal.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://zeal.app',
        steps: [
          {
            description: 'wallet_connectors.zeal.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.zeal.extension.step1.title',
          },
          {
            description: 'wallet_connectors.zeal.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.zeal.extension.step2.title',
          },
          {
            description: 'wallet_connectors.zeal.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.zeal.extension.step3.title',
          },
        ],
      },
    },
  };
};
