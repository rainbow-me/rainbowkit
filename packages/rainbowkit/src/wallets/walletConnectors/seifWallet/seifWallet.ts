import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export function seifWallet(): Wallet {
  const injectedProvider = hasInjectedProvider({
    namespace: '__seif',
  });
  return {
    id: 'seif',
    name: 'Seif',
    installed: !!injectedProvider,
    iconUrl: async () => (await import('./seifWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/seif/albakdmmdafeafbehmcpoejenbeojejl',
    },
    createConnector: getInjectedConnector({
      namespace: '__seif',
    }),
    rdns: 'com.passkeywallet.seif',
  };
}
