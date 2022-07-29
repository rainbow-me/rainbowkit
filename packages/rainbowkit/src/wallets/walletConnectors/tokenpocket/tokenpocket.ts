/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isMobile } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface TokenPocketOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export interface TokenPocketEthereum extends Ethereum {
  isTokenPocket?: true;
}

export const tokenpocket = ({
  chains,
  shimDisconnect,
}: TokenPocketOptions): Wallet => {
  let tpEtheruem: TokenPocketEthereum | undefined =
    typeof window !== 'undefined' ? window.ethereum : undefined;

  const isTokenPocketInjected =
    typeof tpEtheruem !== 'undefined' && tpEtheruem?.isTokenPocket === true;

  const shouldUseWalletConnect = isMobile() && !isTokenPocketInjected;

  return {
    id: 'tokenpocket',
    name: 'TokenPocket',
    iconUrl: async () => (await import('./tokenpocket.svg')).default,
    iconBackground: '#2980FE',
    installed: !shouldUseWalletConnect ? isTokenPocketInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii',
      android:
        'https://play.google.com/store/apps/details?id=vip.mytokenpocket',
      ios: 'https://apps.apple.com/cn/app/tokenpocket-trusted-wallet/id1436028697',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({ chains, options: { shimDisconnect } });

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect
            ? async () => {
                const { uri } = (await connector.getProvider()).connector;
                return `tpoutside://wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
      };
    },
  };
};
