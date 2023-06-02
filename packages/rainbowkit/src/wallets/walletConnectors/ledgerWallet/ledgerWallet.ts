/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface LedgerWalletOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion?: '1' | '2';
}

export const ledgerWallet = ({
  chains,
  projectId,
  walletConnectVersion = '2',
}: LedgerWalletOptions): Wallet => ({
  id: 'ledger',
  iconBackground: '#000',
  name: 'Ledger Live',
  iconUrl: async () => (await import('./ledgerWallet.svg')).default,
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.ledger.live',
    ios: 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700',
    mobile: 'https://www.ledger.com/ledger-live',
    qrCode: 'https://ledger.com/ledger-live',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ projectId, chains });

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
      },
    };
  },
});
