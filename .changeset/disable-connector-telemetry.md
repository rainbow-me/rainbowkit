---
"@rainbow-me/rainbowkit": patch
---

Disabled third-party connector telemetry by default for user privacy. h/t @TimDaub

**To opt-in to WalletConnect analytics:**

With `getDefaultConfig`:
```ts
const config = getDefaultConfig({
  /** ... **/
  walletConnectParameters: {
    telemetryEnabled: true
  }
});
```

**To opt-in to Base Account telemetry:**
```ts
baseAccount.preference = {
  telemetry: true
};
```

**To opt-in to MetaMask analytics:**
```ts
metaMaskWallet.enableAnalytics = true;
```
