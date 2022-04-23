import { Chain as WagmiChain } from 'wagmi';
import { WalletConfig } from './Wallet';

const getUrl = ({
  apiKey,
  chains,
  type,
}: {
  apiKey?: string;
  chains: WagmiChain[];
  type?: 'alchemy' | 'infura';
}) => {
  return ({ chainId }: { chainId?: number }) => {
    const chain = chains.find(({ id }) => id === chainId) || chains[0];
    return type && chain.rpcUrls[type]
      ? `${chain.rpcUrls[type]}/${apiKey}`
      : typeof chain.rpcUrls.default === 'string'
      ? chain.rpcUrls.default
      : chain.rpcUrls.default[0];
  };
};

export const getJsonRpcUrl = ({
  apiConfig,
  chains,
}: {
  apiConfig?: WalletConfig['apiConfig'];
  chains: WalletConfig['chains'];
}) => {
  let jsonRpcUrl;
  if (apiConfig?.alchemyId) {
    jsonRpcUrl = getUrl({
      apiKey: apiConfig.alchemyId as string,
      chains,
      type: 'alchemy',
    });
  } else if (apiConfig?.infuraId) {
    jsonRpcUrl = getUrl({
      apiKey: apiConfig.infuraId as string,
      chains,
      type: 'infura',
    });
  } else if (apiConfig?.jsonRpcUrl) {
    jsonRpcUrl = apiConfig.jsonRpcUrl;
  } else {
    jsonRpcUrl = getUrl({
      chains,
    });
  }
  return jsonRpcUrl;
};
