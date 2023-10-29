import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface TokenaryWalletOptions {
  chains: Chain[];
}

export const tokenary = ({
  chains,
  ...options
}: TokenaryWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'tokenary',
  name: 'Tokenary',
  iconUrl: async () => (await import('./tokenary.svg')).default,
  iconBackground: '#000000',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isTokenary,
  hidden: () => isAndroid(),
  downloadUrls: {
    ios: 'https://tokenary.io/get',
    browserExtension: 'https://tokenary.io/get',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
  }),
});
