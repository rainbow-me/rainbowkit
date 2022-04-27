---
'@rainbow-me/rainbowkit': patch
---

The `mobile.getUri` & `desktop.getUri` attributes are now async on the wallet connector API.

Before:

```tsx
{
  mobile: {
    getUri: () => connector.getProvider().connector.uri
  },
}
```

After

```tsx
{
  mobile: {
    getUri: async () => (await connector.getProvider()).connector.uri;
  }
}
```
