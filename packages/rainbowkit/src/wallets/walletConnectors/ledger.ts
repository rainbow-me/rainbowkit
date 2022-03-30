/* eslint-disable sort-keys-fix/sort-keys-fix */
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../utils/isMobile';
import { Wallet } from '../Wallet';

export interface LedgerOptions {
  chains: Chain[];
  infuraId?: string;
}

export const ledger = ({ chains, infuraId }: LedgerOptions): Wallet => ({
  id: 'ledger',
  name: 'Ledger Live',
  iconUrl:
    'https://imagedelivery.net/_aTEfDRm7z3tKgu9JhfeKA/e8803581-a57f-4e4f-5a1b-c642c5da1900/md',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.ledger.live',
    ios: 'https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700',
    qrCode: 'https://www.ledger.com/ledger-live/download#download-device-2',
  },
  createConnector: () => {
    const connector = new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: false,
      },
    });

    return {
      connector,
      mobile: {
        getUri: () => {
          const { uri } = connector.getProvider().connector;
          return isAndroid()
            ? uri
            : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      desktop: {
        getUri: () => {
          const { uri } = connector.getProvider().connector;
          return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
    };
  },
});
