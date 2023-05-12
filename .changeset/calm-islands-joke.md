---
'with-next': patch
'with-next-custom-button': patch
'with-next-mint-nft': patch
'with-next-siwe-iron-session': patch
'with-next-siwe-next-auth': patch
'rainbowkit-next-app': patch
'generated-test-app': patch
---

Adopted `fs`, `net`, and `tls` polyfills for better `wagmi@1` and `viem` Webpack bundler support.

These modules are required by WalletConnect packages upstream, and were previously polyfilled by `ethers`. Reference the discussion [here](https://github.com/wagmi-dev/wagmi/issues/2300#issuecomment-1541425648).
