/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface TrustWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

function isTrust(ethereum: NonNullable<typeof window['ethereum']>) {
  // Logic borrowed from wagmi's MetaMaskConnector
  // https://github.com/tmm/wagmi/blob/main/packages/core/src/connectors/metaMask.ts
  const isTrust = Boolean(ethereum.isTrust);

  if (!isTrust) {
    return false;
  }

  // Brave tries to make itself look like MetaMask
  // Could also try RPC `web3_clientVersion` if following is unreliable
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false;
  }

  if (ethereum.isTokenPocket) {
    return false;
  }

  if (ethereum.isTokenary) {
    return false;
  }

  return true;
}

export const trustWallet = ({
  chains,
  shimDisconnect,
}: TrustWalletOptions): Wallet => {
  const isTrustInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isTrust(window.ethereum);

  const shouldUseWalletConnect = !isTrustInjected;

  return {
    id: 'trust',
    name: 'Trust Wallet',
    iconUrl: async () => (await import('./trustWallet.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isTrustInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
      android:
        'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
      qrCode: 'https://link.trustwallet.com',
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

        return isAndroid()
          ? uri
          : `https://link.trustwallet.com/wc?uri=${encodeURIComponent}`;
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
                learnMoreUrl:
                  'https://trustwallet.com/blog/an-introduction-to-trustwallet',
                steps: [
                  {
                    description:
                      'Put Trust Wallet on your home screen for faster access to your wallet.',
                    step: 'install',
                    title: 'Open the Trust Wallet app',
                  },
                  {
                    description:
                      'Create a new wallet or import an existing one.',
                    step: 'create',
                    title: 'Create or Import a Wallet',
                  },
                  {
                    description:
                      'Choose New Connection, then scan the QR code and confirm the prompt to connect.',
                    step: 'scan',
                    title: 'Tap WalletConnect in Settings',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          learnMoreUrl:
            'https://trustwallet.com/blog/an-introduction-to-trustwallet',
          instructions: {
            steps: [
              {
                description:
                  'We recommend pinning Trust Wallet to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the Trust Wallet extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
          },
        },
      };
    },
  };
};
