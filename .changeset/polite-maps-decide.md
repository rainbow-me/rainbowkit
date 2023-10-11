---
"@rainbow-me/rainbowkit": patch
---

Fixed an issue where a user would not get automatically logged out from the Authentication API after switching their wallet in MetaMask or other browser wallets. Users must now sign a new SIWE message after switching wallets.
