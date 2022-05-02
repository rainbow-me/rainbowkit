import {
  BaseProvider,
  WebSocketProvider as BaseWebSocketProvider,
} from '@ethersproject/providers';
import dedent from 'dedent';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { ApiProvider } from './apiProviders/ApiProvider';

export const configureChains = <
  Provider extends BaseProvider = BaseProvider,
  WebSocketProvider extends BaseWebSocketProvider = BaseWebSocketProvider
>(
  defaultChains: Chain[],
  apiProviders: ApiProvider<Provider, WebSocketProvider>[]
) => {
  let chains: Chain[] = [];
  let providers: { [chainId: number]: () => Provider } = {};
  let webSocketProviders: { [chainId: number]: () => WebSocketProvider } = {};

  for (const chain of defaultChains) {
    let apiConfig;
    for (const apiProvider of apiProviders) {
      apiConfig = apiProvider(chain);

      // If no API configuration was found (ie. no RPC URL) for
      // this provider, then we skip and check the next one.
      if (!apiConfig) continue;

      chains = [...chains, apiConfig.chain];
      providers[chain.id] = apiConfig.provider;
      if (apiConfig.webSocketProvider) {
        webSocketProviders[chain.id] = apiConfig.webSocketProvider;
      }

      // We have populated configuration for this chain, we
      // can escape now 🥳.
      break;
    }

    // If no API configuration was found across the API providers
    // then we throw an error to the consumer.
    if (!apiConfig) {
      throw new Error(dedent`
        Could not find valid API provider configuration for \`chain.${chain.name.toLowerCase()}\`.

        You may need to add \`apiProvider.jsonRpc\` to \`configureChains\` with the chain's RPC URL.
        Read more: https://rainbowkit.vercel.app/docs/TODO
      `);
    }
  }

  return {
    chains,
    provider: ({ chainId }: { chainId?: number }) => {
      return providers[
        chainId && chains.some(x => x.id === chainId)
          ? chainId
          : defaultChains[0].id
      ]();
    },
    webSocketProvider: ({ chainId }: { chainId?: number }) => {
      return webSocketProviders[
        chainId && chains.some(x => x.id === chainId)
          ? chainId
          : defaultChains[0].id
      ]?.();
    },
  };
};
