import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const ctrlWallet = (): Wallet => {
  return {
    id: 'ctrl',
    name: 'Ctrl Wallet',
    rdns: 'ctrl.xyz',
    installed: hasInjectedProvider({ namespace: 'xfi.ethereum' }),
    iconUrl: async () => (await import('./ctrlWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/ctrl-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
      browserExtension: 'https://ctrl.xyz',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://ctrl.xyz',
        steps: [
          {
            description: 'wallet_connectors.ctrl.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.ctrl.extension.step1.title',
          },
          {
            description: 'wallet_connectors.ctrl.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.ctrl.extension.step2.title',
          },
          {
            description: 'wallet_connectors.ctrl.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.ctrl.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({ namespace: 'xfi.ethereum' }),
  };
};
