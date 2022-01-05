# @rainbow-me/kit-ui

## 0.0.63

### Patch Changes

- 5e7ae56: Added `RainbowkitThemeProvider` and `defaultTheme`

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
        {style => (
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

- 664bf79: Move kit-modal components into kit-ui
- Updated dependencies
  - @rainbow-me/kit-hooks@0.0.30

## 0.0.62

### Patch Changes

- 5e7ae56: Added `RainbowkitThemeProvider` and `defaultTheme`

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
        {style => (
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

- 664bf79: Move kit-modal components into kit-ui

## 0.0.61

### Patch Changes

- Updated dependencies
  - @rainbow-me/kit-modal@0.0.25
  - @rainbow-me/kit-utils@0.0.14
  - @rainbow-me/kit-hooks@0.0.29

## 0.0.60

### Patch Changes

- fix(ui/WalletDropDown): use divs instead of spans

## 0.0.59

### Patch Changes

- Updated dependencies
  - @rainbow-me/kit-hooks@0.0.28

## 0.0.58

### Patch Changes

- Updated dependencies
  - @rainbow-me/kit-hooks@0.0.27

## 0.0.57

### Patch Changes

- do not use headings for UI components

## 0.0.56

### Patch Changes

- bump vanilla-extract
- Updated dependencies
  - @rainbow-me/kit-modal@0.0.24

## 0.0.55

### Patch Changes

- ultimatively fix esbuild
- Updated dependencies
  - @rainbow-me/kit-hooks@0.0.26
  - @rainbow-me/kit-modal@0.0.23
  - @rainbow-me/kit-utils@0.0.13

## 0.0.54

### Patch Changes

- Updated dependencies
  - @rainbow-me/kit-utils@0.0.12
  - @rainbow-me/kit-hooks@0.0.25
  - @rainbow-me/kit-modal@0.0.22

## 0.0.53

### Patch Changes

- chore: bump deps and fix failing utils build
- Updated dependencies
  - @rainbow-me/kit-modal@0.0.21
  - @rainbow-me/kit-utils@0.0.11
  - @rainbow-me/kit-hooks@0.0.24

## 0.0.52

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-utils@0.0.10
  - @rainbow-me/kit-hooks@0.0.23
  - @rainbow-me/kit-modal@0.0.20

## 0.0.51

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.19

## 0.0.50

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.18

## 0.0.49

### Patch Changes

- vanilla-extract and many other updates
- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.22
  - @rainbow-me/kit-modal@0.0.17
  - @rainbow-me/kit-utils@0.0.9

## 0.0.48

### Patch Changes

- useENSWithAvatar for Profile instead of use-ens
- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.21

## 0.0.47

### Patch Changes

- allow user to toggle dropdown from button component

## 0.0.46

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-utils@0.0.8
  - @rainbow-me/kit-hooks@0.0.20
  - @rainbow-me/kit-modal@0.0.16

## 0.0.45

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.19

## 0.0.44

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-utils@0.0.7
  - @rainbow-me/kit-hooks@0.0.18
  - @rainbow-me/kit-modal@0.0.15

## 0.0.43

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-utils@0.0.6
  - @rainbow-me/kit-hooks@0.0.17
  - @rainbow-me/kit-modal@0.0.14

## 0.0.42

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.13
  - @rainbow-me/kit-utils@0.0.5
  - @rainbow-me/kit-hooks@0.0.16

## 0.0.41

### Patch Changes

- JSDoc
- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.15

## 0.0.40

### Patch Changes

- fix font-weight

## 0.0.39

### Patch Changes

- fix(ui/Pill): set default color

## 0.0.38

### Patch Changes

- fix(ui/AccountInfo): add missing `classNames` prop

## 0.0.37

### Patch Changes

- fix(ui): a bit more color fixes

## 0.0.36

### Patch Changes

- fix(ui): set default color

## 0.0.35

### Patch Changes

- fix(use-ens): fix never triggering with `chainId`
  - @rainbow-me/kit-hooks@0.0.14

## 0.0.34

### Patch Changes

- fix(ui): don't trigger WalletDropdown re-render

## 0.0.33

### Patch Changes

- fix: types and bad ifs in strict mode
- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.13
  - @rainbow-me/kit-modal@0.0.12
  - @rainbow-me/kit-utils@0.0.4

## 0.0.32

### Patch Changes

- fix(ui): ens fix

## 0.0.31

### Patch Changes

- ENS fixes
- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.12

## 0.0.30

### Patch Changes

- @rainbow-me/kit-hooks@0.0.11

## 0.0.29

### Patch Changes

- @rainbow-me/kit-hooks@0.0.10

## 0.0.28

### Patch Changes

- reduce ENS calls
  - @rainbow-me/kit-hooks@0.0.9

## 0.0.27

### Patch Changes

- final touch for WalletDropdown

## 0.0.26

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-utils@0.0.3
  - @rainbow-me/kit-hooks@0.0.8
  - @rainbow-me/kit-modal@0.0.11

## 0.0.25

### Patch Changes

- minor UI fixes

## 0.0.24

### Patch Changes

- feat(ui/walletdropdown): add default background and font size

## 0.0.23

### Patch Changes

- feat(ui/badge): allow passing children

## 0.0.22

### Patch Changes

- feat(ui): make Profile look like in the mockup
- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.10

## 0.0.21

### Patch Changes

- make EmojiIcon more useful and remove Torus from supported connectors of web3-react (for now)
- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.9

## 0.0.20

### Patch Changes

- make NetworkSelect follow Rainbow design

## 0.0.19

### Patch Changes

- fix(ui/profile): properties for button component

## 0.0.18

### Patch Changes

- feat(ui, modal): decouple components from Profile, improve default styles for Modal
- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.8

## 0.0.17

### Patch Changes

- remove bugging `cache` in use-ens
  - @rainbow-me/kit-hooks@0.0.7

## 0.0.16

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-utils@0.0.2
  - @rainbow-me/kit-hooks@0.0.6
  - @rainbow-me/kit-modal@0.0.7

## 0.0.15

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.6

## 0.0.14

### Patch Changes

- fix properties not being optional in Profile ensOptions

## 0.0.13

### Patch Changes

- bug release (again)

## 0.0.12

### Patch Changes

- bug release

## 0.0.11

### Patch Changes

- @rainbow-me/kit-hooks@0.0.5

## 0.0.10

### Patch Changes

- @rainbow-me/kit-hooks@0.0.4

## 0.0.9

### Patch Changes

- allow passing options to useENS
  - @rainbow-me/kit-hooks@0.0.3

## 0.0.8

### Patch Changes

- make less requests for ENS
  - @rainbow-me/kit-hooks@0.0.2

## 0.0.7

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.5

## 0.0.6

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.4
  - @rainbow-me/kit-utils@0.0.1
  - @rainbow-me/kit-hooks@0.0.1

## 0.0.5

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.3

## 0.0.4

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.2

## 0.0.3

### Patch Changes

- Updated dependencies [undefined]
  - @rainbow-me/kit-modal@0.0.1

## 0.0.2

### Patch Changes

- bug release

## 0.0.1

### Patch Changes

- add `button` prop to `Profile` to allow setting custom connect button

## 0.0.0

### Patch Changes

- initial pre-release
- Updated dependencies [undefined]
  - @rainbow-me/kit-hooks@0.0.0
  - @rainbow-me/kit-modal@0.0.0
  - @rainbow-me/kit-utils@0.0.0
