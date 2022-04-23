import { Chain as WagmiChain } from 'wagmi';
import { WalletConfig } from './Wallet';

const getJsonRpcUrl = ({
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

export const getWalletProviderConfig = ({
  chains,
  providerConfig,
}: {
  providerConfig?: WalletConfig['providerConfig'];
  chains: WagmiChain[];
}) => {
  let infuraId;
  let jsonRpcUrl;
  if (providerConfig?.alchemy) {
    jsonRpcUrl = getJsonRpcUrl({
      apiKey: providerConfig.alchemy.apiKey,
      chains,
      type: 'alchemy',
    });
  } else if (providerConfig?.infura) {
    infuraId = providerConfig.infura.apiKey;
    jsonRpcUrl = getJsonRpcUrl({
      apiKey: infuraId,
      chains,
      type: 'infura',
    });
  } else if (providerConfig?.custom) {
    jsonRpcUrl = providerConfig.custom.jsonRpcUrl;
  } else {
    jsonRpcUrl = getJsonRpcUrl({
      chains,
    });
  }
  return { infuraId, jsonRpcUrl };
};
