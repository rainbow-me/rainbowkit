import { useConnect } from 'wagmi';
import { WalletMeta } from './wallet';

export function useWallets(): (WalletMeta & {
  ready?: boolean;
  connect?: () => void;
})[] {
  const [{ data: connectData }, wagmiConnect] = useConnect();

  return connectData.connectors
    .filter(connector => connector._wallet)
    .map(connector => {
      const connect = () => {
        wagmiConnect(connector);
      };

      return {
        useWalletDetail: () => ({ connect }),
        ...(connector._wallet as WalletMeta),
        connect,
        ready: connector.ready,
      };
    });
}
