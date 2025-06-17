import type { Wallet } from '../../Wallet';

export const kaiaWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return `kaikas://walletconnect?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'kaia',
    name: 'Kaia Wallet',
    iconUrl: async () => (await import('./kaiaWallet.svg')).default,
    namespace: 'klaytn',
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi',
      browserExtension: 'https://app.kaiawallet.io',
      qrCode: 'https://app.kaiawallet.io',
      ios: 'https://apps.apple.com/us/app/kaia-wallet/id6502896387',
      android: 'https://play.google.com/store/apps/details?id=io.klutch.wallet',
      mobile: 'https://app.kaiawallet.io',
    },
    mobile: { getUri },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://kaiawallet.io',
        steps: [
          {
            description: 'wallet_connectors.kaia.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.kaia.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.kaia.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.kaia.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.kaia.qr_code.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.kaia.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://kaiawallet.io',
        steps: [
          {
            description: 'wallet_connectors.kaia.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.kaia.extension.step1.title',
          },
          {
            description: 'wallet_connectors.kaia.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.kaia.extension.step2.title',
          },
          {
            description: 'wallet_connectors.kaia.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.kaia.extension.step3.title',
          },
        ],
      },
    },
  };
};
