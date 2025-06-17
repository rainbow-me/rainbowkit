import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const bitgetWallet = (): Wallet => {
  return {
    id: 'bitget',
    name: 'Bitget Wallet',
    rdns: 'com.bitget.web3',
    iconUrl: async () => (await import('./bitgetWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    namespace: 'bitkeep.ethereum',
    flag: 'isBitKeep',
    downloadUrls: {
      android: 'https://web3.bitget.com/en/wallet-download?type=0',
      ios: 'https://apps.apple.com/app/bitkeep/id1395301115',
      mobile: 'https://web3.bitget.com/en/wallet-download?type=2',
      qrCode: 'https://web3.bitget.com/en/wallet-download',
      chrome:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      browserExtension: 'https://web3.bitget.com/en/wallet-download',
    },

    extension: {
      instructions: {
        learnMoreUrl: 'https://web3.bitget.com/en/academy',
        steps: [
          {
            description: 'wallet_connectors.bitget.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.bitget.extension.step1.title',
          },
          {
            description: 'wallet_connectors.bitget.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.bitget.extension.step2.title',
          },
          {
            description: 'wallet_connectors.bitget.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.bitget.extension.step3.description',
          },
        ],
      },
    },
    mobile: {
      getUri: (uri: string) => {
        return isAndroid()
          ? uri
          : `bitkeep://wc?uri=${encodeURIComponent(uri)}`;
      },
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://web3.bitget.com/en/academy',
        steps: [
          {
            description: 'wallet_connectors.bitget.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.bitget.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.bitget.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.bitget.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.bitget.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.bitget.qr_code.step3.title',
          },
        ],
      },
    },
  };
};
