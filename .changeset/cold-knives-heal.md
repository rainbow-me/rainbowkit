---
'@rainbow-me/rainbowkit': patch
---

Add `data-testid` attributes to support end-to-end testing.

The following set of `data-testid` attribute values are now provided.

- `rk-connect-button`
- `rk-disconnect-button`
- `rk-account-button`
- `rk-chain-button`
- `rk-wrong-network-button`
- `rk-wallet-option-${wallet.id}`
- `rk-chain-option-${chain.id}`
- `rk-chain-option-disconnect`
- `rk-auth-message-button`

These attributes can be targeted with a selector like this:

```css
[data-testid="rk-connect-button"]
```
