/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isMobile } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface TokenPocketWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const tokenPocketWallet = ({
  chains,
  shimDisconnect,
}: TokenPocketWalletOptions): Wallet => {
  const isTokenPocketInjected =
    typeof window !== 'undefined' && window.ethereum?.isTokenPocket === true;

  const shouldUseWalletConnect = isMobile() && !isTokenPocketInjected;

  return {
    id: 'tokenPocket',
    name: 'TokenPocket',
    iconUrl: async () => (await import('./tokenPocketWallet.svg')).default,
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
