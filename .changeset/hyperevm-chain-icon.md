---
"@rainbow-me/rainbowkit": patch
---

Fixed HyperEVM (chain id `999`) displaying the Zora icon. The legacy `zoraTestnet` (Zora Goerli) metadata shared chain id `999` with HyperEVM and overwrote it in the chain id lookup, so it has been removed.
