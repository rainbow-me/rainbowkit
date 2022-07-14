---
'@rainbow-me/rainbowkit': minor
---

**Breaking:** Added new required `initialChain` prop to `RainbowKitProvider`

RainbowKit previously (as of v0.3.2) automatically connected to the first chain in the `chains` prop on `RainbowKitProvider`. This behavior no longer provided by default. Instead, you must now explicitly specify which chain you want users to initially connect to.

**Migration guide**

If you want to keep the existing behavior, set the `initialChain` prop to `chains[0]`.

```diff
-<RainbowKitProvider chains={chains}>
+<RainbowKitProvider chains={chains} initialChain={chains[0]}>
```
