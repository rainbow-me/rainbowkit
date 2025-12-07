---
"@rainbow-me/rainbowkit": major
"@rainbow-me/rainbow-button": major
"@rainbow-me/rainbowkit-siwe-next-auth": minor
"@rainbow-me/create-rainbowkit": minor
"example": patch
"site": patch
"with-create-react-app": patch
"with-next": patch
"with-next-app": patch
"with-next-app-i18n": patch
"with-next-custom-button": patch
"with-next-mint-nft": patch
"with-next-rainbow-button": patch
"with-next-siwe-iron-session": patch
"with-next-siwe-next-auth": patch
"with-next-wallet-button": patch
"with-react-router": patch
"with-remix": patch
"with-vite": patch
---

**BREAKING CHANGE:** Upgrade to Wagmi v3.

This release upgrades the wagmi peer dependency from `^2.9.0` to `^3.0.0`. Wagmi v3 moves connector dependencies to optional peer dependencies. RainbowKit now bundles all required connector packages as dependencies to ensure seamless compatibility.

### Breaking Changes

- Wagmi peer dependency changed from `^2.9.0` to `^3.0.0`
- Minimum TypeScript version recommended is 5.7.3

### Migration

1. Update your wagmi dependency to `^3.0.0`
2. Update your viem dependency to `^2.38.0` or later
3. No other changes required - RainbowKit handles connector dependencies internally

### New Dependencies

RainbowKit now includes the following connector packages as dependencies:
- `@coinbase/wallet-sdk`
- `@walletconnect/ethereum-provider`
- `@metamask/sdk`
- `@safe-global/safe-apps-provider`
- `@safe-global/safe-apps-sdk`
- `@base-org/account`
