---
'@rainbow-me/rainbowkit': patch
---

Add support for custom `accentColor` values to built-in themes

In addition to the built in `blue`, `green`, `orange`, `pink`, `purple` and `red` presets, the `accentColor` value can now be defined as an object with `color` and `foregroundTextColor` properties.

**Example usage**

```tsx
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

const App = () => {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: {
          color: '#FFFF00',
          foregroundTextColor: '#000', // Used for text on top of the accent color
        },
      })}
    >
      {/* Your App */}
    </RainbowKitProvider>
  );
};
```
