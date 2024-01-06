import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { hasInjectedProvider } from '../../getInjectedConnector';

export interface ZealWalletOptions {
  chains: Chain[];
}

export const zealWallet = ({ chains }: ZealWalletOptions): Wallet => ({
  id: 'zeal',
  name: 'Zeal',
  iconUrl: async () => (await import('./zealWallet.svg')).default,
  iconBackground: '#fff0',
  installed: hasInjectedProvider('isZeal'),
  downloadUrls: {
    browserExtension: 'https://zeal.app',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
    }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://zeal.app/',
        steps: [
          {
            description: 'wallet_connectors.zeal.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.zeal.extension.step1.title',
          },
          {
            description: 'wallet_connectors.zeal.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.zeal.extension.step2.title',
          },
          {
            description: 'wallet_connectors.zeal.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.zeal.extension.step3.title',
          },
        ],
      },
    },
  }),
});
