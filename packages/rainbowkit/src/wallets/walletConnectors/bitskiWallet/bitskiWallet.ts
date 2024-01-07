import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface BitskiWalletOptions {
  chains: Chain[];
}

export const bitskiWallet = ({ chains }: BitskiWalletOptions): Wallet => ({
  id: 'bitski',
  name: 'Bitski',
  installed: hasInjectedProvider({ flag: 'isBitski' }),
  iconUrl: async () => (await import('./bitskiWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell',
    browserExtension: 'https://bitski.com',
  },
  createConnector: () => ({
    connector: getInjectedConnector({ chains, flag: 'isBitski' }),
    extension: {
      instructions: {
        learnMoreUrl:
          'https://bitski.zendesk.com/hc/articles/12803972818836-How-to-install-the-Bitski-browser-extension',
        steps: [
          {
            description: 'wallet_connectors.bitski.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.bitski.extension.step1.title',
          },
          {
            description: 'wallet_connectors.bitski.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.bitski.extension.step2.title',
          },
          {
            description: 'wallet_connectors.bitski.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.bitski.extension.step3.title',
          },
        ],
      },
    },
  }),
});
