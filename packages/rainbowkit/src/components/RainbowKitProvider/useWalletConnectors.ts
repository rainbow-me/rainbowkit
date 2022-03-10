import { useConnect } from 'wagmi';
import { WalletConnectorConfig } from './wallet';

type OmittedFields = 'connector';
type DefaultedFields = 'useDesktopWalletDetail';

type ResolvedWalletConnectorConfig = Omit<
  WalletConnectorConfig,
  OmittedFields | DefaultedFields
> &
  Pick<Required<WalletConnectorConfig>, DefaultedFields>;

export interface WalletConnector extends ResolvedWalletConnectorConfig {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
}

export function useWalletConnectors(): WalletConnector[] {
  const [{ data: connectData }, connect] = useConnect();

  return connectData.connectors
    .filter(connector => connector._wallet)
    .map(connector => {
      return {
        useDesktopWalletDetail: () => ({}),
        ...(connector._wallet as WalletConnectorConfig),
        connect: () => connect(connector),
        ready: connector.ready && (connector._wallet.ready ?? true),
      };
    });
}
