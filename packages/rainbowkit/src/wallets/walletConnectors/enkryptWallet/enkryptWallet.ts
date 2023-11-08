import type { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

declare global {
  interface Window {
    enkrypt: {
      providers: {
        ethereum: any;
      };
    };
  }
}

export const enkryptWallet = (): Wallet => {
  const isEnkryptInjected =
    typeof window !== 'undefined' &&
    typeof window.enkrypt !== 'undefined' &&
    window?.enkrypt?.providers?.ethereum;
  return {
    id: 'enkrypt',
    name: 'Enkrypt Wallet',
    installed: isEnkryptInjected,
    iconUrl: async () => (await import('./enkryptWallet.svg')).default,
    iconBackground: '#FFFFFF',
    downloadUrls: {
      qrCode: 'https://www.enkrypt.com',
      chrome:
        'https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh',
      browserExtension: 'https://www.enkrypt.com/',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/enkrypt-ethereum-polkad/gfenajajnjjmmdojhdjmnngomkhlnfjl',
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/enkrypt/',
      opera: 'https://addons.opera.com/en/extensions/details/enkrypt/',
      safari: 'https://apps.apple.com/app/enkrypt-web3-wallet/id1640164309',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://blog.enkrypt.com/what-is-a-web3-wallet/',
        steps: [
          {
            description:
              'wallet_connectors.enkrypt.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.enkrypt.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.enkrypt.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.enkrypt.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.enkrypt.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.enkrypt.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({
      target:
        typeof window !== 'undefined'
          ? window?.enkrypt?.providers?.ethereum
          : undefined,
    }),
  };
};
