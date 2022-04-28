---
'@rainbow-me/rainbowkit': patch
---

Updated the `wagmi` peer dependency to `^0.3.0`.

`wagmi@0.3.x` has introduced breaking changes from `0.2.x` that you will need to be aware of when upgrading. [See the migration guide to `wagmi@0.3.x` here](https://wagmi.sh/docs/migrating-to-03).

In order to use `wagmi` with RainbowKit, you will now need to create a wagmi client that you will pass to `WagmiProvider` (instead of passing configuration directly).

Before:

```tsx
const App = () => {
  return (
    <WagmiProvider autoConnect connectors={connectors} provider={provider}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiProvider>
  );
};
```

After:

```tsx
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

Note: if you are using `chains` from wagmi, the network names are now built in.

Before:

```tsx
const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
];
```

After:

```tsx
const chains: Chain[] = [chain.mainnet, chain.polygon];
```
