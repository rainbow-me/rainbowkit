import { createConnector } from 'wagmi';
import { type MetaMaskParameters, metaMask } from 'wagmi/connectors';
import type {
  DefaultWalletOptions,
  Wallet,
  WalletDetailsParams,
} from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import { isMobile } from '../../../utils/isMobile';
import type { WindowProvider } from '../../../types/utils';

export type MetaMaskWalletOptions = DefaultWalletOptions;

type AcceptedMetaMaskParameters = Omit<
  MetaMaskParameters,
  | 'checkInstallationImmediately'
  | 'connectWith'
  | 'dappMetadata'
  | 'headless'
  | 'preferDesktop'
>;

interface MetaMaskWallet extends AcceptedMetaMaskParameters {
  (params: MetaMaskWalletOptions): Wallet;
}

function isMetaMask(ethereum?: WindowProvider['ethereum']): boolean {
  // Logic borrowed from wagmi's legacy MetaMaskConnector
  // Non-exhaustive list of wallets that try to make themselves look like MetaMask
  if (!ethereum?.isMetaMask) return false;
  // Brave tries to make itself look like MetaMask
  // Could also try RPC `web3_clientVersion` if following is unreliable
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    return false;
  if (ethereum.isApexWallet) return false;
  if (ethereum.isAvalanche) return false;
  if (ethereum.isBackpack) return false;
  if (ethereum.isBifrost) return false;
  if (ethereum.isBitKeep) return false;
  if (ethereum.isBitski) return false;
  if (ethereum.isBinance) return false;
  if (ethereum.isBlockWallet) return false;
  if (ethereum.isCoinbaseWallet) return false;
  if (ethereum.isDawn) return false;
  if (ethereum.isEnkrypt) return false;
  if (ethereum.isExodus) return false;
  if (ethereum.isFrame) return false;
  if (ethereum.isFrontier) return false;
  if (ethereum.isGamestop) return false;
  if (ethereum.isHyperPay) return false;
  if (ethereum.isImToken) return false;
  if (ethereum.isKuCoinWallet) return false;
  if (ethereum.isMathWallet) return false;
  if (ethereum.isNestWallet) return false;
  if (ethereum.isOkxWallet || ethereum.isOKExWallet) return false;
  if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet)
    return false;
  if (ethereum.isOpera) return false;
  if (ethereum.isPhantom) return false;
  if (ethereum.isZilPay) return false;
  if (ethereum.isPortal) return false;
  if (ethereum.isxPortal) return false;
  if (ethereum.isRabby) return false;
  if (ethereum.isRainbow) return false;
  if (ethereum.isStatus) return false;
  if (ethereum.isTalisman) return false;
  if (ethereum.isTally) return false;
  if (ethereum.isTokenPocket) return false;
  if (ethereum.isTokenary) return false;
  if (ethereum.isTrust || ethereum.isTrustWallet) return false;
  if (ethereum.isCTRL) return false;
  if (ethereum.isZeal) return false;
  if (ethereum.isCoin98) return false;
  if (ethereum.isMEWwallet) return false;
  if (ethereum.isSafeheron) return false;
  if (ethereum.isSafePal) return false;
  if (ethereum.isWigwam) return false;
  if (ethereum.isZerion) return false;
  if (ethereum.__seif) return false;
  return true;
}

export const metaMaskWallet: MetaMaskWallet = ({
  projectId,
  walletConnectParameters,
}: MetaMaskWalletOptions): Wallet => {
  // Extract all AcceptedMetaMaskParameters from metaMaskWallet
  // This approach avoids type errors for properties not yet in upstream connector
  const { ...optionalConfig } = metaMaskWallet;

  // Custom logic to explicitly detect MetaMask
  // Whereas hasInjectedProvider only checks for impersonated `isMetaMask`
  // We need this because MetaMask SDK hangs on impersonated wallets
  // Previously MetaMask provider would trigger for impersonated wallets
  const isMetaMaskInjected =
    typeof window !== 'undefined' ? isMetaMask(window.ethereum) : false;

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
              enableAnalytics: false, // Disable analytics by default
              ...optionalConfig,
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
