import { Connector, Chain as WagmiChain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { isAndroid, isMobile } from '../../utils/isMobile';
import { Chain } from './ChainIconsContext';
import { omitUndefinedValues } from './omitUndefinedValues';

export type WalletConnectorConfig<C extends Connector = Connector> = {
  connector: C;
  id: string;
  name: string;
  iconUrl: string;
  downloadUrls?: {
    mobile?: string;
    desktop?: {
      mobileCompanion?: string;
      browserExtension?: string;
    };
  };
  instructions?: { title: string; subtitle: string; imgUrl?: string }[];
  getMobileConnectionUri?: () => string;
  qrCode?: {
    logoUri?: string;
    getUri: () => string;
  };
  ready?: boolean;
};

type ConnectorArgs = {
  chainId: number;
};

export type Wallet = (
  connectorArgs: ConnectorArgs
) => WalletConnectorConfig<any>;

interface RainbowOptions {
  chains: Chain[];
  infuraId?: string;
}
const rainbow = ({ chains, infuraId }: RainbowOptions): Wallet => {
  const wallet: Wallet = () => {
    const connector = new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: false,
      },
    });

    return {
      connector,
      downloadUrls: {
        desktop: {
          mobileCompanion: 'https://rainbow.download',
        },
        mobile: isAndroid()
          ? 'https://play.google.com/store/apps/details?id=me.rainbow'
          : 'https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021',
      },
      getMobileConnectionUri: () => {
        const { uri } = connector.getProvider().connector;

        return isAndroid()
          ? uri
          : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
      },
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/QmPuPcm6g1dkyUUfLsFnP5ukxdRfR1c8MuBHCHwbk57Tov',
      id: 'rainbow',
      instructions: [
        {
          subtitle:
            'We recommend putting Rainbow on your home screen for faster access to your wallet.',
          title: 'Open the Rainbow app',
        },
        {
          subtitle:
            'You can easily backup your wallet using our backup feature on your phone.',
          title: 'Create or Import a Wallet',
        },
        {
          subtitle:
            'After you scan, a connection prompt will appear for you to connect your wallet.',
          title: 'Tap the scan button',
        },
      ],
      name: 'Rainbow',
      qrCode: {
        getUri: () => connector.getProvider().connector.uri,
      },
    };
  };

  return wallet;
};

interface WalletConnectOptions {
  chains: Chain[];
  infuraId?: string;
}
const walletConnect =
  ({ chains, infuraId }: WalletConnectOptions): Wallet =>
  () => ({
    connector: new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmbFLEB7Q9iCsSR2mvb48eyn1nvARKeLaPYFnzHVUeBDMV',
    id: 'walletConnect',
    name: 'WalletConnect',
  });

interface CoinbaseOptions {
  chains: Chain[];
  appName: string;
  jsonRpcUrl: string | ((args: { chainId: number }) => string);
}
const coinbase =
  ({ appName, chains, jsonRpcUrl }: CoinbaseOptions): Wallet =>
  ({ chainId }) => ({
    connector:
      // @ts-expect-error
      typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet
        ? new InjectedConnector({ chains })
        : new WalletLinkConnector({
            chains,
            options: {
              appName,
              jsonRpcUrl:
                typeof jsonRpcUrl === 'function'
                  ? jsonRpcUrl({ chainId })
                  : jsonRpcUrl,
            },
          }),
    downloadUrls: {
      desktop: {
        browserExtension:
          'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      },
      mobile: isAndroid()
        ? 'https://play.google.com/store/apps/details?id=org.toshi'
        : 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
    },
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmZbVxx2s9BeZLrqTvgfpbciXmr3D9LLYCETRwjFUYAXEw',
    id: 'coinbase',
    name: 'Coinbase Wallet',
  });

interface MetaMaskOptions {
  chains: Chain[];
  infuraId?: string;
  shimDisconnect?: boolean;
}
const metaMask =
  ({ chains, infuraId, shimDisconnect }: MetaMaskOptions): Wallet =>
  () => {
    const shouldUseWalletConnect =
      isMobile() &&
      typeof window !== 'undefined' &&
      // @ts-expect-error
      !window.ethereum?.isMetaMask;

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
        desktop: {
          browserExtension:
            'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
        },
        mobile: isAndroid()
          ? 'https://play.google.com/store/apps/details?id=io.metamask'
          : 'https://apps.apple.com/us/app/metamask/id1438144202',
      },
      getMobileConnectionUri: shouldUseWalletConnect
        ? () => {
            const { uri } = connector.getProvider().connector;

            return isAndroid()
              ? uri
              : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
          }
        : undefined,
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/QmdaG1gGZDAhSzQuicSHD32ernCzgB8p72WvnBDTUDrRNh',
      id: 'metaMask',
      name: 'MetaMask',
      ready:
        shouldUseWalletConnect ||
        (typeof window !== 'undefined' &&
          // @ts-expect-error
          window.ethereum?.isMetaMask === true),
    };
  };

interface InjectedOptions {
  chains: Chain[];
  infuraId?: string;
  shimDisconnect?: boolean;
}
const injected =
  ({ chains, shimDisconnect }: InjectedOptions): Wallet =>
  () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect },
      }),
      iconUrl:
        // Just a placeholder for now
        'data:image/png;base64,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',
      id: 'injected',
      name: 'Injected Wallet',
    };
  };

export const wallet = {
  coinbase,
  injected,
  metaMask,
  rainbow,
  walletConnect,
} as const;

export const getDefaultWallets = ({
  appName,
  chains,
  infuraId,
  jsonRpcUrl,
}: {
  chains: WagmiChain[];
  infuraId?: string;
  appName: CoinbaseOptions['appName'];
  jsonRpcUrl: CoinbaseOptions['jsonRpcUrl'];
}) => {
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    // @ts-expect-error
    window.ethereum &&
    // @ts-expect-error
    !window.ethereum.isMetaMask &&
    // @ts-expect-error
    !window.ethereum.isCoinbaseWallet;

  return [
    wallet.rainbow({ chains, infuraId }),
    wallet.walletConnect({ chains, infuraId }),
    wallet.coinbase({ appName, chains, jsonRpcUrl }),
    wallet.metaMask({ chains, infuraId, shimDisconnect: true }),
    ...(needsInjectedWalletFallback
      ? [wallet.injected({ chains, shimDisconnect: true })]
      : []),
  ];
};

export const connectorsForWallets = (wallets: Wallet[] = []) => {
  const connectors = (connectorArgs: ConnectorArgs) =>
    wallets.map(createWallet => {
      const wallet = omitUndefinedValues(createWallet(connectorArgs));

      if (wallet.connector._wallet) {
        throw new Error(
          `Can't connect wallet "${wallet.name}" to connector "${
            wallet.connector.name ?? wallet.connector.id
          }" as it's already connected to wallet "${
            wallet.connector._wallet.name
          }". Each wallet must have its own connector instance.`
        );
      }

      // Mutate connector instance to add wallet metadata
      wallet.connector._wallet = wallet;

      return wallet.connector;
    });

  return connectors;
};
