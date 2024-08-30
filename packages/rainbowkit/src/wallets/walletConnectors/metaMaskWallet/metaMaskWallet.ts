import type { WindowProvider } from '../../../types/utils';
import { isAndroid, isIOS } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type MetaMaskWalletOptions = DefaultWalletOptions;

function isMetaMask(ethereum?: WindowProvider['ethereum']): boolean {
  // Logic borrowed from wagmi's MetaMaskConnector
  // https://github.com/wagmi-dev/references/blob/main/packages/connectors/src/metaMask.ts
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
  if (ethereum.isPortal) return false;
  if (ethereum.isRabby) return false;
  if (ethereum.isRainbow) return false;
  if (ethereum.isStatus) return false;
  if (ethereum.isTalisman) return false;
  if (ethereum.isTally) return false;
  if (ethereum.isTokenPocket) return false;
  if (ethereum.isTokenary) return false;
  if (ethereum.isTrust || ethereum.isTrustWallet) return false;
  if (ethereum.isXDEFI) return false;
  if (ethereum.isZeal) return false;
  if (ethereum.isZerion) return false;
  if (ethereum.__seif) return false;
  return true;
}

export const metaMaskWallet = ({
  projectId,
  walletConnectParameters,
}: MetaMaskWalletOptions): Wallet => {
  // Not using the explicit isMetaMask fn to check for MetaMask
  // so that users can continue to use the MetaMask button
  // to interact with wallets compatible with window.ethereum.
  // The connector's getProvider will instead favor the real MetaMask
  // in window.providers scenarios with multiple wallets injected.
  const isMetaMaskInjected = hasInjectedProvider({ flag: 'isMetaMask' });
  const shouldUseWalletConnect = !isMetaMaskInjected;

  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : isIOS()
        ? // currently broken in MetaMask v6.5.0 https://github.com/MetaMask/metamask-mobile/issues/6457
          `metamask://wc?uri=${encodeURIComponent(uri)}`
        : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'metaMask',
    name: 'MetaMask',
    rdns: 'io.metamask',
    iconUrl: async () => (await import('./metaMaskWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
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
      getUri: shouldUseWalletConnect ? getUri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri,
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
      : getInjectedConnector({
          target:
            typeof window !== 'undefined'
              ? (window as WindowProvider).ethereum?.providers?.find(
                  isMetaMask,
                ) ?? window.ethereum
              : undefined,
        }),
  };
};
