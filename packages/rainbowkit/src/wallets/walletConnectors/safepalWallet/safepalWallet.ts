import type { InstructionStepName, Wallet } from '../../Wallet';

export const safepalWallet = (): Wallet => {
  const getUriMobile = (uri: string) => {
    return `safepalwallet://wc?uri=${encodeURIComponent(uri)}`;
  };

  const getUriQR = (uri: string) => {
    return uri;
  };

  const mobileConnector = {
    getUri: getUriMobile,
  };

  const qrConnector = {
    getUri: getUriQR,
    instructions: {
      learnMoreUrl: 'https://safepal.com/',
      steps: [
        {
          description: 'wallet_connectors.safepal.qr_code.step1.description',
          step: 'install' as InstructionStepName,
          title: 'wallet_connectors.safepal.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.safepal.qr_code.step2.description',
          step: 'create' as InstructionStepName,
          title: 'wallet_connectors.safepal.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.safepal.qr_code.step3.description',
          step: 'scan' as InstructionStepName,
          title: 'wallet_connectors.safepal.qr_code.step3.title',
        },
      ],
    },
  };

  const extensionConnector = {
    instructions: {
      learnMoreUrl: 'https://www.safepal.com/download?product=2',
      steps: [
        {
          description: 'wallet_connectors.safepal.extension.step1.description',
          step: 'install' as InstructionStepName,
          title: 'wallet_connectors.safepal.extension.step1.title',
        },
        {
          description: 'wallet_connectors.safepal.extension.step2.description',
          step: 'create' as InstructionStepName,
          title: 'wallet_connectors.safepal.extension.step2.title',
        },
        {
          description: 'wallet_connectors.safepal.extension.step3.description',
          step: 'refresh' as InstructionStepName,
          title: 'wallet_connectors.safepal.extension.step3.title',
        },
      ],
    },
  };

  return {
    id: 'safepal',
    name: 'SafePal Wallet',
    iconUrl: async () => (await import('./safepalWallet.svg')).default,
    // Note that we never resolve `installed` to `false` because the
    // SafePal Wallet provider falls back to other connection methods if
    // the injected connector isn't available
    namespace: 'safepalProvider',
    flag: 'isSafePal',
    iconAccent: '#3375BB',
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=io.safepal.wallet&referrer=utm_source%3Drainbowkit%26utm_medium%3Ddisplay%26utm_campaign%3Ddownload',
      ios: 'https://apps.apple.com/app/apple-store/id1548297139?pt=122504219&ct=rainbowkit&mt=8',
      mobile: 'https://www.safepal.com/en/download',
      qrCode: 'https://www.safepal.com/en/download',
      chrome:
        'https://chrome.google.com/webstore/detail/safepal-extension-wallet/lgmpcpglpngdoalbgeoldeajfclnhafa',
      browserExtension: 'https://www.safepal.com/download?product=2',
    },
    mobile: mobileConnector,
    qrCode: qrConnector,
    extension: extensionConnector,
  };
};
