# @rainbow-me/create-rainbowkit

## 0.3.5

### Patch Changes

- 3fc2ec4: Reverted the addition of the `--legacy-peer-deps` flag because the conflict with wagmi peer dependencies no longer exists.

## 0.3.4

### Patch Changes

- 82153ed: Upgraded wagmi to `^2.9.2` and viem to `2.9.31`. The viem version now statically reflects the version most compatible with wagmi.

## 0.3.3

### Patch Changes

- ef53ede: Added `--legacy-peer-deps` flag when running `npm init @rainbow-me/rainbowkit@latest`.

## 0.3.2

### Patch Changes

- c837995: Updated the following packages:
  - wagmi to `^2.5.11`
  - viem to `^2.8.12`
  - @tanstack/react-query to `^5.28.4`
  - typescript to `5.4.2`

## 0.3.1

### Patch Changes

- 6982833: Updated the following packages:

  - `next` to `^14.1.3`
  - `eslint-config-next` to `^14.1.3`
  - `@types/react` to `^18.2.64`
  - `@types/react` to `^18.2.64`

## 0.3.0

### Minor Changes

- aa0269e: Migrated template to Wagmi v2 with the following package changes:

  - updated `wagmi` from `1.4.x` to `^2.0.0`
  - updated `viem` from `1.21.x` to `^2.0.0`
  - added `@tanstack/react-query` dependency with version `^5`

## 0.2.11

### Patch Changes

- d73b021: Updated wagmi to `~1.4.13` and viem to `~1.21.4`.

## 0.2.10

### Patch Changes

- e50727f4: Updated wagmi to `~1.4.12` and viem to `~1.19.15`.

  Wagmi `1.4.12` mitigates a supply-chain attack on the @ledgerhq/connect-kit package. RainbowKit dApp's were not directly impacted, but dApps that used the LedgerConnector connector in earlier versions of Wagmi could have been. This issue has since been resolved by Ledger but the wagmi team is encouraging developers to upgrade Wagmi and RainbowKit out of an abundance of caution.

## 0.2.9

### Patch Changes

- c1d040f8: Updated wagmi to `~1.4.7` and viem to `~1.19.4`.

## 0.2.8

### Patch Changes

- 2abfffe0: Updated wagmi to `~1.4.3` and viem to `~1.16.3`.

## 0.2.7

### Patch Changes

- 6b460fcb: Updated wagmi to `~1.4.2` and viem to `~1.12.2`.

## 0.2.6

### Patch Changes

- 118dfe11: Updated wagmi to `~1.4.0` and viem to `~1.10.0`.

## 0.2.5

### Patch Changes

- ad913e60: Upgraded `wagmi`, `viem`, and `next` in templates.
- f5e73b98: Upgraded templates for `base` network support

## 0.2.4

### Patch Changes

- 6d361b4: Updated `wagmi` to `~1.3.0` and `viem` to `~1.1.0`.

## 0.2.3

### Patch Changes

- e2b1072: The [wagmi](https://wagmi.sh) peer dependency has been updated to `~1.2.0`. RainbowKit remains compatible with `~1.1.0` and `~1.0.1`.

  The [viem](https://viem.sh) peer dependency has been updated to `^1.0.0`. RainbowKit remains compatible with `~0.3.19` and beyond.

  It is recommended that you upgrade to recent versions of `wagmi` and `viem` to ensure a smooth transition to WalletConnect v2.

  [Reference the viem migration guide here](https://viem.sh/docs/migration-guide.html#_1-x-x-breaking-changes).

## 0.2.2

### Patch Changes

- 86a1ddd: Upgraded templates to support Next 13

## 0.2.1

### Patch Changes

- 371c988: Adopted `fs`, `net`, and `tls` polyfills in the `@rainbow-me/create-rainbowkit` templates for better `wagmi@1` and `viem` Webpack bundler support.

  These modules are required by WalletConnect packages upstream, and were previously polyfilled by `ethers`. Reference the discussion [here](https://github.com/wagmi-dev/wagmi/issues/2300#issuecomment-1541425648).

## 0.2.0

### Minor Changes

- 93b58d0: RainbowKit and the [wagmi](https://wagmi.sh) peer dependency have been updated to `1.x.x`, which includes [breaking changes](https://wagmi.sh/react/migration-guide#1xx-breaking-changes).

  wagmi v1 now relies on `viem` instead of the `ethers` peer dependency, so `@rainbow-me/create-rainbowkit` templates have been upgraded to favor [viem](https://viem.sh/).

  Give RainbowKit and [wagmi v1](https://wagmi.sh/react/migration-guide#1xx-breaking-changes) a try today:

  ```bash
  yarn create @rainbow-me/rainbowkit
  ```

## 0.1.11

### Patch Changes

- 865175f: Upgraded template dependencies: `ethers`, `next`, `react`, `react-dom`, `siwe` and `next-auth` to support `siwe@2`.

## 0.1.10

### Patch Changes

- aef9643: Support for WalletConnect Cloud `projectId`

## 0.1.9

### Patch Changes

- 9838acf: Updated `wagmi` to `0.12.x`

## 0.1.8

### Patch Changes

- 924ae82: Updated `wagmi` to `>=0.11.7`

- cf62d10: Fix next-app template by removing `alchemyProvider` in favor of `publicProvider`

  The `alchemyProvider` public API key provided by Alchemy and the Ethers project has been deprecated. Examples and templates now favor the `publicProvider` exclusively.

## 0.1.7

### Patch Changes

- 1876ba0: Updated `wagmi` to `0.11.x`

## 0.1.6

### Patch Changes

- 355402b: Updated `wagmi` to `0.10.x`

## 0.1.5

### Patch Changes

- a1d6776: Updated `wagmi` to `0.9.x`

## 0.1.4

### Patch Changes

- 6b37050: Updated `wagmi` to `^0.8.4`

## 0.1.3

### Patch Changes

- 0ff4210: Updated wagmi to `0.7.5`

## 0.1.2

### Patch Changes

- d12b75e: Fix crash in Linux/WSL when attempting to rename branch after running `git init`

  When scaffolding a new project, we now honor the system default setting rather than forcibly renaming the branch.

## 0.1.1

### Patch Changes

- 8dd5a74: Update wagmi to v0.6

## 0.1.0

### Minor Changes

- 6e25576: Update `wagmi` dependency to `^0.5.3`

## 0.0.4

### Patch Changes

- fd5e8e7: Fix npm user agent detection

  We try to detect the package manager being used for the init/create script but we were failing to detect npm correctly, instead falling through to using `pnpm`, `yarn` or `npm` (in that order) depending on availability. The logic for detecting npm has now been fixed.

- fd5e8e7: Fix install step in Yarn

  The `install` command for `@rainbow-me/create-rainbowkit` was failing when using `yarn create` because Yarn uses `add` instead of `install`, so we now use the correct command when Yarn is detected.

## 0.0.3

### Patch Changes

- ac37201: Ensure files are copied correctly when template source directory is nested within a path containing `node_modules`
- 9e06333: Add missing Node shebang to CLI

## 0.0.2

### Patch Changes

- fe5cfc5: Add missing `chalk` dependency
- 85ef6ec: Exclude `CHANGELOG.md` when copying app templates

## 0.0.1

### Patch Changes

- 2834f97: Initial beta release
