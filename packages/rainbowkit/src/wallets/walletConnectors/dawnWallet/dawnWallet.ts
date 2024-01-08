import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface DawnWalletOptions {
  chains: Chain[];
}

export const dawnWallet = ({ chains }: DawnWalletOptions): Wallet => ({
  id: 'dawn',
  name: 'Dawn',
  iconUrl: async () => (await import('./dawnWallet.svg')).default,
  iconBackground: '#000000',
  installed: hasInjectedProvider({ flag: 'isDawn' }),
  hidden: () => !isIOS(),
  downloadUrls: {
    ios: 'https://apps.apple.com/us/app/dawn-ethereum-wallet/id1673143782',
    mobile: 'https://dawnwallet.xyz',
  },
  createConnector: () => ({
    connector: getInjectedConnector({ chains, flag: 'isDawn' }),
  }),
});
