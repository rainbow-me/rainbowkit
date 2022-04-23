/* eslint-disable sort-keys-fix/sort-keys-fix */
import { chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isAndroid, isMobile } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getJsonRpcUrl } from '../../getJsonRpcUrl';

export interface MetaMaskOptions {
  apiConfig?: WalletConfig['apiConfig'];
  chains: WalletConfig['chains'];
  shimDisconnect?: boolean;
}

export const metaMask = ({
  apiConfig,
  chains,
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
      const jsonRpcUrl = getJsonRpcUrl({
        apiConfig,
        chains,
      });

      const connector = shouldUseWalletConnect
        ? new WalletConnectConnector({
            chains,
            options: {
              qrcode: false,
              ...(apiConfig?.infuraId
                ? { infuraId: apiConfig?.infuraId }
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
