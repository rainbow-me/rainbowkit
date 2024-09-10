import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const nestWallet = (): Wallet => ({
  id: 'nest',
  name: 'Nest',
  rdns: 'xyz.nestwallet',
  iconUrl: async () => (await import('./nestWallet.svg')).default,
  iconBackground: '#fff0',
  installed: hasInjectedProvider({ flag: 'isNestWallet' }),
  downloadUrls: {
    browserExtension: 'https://nestwallet.xyz',
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://nestwallet.xyz',
      steps: [
        {
          description:
            'wallet_connectors.nestwallet.extension.step1.description',
          step: 'install',
          title: 'wallet_connectors.nestwallet.extension.step1.title',
        },
        {
          description:
            'wallet_connectors.nestwallet.extension.step2.description',
          step: 'create',
          title: 'wallet_connectors.nestwallet.extension.step2.title',
        },
        {
          description:
            'wallet_connectors.nestwallet.extension.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.nestwallet.extension.step3.title',
        },
      ],
    },
  },
  createConnector: getInjectedConnector({ flag: 'isNestWallet' }),
});
