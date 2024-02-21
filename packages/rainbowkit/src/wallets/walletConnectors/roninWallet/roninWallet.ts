import { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type RoninWalletOptions = DefaultWalletOptions;

export const roninWallet = ({
  projectId,
  walletConnectParameters,
}: RoninWalletOptions): Wallet => ({
  id: 'ronin',
  name: 'Ronin Wallet',
  iconUrl: async () => (await import('./roninWallet.svg')).default,
  iconBackground: '#ffffff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.skymavis.genesis',
    ios: 'https://apps.apple.com/us/app/ronin-wallet/id1592675001',
    chrome:
      'https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/ronin-wallet/kjmoohlgokccodicjjfebfomlbljgfhk',
    firefox: 'https://addons.mozilla.org/firefox/addon/ronin-wallet',
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
