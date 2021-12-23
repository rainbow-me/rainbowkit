---
'@rainbow-me/kit-ui': patch
---

Added `RainbowkitThemeProvider` and `defaultTheme`

All theme values have been removed from the provided CSS file. Instead, themes are now configured via the `RainbowkitThemeProvider` component.

Basic usage with the default theme:

```tsx
import { RainbowkitThemeProvider, defaultTheme } from '@rainbow-me/kit-ui'

export default function App() {
  return <RainbowkitThemeProvider theme={defaultTheme}>...</RainbowkitThemeProvider>
}
```

`RainbowkitThemeProvider` renders its own `div` element by default, but you can pass a function as a child element to take control of the rendering:

```tsx
import { RainbowkitThemeProvider, defaultTheme } from '@rainbow-me/kit-ui'

export default function App() {
  return (
    <RainbowkitThemeProvider theme={defaultTheme}>
      {(style) => (
        <div id="app" style={style}>
          ...
        </div>
      )}
    </RainbowkitThemeProvider>
  )
}
```

Built-in theme functions also accept overrides:

```tsx
import { RainbowkitThemeProvider, defaultTheme } from '@rainbow-me/kit-ui'

const theme = defaultTheme({
  overrides: {
    colors: {
      connectionIndicator: 'blue'
    }
  }
})

export default function App() {
  return <RainbowkitThemeProvider theme={theme}>...</RainbowkitThemeProvider>
}
```

The following theme values are available for customization:

```
colors.connectButtonBackground
colors.connectButtonText
colors.connectionIndicator
colors.dropdownButtonBackground
colors.dropdownButtonText
colors.menuBackground
colors.menuDivider
colors.menuItemSelectedBackground
colors.menuText
colors.menuTextAction
colors.menuTextDisconnect
colors.menuTextSecondary
colors.modalBackdrop
colors.modalBackground
colors.modalClose
colors.modalText
colors.modalTextError
colors.modalTextSecondary
```

```
fonts.body
```

```
radii.connectButton
radii.dropdownButton
radii.menu
radii.menuItem
radii.modal
radii.networkButton
```

```
shadows.connectButton
shadows.dropdownButton
shadows.menu
shadows.networkButton
```

If you want to make your own theme from scratch, the `Theme` type is also available.

```ts
import { Theme } from '@rainbow-me/kit-ui'

const theme: Theme = {
  colors: {
    connectButtonBackground: 'white'
    // etc...
  }
}
```
