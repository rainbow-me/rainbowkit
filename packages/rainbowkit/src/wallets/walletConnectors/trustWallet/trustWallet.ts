/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { InstructionStepName, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

declare global {
  interface Window {
    trustwallet: Window['ethereum'];
  }
}

export interface TrustWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface TrustWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
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

  // Trust Wallet injected provider is available in the global scope.
  // There are cases that some cases injected providers can replace window.ethereum
  // without updating the ethereum.providers array. To prevent issues where
  // the TW connector does not recognize the provider when TW extension is installed,
  // we begin our checks by relying on TW's global object.
  if (window['trustwallet']) {
    return window['trustwallet'];
  }

  // Trust Wallet was injected into window.ethereum.
  if (isTrustWallet(window.ethereum!)) {
    return window.ethereum;
  }

  // Trust Wallet provider might be replaced by another
  // injected provider, check the providers array.
  if (window.ethereum?.providers) {
    // ethereum.providers array is a non-standard way to
    // preserve multiple injected providers. Eventually, EIP-5749
    // will become a living standard and we will have to update this.
    return window.ethereum.providers.find(isTrustWallet);
  }
}

export const trustWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: TrustWalletOptions & InjectedConnectorOptions): Wallet => {
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
      android:
        'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
      mobile: 'https://trustwallet.com/download',
      qrCode: 'https://trustwallet.com/download',
      chrome:
        'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
      browserExtension: 'https://trustwallet.com/browser-extension',
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return `trust://wc?uri=${encodeURIComponent(uri)}`;
      };

      const getUriQR = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return uri;
      };

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
              name: 'Trust Wallet',
              shimChainChangedDisconnect: true,
              getProvider: getTrustWalletInjectedProvider,
              ...options,
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
