import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const talismanWallet = (): Wallet => ({
  id: 'talisman',
  name: 'Talisman',
  rdns: 'xyz.talisman',
  iconUrl: async () => (await import('./talismanWallet.svg')).default,
  iconBackground: '#fff',
  installed: hasInjectedProvider({
    namespace: 'talismanEth',
    flag: 'isTalisman',
  }),
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
    firefox:
      'https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/',
    browserExtension: 'https://talisman.xyz/download',
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://talisman.xyz/',
      steps: [
        {
          description: 'wallet_connectors.talisman.extension.step1.description',
          step: 'install',
          title: 'wallet_connectors.talisman.extension.step1.title',
        },
        {
          description: 'wallet_connectors.talisman.extension.step2.description',
          step: 'create',
          title: 'wallet_connectors.talisman.extension.step2.title',
        },
        {
          description: 'wallet_connectors.talisman.extension.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.talisman.extension.step3.title',
        },
      ],
    },
  },
  createConnector: getInjectedConnector({
    namespace: 'talismanEth',
    flag: 'isTalisman',
  }),
});
