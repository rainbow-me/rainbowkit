import { useConnect } from 'wagmi';
import { WalletConnectorConfig } from './wallet';

type OmittedFields = 'connector';
type DefaultedFields = 'useDesktopWalletDetail' | 'useMobileWalletButton';

type ResolvedWalletConnectorConfig = Omit<
  WalletConnectorConfig,
  OmittedFields | DefaultedFields
> &
  Pick<Required<WalletConnectorConfig>, DefaultedFields>;

export interface WalletConnector extends ResolvedWalletConnectorConfig {
  ready?: boolean;
  connect?: () => void;
}

export function useWalletConnectors(): WalletConnector[] {
  const [{ data: connectData }, wagmiConnect] = useConnect();

  return connectData.connectors
    .filter(connector => connector._wallet)
    .map(connector => {
      const connect = () => {
        wagmiConnect(connector);
      };

      return {
        useDesktopWalletDetail: () => ({}),
        useMobileWalletButton: () => ({ onClick: connect }),
        ...(connector._wallet as WalletConnectorConfig),
        connect,
        ready: connector.ready,
      };
    });
}
