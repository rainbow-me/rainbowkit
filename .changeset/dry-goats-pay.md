---
'@rainbow-me/rainbowkit': patch
---

Added `initialChain` prop to `RainbowKitProvider`

RainbowKit (as of v0.3.2) automatically connects to the first chain in the `chains` array passed to `RainbowKitProvider`. This behavior can now be customized via the `initialChain` prop.

The initial chain can be configured using a chain ID.

```tsx
<RainbowKitProvider chains={chains} initialChain={1}>
```

As a convenience, you can also pass a chain object.

```tsx
<RainbowKitProvider chains={chains} initialChain={chain.mainnet}>
```
