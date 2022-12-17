/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface OpenBlockWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

function isOpenBlock(ethereum: NonNullable<typeof window['ethereum']>) {
  // `isOpenBlock` needs to be added to the wagmi `Ethereum` object
  // @ts-expect-error
  return Boolean(ethereum.isOpenBlock);
}

export const openBlockWallet = ({
  chains,
  shimDisconnect,
}: OpenBlockWalletOptions): Wallet => {
  const isOpenBlockInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isOpenBlock(window.ethereum);

  const shouldUseWalletConnect = !isOpenBlockInjected;

  return {
    id: 'openBlock',
    name: 'OpenBlock',
    iconUrl: async () => (await import('./openBlock.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isOpenBlockInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/openblock-bridge/memiokcjdencbponfgbkojkenpdpejhj?utm_source=chrome-ntp-icon',
      android: 'https://openblock.com/#/initialize/welcome',
      ios: 'https://openblock.com/#/initialize/welcome',
      qrCode: 'https://openblock.com/#/initialize/welcome',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options: { shimDisconnect },
          });

      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return isAndroid() ? uri : `https://openblock.com/#/initialize/welcome`;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://openblock-support.zendesk.com/hc/zh-cn',
                steps: [
                  {
                    description:
                      'The OpenBlock Bridge extension will allow seamless connection to your web wallet.',
                    step: 'install',
                    title: 'Install the OpenBlock extension',
                  },
                  {
                    description:
                      'Create a new wallet with MPC by entering your Email address.',
                    step: 'create',
                    title: 'Create a wallet',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          learnMoreUrl: 'https://openblock-support.zendesk.com/hc/zh-cn',
          instructions: {
            steps: [
              {
                description:
                  'The OpenBlock Bridge extension will allow seamless connection to your web wallet.',
                step: 'install',
                title: 'Install the OpenBlock extension',
              },
              {
                description:
                  'Create a new wallet with MPC by entering your Email address.',
                step: 'create',
                title: 'Create a wallet',
              },
            ],
          },
        },
      };
    },
  };
};
