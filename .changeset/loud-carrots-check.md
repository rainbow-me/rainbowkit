---
"@rainbow-me/rainbowkit": major
---

**Breaking:**

The [wagmi](https://wagmi.sh) and [viem](https://viem.sh) peer dependencies have reached `2.x.x` with breaking changes.

Follow the steps below to migrate.

**1. Upgrade RainbowKit, `wagmi`, and `viem` to their latest versions**

```bash
npm i @rainbow-me/rainbowkit@2 wagmi@2 viem@2.x
```

**2. Install `@tanstack/react-query` peer dependency**

With Wagmi v2, [TanStack Query](https://tanstack.com/query/v5/docs/react/overview) is now a required peer dependency.

Install it with the following command:

```bash
npm i @tanstack/react-query
```

**3. Upgrade your RainbowKit and Wagmi configurations**

```diff
  import '@rainbow-me/rainbowkit/styles.css'

+ import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
- import { createPublicClient, http } from 'viem'
- import { WagmiConfig } from 'wagmi'
+ import { WagmiProvider, http } from 'wagmi'
- import { configureChains, createConfig } from 'wagmi'
  import { mainnet } from 'wagmi/chains'
  import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
- import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
+ import { getDefaultConfig } from '@rainbow-me/rainbowkit'

  /* getDefaultWallets is now optional */
- const { wallets } = getDefaultWallets({
-   appName: 'RainbowKit demo',
-   projectId: 'YOUR_PROJECT_ID',
-   chains,
- })

  /* connectorsForWallets is now optional */
- const connectors = connectorsForWallets([...wallets])

- const { chains, publicClient } = configureChains( 
-   [mainnet, sepolia], 
-   [publicProvider(), publicProvider()],
- )

- const config = createConfig({
-   autoConnect: true,
-   publicClient,
- })

  /* New API that includes Wagmi's createConfig and bundles getDefaultWallets and connectorsForWallets */
+ const config = getDefaultConfig({
+   appName: 'RainbowKit demo',
+   projectId: 'YOUR_PROJECT_ID',
+   chains: [mainnet],
+   transports: {
+     [mainnet.id]: http(),
+   },
+ })

+ const queryClient = new QueryClient()

  const App = () => {
    return (
-     <WagmiConfig config={config}>
+     <WagmiProvider config={config}>
+       <QueryClientProvider client={queryClient}>
-         <RainbowKitProvider chains={chains}>
+         <RainbowKitProvider>
            {/* Your App */}
          </RainbowKitProvider>
+       </QueryClientProvider>
-     </WagmiConfig>
+     </WagmiProvider>
    )
  }
```

[You can read an in-depth migration guide here](https://rainbowkit.com/guides/rainbowkit-wagmi-v2).

**4. Check for breaking changes in `wagmi` and `viem`**

If you use `wagmi` hooks and `viem` actions in your dApp, you will need to follow the migration guides for v2:

- [Wagmi v2 Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)
- [Viem v2 Breaking Changes](https://viem.sh/docs/migration-guide.html#_2-x-x-breaking-changes)
