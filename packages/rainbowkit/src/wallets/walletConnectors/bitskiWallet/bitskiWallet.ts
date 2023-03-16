/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { detectProviderFlag } from '../../detectProviderFlag';

export interface BitskiWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const bitskiWallet = ({
  chains,
  shimDisconnect,
}: BitskiWalletOptions): Wallet => ({
  id: 'bitski',
  name: 'Bitski',
  installed: detectProviderFlag('isBitski'),
  iconUrl: async () => (await import('./bitskiWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
