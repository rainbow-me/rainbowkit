import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

/**
 * @protected `browserWallet` interface
 */
export interface BrowserWalletOptions {
  chains: Chain[];
}

/**
 * @protected eip-1193 wallet connector
 */
export const browserWallet = ({ chains }: BrowserWalletOptions): Wallet => ({
  id: 'browser',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./browserWallet.svg')).default,
  iconBackground: '#fff',
  hidden: ({ wallets }) =>
    wallets.some(
      (wallet) =>
        wallet.installed &&
        wallet.name === wallet.connector.name &&
        (wallet.connector instanceof InjectedConnector ||
          wallet.id === 'coinbase'),
    ),
  createConnector: () => ({
    connector: getInjectedConnector({ chains }),
  }),
});
