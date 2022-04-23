/* eslint-disable sort-keys-fix/sort-keys-fix */
import { chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isAndroid, isMobile } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getWalletProviderConfig } from '../../getWalletProviderConfig';

export interface MetaMaskOptions {
  providerConfig?: WalletConfig['providerConfig'];
  chains: WalletConfig['chains'];
  shimDisconnect?: boolean;
}

export const metaMask = ({
  chains,
  providerConfig,
  shimDisconnect,
}: MetaMaskOptions): Wallet => {
  const isMetaMaskInjected =
    typeof window !== 'undefined' && window.ethereum?.isMetaMask;

  const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected;

  return {
    id: 'metaMask',
    name: 'MetaMask',
    iconUrl: async () => (await import('./metaMask.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
    },
    createConnector: ({ chainId = chain.mainnet.id }) => {
      const { infuraId, jsonRpcUrl } = getWalletProviderConfig({
        providerConfig,
        chains,
      });

      const connector = shouldUseWalletConnect
        ? new WalletConnectConnector({
            chains,
            options: {
              qrcode: false,
              ...(infuraId
                ? { infuraId }
                : {
                    rpc: {
                      [chainId]:
                        typeof jsonRpcUrl === 'function'
                          ? jsonRpcUrl({ chainId })
                          : jsonRpcUrl,
                    },
                  }),
            },
          })
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
                  : `https://metamask.app.link/wc?uri=${encodeURIComponent(
                      uri
                    )}`;
              }
            : undefined,
        },
      };
    },
  };
};
