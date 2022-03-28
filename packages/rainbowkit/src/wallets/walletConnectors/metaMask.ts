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

export const metaMask =
  ({ chains, infuraId, shimDisconnect }: MetaMaskOptions): Wallet =>
  () => {
    const isMetaMaskInjected =
      typeof window !== 'undefined' &&
      // @ts-expect-error
      window.ethereum?.isMetaMask;

    const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected;

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
      downloadUrls: {
        browserExtension:
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
        mobile: isAndroid()
          ? 'https://play.google.com/store/apps/details?id=io.metamask'
          : 'https://apps.apple.com/us/app/metamask/id1438144202',
      },
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/QmdaG1gGZDAhSzQuicSHD32ernCzgB8p72WvnBDTUDrRNh',
      id: 'metaMask',
      installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
      mobile: {
        getUri: shouldUseWalletConnect
          ? () => {
              const { uri } = connector.getProvider().connector;

              return isAndroid()
                ? uri
                : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
            }
          : undefined,
      },
      name: 'MetaMask',
    };
  };
