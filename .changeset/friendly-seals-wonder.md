---
'@rainbow-me/rainbowkit-siwe-next-auth': minor
---

RainbowKit has reached v1 alongside [wagmi](https://wagmi.sh), which includes [breaking changes](https://wagmi.sh/react/migration-guide#1xx-breaking-changes).

`0.2.x` now requires `@rainbow-me/rainbowkit` v1, specifically: `1.0.x`.

While wagmi v1 now relies on `viem` instead of the `ethers` peer dependency, `siwe` will still require `ethers` as a peer dependency. Ensure that you have installed a compatible `ethers` version, including: `^5.6.8 || ^6.0.8`.
