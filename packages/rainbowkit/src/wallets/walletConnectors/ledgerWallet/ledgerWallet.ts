/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isSafari } from '../../../utils/browsers';
import { isAndroid, isIOS } from '../../../utils/isMobile';
import { isMacOS } from '../../../utils/platforms';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

enum ExtensionSupportedChains {
  EthereumMainnet = 1,
  Polygon = 137,
};

const EXTENSION_WEB_URL = 'https://ledger.com/ledger-extension'
const EXTENSION_APPLE_URL = 'https://apps.apple.com/app/ledger-extension-browse-web3/id1627727841'
const LEDGERLIVE_WEB_URL = 'https://ledger.com/ledger-live'
const LEDGERLIVE_ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.ledger.live'
const LEDGERLIVE_APPLE_URL = 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700'

export interface LedgerWalletOptions {
  projectId?: string;
  chains: Chain[];
}

export const ledgerWallet = ({
  chains,
  projectId,
  ...options
}: LedgerWalletOptions & InjectedConnectorOptions): Wallet => {
  const isExtensionSupported = !!(isIOS() || isMacOS()) && isSafari();
  console.log('isExtensionSupported is', isExtensionSupported);

  const isFirstChainSupported = !!ExtensionSupportedChains[chains[0].id];
  console.log('isFirstChainSupported is', isFirstChainSupported);

  // only use extension if the first chain is supported
  const shouldUseExtension = (isExtensionSupported && isFirstChainSupported);

  return {
    id: 'ledger',
    iconBackground: '#000',
    name: 'Ledger',
    iconUrl: async () => (await import('./ledgerWallet.svg')).default,
    downloadUrls: shouldUseExtension
      ? {
          // shown on macOS
          browserExtension: EXTENSION_APPLE_URL,
          // shown on iOS/iPadOS
          ios: EXTENSION_APPLE_URL,
          // shown on macOS as QR code for mobile
          qrCode: EXTENSION_WEB_URL,
        }
      : {
          // shown on other browsers on Android and iOS
          android: LEDGERLIVE_ANDROID_URL,
          ios: LEDGERLIVE_APPLE_URL,
          // shown on other browsers on macOS as a QR code for mobile
          // TODO no clickable link to install LL on macOS
          qrCode: LEDGERLIVE_WEB_URL,
        },
    installed: shouldUseExtension,
    createConnector: () => {
      const connector = shouldUseExtension
        ? new InjectedConnector({ chains, options })
        : getWalletConnectConnector({ projectId, chains });
      return {
        connector,
        mobile: {
          getUri: shouldUseExtension
            ? undefined
            : async () => {
              const uri = (await connector.getProvider())?.connector?.uri;
              // TODO doesn't the ledgerlive:// URI work on Android?
              //  a wc:// URI might load another wallet app
              return isAndroid()
                ? uri
                : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
            },
        },
        desktop: {
          getUri: shouldUseExtension
            ? undefined
            : async () => {
              const uri = (await connector.getProvider())?.connector?.uri;
              return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
            },
        },
        qrCode: {
          getUri: async () => {
            if (shouldUseExtension) {
              return '';
            } else {
              const uri = (await connector.getProvider())?.connector?.uri;
              return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
            }
          },
          instructions: {
            learnMoreUrl: 'https://ledger.com/ledger-live',
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
            learnMoreUrl: 'https://get-connect.ledger.com/onboarding',
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
        },
      };
    },
  };
};
