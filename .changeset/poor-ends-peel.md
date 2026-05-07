---
"@rainbow-me/rainbowkit": patch
---

Made `getNonce` optional in `AuthenticationAdapter`. When the server generates the nonce alongside the SIWE message, you can now omit `getNonce` entirely—RainbowKit will skip the client-side nonce pre-fetch and call `createMessage` directly with `{ address, chainId }`. Adapters that already provide `getNonce` keep the existing behavior and continue to receive `nonce` in `createMessage` args.
