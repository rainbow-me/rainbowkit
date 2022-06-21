/* eslint-disable sort-keys-fix/sort-keys-fix */
import { openInfinityWallet } from '@infinitywallet/infinity-connector';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface InfinityWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const infinityWallet = ({
  chains,
  shimDisconnect,
}: InfinityWalletOptions): Wallet => {

  const isInfinityWalletInjected = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum?.isInfinityWallet;

  const shouldUseWalletConnect = !isInfinityWalletInjected;

  return {
    id: 'infinityWallet',
    name: 'Infinity Wallet',
    iconUrl: async () => (await import('./infinityWallet.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isInfinityWalletInjected : undefined,
    downloadUrls: {
      browserExtension: 'https://infinitywallet.io/download/',
      qrCode: 'https://infinitywallet.io/download/',
    },
    createConnector: () => {
      if (isInfinityWalletInjected) {
        return {
          connector: new InjectedConnector({
            chains,
            options: { shimDisconnect },
          }),
        };
      }

      const connector = getWalletConnectConnector({ chains });

      return {
        connector,
        mobile: {
          getUri: undefined,
        },
        desktop: {
          getUri: shouldUseWalletConnect
            ? async () => {
                openInfinityWallet(window.location.href, chains);
              }
            : undefined,
        },
      };
    },
  };
};
