/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isMobile } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

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

  const shouldUseWalletConnect = isMobile() && !isEnkryptInjected;

  return {
    id: 'enkrypt',
    name: 'Enkrypt',
    iconUrl: async () => (await import('./enkryptWallet.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isEnkryptInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options: { shimDisconnect },
          });

      return {
        connector,
        mobile: {
          getUri: async () => {
            return 'https://www.enkrypt.com/';
          },
        },
      };
    },
  };
};
