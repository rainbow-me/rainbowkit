/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isSafari } from '../../../utils/browsers';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid, isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import {
  getWalletConnectConnector,
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

interface ExtensionProvider {
  isLedgerConnect: boolean;
  chainId: string;
}

interface WindowWithEthereum {
  ethereum: ExtensionProvider;
}

enum ExtensionSupportedChains {
  EthereumMainnet = 1,
  Polygon = 137,
}

const EXTENSION_WEB_URL = 'https://ledger.com/ledger-extension';
const EXTENSION_APPLE_URL =
  'https://apps.apple.com/app/ledger-extension-browse-web3/id1627727841';
const LEDGERLIVE_WEB_URL = 'https://ledger.com/ledger-live';
const LEDGERLIVE_ANDROID_URL =
  'https://play.google.com/store/apps/details?id=com.ledger.live';
const LEDGERLIVE_APPLE_URL =
  'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700';

export interface LedgerWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface LedgerWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const ledgerWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}:
  | (LedgerWalletLegacyOptions | LedgerWalletOptions) &
      InjectedConnectorOptions): Wallet => {
  const initialChainId = chains[0].id;
  const isExtensionSupported = isSafari();
  const isInitialChainSupported = !!ExtensionSupportedChains[initialChainId];
  const isExtensionEnabled = !!(
    typeof window !== 'undefined' &&
    (window as unknown as WindowWithEthereum).ethereum?.isLedgerConnect
  );

  // only use extension if the first chain is supported
  const shouldUseExtension = isExtensionSupported && isInitialChainSupported;

  return {
    id: 'ledger',
    iconBackground: '#000',
    iconAccent: '#000',
    name: 'Ledger',
    iconUrl: async () => (await import('./ledgerWallet.svg')).default,
    downloadUrls: shouldUseExtension
      ? {
          // shown on Safari macOS
          safari: EXTENSION_APPLE_URL,
          // shown on Safari iOS/iPadOS
          ios: EXTENSION_APPLE_URL,
        }
      : {
          // shown on desktop when the Extension is not supported
          desktop: LEDGERLIVE_WEB_URL,
          // shown on Android and iOS when the Extension is not supported
          android: LEDGERLIVE_ANDROID_URL,
          ios: LEDGERLIVE_APPLE_URL,
          // shown on desktop as a QR code when the Extension is not supported
          qrCode: LEDGERLIVE_WEB_URL,
        },
    createConnector: () => {
      // return the WC connector if the Extension is not enabled on iOS so
      // that the Ledger button is always shown, even though we will return
      // the Extension install link and not the WC URI in that case
      const connector = shouldUseExtension
        ? !isExtensionEnabled && isIOS()
          ? getWalletConnectConnector({
              projectId,
              chains,
              version: walletConnectVersion,
              options: walletConnectOptions,
            })
          : new InjectedConnector({ chains, options })
        : getWalletConnectConnector({
            projectId,
            chains,
            version: walletConnectVersion,
            options: walletConnectOptions,
          });

      return {
        connector,
        mobile: {
          getUri: async () => {
            if (shouldUseExtension) {
              if (!isExtensionEnabled && isIOS()) {
                // return the Extension install URL so that clicking the Ledger
                // button on iOS when the Extension is not enabled takes users
                // to the App Store
                return EXTENSION_APPLE_URL;
              }

              // return undefined on Safari macOS or when the extension is enabled
              // return undefined;
            }

            const uri = await getWalletConnectUri(
              connector,
              walletConnectVersion
            );
            return isAndroid()
              ? uri
              : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
          },
        },
        desktop: {
          getUri: shouldUseExtension
            ? undefined
            : async () => {
                const uri = await getWalletConnectUri(
                  connector,
                  walletConnectVersion
                );
                return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
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
                  'Set up a new Ledger or connect to an existing one.',
                step: 'create',
                title: 'Set up your Ledger',
              },
              {
                description:
                  'A connection prompt will appear for you to connect your wallet.',
                step: 'connect',
                title: 'Connect',
              },
            ],
          },
        },
        qrCode: {
          getUri: async () => {
            if (isExtensionSupported) {
              return '';
            } else {
              const uri = await getWalletConnectUri(
                connector,
                walletConnectVersion
              );
              return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
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
                  'You can either sync with the desktop app or connect your Ledger.',
                step: 'create',
                title: 'Set up your Ledger',
              },
              {
                description:
                  'Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet.',
                step: 'scan',
                title: 'Scan the code',
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
        },
      };
    },
  };
};
