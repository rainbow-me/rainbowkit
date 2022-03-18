---
'@rainbow-me/rainbowkit': patch
---

Add support for custom “Learn more” URLs

- To customize the URL for the “Learn more” link within the “What is a wallet?” section, you can provide the optional `learnMoreUrl` prop to `RainbowKitProvider`.
- If you‘ve created a custom wallet with QR code instructions, you must now provide the `qrCode.instructions.learnMoreUrl` property.
