/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface InjectedWalletOptions {
  chains: Chain[];
}

export const injectedWallet = ({
  chains,
  ...options
}: InjectedWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'injected',
  name: 'Injected Wallet',
  iconUrl: async () => (await import('./injectedWallet.png')).default,
  iconBackground: '#fff',
  hidden: ({ wallets }) =>
    wallets.some(wallet =>
      typeof wallet.installed === 'function'
        ? wallet.installed?.()
        : wallet.installed &&
          (wallet.connector instanceof InjectedConnector ||
            wallet.id === 'coinbase')
    ),
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
  }),
});
