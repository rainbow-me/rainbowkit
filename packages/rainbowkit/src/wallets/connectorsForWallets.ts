import { Connector } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isMobile } from '../utils/isMobile';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { WalletInstance, WalletList } from './Wallet';

export const connectorsForWallets = (walletList: WalletList) => {
  return () => {
    let index = -1;

    const connectors: Connector[] = [];

    walletList.forEach(({ groupName, wallets }) => {
      wallets.forEach(({ createConnector, ...walletMeta }) => {
        index++;

        const { connector, ...connectionMethods } = omitUndefinedValues(
          createConnector()
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

        if (!connectors.includes(connector)) {
          connectors.push(connector);

          // Reset private wallet list the first time we see
          // a connector to avoid duplicates after HMR,
          // otherwise we'll keep pushing wallets into
          // the old list. This is happening because we're
          // re-using the WalletConnectConnector instance
          // so the wallet list already exists after HMR.
          // @ts-expect-error
          connector._wallets = [];
        }

        // Add wallet to connector's list of associated wallets
        // @ts-expect-error
        connector._wallets.push(walletInstance);
      });
    });

    return connectors;
  };
};
