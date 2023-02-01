/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface EnkryptWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const enkryptWallet = ({
  chains,
  shimDisconnect,
}: EnkryptWalletOptions): Wallet => {
  const isEnkryptInjected =
    typeof window !== 'undefined' &&
    Boolean(
      (
        window.ethereum as typeof window.ethereum &
          (undefined | { isEnkrypt?: boolean })
      )?.isEnkrypt
    );

  return {
    id: 'enkrypt',
    name: 'Enkrypt',
    iconUrl: async () => (await import('./enkryptWallet.svg')).default,
    iconBackground: '#fff',
    installed: isEnkryptInjected,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh',
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector({
          chains,
          options: { shimDisconnect },
        }),
      };
    },
  };
};
