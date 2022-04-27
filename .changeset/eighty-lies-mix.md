---
'@rainbow-me/rainbowkit': patch
---

Add support for custom `accentColor` values to built-in themes and add an `accentColorForeground` option to support custom text colors when rendered on top of the accent color

To enable this change, the built in `blue`, `green`, `orange`, `pink`, `purple` and `red` accent color presets are now provided by an `accentColors` property on each theme function. If you were using the `accentColor` option previously and want to maintain the existing behavior, you’ll need to make the following change:

```diff
darkTheme({
-  accentColor: 'purple',
+  ...darkTheme.accentColors.purple,
});
```

**Example usage**

When using a custom accent color:

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: '#7b3fe4',
        accentColorForeground: 'white',
      })}
    >
      {/* Your App */}
    </RainbowKitProvider>
  );
};
```

When using a built-in accent color preset:

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        ...darkTheme.accentColors.purple,
      })}
    >
      {/* Your App */}
    </RainbowKitProvider>
  );
};
```
