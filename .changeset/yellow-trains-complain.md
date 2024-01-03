---
"@rainbow-me/rainbowkit": patch
---

Fixed a bug where `<ConnectButton />` component was calling the "eth_getBalance" RPC call even when `showBalance` was set to `false` for either large or small screen.
