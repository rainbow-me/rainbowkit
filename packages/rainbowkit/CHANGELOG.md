# @rainbow-me/rainbowkit

## 0.0.2

### Patch Changes

- 670cbfc: **Theme API changes**

  Theme object has been updated in the following way:

  **Renamed**

  `colors.buttonBorder` -> `colors.actionButtonBorder`
  `colors.buttonSecondaryBackground` -> `colors.actionButtonSecondaryBackground`
  `colors.buttonText` -> `colors.actionButtonText`
  `colors.modalClose` -> `colors.closeButton`
  `colors.modalCloseBackground` -> `colors.closeButtonBackground`

  **Added**

  `borders.modalBorderWidth`
  `colors.actionButtonBorderMobile`
  `colors.generalBorderDim`
  `colors.modalTextDim`
  `radii.actionButton`
  `radii.modalMobile`
  `shadows.profileDetailsAction`

  **Removed**

  `colors.menuBackground`
  `colors.menuText`
  `colors.menuTextAction`
  `colors.menuTextDisconnect`
  `colors.menuTextSecondary`
  `shadows.menu`

  New theme type can be found in the Readme.

  **New Accent Colors**

  Developers can now choose between 7 accent colors (`"blue" | "green" | "orange" | "pink" | "purple" | "red" | "yellow"`).

- 06fb716: Inline built-in wallet icons as data URLs
- d553141: Fix `chainId` type error in strict mode
- a696f2c: Add Hardhat chain (chainId: 31337) icon
- e33d34b: Add support for custom “Learn more” URLs

  - To customize the URL for the “Learn more” link within the “What is a wallet?” section, you can provide the optional `learnMoreUrl` prop to `RainbowKitProvider`.
  - If you‘ve created a custom wallet with QR code instructions, you must now provide the `qrCode.instructions.learnMoreUrl` property.

- 96e78b3: Add `fontStack` option to built-in themes, supporting `"rounded"` and `"system"` variants.

  You can now opt out of using [SF Pro Rounded,](https://developer.apple.com/fonts) using default system fonts instead.

  **Example usage**

  ```tsx
  const theme = lightTheme({
    fontStack: 'system',
  });
  ```

- 5aef783: Prevent body from scrolling while modal is open.
- 8d0025a: Increase z-index of modal to `2147483646` (Coinbase modal z-index minus 1) to ensure RainbowKit renders on top of other elements.
- 136c6ea: Adds Argent & Trust to available wallets
- 6df9c50: Fix error when using a chain that doesn’t have an explorer URL defined
- 9f05ad7: Fix tablet styles

  The sizing and positioning of modals have been fixed on tablet devices.

- fe2066f: Highlight the most recently used wallets at the start of the wallet list.
- c174e12: Render WalletConnect QR code within RainbowKit modal

  The official WalletConnect modal is still available if needed, but the QR code is now rendered in the standard RainbowKit style when selecting WalletConnect from the wallet list.

- baf998c: Update `Wallet` API

  Note that this only affects consumers that have created custom wallets. All built-in wallets have been updated to use the new API.

  - The `Wallet` type is now an object rather than a function. Static properties (`id`, `name`, etc.) have been left at the top level, while the `connector` and connection method configuration has been moved to the `wallet.getConnector()` function. This allows consumers to tell wallet instances apart without having to instantiate their connectors.
    - `connector` has been moved to `createConnector().connector`
    - `qrCode` has been moved to `createConnector().qrCode`
    - `qrCode.logoUri` has been renamed to `qrCode.iconUrl` for consistency.
    - `instructions` has been moved to `createConnector().qrCode.instructions` and is now an object with a `steps` array where each item has a `step` property that is either `"install"`, `"create"`, or `"scan"`.
    - `getMobileConnectionUri` has been moved to `createConnector().mobile.getUri`
  - `ready` has been renamed to `installed` to differentiate it from wagmi’s `ready` concept.
  - `downloadUrls` has been restructured into an object with optional values `android`, `ios`, `browserExtension`, `qrCode` (link from scanning QR code on desktop).
  - You can now provide an optional `shortName` property which will be used on mobile.

- eaa5bf6: Support custom wallet groups

  Custom wallets must now be defined using the `WalletList` type to support grouping.

  **Example usage**

  ```tsx
  import { wallet, WalletList } from '@rainbow-me/rainbowkit';

  const wallets: WalletList = [
    {
      groupName: 'Suggested',
      wallets: [wallet.rainbow({ chains })],
    },
  ];
  ```

## 0.0.1

### Patch Changes

- ce3f499: Initial beta release
