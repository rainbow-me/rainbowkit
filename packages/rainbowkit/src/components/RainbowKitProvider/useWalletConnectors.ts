import { useConnect } from 'wagmi';
import { WalletConnectorInstance } from './wallet';

export interface WalletConnector
  extends Omit<WalletConnectorInstance, 'connector'> {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
}

export function useWalletConnectors(): WalletConnector[] {
  const { connect, connectors } = useConnect();

  // @ts-expect-error TODO(jxom): fix
  return (
    connectors
      // @ts-expect-error TODO(jxom): fix
      .filter(connector => connector._wallet)
      .map(connector => {
        return {
          // @ts-expect-error TODO(jxom): fix
          ...(connector._wallet as WalletConnectorInstance),
          connect: () => connect(connector),
          // @ts-expect-error TODO(jxom): fix
          ready: (connector._wallet.installed ?? true) && connector.ready,
        };
      })
  );
}
