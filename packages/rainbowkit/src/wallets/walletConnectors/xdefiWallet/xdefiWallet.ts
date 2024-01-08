import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export interface XDEFIWalletOptions {
  chains: Chain[];
}

export const xdefiWallet = ({ chains }: XDEFIWalletOptions): Wallet => ({
  id: 'xdefi',
  name: 'XDEFI Wallet',
  installed: hasInjectedProvider({ namespace: 'xfi.ethereum' }),
  iconUrl: async () => (await import('./xdefiWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
    browserExtension: 'https://xdefi.io',
  },
  createConnector: () => ({
    connector: getInjectedConnector({ namespace: 'xfi.ethereum', chains }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://xdefi.io/support-categories/xdefi-wallet/',
        steps: [
          {
            description: 'wallet_connectors.xdefi.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.xdefi.extension.step1.title',
          },
          {
            description: 'wallet_connectors.xdefi.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.xdefi.extension.step2.title',
          },
          {
            description: 'wallet_connectors.xdefi.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.xdefi.extension.step3.title',
          },
        ],
      },
    },
  }),
});
