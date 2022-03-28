---
'@rainbow-me/rainbowkit': patch
---

Add `fontStack` option to built-in themes, supporting `"rounded"` and `"system"` variants.

You can now opt out of using [SF Pro Rounded,](https://developer.apple.com/fonts) using default system fonts instead.

**Example usage**

```tsx
const theme = lightTheme({
  fontStack: 'system',
});
```
