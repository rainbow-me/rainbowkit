---
"@rainbow-me/rainbowkit": patch
---

Disable third-party connector telemetry by default for user privacy.

**To opt-in to WalletConnect analytics:**

With `getDefaultConfig`:
```ts
const config = getDefaultConfig({
  appName: 'My App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
  walletConnectParameters: {
    telemetryEnabled: true
  }
});
```

With `connectorsForWallets`:
```ts
const connectors = connectorsForWallets(
  [{ groupName: 'Popular', wallets: [rainbowWallet] }],
  {
    appName: 'My App',
    projectId: 'YOUR_PROJECT_ID',
    walletConnectParameters: {
      telemetryEnabled: true
    }
  }
);
```

**To opt-in to Base Account telemetry:**
```ts
baseAccount.preference = {
  telemetry: true
};
```
