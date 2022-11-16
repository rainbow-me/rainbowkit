/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface PhantomWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const phantomWallet = ({
  chains,
  shimDisconnect,
}: PhantomWalletOptions): Wallet => ({
  id: 'phantom',
  name: 'Phantom',
  iconUrl: async () => (await import('./phantomWallet.svg')).default,
  iconBackground: '#551BF9',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=app.phantom',
    ios: 'https://apps.apple.com/app/phantom-solana-wallet/1598432977',
    qrCode: 'https://phantom.app/download',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
