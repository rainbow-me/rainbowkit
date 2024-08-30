import type {
  DefaultWalletOptions,
  InstructionStepName,
  Wallet,
} from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type SafepalWalletOptions = DefaultWalletOptions;

export const safepalWallet = ({
  projectId,
  walletConnectParameters,
}: SafepalWalletOptions): Wallet => {
  const isSafePalWalletInjected = hasInjectedProvider({
    namespace: 'safepalProvider',
    flag: 'isSafePal',
  });
  const shouldUseWalletConnect = !isSafePalWalletInjected;

  const getUriMobile = (uri: string) => {
    return `safepalwallet://wc?uri=${encodeURIComponent(uri)}`;
  };

  const getUriQR = async (uri: string) => {
    return uri;
  };

  const mobileConnector = {
    getUri: shouldUseWalletConnect ? getUriMobile : undefined,
  };

  let qrConnector = undefined;

  if (shouldUseWalletConnect) {
    qrConnector = {
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
  }

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
    installed: isSafePalWalletInjected,
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
    ...(qrConnector ? qrConnector : {}),
    extension: extensionConnector,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          namespace: 'safepalProvider',
          flag: 'isSafePal',
        }),
  };
};
