/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface RabbyWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const rabbyWallet = ({
  chains,
  shimDisconnect,
}: RabbyWalletOptions): Wallet => ({
  id: 'rabby',
  name: 'Rabby Wallet',
  iconUrl: async () => (await import('./rabbyWallet.svg')).default,
  iconBackground: '#fff',
  // @ts-ignore
  installed: typeof window !== 'undefined' && window.ethereum?.isRabby === true,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch?hl=en',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
