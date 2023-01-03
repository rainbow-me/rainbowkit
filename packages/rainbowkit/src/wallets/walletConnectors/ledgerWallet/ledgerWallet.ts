/* eslint-disable sort-keys-fix/sort-keys-fix */
import { LedgerConnector } from '@wagmi/connectors/ledger';
import { Connector } from 'wagmi';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isChrome, isIOS, isMacOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface LedgerWalletOptions {
  chains: Chain[];
  enableDebugLogs?: boolean;
  chainId?: number;
  bridge?: string;
  infuraId?: string;
  rpc?: { [chainId: number]: string };
}

export const ledgerWallet = ({
  bridge,
  chainId,
  chains,
  enableDebugLogs,
  rpc,
}: LedgerWalletOptions): Wallet => {
  // TODO check Connect support using hardcoded logic, will be out of sync with
  // Connect Kit when it is updated, until DApps update to an updated version of
  // RainbowKit
  const isLedgerConnectEnabled =
    typeof window !== 'undefined' && window.ethereum?.isLedgerConnect === true;
  const ios = isIOS();
  const macOS = isMacOS();
  const isLedgerConnectSupported = (ios || macOS) && !isChrome();

  return {
    id: 'ledger',
    name: 'Ledger',
    iconUrl: async () => (await import('./ledgerWallet.svg')).default,
    iconAccent: '#fff',
    iconBackground: '#000',
    installed: isLedgerConnectEnabled || undefined,
    downloadUrls: {
      browserExtension: isLedgerConnectSupported
        ? 'https://get-connect-ledger-com.netlify.app'
        : 'https://www.ledger.com/ledger-live/download',
      android: 'https://play.google.com/store/apps/details?id=com.ledger.live',
      ios: 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700',
      qrCode: 'https://www.ledger.com/ledger-live/download',
    },
    createConnector: () => {
      const connector = new LedgerConnector({
        chains,
        options: {
          enableDebugLogs,
          isHeadless: true,
          chainId,
          bridge,
          rpc,
        },
      }) as unknown as Connector<any, any, any>;

      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        const ledgerLiveUri = `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;

        return ledgerLiveUri;
      };

      return {
        connector,
        desktop: isLedgerConnectSupported
          ? undefined
          : {
              getUri,
            },
        qrCode: isLedgerConnectSupported
          ? undefined
          : {
              getUri,
              instructions: {
                learnMoreUrl:
                  'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet',
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
      };
    },
  };
};
