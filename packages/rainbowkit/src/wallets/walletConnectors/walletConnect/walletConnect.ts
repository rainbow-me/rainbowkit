/* eslint-disable sort-keys-fix/sort-keys-fix */
import { chain } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isIOS } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getJsonRpcUrl } from '../../getJsonRpcUrl';

export interface WalletConnectOptions {
  apiConfig?: WalletConfig['apiConfig'];
  chains: WalletConfig['chains'];
}

export const walletConnect = ({
  apiConfig,
  chains,
}: WalletConnectOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: async () => (await import('./walletConnect.svg')).default,
  iconBackground: '#3b99fc',
  createConnector: ({ chainId = chain.mainnet.id }) => {
    const ios = isIOS();

    const jsonRpcUrl = getJsonRpcUrl({
      apiConfig,
      chains,
    });

    const connector = new WalletConnectConnector({
      chains,
      options: {
        qrcode: ios,
        ...(apiConfig?.infuraId
          ? { infuraId: apiConfig.infuraId }
          : {
              rpc: {
                [chainId]:
                  typeof jsonRpcUrl === 'function'
                    ? jsonRpcUrl({ chainId })
                    : jsonRpcUrl,
              },
            }),
      },
    });

    const getUri = async () => (await connector.getProvider()).connector.uri;

    return {
      connector,
      ...(ios
        ? {}
        : {
            mobile: { getUri },
            qrCode: { getUri },
          }),
    };
  },
});
