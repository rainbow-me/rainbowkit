---
'@rainbow-me/rainbowkit': patch
---

Support filtering chains before passing them to `RainbowKitProvider`.

This is particularly useful if you're building an L2-only project and you want mainnet to be available for resolving ENS details but you don't want it to be listed in the chain selector.

**Example usage**

This example uses Polygon while supporting ENS from mainnet.

```tsx
const {
  chains: [, ...chains], // Omit first chain (mainnet), get the rest
  provider,
  webSocketProvider,
} = configureChains(
  [chain.mainnet, chain.polygon],
  [
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
);
```
