import { Connector } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { ConnectorArgs, WalletInstance, WalletList } from './Wallet';

export const connectorsForWallets = (walletList: WalletList) => {
  return function (connectorArgs: ConnectorArgs) {
    const connectors: Connector[] = [];

    walletList.forEach(({ groupName, wallets }) => {
      wallets.forEach(({ createConnector, ...walletMeta }) => {
        const { connector, ...connectionMethods } = omitUndefinedValues(
          createConnector(connectorArgs)
        );

        if (connector._wallet) {
          throw new Error(
            `Can't connect wallet "${walletMeta.name}" to connector "${
              connector.name ?? connector.id
            }" as it's already connected to wallet "${
              connector._wallet.name
            }". Each wallet must have its own connector instance.`
          );
        }

        let walletConnectModalConnector: Connector | undefined;
        if (walletMeta.id === 'walletConnect' && connector.qrCode) {
          const { chains, options } = connector;

          walletConnectModalConnector = new WalletConnectConnector({
            chains,
            options: {
              ...options,
              qrcode: true,
            },
          });

          connectors.push(walletConnectModalConnector);
        }

        const walletInstance: WalletInstance = {
          connector,
          groupName,
          walletConnectModalConnector,
          ...walletMeta,
          ...connectionMethods,
        };

        // Mutate connector instance to add wallet instance
        connector._wallet = walletInstance;

        connectors.push(connector);
      });
    });

    return connectors;
  };
};
