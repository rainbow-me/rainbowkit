import { useContext, useMemo } from 'react';
import { Connector, useConnect } from 'wagmi';
import { Wallet, WalletsContext } from './WalletsContext';

const isNotNull = <T>(value: T | null): value is T => value !== null;

const warnedConnectorIds: string[] = [];

const connectorDisplayNameFromId = (connectorId: string): string => {
  const connecterNamesById = {
    injected: 'InjectedConnector',
    walletConnect: 'WalletConnectConnector',
    walletLink: 'WalletLinkConnector',
  } as const;

  return connectorId in connecterNamesById
    ? connecterNamesById[connectorId as keyof typeof connecterNamesById]
    : `a connector with an ID of "${connectorId}"`;
};

export interface WalletWithConnector extends Wallet {
  ready: boolean;
  connect: () => ReturnType<ReturnType<typeof useConnect>[1]>;
}

export function useWallets(): WalletWithConnector[] {
  const wallets = useContext(WalletsContext);
  const [{ data: connectData }, connect] = useConnect();

  const connectorsById = useMemo(() => {
    const connectors: Record<string, Connector> = {};

    connectData.connectors.forEach(connector => {
      connectors[connector.id] = connector;
    });

    return connectors;
  }, [connectData.connectors]);

  return useMemo(
    () =>
      wallets
        .map(wallet => {
          const connector = connectorsById[wallet.connectorId];

          if (!connector) {
            if (
              process.env.NODE_ENV !== 'production' &&
              !warnedConnectorIds.includes(wallet.connectorId)
            ) {
              const connectorIds = Object.keys(connectorsById);

              // eslint-disable-next-line no-console
              console.warn(
                `Wallet "${
                  wallet.id
                }" needs access to an instance of ${connectorDisplayNameFromId(
                  wallet.connectorId
                )} but couldn't find ${
                  connectorIds.length === 0
                    ? 'any connectors.'
                    : `one. The only available ${
                        connectorIds.length > 1
                          ? 'connectors are'
                          : 'connector is'
                      } ${connectorIds
                        .map(connectorDisplayNameFromId)
                        .join(', ')}.`
                }`
              );

              warnedConnectorIds.push(wallet.connectorId);
            }

            return null;
          }

          return {
            ...wallet,
            connect: () => connect(connector),
            ready: connector.ready,
          };
        })
        .filter(isNotNull),
    [connect, connectorsById, wallets]
  );
}
