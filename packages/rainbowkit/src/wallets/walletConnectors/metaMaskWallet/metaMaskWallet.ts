import { isAndroid, isIOS } from '../../../utils/isMobile';
import { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type MetaMaskWalletOptions = DefaultWalletOptions;

function isMetaMask(ethereum?: (typeof window)['ethereum']): boolean {
  // Logic borrowed from wagmi's MetaMaskConnector
  // https://github.com/wagmi-dev/references/blob/main/packages/connectors/src/metaMask.ts
  if (!ethereum?.isMetaMask) return false;
  // Brave tries to make itself look like MetaMask
  // Could also try RPC `web3_clientVersion` if following is unreliable
  // @ts-ignore - viem/window clash
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isApexWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isAvalanche) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isBackpack) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isBifrost) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isBitKeep) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isBitski) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isBlockWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isCoinbaseWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isDawn) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isEnkrypt) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isExodus) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isFrame) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isFrontier) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isGamestop) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isHyperPay) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isImToken) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isKuCoinWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isMathWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isOkxWallet || ethereum.isOKExWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet)
    return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isOpera) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isPhantom) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isPortal) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isRabby) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isRainbow) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isStatus) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isTalisman) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isTally) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isTokenPocket) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isTokenary) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isTrust || ethereum.isTrustWallet) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isXDEFI) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isZeal) return false;
  // @ts-ignore - viem/window clash
  if (ethereum.isZerion) return false;
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
              ? // @ts-ignore - viem/window clash
                window.ethereum?.providers?.find(isMetaMask) ?? window.ethereum
              : undefined,
        }),
  };
};
