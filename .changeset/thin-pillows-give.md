---
'@rainbow-me/rainbowkit': patch
---

Add `configureChains` API.

The `configureChains` function allows you to configure your chains with a selected API provider (Alchemy, Infura, JSON RPC). This means you don't have to worry about deriving your own RPC URLs for each chain, and instantiating a Ethereum Provider.

`configureChains` accepts 2 parameters: an array of `chains`, and an [array of API providers](https://rainbowkit.com/docs/api-providers).

[Learn more about configuring chains & API providers.](https://rainbowkit.com/docs/api-providers)

Before:

```tsx
import {
  RainbowKitProvider,
  Chain,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { createClient, WagmiProvider, chain } from 'wagmi';
import { providers } from 'ethers';

const infuraId = process.env.INFURA_ID;

const provider = ({ chainId }: { chainId?: number }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  chain.mainnet,
  chain.polygon,
  chain.optimism,
  chain.arbitrum,
];

const { connectors } = getDefaultWallets({
  chains,
  infuraId,
  appName: 'My RainbowKit App',
  jsonRpcUrl: ({ chainId }) => {
    const rpcUrls = (chains.find(x => x.id === chainId) || chain.mainnet)
      .rpcUrls;
    return typeof rpcUrls.default === 'string'
      ? rpcUrls.default
      : rpcUrls.default[0];
  },
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiProvider>
  );
};
```

After:

```tsx
import {
  apiProvider,
  Chain,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createClient, WagmiProvider, chain } from 'wagmi';
import { providers } from 'ethers';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.infura(process.env.INFURA_ID)]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiProvider>
  );
};
```

> Note: If you prefer to use Alchemy, you can replace `apiProvider.infura` with `apiProvider.alchemy` and a valid Alchemy ID.
