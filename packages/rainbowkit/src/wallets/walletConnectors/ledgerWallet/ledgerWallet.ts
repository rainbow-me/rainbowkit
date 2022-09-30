/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface LedgerWalletOptions {
  chains: Chain[];
}

export const ledgerWallet = ({ chains }: LedgerWalletOptions): Wallet => ({
  id: 'ledger',
  iconBackground: '#000',
  name: 'Ledger Live',
  iconUrl: async () => (await import('./ledgerWallet.svg')).default,
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.ledger.live',
    ios: 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700',
    qrCode: 'https://www.ledger.com/ledger-live/download#download-device-2',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });

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
    };
  },
});
