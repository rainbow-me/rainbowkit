import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface TahoWalletOptions {
  chains: Chain[];
}

export const tahoWallet = ({ chains }: TahoWalletOptions): Wallet => ({
  id: 'taho',
  name: 'Taho',
  iconBackground: '#d08d57',
  iconUrl: async () => (await import('./tahoWallet.svg')).default,
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd',
    browserExtension: 'https://taho.xyz',
  },
  installed: hasInjectedProvider({ namespace: 'tally', flag: 'isTally' }),
  createConnector: () => {
    return {
      connector: getInjectedConnector({
        chains,
        namespace: 'tally',
        flag: 'isTally',
      }),
      extension: {
        instructions: {
          learnMoreUrl:
            'https://tahowallet.notion.site/Taho-Knowledge-Base-4d95ed5439c64d6db3d3d27abf1fdae5',
          steps: [
            {
              description: 'wallet_connectors.taho.extension.step1.description',
              step: 'install',
              title: 'wallet_connectors.taho.extension.step1.title',
            },
            {
              description: 'wallet_connectors.taho.extension.step2.description',
              step: 'create',
              title: 'wallet_connectors.taho.extension.step2.title',
            },
            {
              description: 'wallet_connectors.taho.extension.step3.description',
              step: 'refresh',
              title: 'wallet_connectors.taho.extension.step3.title',
            },
          ],
        },
      },
    };
  },
});
