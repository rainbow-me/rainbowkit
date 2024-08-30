import { isIOS } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const dawnWallet = (): Wallet => ({
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
  createConnector: getInjectedConnector({ flag: 'isDawn' }),
});
