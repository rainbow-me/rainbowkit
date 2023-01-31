/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { InstructionStepName, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

declare global {
  interface Window {
    trustwallet: Window['ethereum'];
  }
}

export interface TrustWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

function getTrustWalletInjectedProvider(): Window['ethereum'] {
  const isTrustWallet = (ethereum: NonNullable<Window['ethereum']>) => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  // No injected providers exist.
  if (!injectedProviderExist) {
    return;
  }

  // Trust Wallet was injected into window.ethereum.
  if (isTrustWallet(window.ethereum!)) {
    return window.ethereum;
  }

  // Trust Wallet provider might be replaced by another
  // injected provider, check the providers array.
  if (window.ethereum?.providers) {
    return window.ethereum.providers.find(isTrustWallet);
  }

  // In some cases injected providers can replace window.ethereum
  // without updating the providers array. In those instances the Trust Wallet
  // can be installed and its provider instance can be retrieved by
  // looking at the global `trustwallet` object.
  return window['trustwallet'];
}

export const trustWallet = ({
  chains,
  shimDisconnect,
}: TrustWalletOptions): Wallet => {
  const isTrustWalletInjected = Boolean(getTrustWalletInjectedProvider());
  const shouldUseWalletConnect = !isTrustWalletInjected;

  return {
    id: 'trust',
    name: 'Trust Wallet',
    iconUrl: async () => (await import('./trustWallet.svg')).default,
    // Note that we never resolve `installed` to `false` because the
    // Trust Wallet provider falls back to other connection methods if
    // the injected connector isn't available
    installed: isTrustWalletInjected || undefined,
    iconAccent: '#3375BB',
    iconBackground: '#fff',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
      android:
        'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
      qrCode: 'https://trustwallet.com/download',
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
      };

      const getUriQR = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return uri;
      };

      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options: {
              name: 'Trust Wallet',
              shimDisconnect,
              shimChainChangedDisconnect: true,
              getProvider: getTrustWalletInjectedProvider,
            },
          });

      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriMobile : undefined,
      };

      let qrConnector = undefined;

      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions: {
            learnMoreUrl: 'https://trustwallet.com/',
            steps: [
              {
                description:
                  'Put Trust Wallet on your home screen for faster access to your wallet.',
                step: 'install' as InstructionStepName,
                title: 'Open the Trust Wallet app',
              },
              {
                description: 'Create a new wallet or import an existing one.',
                step: 'create' as InstructionStepName,
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Choose New Connection, then scan the QR code and confirm the prompt to connect.',
                step: 'scan' as InstructionStepName,
                title: 'Tap WalletConnect in Settings',
              },
            ],
          },
        };
      }

      const extensionConnector = {
        instructions: {
          learnMoreUrl: 'https://trustwallet.com/browser-extension',
          steps: [
            {
              description:
                'Click at the top right of your browser and pin Trust Wallet for easy access.',
              step: 'install' as InstructionStepName,
              title: 'Install the Trust Wallet extension',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create' as InstructionStepName,
              title: 'Create or Import a wallet',
            },
            {
              description:
                'Once you set up Trust Wallet, click below to refresh the browser and load up the extension.',
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
