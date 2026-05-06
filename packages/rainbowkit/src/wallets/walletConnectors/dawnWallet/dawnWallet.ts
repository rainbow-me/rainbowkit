import { isIOS } from '../../../utils/isMobile';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { Wallet } from '../../Wallet';

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
