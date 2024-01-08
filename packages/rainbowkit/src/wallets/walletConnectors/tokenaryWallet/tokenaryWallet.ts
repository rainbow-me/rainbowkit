import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isSafari } from '../../../utils/browsers';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface TokenaryWalletOptions {
  chains: Chain[];
}

export const tokenaryWallet = ({ chains }: TokenaryWalletOptions): Wallet => ({
  id: 'tokenary',
  name: 'Tokenary',
  iconUrl: async () => (await import('./tokenaryWallet.svg')).default,
  iconBackground: '#ffffff',
  installed: hasInjectedProvider({ flag: 'isTokenary' }),
  hidden: () => !isSafari(),
  downloadUrls: {
    ios: 'https://tokenary.io/get',
    mobile: 'https://tokenary.io',
    qrCode: 'https://tokenary.io/get',
    safari: 'https://tokenary.io/get',
    browserExtension: 'https://tokenary.io/get',
  },
  createConnector: () => ({
    connector: getInjectedConnector({ chains, flag: 'isTokenary' }),
  }),
});
