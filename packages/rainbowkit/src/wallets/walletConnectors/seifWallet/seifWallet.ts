import type { Wallet } from '../../Wallet';

export function seifWallet(): Wallet {
  return {
    id: 'seif',
    name: 'Seif',
    namespace: '__seif',
    iconUrl: async () => (await import('./seifWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/seif/albakdmmdafeafbehmcpoejenbeojejl',
    },
    rdns: 'com.passkeywallet.seif',
  };
}
