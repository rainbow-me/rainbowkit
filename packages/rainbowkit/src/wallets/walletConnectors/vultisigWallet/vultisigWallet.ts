import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { Wallet } from '../../Wallet';

export const vultisigWallet = (): Wallet => ({
  id: 'vultisig',
  name: 'Vultisig',
  rdns: 'me.vultisig',
  iconUrl: async () => (await import('./vultisigWallet.svg')).default,
  iconBackground: '#061B3A',
  installed: hasInjectedProvider({ namespace: 'vultisig.ethereum' }),
  downloadUrls: {
    chrome:
      'https://chromewebstore.google.com/detail/vultisig-extension/ggafhcdaplkhmmnlbfjpnnkepdfjaelb',
    firefox:
      'https://addons.mozilla.org/en-US/firefox/addon/vultisig-extension/',
    browserExtension: 'https://vultisig.com/downloads',
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://docs.vultisig.com',
      steps: [
        {
          description: 'wallet_connectors.vultisig.extension.step1.description',
          step: 'install',
          title: 'wallet_connectors.vultisig.extension.step1.title',
        },
        {
          description: 'wallet_connectors.vultisig.extension.step2.description',
          step: 'create',
          title: 'wallet_connectors.vultisig.extension.step2.title',
        },
        {
          description: 'wallet_connectors.vultisig.extension.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.vultisig.extension.step3.title',
        },
      ],
    },
  },
  createConnector: getInjectedConnector({ namespace: 'vultisig.ethereum' }),
});
