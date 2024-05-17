---
"@rainbow-me/rainbowkit": minor
---

Upgraded compatible `wagmi` and `@coinbase/wallet-sdk` versions to support [Coinbase Smart Wallet](https://www.smartwallet.dev/why).

Smart Wallet enables users to create a new wallet in seconds with Passkeys, without installing an app or extension. Smart Wallet users can use the same account and address across all onchain apps with RainbowKit.

Smart Wallet and the underlying smart contract is fully compatible with Wagmi, but dApps need to ensure that their offchain signature validation is [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492) compliant to support smart contract wallets. Follow [this guide](https://www.smartwallet.dev/guides/signature-verification) for more information.

Smart Wallet is currently only available for testnets while using RainbowKit in a local development environment. Support for Mainnet and full production rollout will occur automatically later this month.

Coinbase Wallet users on desktop and mobile will now interact with a new connection flow in RainbowKit alongside Smart Wallet.
