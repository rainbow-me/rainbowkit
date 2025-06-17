import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const okxWallet = (): Wallet => {
  return {
    id: 'okx',
    name: 'OKX Wallet',
    rdns: 'com.okex.wallet',
    iconUrl: async () => (await import('./okxWallet.svg')).default,
    iconAccent: '#000',
    iconBackground: '#000',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.okinc.okex.gp',
      ios: 'https://itunes.apple.com/app/id1327268470?mt=8',
      mobile: 'https://okx.com/download',
      qrCode: 'https://okx.com/download',
      chrome:
        'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha',
      firefox: 'https://addons.mozilla.org/firefox/addon/okexwallet/',
      browserExtension: 'https://okx.com/download',
    },
    namespace: 'okxwallet',
    mobile: {
      getUri: (uri: string) => {
        return isAndroid()
          ? uri
          : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
      },
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://okx.com/web3/',
        steps: [
          {
            description: 'wallet_connectors.okx.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.okx.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.okx.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.okx.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.okx.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.okx.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://okx.com/web3/',
        steps: [
          {
            description: 'wallet_connectors.okx.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.okx.extension.step1.title',
          },
          {
            description: 'wallet_connectors.okx.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.okx.extension.step2.title',
          },
          {
            description: 'wallet_connectors.okx.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.okx.extension.step3.title',
          },
        ],
      },
    },
  };
};
