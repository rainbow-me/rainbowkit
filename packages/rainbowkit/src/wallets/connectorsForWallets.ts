import { Connector } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isMobile } from '../utils/isMobile';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { ConnectorArgs, WalletInstance, WalletList } from './Wallet';

export const connectorsForWallets = (walletList: WalletList) => {
  let index = -1;

  return function (connectorArgs: ConnectorArgs) {
    const connectors: Connector[] = [];

    walletList.forEach(({ groupName, wallets }) => {
      wallets.forEach(({ createConnector, ...walletMeta }) => {
        index++;

        const { connector, ...connectionMethods } = omitUndefinedValues(
          createConnector(connectorArgs)
        );

        let walletConnectModalConnector: Connector | undefined;
        if (
          walletMeta.id === 'walletConnect' &&
          connectionMethods.qrCode &&
          !isMobile()
        ) {
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
          index,
          walletConnectModalConnector,
          ...walletMeta,
          ...connectionMethods,
        };

        // Mutate connector instance to add wallet instance
        // @ts-expect-error
        connector._wallets = connector._wallets ?? [];
        // @ts-expect-error
        connector._wallets.push(walletInstance);

        if (!connectors.includes(connector)) {
          connectors.push(connector);
        }
      });
    });

    return connectors;
  };
};
