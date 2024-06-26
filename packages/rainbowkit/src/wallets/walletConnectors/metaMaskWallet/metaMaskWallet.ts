import { createConnector } from 'wagmi';
import type { CreateConnectorFn } from 'wagmi';
import { type MetaMaskParameters, metaMask } from 'wagmi/connectors';
import { isMobile } from '../../../utils/isMobile';
import type { CreateWalletFn, Wallet, WalletDetailsParams } from '../../Wallet';
import { hasInjectedProvider } from '../../getInjectedConnector';

export const METAMASK_WALLET_ID = 'metaMask';

export type MetaMaskWalletOptions = Pick<
  Parameters<CreateWalletFn>[0],
  'appName' | 'appIcon'
>;

export interface MetamaskWallet {
  (params: MetaMaskWalletOptions): Wallet;
  parameters?: Pick<MetaMaskParameters, 'infuraAPIKey'>;
}

export interface MetaMaskConnector extends ReturnType<CreateConnectorFn> {
  getDisplayUri: () => Promise<string>;
}

export const metaMaskWallet: MetamaskWallet = (
  dappParams: MetaMaskWalletOptions,
): Wallet => {
  const isExtensionInjected = hasInjectedProvider({ flag: 'isMetaMask' });

  return {
    id: METAMASK_WALLET_ID,
    name: 'MetaMask',
    rdns: 'io.metamask',
    iconUrl: async () => (await import('./metaMaskWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: isExtensionInjected ? true : undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
      mobile: 'https://metamask.io/download',
      qrCode: 'https://metamask.io/download',
      chrome:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
      firefox: 'https://addons.mozilla.org/firefox/addon/ether-metamask',
      opera: 'https://addons.opera.com/extensions/details/metamask-10',
      browserExtension: 'https://metamask.io/download',
    },
    mobile: isMobile()
      ? {
          getUri: (uri: string) => uri,
        }
      : undefined,
    qrCode: !isExtensionInjected
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://metamask.io/faqs/',
            steps: [
              {
                description:
                  'wallet_connectors.metamask.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.metamask.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.metamask.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.metamask.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.metamask.qr_code.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.metamask.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: !isExtensionInjected
      ? {
          instructions: {
            learnMoreUrl: 'https://metamask.io/faqs/',
            steps: [
              {
                description:
                  'wallet_connectors.metamask.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.metamask.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.metamask.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.metamask.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.metamask.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.metamask.extension.step3.title',
              },
            ],
          },
        }
      : undefined,
    createConnector: (walletDetails: WalletDetailsParams) => {
      return createConnector((config) => {
        const metamaskConnector = metaMask({
          ...metaMaskWallet.parameters,
          enableAnalytics: true,
          extensionOnly: isExtensionInjected ? true : undefined,
          dappMetadata: {
            name: dappParams.appName,
            iconUrl: dappParams.appIcon,
          },
          modals: {
            install: () => {
              return {
                mount: () => {},
                unmount: () => {},
              };
            },
          },
        })(config);

        /**
         * Override getChainId to avoid metamask error
         *
         * @see https://github.com/rainbow-me/rainbowkit/blob/cdcaa25d66b522119852502f71c8efc02b1abdd9/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L57
         * And @see https://github.com/wevm/wagmi/blob/275cccb51437908a2d7d3dab0549c6050b6340d3/packages/connectors/src/metaMask.ts#L154
         */
        const getChainId = metamaskConnector.getChainId;
        metamaskConnector.getChainId = async () => {
          try {
            return await getChainId();
          } catch {
            return config.chains[0]?.id ?? 1;
          }
        };

        /**
         * Metamask emits the display_uri event only once when starting the connection.
         * On subsequent attempts, it will wait for the first initialization.
         * However, RainbowKit will listen for the display_uri event on each attempt.
         * @see https://github.com/MetaMask/metamask-sdk/blob/90f2b7e96bcb7cca2f6c409909435325a615e2c1/packages/sdk/src/provider/initializeMobileProvider.ts#L122
         */
        const displayUri: { value?: string } = {};
        const getDisplayUri = async () => {
          if (displayUri.value) {
            return displayUri.value;
          }

          const provider = await metamaskConnector.getProvider();
          displayUri.value = await new Promise((resolve) => {
            const onDisplayUri = (uri: unknown) => {
              displayUri.value = uri as string;
            };
            provider.once('display_uri', (uri) => {
              provider.on('display_uri', onDisplayUri);
              provider.once('disconnect', () => {
                provider.removeListener('display_uri', onDisplayUri);
                displayUri.value = undefined;
              });

              resolve(uri as string);
            });
          });

          return displayUri.value;
        };

        return {
          getDisplayUri,
          ...metamaskConnector,
          ...walletDetails,
        };
      });
    },
  };
};
