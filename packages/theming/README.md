# @rainbow-me/theming

Theme provider for RainbowKit.

## Example

```ts
// theme.config.js
import type { RainbowKitTheme } from '@rainbow-me/theming'

const theme: RainbowKitTheme = {
  fonts: {
    ui: 'SFProRounded, ui-rounded, sans-serif'
  },
  background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)', // used if [Component].background isn't set
  foreground: '#e9f2ff',
  components: {
    NetworkSelect: {
      list: {
        background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
        backdropFilter: '20px',
        borderRadius: '16px',
        fontWeight: 800
      },
      current: {
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: '20px',
        borderRadius: '16px'
      },
      active: {
        background: 'rgba(255, 255, 255, 0.06)'
      },
      option: {
        borderRadius: '12px',
        backdropFilter: '20px'
      },
      indicator: {
        background: '#2ccc00'
      }
    },
    EmojiIcon: {
      fontSize: '0.8em',
      height: '1.8em',
      width: '1.8em'
    },
    EthAddress: {
      profileIcon: {
        height: '1.5em',
        width: '1.5em'
      },
      address: {
        fontWeight: 800,
        color: '#e9f2ff'
      }
    },
    WalletDropdown: {
      menu: {
        background: 'linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%)',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: '20px'
      },
      menuItem: {
        color: '#e9f2ff'
      },
      disconnect: {
        color: '#ff494a'
      }
    }
  }
}
```

```tsx
import { ThemeProvider } from '@rainbow-me/theming'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider value={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
```
