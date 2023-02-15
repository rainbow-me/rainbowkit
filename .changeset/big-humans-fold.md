---
'@rainbow-me/create-rainbowkit': patch
---

Fix next-app template by removing `alchemyProvider` in favor of `publicProvider`

The `alchemyProvider` public API key provided by Alchemy and the Ethers project has been deprecated. Examples and templates now favor the `publicProvider` exclusively.
