import type { Wallet } from './WalletsContext';
import { wallet } from './wallet';

export function getDefaultWallets(options: {
  InjectedConnector: Wallet['connectorClass'];
  WalletConnectConnector: Wallet['connectorClass'];
  WalletLinkConnector: Wallet['connectorClass'];
}): Wallet[] {
  const { InjectedConnector, WalletConnectConnector, WalletLinkConnector } =
    options ?? {};

  if (!InjectedConnector || !WalletConnectConnector || !WalletLinkConnector) {
    throw new Error(
      'The "getDefaultWallets" function requires references to the "InjectedConnector", "WalletConnectConnector" and "WalletLinkConnector" constructors, e.g. getDefaultWallets({ InjectedConnector, WalletConnectConnector, WalletLinkConnector })'
    );
  }

  return [
    wallet.metamask({ InjectedConnector }),
    wallet.rainbow({ WalletConnectConnector }),
    wallet.coinbase({ WalletLinkConnector }),
  ];
}
