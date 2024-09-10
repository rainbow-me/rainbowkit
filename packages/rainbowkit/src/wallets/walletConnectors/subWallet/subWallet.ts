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

export type SubWalletOptions = DefaultWalletOptions;

export const subWallet = ({
  projectId,
  walletConnectParameters,
}: SubWalletOptions): Wallet => {
  const isSubWalletInjected = hasInjectedProvider({ namespace: 'SubWallet' });
  const shouldUseWalletConnect = !isSubWalletInjected;

  const getUriMobile = (uri: string) => {
    return `subwallet://wc?uri=${encodeURIComponent(uri)}`;
  };

  const getUriQR = (uri: string) => {
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
        learnMoreUrl: 'https://www.subwallet.app/',
        steps: [
          {
            description:
              'wallet_connectors.subwallet.qr_code.step1.description',
            step: 'install' as InstructionStepName,
            title: 'wallet_connectors.subwallet.qr_code.step1.title',
          },
          {
            description:
              'wallet_connectors.subwallet.qr_code.step2.description',
            step: 'create' as InstructionStepName,
            title: 'wallet_connectors.subwallet.qr_code.step2.title',
          },
          {
            description:
              'wallet_connectors.subwallet.qr_code.step3.description',
            step: 'scan' as InstructionStepName,
            title: 'wallet_connectors.subwallet.qr_code.step3.title',
          },
        ],
      },
    };
  }

  const extensionConnector = {
    instructions: {
      learnMoreUrl: 'https://www.subwallet.app/',
      steps: [
        {
          description:
            'wallet_connectors.subwallet.extension.step1.description',
          step: 'install' as InstructionStepName,
          title: 'wallet_connectors.subwallet.extension.step1.title',
        },
        {
          description:
            'wallet_connectors.subwallet.extension.step2.description',
          step: 'create' as InstructionStepName,
          title: 'wallet_connectors.subwallet.extension.step2.title',
        },
        {
          description:
            'wallet_connectors.subwallet.extension.step3.description',
          step: 'refresh' as InstructionStepName,
          title: 'wallet_connectors.subwallet.extension.step3.title',
        },
      ],
    },
  };

  return {
    id: 'subwallet',
    name: 'SubWallet',
    rdns: 'app.subwallet',
    iconUrl: async () => (await import('./subWallet.svg')).default,
    iconBackground: '#fff',
    installed: isSubWalletInjected || undefined,
    downloadUrls: {
      browserExtension: 'https://www.subwallet.app/download',
      chrome:
        'https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/subwallet/',
      edge: 'https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
      mobile: 'https://www.subwallet.app/download',
      android:
        'https://play.google.com/store/apps/details?id=app.subwallet.mobile',
      ios: 'https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285',
      qrCode: 'https://www.subwallet.app/download',
    },
    mobile: mobileConnector,
    qrCode: qrConnector,
    extension: extensionConnector,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ namespace: 'SubWallet' }),
  };
};
