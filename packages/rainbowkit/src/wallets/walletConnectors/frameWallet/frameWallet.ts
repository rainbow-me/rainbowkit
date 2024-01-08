import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface FrameWalletOptions {
  chains: Chain[];
}

export const frameWallet = ({ chains }: FrameWalletOptions): Wallet => ({
  id: 'frame',
  name: 'Frame',
  installed: hasInjectedProvider({ flag: 'isFrame' }),
  iconUrl: async () => (await import('./frameWallet.svg')).default,
  iconBackground: '#121C20',
  downloadUrls: {
    browserExtension: 'https://frame.sh/',
  },
  createConnector: () => ({
    connector: getInjectedConnector({ chains, flag: 'isFrame' }),
    extension: {
      instructions: {
        learnMoreUrl:
          'https://docs.frame.sh/docs/Getting%20Started/Installation/',
        steps: [
          {
            description: 'wallet_connectors.frame.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.frame.extension.step1.title',
          },
          {
            description: 'wallet_connectors.frame.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.frame.extension.step2.title',
          },
          {
            description: 'wallet_connectors.frame.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.frame.extension.step3.title',
          },
        ],
      },
    },
  }),
});
