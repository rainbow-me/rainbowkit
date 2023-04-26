---
'@rainbow-me/rainbowkit': patch
---

Support for `options` customization for `walletConnectWallet`

**Example usage**

```tsx
walletConnectWallet(options: {
  projectId: string;
  chains: Chain[];
  options?: {
    qrcodeModalOptions?: {
      desktopLinks?: string[];
      mobileLinks?: string[];
    };
  }
});
```

Reference the [docs](https://www.rainbowkit.com/docs/custom-wallet-list#walletconnect) for additional supported options.
