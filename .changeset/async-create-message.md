---
'@rainbow-me/rainbowkit': patch
---

Allow `AuthenticationAdapter.createMessage` to return a promise, so apps can fetch or construct the message to sign asynchronously. This enables server-side SIWE message creation before prompting the wallet, while preserving existing synchronous adapters.

See the [server-side message creation docs](/docs/custom-authentication#server-side-message-creation) for guidance on deriving or validating security-sensitive fields on the server.
