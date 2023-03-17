/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface DawnWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

function isDawn(ethereum: NonNullable<typeof window['ethereum']>) {
  const isDawn = Boolean(ethereum.isDawn);
  if (isDawn) return true;
}

export const dawnWallet = ({
  chains,
  shimDisconnect,
}: DawnWalletOptions): Wallet => {
  const isDawnInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isDawn(window.ethereum);

  return {
    id: 'dawn',
    name: 'Dawn',
    iconUrl: async () => (await import('./dawnWallet.svg')).default,
    iconBackground: '#000000',
    installed: isDawnInjected,
    downloadUrls: {
      ios: 'https://testflight.apple.com/join/UHmOJnNy',
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect },
      }),
    }),
  };
};
