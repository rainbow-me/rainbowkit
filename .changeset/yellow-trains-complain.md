---
"@rainbow-me/rainbowkit": patch
---

1. Fixed a bug where `<ConnectButton />` component was calling the "eth_getBalance" RPC call even when `showBalance` was set to `false` for either large or small screen.

2. Fixed a bug in the `<AccountModal />` component so it now calls "eth_getBalance" only when the modal is opened, not automatically during mounting.