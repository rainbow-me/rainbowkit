import { useCallback, useEffect, useState } from 'react';
import { Connector, useConnect, Chain as WagmiChain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { Chain } from './ChainIconsContext';

export type WalletConnectorConfig<C extends Connector = Connector> = {
  connector: C;
  id: string;
  name: string;
  iconUrl?: string;
  useMobileWalletButton?: () => {
    onClick: () => void;
  };
  useDesktopWalletDetail?: () => {
    qrCode?: {
      uri?: string;
      logoUri: string;
    };
  };
};

type ConnectorArgs = {
  chainId: number;
};

export type Wallet = (
  connectorArgs: ConnectorArgs
) => WalletConnectorConfig<any>;

interface RainbowOptions {
  chains: Chain[];
  infuraId: string;
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
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
      id: 'rainbow',
      name: 'Rainbow',
      useDesktopWalletDetail: () => {
        const [{ data: connectData }, connect] = useConnect();
        const [uri, setUri] = useState<string | undefined>();

        useEffect(() => {
          if (connectData.connector !== connector) {
            connect(connector);
          }

          setTimeout(() => {
            setUri(connector.getProvider().connector.uri);
          }, 0);
        }, [connect, connectData.connector]);

        return {
          qrCode: {
            logoUri:
              'https://cloudflare-ipfs.com/ipfs/bafkreico3pudvsd4j6emdtq4pmyfaat34reoebxyei7tvlpzp5hnec24qa',
            uri,
          },
        };
      },
      useMobileWalletButton: () => {
        const [{ data: connectData }, connect] = useConnect();

        return {
          onClick: useCallback(() => {
            if (connectData.connector !== connector) {
              connect(connector);
            }

            setTimeout(() => {
              const { uri } = connector.getProvider().connector;
              window.location.href = `https://rnbwapp.com/wc?uri=${
                uri ? encodeURIComponent(uri) : ''
              }`;
            }, 0);
          }, [connect, connectData.connector]),
        };
      },
    };
  };

  return wallet;
};

interface WalletConnectOptions {
  chains: Chain[];
  infuraId: string;
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
      'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/png/square/walletconnect-square-blue.png',
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
    connector: new WalletLinkConnector({
      chains,
      options: {
        appName,
        jsonRpcUrl:
          typeof jsonRpcUrl === 'function'
            ? jsonRpcUrl({ chainId })
            : jsonRpcUrl,
      },
    }),
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/bafkreihl4wmkbzm44mxu33mbuy3hcrc5g6wmi32ns3y3gfwme6w2hcbdy4',
    id: 'coinbase',
    name: 'Coinbase',
  });

interface MetamaskOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}
const metamask =
  ({ chains, shimDisconnect }: MetamaskOptions): Wallet =>
  () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/bafkreig23o6p5exkyrbhxveqap3krzeinisknloocwc5uijq6wrtrlpl3e',
    id: 'metamask',
    name: 'Metamask',
  });

export const wallet = {
  coinbase,
  metamask,
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
  infuraId: string;
  appName: CoinbaseOptions['appName'];
  jsonRpcUrl: CoinbaseOptions['jsonRpcUrl'];
}) => [
  wallet.rainbow({ chains, infuraId }),
  wallet.walletConnect({ chains, infuraId }),
  wallet.coinbase({ appName, chains, jsonRpcUrl }),
  wallet.metamask({ chains, shimDisconnect: true }),
];

export const connectorsForWallets = (wallets: Wallet[] = []) => {
  const connectors = (connectorArgs: ConnectorArgs) =>
    wallets.map(createWallet => {
      const wallet = createWallet(connectorArgs);

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
