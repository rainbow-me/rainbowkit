---
'@rainbow-me/rainbowkit': patch
---

**Improved extension store support**

RainbowKit wallet connectors now support multiple browser extension download URLs, and RainbowKit will automatically direct users to the appropriate extension store.

Users will also experience an improved download flow for extensions, including support for Arc, Opera, and Safari browsers.

dApps that utilize the `Custom Wallets` API can reference the updated docs [here](https://www.rainbowkit.com/docs/custom-wallets).

```tsx
{
  downloadUrls: {
    chrome: 'https://chrome.google.com/webstore/detail/my-wallet',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/my-wallet',
    firefox: 'https://addons.mozilla.org/firefox/addon/my-wallet',
    opera: 'https://addons.opera.com/extensions/details/my-wallet',
    browserExtension: 'https://my-wallet/', */ fallback download page */
  }
}
```
