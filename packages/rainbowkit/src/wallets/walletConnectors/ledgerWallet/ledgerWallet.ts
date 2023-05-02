/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isSafari } from '../../../utils/browsers';
import { isAndroid, isIOS } from '../../../utils/isMobile';
import { isMacOS } from '../../../utils/platforms';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

interface WindowWithEthereum {
  ethereum: ExtensionProvider;
}

interface ExtensionProvider {
  isLedgerConnect: boolean;
  chainId: string;
}

const EXTENSION_WEB_URL = 'https://ledger.com/ledger-extension'
const EXTENSION_APPLE_URL = 'https://apps.apple.com/app/ledger-extension-browse-web3/id1627727841'
const LEDGERLIVE_WEB_URL = 'https://ledger.com/ledger-live'
const LEDGERLIVE_ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.ledger.live'
const LEDGERLIVE_APPLE_URL = 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700'

enum ExtensionSupportedChains {
  EthereumMainnet = 1,
  Polygon = 137,
};

export interface LedgerWalletOptions {
  projectId?: string;
  chains: Chain[];
}

export const ledgerWallet = ({
  chains,
  projectId,
  ...options
}: LedgerWalletOptions & InjectedConnectorOptions): Wallet => {
  console.log('chains is', chains);

  const isExtensionSupported = (isIOS() || isMacOS()) && isSafari();
  console.log('isExtensionSupported is', isExtensionSupported);

  const isFirstChainSupported = !!ExtensionSupportedChains[chains[0].id];
  console.log('isFirstChainSupported is', isFirstChainSupported);

  // TODO only works if Extension is using early injection, need to test on Chrome
  const isExtensionEnabled = !!(typeof window !== 'undefined' &&
    (window as unknown as WindowWithEthereum).ethereum?.isLedgerConnect);
  console.log('isExtensionInstalled is', isExtensionEnabled);

  // only use Extension if it is enabled and the first chain is supported
  const shouldUseExtension = !!(isFirstChainSupported && isExtensionEnabled);
  console.log('shouldUseExtension is', shouldUseExtension);

  const downloadUrls = (isFirstChainSupported && isExtensionSupported)
    // supported browser and chain on macOS
    // show Extension download link
    ? {
      // shown on macOS
      browserExtension: EXTENSION_APPLE_URL,
      // shown on iOS/iPadOS
      ios: EXTENSION_APPLE_URL,
      // shown on macOS as QR code for mobile
      qrCode: EXTENSION_WEB_URL,
    }
    // unsupported browser or chain
    : {
      // shown on other browsers on Android and iOS
      android: LEDGERLIVE_ANDROID_URL,
      ios: LEDGERLIVE_APPLE_URL,
      // shown on other browsers on macOS as a QR code for mobile
      // TODO no clickable link to install LL on macOS
      qrCode: LEDGERLIVE_WEB_URL,
    };
  console.log('downloadUrls is', downloadUrls);

  return {
    id: 'ledger',
    iconBackground: '#000',
    name: 'Ledger',
    iconUrl: async () => (await import('./ledgerWallet.svg')).default,
    downloadUrls,
    installed: true,
    createConnector: () => {
      const connector =
          shouldUseExtension
          ? new InjectedConnector({ chains, options })
          : getWalletConnectConnector({ projectId, chains });
      console.log('connector is', connector)

      return {
        connector,
        mobile: {
          getUri: shouldUseExtension
            // don't set getUri
            ? undefined
            // return the WC URI
            : async () => {
              const { uri } = (await connector.getProvider()).connector;
              return isAndroid()
                // TODO doesn't the ledgerlive:// URI work on Android?
                //  a wc:// URI might load another wallet app
                ? uri
                : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
            },
        },
        desktop: {
          getUri: shouldUseExtension
            // don't set getUri
            ? undefined
            // return the WC URI
            : async () => {
              const { uri } = (await connector.getProvider()).connector;
              return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
            },
        },
        qrCode: {
          getUri: async () => {
            if (shouldUseExtension) {
              return undefined;
            } else {
              return (await connector.getProvider()).connector.uri
            }
          },
          instructions: {
            learnMoreUrl: LEDGERLIVE_WEB_URL,
            steps: [
              {
                description:
                  'We recommend putting Ledger Live on your home screen for quicker access.',
                step: 'install',
                title: 'Open the Ledger Live app',
              },
              {
                description:
                  'You can easily backup your wallet using the cloud backup feature.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'After you scan, a connection prompt will appear for you to connect your wallet.',
                step: 'scan',
                title: 'Tap the scan button',
              },
            ],
          },
        },
        extension: {
          instructions: {
            learnMoreUrl: EXTENSION_WEB_URL,
            steps: [
              {
                description:
                  'Select Safari from the menu bar and then Preferences, or Settings. Select Extensions. Check the box next to Ledger Extension.',
                step: 'install',
                title: 'Activate the Ledger Extension',
              },
              {
                description:
                  'Click on the Ledger logo located on the left of the URL bar. Select "Always Allow on Every Website". The Ledger logo should turn blue.',
                step: 'create',
                title: 'Allow Safari Permissions',
              },
              {
                description:
                  'Make sure vour device is unlocked with the Ethereum app installed and opened. Click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Connect your Ledger & Refresh',
              },
            ],
          },
        }
      };
    },
  };
};
