/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface PhantomWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const phantomWallet = ({
  chains,
  shimDisconnect,
}: PhantomWalletOptions): Wallet => {
  const isPhantomInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    typeof (window.ethereum as any).isPhantom !== 'undefined';
  return {
    id: 'phantom',
    name: 'Phantom',
    iconUrl: async () => (await import('./phantomWallet.svg')).default,
    iconBackground: '#551BF9',
    installed: isPhantomInjected,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=app.phantom',
      ios: 'https://apps.apple.com/app/phantom-solana-wallet/1598432977',
      browserExtension: 'https://phantom.app/download',
    },
    createConnector: () => {
      const connector = new InjectedConnector({
        chains,
        options: { shimDisconnect },
      });

      return {
        connector,
      };
    },
  };
};
