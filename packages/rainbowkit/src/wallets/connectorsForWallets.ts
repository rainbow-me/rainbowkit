import { Connector } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { ConnectorArgs, Wallets } from './Wallet';
import { WalletConnectorInstance } from './WalletConnectorInstance';

export const connectorsForWallets = (wallets: Wallets) => {
  return function (connectorArgs: ConnectorArgs) {
    const connectors: Connector[] = [];

    wallets.forEach(({ groupName, wallets: groupedWallets }) => {
      groupedWallets.forEach(createWallet => {
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

        let walletConnectModalConnector: Connector | undefined;
        if (wallet.id === 'walletConnect' && wallet.qrCode) {
          const { chains, options } = wallet.connector;

          walletConnectModalConnector = new WalletConnectConnector({
            chains,
            options: {
              ...options,
              qrcode: true,
            },
          });

          connectors.push(walletConnectModalConnector);
        }

        // Mutate connector instance to add wallet metadata
        wallet.connector._wallet = {
          groupName,
          walletConnectModalConnector,
          ...wallet,
        } as WalletConnectorInstance;

        connectors.push(wallet.connector);
      });
    });

    return connectors;
  };
};
