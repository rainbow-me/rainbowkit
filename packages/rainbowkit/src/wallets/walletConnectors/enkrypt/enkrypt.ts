/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isMobile } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface EnkryptOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export interface EnkryptEthereum extends Ethereum {
  isEnkrypt?: true;
}

export const enkrypt = ({ chains, shimDisconnect }: EnkryptOptions): Wallet => {
  let enkryptEthereum: EnkryptEthereum | undefined =
    typeof window !== 'undefined' ? window.ethereum : undefined;

  const isEnkryptInjected =
    typeof enkryptEthereum !== 'undefined' &&
    enkryptEthereum?.isEnkrypt === true;

  const shouldUseWalletConnect = isMobile() && !isEnkryptInjected;

  return {
    id: 'enkrypt',
    name: 'Enkrypt',
    iconUrl: async () => (await import('./enkrypt.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isEnkryptInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh',
      android:
        'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&hl=en_US&gl=US',
      ios: 'https://apps.apple.com/us/app/mew-wallet-ethereum-defi-web3/id1464614025',
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
      };
    },
  };
};
