---
'@rainbow-me/rainbowkit': patch
---

The `AuthenticationAdapter.createMessage` API can now return a promise, so dApps can fetch or construct a custom SIWE message asynchronously. This enables server-side SIWE message creation before prompting the wallet, while preserving existing synchronous behavior.

See the [server-side message creation docs](/docs/custom-authentication#server-side-message-creation) for guidance.
