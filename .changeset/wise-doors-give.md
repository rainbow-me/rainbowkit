---
'@rainbow-me/rainbowkit': patch
---

**Improved desktop app download support**

RainbowKit wallet connectors now support a desktop download link and desktop
app instructions.

dApps that utilize the Custom Wallets API can reference the updated docs
[here](https://www.rainbowkit.com/docs/custom-wallets).

```ts
{
  downloadUrls: {
    desktop: 'https://my-wallet/desktop-app',
  }
}
```

There is a new 'connect' step on the instructions that shows a connect button
you can use after installing the app.

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
          description: 'Connect to wallet'
          step: 'connect',
          title: 'Connect',
        }
      ]
    },
  },
}
```
