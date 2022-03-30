/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid, isMobile } from '../../utils/isMobile';
import { Wallet } from '../Wallet';

export interface MetaMaskOptions {
  chains: Chain[];
  infuraId?: string;
  shimDisconnect?: boolean;
}

export const metaMask = ({
  chains,
  infuraId,
  shimDisconnect,
}: MetaMaskOptions): Wallet => {
  const isMetaMaskInjected =
    typeof window !== 'undefined' &&
    // @ts-expect-error
    window.ethereum?.isMetaMask;

  const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected;

  return {
    id: 'metaMask',
    name: 'MetaMask',
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmYAF8F4tdhpHo6M6AH2vZVrWN1zQCVYeXDrrVUVUYowfz',
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? new WalletConnectConnector({
            chains,
            options: {
              infuraId,
              qrcode: false,
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
            ? () => {
                const { uri } = connector.getProvider().connector;

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
