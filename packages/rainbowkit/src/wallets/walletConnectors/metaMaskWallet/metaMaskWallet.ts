import { createConnector } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import type {
  DefaultWalletOptions,
  Wallet,
  WalletDetailsParams,
} from '../../Wallet';
import { hasInjectedProvider } from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import { isMobile } from '../../../utils/isMobile';

export type MetaMaskWalletOptions = DefaultWalletOptions;

export const metaMaskWallet = ({
  projectId,
  walletConnectParameters,
}: MetaMaskWalletOptions): Wallet => {
  const isMetaMaskInjected = hasInjectedProvider({ flag: 'isMetaMask' });

  // TODO: This is a temporary solution to prefer WalletConnect for desktop qr code.
  const shouldUseWalletConnect = !isMetaMaskInjected && !isMobile();
  const shouldUseMetaMaskConnector = isMetaMaskInjected || isMobile();

  return {
    id: 'metaMask',
    name: 'MetaMask',
    rdns: 'io.metamask',
    iconUrl: async () => (await import('./metaMaskWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: isMetaMaskInjected ? isMetaMaskInjected : undefined,
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
    mobile: {
      // MetaMask mobile deep linking handled by wagmi, return URI unchanged.
      getUri: shouldUseMetaMaskConnector ? (uri: string) => uri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) =>
            `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`,
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
    extension: {
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
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : // MetaMask connector
        (walletDetails: WalletDetailsParams) => {
          return createConnector((config) => {
            const metamaskConnector = metaMask({
              dappMetadata: {
                connector: 'rainbowkit',
                name: walletConnectParameters?.metadata?.name,
                iconUrl: walletConnectParameters?.metadata?.icons[0],
                url: walletConnectParameters?.metadata?.url,
              },
              headless: true,
              checkInstallationImmediately: false,
              enableAnalytics: false,
            })(config);

            /**
             * Override getChainId to avoid metamask error
             *
             * @see https://github.com/rainbow-me/rainbowkit/blob/cdcaa25d66b522119852502f71c8efc02b1abdd9/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L57
             * And @see https://github.com/wevm/wagmi/blob/275cccb51437908a2d7d3dab0549c6050b6340d3/packages/connectors/src/metaMask.ts#L154
             */
            return {
              ...metamaskConnector,
              ...walletDetails,
              getChainId: async () => {
                try {
                  return await metamaskConnector.getChainId();
                } catch {
                  return config.chains[0]?.id ?? 1;
                }
              },
            };
          });
        },
  };
};
