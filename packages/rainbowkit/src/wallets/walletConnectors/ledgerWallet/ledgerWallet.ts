/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isSafari } from '../../../utils/browsers';
import { isAndroid, isIOS, isMacOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface LedgerWalletOptions {
  projectId?: string;
  chains: Chain[];
}

export const ledgerWallet = ({
  chains,
  ...options
}: LedgerWalletOptions & InjectedConnectorOptions): Wallet => {
  const isLedgerExtensionCompatible = (isIOS() || isMacOS()) && isSafari();
  return {
    id: 'ledger',
    iconBackground: '#000',
    name: 'Ledger',
    iconUrl: async () => (await import('./ledgerWallet.svg')).default,
    downloadUrls: isLedgerExtensionCompatible
      ? {
          browserExtension: 'https://ledger.com/ledger-extension',
          ios: 'https://apps.apple.com/app/ledger-extension-browse-web3/id1627727841',
          qrCode: 'https://ledger.com/ledger-extension',
        }
      : {
          android:
            'https://play.google.com/store/apps/details?id=com.ledger.live',
          ios: 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700',
          qrCode: 'https://ledger.com/ledger-live',
        },
    installed: () =>
      typeof window !== 'undefined' && window.ethereum?.isLedgerConnect,
    createConnector: () => {
      const connector = isLedgerExtensionCompatible
        ? new InjectedConnector({
            chains,
            options,
          })
        : getWalletConnectConnector({ chains });

      return {
        connector,
        mobile: {
          getUri: async () => {
            const { uri } = (await connector.getProvider()).connector;
            return isAndroid()
              ? uri
              : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
          },
        },
        desktop: {
          getUri: async () => {
            const { uri } = (await connector.getProvider()).connector;
            return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
          },
        },
        qrCode: {
          getUri: async () => (await connector.getProvider()).connector.uri,
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
