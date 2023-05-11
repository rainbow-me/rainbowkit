/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

const LEDGERLIVE_WEB_URL = 'https://www.ledger.com/ledger-live';

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
}: LedgerWalletLegacyOptions | LedgerWalletOptions): Wallet => ({
  id: 'ledger',
  iconBackground: '#000',
  iconAccent: '#000',
  name: 'Ledger Live',
  iconUrl: async () => (await import('./ledgerWallet.svg')).default,
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.ledger.live',
    ios: 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700',
    mobile: LEDGERLIVE_WEB_URL,
    desktop: LEDGERLIVE_WEB_URL,
    qrCode: LEDGERLIVE_WEB_URL,
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions,
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
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
        getUri: async () => {
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
                'We recommend putting Ledger Live on your home screen for quicker',
              step: 'install',
              title: 'Open the Ledger Live app',
            },
            {
              description: 'Set up a new Ledger or connect to an existing one.',
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
          const { uri } = (await connector.getProvider()).connector;
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
    };
  },
});
