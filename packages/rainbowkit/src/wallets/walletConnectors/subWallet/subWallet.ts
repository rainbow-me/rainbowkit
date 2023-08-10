/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { InstructionStepName, Wallet } from '../../Wallet';
import {
  getWalletConnectConnector,
  WalletConnectConnectorOptions,
} from '../../getWalletConnectConnector';

declare global {
  interface Window {
    SubWallet: Window['ethereum'];
  }
}

export interface SubWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

const getSubWalletInjectedProvider = (): Window['ethereum'] => {
  if (typeof window === 'undefined') return;
  return window.SubWallet;
};

export const subWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: SubWalletOptions & InjectedConnectorOptions): Wallet => {
  const isSubWalletInjected = Boolean(getSubWalletInjectedProvider());
  const shouldUseWalletConnect = !isSubWalletInjected;

  return {
    id: 'subwallet',
    name: 'SubWallet',
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
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            version: walletConnectVersion,
            options: walletConnectOptions,
          })
        : new InjectedConnector({
            chains,
            options: {
              getProvider: getSubWalletInjectedProvider,
              ...options,
            },
          });

      const getUriMobile = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return `subwallet://wc?uri=${encodeURIComponent(uri)}`;
      };

      const getUriQR = async () => {
        return await getWalletConnectUri(connector, walletConnectVersion);
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
                  'We recommend putting SubWallet on your home screen for quicker access.',
                step: 'install' as InstructionStepName,
                title: 'Open the SubWallet app',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                step: 'create' as InstructionStepName,
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'After you scan, a connection prompt will appear for you to connect your wallet.',
                step: 'scan' as InstructionStepName,
                title: 'Tap the scan button',
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
                'We recommend pinning SubWallet to your taskbar for quicker access to your wallet.',
              step: 'install' as InstructionStepName,
              title: 'Install the SubWallet extension',
            },
            {
              description:
                'Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone.',
              step: 'create' as InstructionStepName,
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Once you set up your wallet, click below to refresh the browser and load up the extension.',
              step: 'refresh' as InstructionStepName,
              title: 'Refresh your browser',
            },
          ],
        },
      };

      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
        extension: extensionConnector,
      };
    },
  };
};
