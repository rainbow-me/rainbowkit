import type { Wallet } from '../../Wallet';

export const zilPayWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return `zilpay://wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'zilpay',
    name: 'ZilPay',
    rdns: 'io.zilpay',
    iconUrl: async () => (await import('./zilPayWallet.svg')).default,
    iconBackground: '#ffffff',
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=com.zilpaymobile',
      ios: 'https://apps.apple.com/ru/app/zilpay/id1547105860',
      mobile: 'https://zilpay.io/',
      qrCode: 'https://zilpay.io/',
    },
    flag: 'isZilPay',
    mobile: {
      getUri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://zilpay.io',
        steps: [
          {
            description: 'wallet_connectors.zilpay.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.zilpay.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.zilpay.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.zilpay.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.zilpay.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.zilpay.qr_code.step3.title',
          },
        ],
      },
    },
  };
};
