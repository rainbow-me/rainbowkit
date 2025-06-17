import { isSafari } from '../../../utils/browsers';
import type { Wallet } from '../../Wallet';

export const tokenaryWallet = (): Wallet => ({
  id: 'tokenary',
  name: 'Tokenary',
  iconUrl: async () => (await import('./tokenaryWallet.svg')).default,
  iconBackground: '#ffffff',
  flag: 'isTokenary',
  hidden: () => !isSafari(),
  downloadUrls: {
    ios: 'https://tokenary.io/get',
    mobile: 'https://tokenary.io',
    qrCode: 'https://tokenary.io/get',
    safari: 'https://tokenary.io/get',
    browserExtension: 'https://tokenary.io/get',
  },
});
