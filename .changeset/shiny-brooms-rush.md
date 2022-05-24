---
'@rainbow-me/rainbowkit': minor
---

**Breaking:** Updated the `wagmi` peer dependency to `^0.4` & removed the `configureChains` & `apiProvider` exports.

You now need to use [wagmi's configureChains](https://wagmi.sh/docs/providers/configuring-chains) function and providers.

## Migration guide

### 1. Upgrade `wagmi` to `^0.4.2`

```
npm i wagmi@^0.4.2
```

### 2. Migrate `configureChains`

```diff
import {
  apiProvider,
-  configureChains
} from '@rainbow-me/rainbowkit';
+import { configureChains } from 'wagmi';
```

### 3. Migrate providers

#### `apiProvider.alchemy` to `alchemyProvider`

```diff
-import {
-  apiProvider,
-} from '@rainbow-me/rainbowkit';
import { configureChains } from 'wagmi';
+import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
- [apiProvider.alchemy(process.env.ALCHEMY_ID)]
+ [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID })]
);
```

#### `apiProvider.infura` to `infuraProvider`

```diff
-import {
-  apiProvider,
-} from '@rainbow-me/rainbowkit';
import { configureChains } from 'wagmi';
+import { infuraProvider } from 'wagmi/providers/infura';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
- [apiProvider.infura(process.env.INFURA_ID)]
+ [infuraProvider({ infuraId: process.env.INFURA_ID })]
);
```

#### `apiProvider.jsonRpc` to `jsonRpcProvider`

```diff
-import {
-  apiProvider,
-} from '@rainbow-me/rainbowkit';
import { configureChains } from 'wagmi';
+import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
-   apiProvider.jsonRpc(chain => ({
-     rpcUrl: `https://${chain.id}.example.com`,
-   })),
+   jsonRpcProvider({
+     rpc: chain => ({
+       http: `https://${chain.id}.example.com`,
+     }),
+   }),
  ]
);
```

#### `apiProvider.fallback` to `publicProvider`

```diff
-import {
-  apiProvider,
-} from '@rainbow-me/rainbowkit';
import { configureChains } from 'wagmi';
+import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
- [apiProvider.fallback()]
+ [publicProvider()]
);
```
