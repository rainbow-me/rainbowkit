import { useConnect } from 'wagmi';
import { WagmiConnectorInstance, WalletInstance } from '../wallets/Wallet';
import { isLowerCaseMatch } from './strings';

interface GetWalletsFromConnectorsParameters {
  connectors: ReturnType<typeof useConnect>['connectors'];
}

interface GetWalletConnectWalletParameters {
  walletId?: string;
  wallets: WalletInstance[];
}

export function getWalletsFromConnectors({
  connectors,
}: GetWalletsFromConnectorsParameters): WalletInstance[] {
  return connectors.map((connector) => {
    const walletInstance = connector as WagmiConnectorInstance;
    return {
      connectorId: walletInstance.id,
      ...walletInstance,
      ...(walletInstance.rkDetails || {}),
    } as WalletInstance;
  });
}

export function getWalletConnectWallet({
  walletId,
  wallets,
}: GetWalletConnectWalletParameters) {
  return (
    wallets.find(({ id, connectorId }) =>
      walletId
        ? isLowerCaseMatch(walletId, id)
        : isLowerCaseMatch(connectorId, 'walletConnect'),
    ) ?? null
  );
}
