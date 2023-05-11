---
'@rainbow-me/create-rainbowkit': patch
---

Adopted `fs`, `net`, and `tls` polyfills in the `@rainbow-me/create-rainbowkit` templates for better `wagmi@1` and `viem` Webpack bundler support.

These modules are required by WalletConnect packages upstream, and were previously polyfilled by `ethers`. Reference the discussion [here](https://github.com/wagmi-dev/wagmi/issues/2300#issuecomment-1541425648).
