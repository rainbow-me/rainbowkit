import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isSafari } from '../../../utils/browsers';
import { Wallet } from '../../Wallet';

export interface TokenaryWalletOptions {
  chains: Chain[];
}

export const tokenaryWallet = ({
  chains,
  ...options
}: TokenaryWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'tokenary',
  name: 'Tokenary',
  iconUrl: async () => (await import('./tokenaryWallet.svg')).default,
  iconBackground: '#ffffff',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isTokenary,
  hidden: () => !isSafari(),
  downloadUrls: {
    ios: 'https://tokenary.io/get',
    mobile: 'https://tokenary.io',
    qrCode: 'https://tokenary.io/get',
    safari: 'https://tokenary.io/get',
    browserExtension: 'https://tokenary.io/get',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
  }),
});
