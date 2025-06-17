import type { Wallet } from '../../Wallet';

export const kaikasWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return `kaikas://walletconnect?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'kaikas',
    name: 'Kaikas Wallet',
    iconUrl: async () => (await import('./kaikasWallet.svg')).default,
    namespace: 'klaytn',
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
      browserExtension: 'https://app.kaikas.io',
      qrCode: 'https://app.kaikas.io',
      ios: 'https://apps.apple.com/us/app/kaikas-mobile-crypto-wallet/id1626107061',
      android: 'https://play.google.com/store/apps/details?id=io.klutch.wallet',
      mobile: 'https://app.kaikas.io',
    },
    mobile: { getUri },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://kaikas.io',
        steps: [
          {
            description: 'wallet_connectors.kaikas.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.kaikas.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.kaikas.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.kaikas.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.kaikas.qr_code.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.kaikas.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://kaikas.io',
        steps: [
          {
            description: 'wallet_connectors.kaikas.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.kaikas.extension.step1.title',
          },
          {
            description: 'wallet_connectors.kaikas.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.kaikas.extension.step2.title',
          },
          {
            description: 'wallet_connectors.kaikas.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.kaikas.extension.step3.title',
          },
        ],
      },
    },
  };
};
