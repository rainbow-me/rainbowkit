/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid, isMobile } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface MathWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export interface MathWalletEthereum extends Ethereum {
  isMathWallet?: true;
}

export const mathwallet = ({
  chains,
  shimDisconnect,
}: MathWalletOptions): Wallet => {
  let mathwalletEthereum: MathWalletEthereum | undefined =
    typeof window !== 'undefined' ? window.ethereum : undefined;

  const isMathWalletInjected =
    typeof mathwalletEthereum !== 'undefined' &&
    mathwalletEthereum?.isMathWallet === true;

  const shouldUseWalletConnect = isMobile() && !isMathWalletInjected;

  return {
    id: 'mathwallet',
    name: 'MathWallet',
    iconUrl: async () => (await import('./mathwallet.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isMathWalletInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc',
      android:
        'https://play.google.com/store/apps/details?id=com.mathwallet.android',
      ios: 'https://apps.apple.com/us/app/mathwallet5/id1582612388',
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
          getUri: shouldUseWalletConnect
            ? async () => {
                const { uri } = (await connector.getProvider()).connector;

                return isAndroid()
                  ? uri
                  : `https://mathwallet.org/wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
      };
    },
  };
};
