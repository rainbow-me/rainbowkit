import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface SafeheronWalletOptions {
  chains: Chain[];
}

export const safeheronWallet = ({
  chains,
}: SafeheronWalletOptions): Wallet => ({
  id: 'safeheron',
  name: 'Safeheron',
  installed: hasInjectedProvider({
    namespace: 'safeheron',
    flag: 'isSafeheron',
  }),
  iconUrl: async () => (await import('./safeheronWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh',
    browserExtension: 'https://www.safeheron.com/',
  },
  createConnector: () => ({
    connector: getInjectedConnector({
      chains,
      namespace: 'safeheron',
      flag: 'isSafeheron',
    }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://www.safeheron.com/',
        steps: [
          {
            description:
              'wallet_connectors.safeheron.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.safeheron.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.safeheron.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.safeheron.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.safeheron.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.safeheron.extension.step3.title',
          },
        ],
      },
    },
  }),
});
