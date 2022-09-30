/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface InjectedWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const injectedWallet = ({
  chains,
  shimDisconnect,
}: InjectedWalletOptions): Wallet => ({
  id: 'injected',
  name: 'Injected Wallet',
  iconUrl: async () => (await import('./injectedWallet.png')).default,
  iconBackground: '#fff',
  hidden: ({ wallets }) =>
    wallets.some(
      wallet =>
        wallet.installed &&
        (wallet.connector instanceof InjectedConnector ||
          wallet.id === 'coinbase')
    ),
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
