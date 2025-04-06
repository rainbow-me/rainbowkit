import type { WindowProvider } from '../../../types/utils';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import { isMetaMask } from '../metaMaskWallet/metaMaskWallet';

export type KonkretWalletOptions = DefaultWalletOptions;

export const konkretWallet = ({
  projectId,
  walletConnectParameters,
}: KonkretWalletOptions): Wallet => {
  // Konkret Wallet fronts itself as MetaMask
  const isMetaMaskInjected = hasInjectedProvider({ flag: 'isMetaMask' });
  const shouldUseWalletConnect = !isMetaMaskInjected;
  return {
    id: 'konkret',
    name: 'Konkret Wallet',
    rdns: 'link.ohoy.apps.konkret-wallet',
    iconAccent: '#6c24e0',
    iconBackground: '#fff',
    iconUrl: async () => (await import('./konkretWallet.svg')).default,
    downloadUrls: {
      chrome: 'https://codeberg.org/konkret/konkret-wallet/releases',
      firefox: 'https://codeberg.org/konkret/konkret-wallet/releases',
      browserExtension: 'https://codeberg.org/konkret/konkret-wallet/releases',
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          target:
            typeof window !== 'undefined'
              ? (window as WindowProvider).ethereum?.providers?.find(
                  isMetaMask,
                ) ?? window.ethereum
              : undefined,
        }),
  };
};
