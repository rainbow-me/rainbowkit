---
'@rainbow-me/rainbowkit': minor
---

**Improved desktop wallet download support**

RainbowKit wallet connectors now support desktop download links and desktop
wallet instructions.

Dapps that utilize the Custom Wallets API can reference the updated docs [here](https://www.rainbowkit.com/docs/custom-wallets).

```ts
{
  downloadUrls: {
    windows: 'https://my-wallet/windows-app',
    macos: 'https://my-wallet/macos-app',
    linux: 'https://my-wallet/linux-app',
    desktop: 'https://my-wallet/desktop-app',
  }
}
```

We've also introduced a new 'connect' `InstructionStepName` type in the `instructions` API to provide wallet connection instructions.

```ts
return {
  connector,
  desktop: {
    getUri,
    instructions: {
      learnMoreUrl: 'https://my-wallet/learn-more',
      steps: [
        // ...
        {
          description: 'A prompt will appear for you to approve the connection to My Wallet.'
          step: 'connect',
          title: 'Connect',
        }
      ]
    },
  },
}
```
