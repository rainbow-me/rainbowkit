# @rainbow-me/rainbowkit-siwe-next-auth

## 0.4.1

### Patch Changes

- Updated dependencies [90d6931]
- Updated dependencies [82153ed]
  - @rainbow-me/rainbowkit@2.1.0

## 0.4.0

### Minor Changes

- aa0269e: RainbowKit has reached v2 alongside [wagmi](https://wagmi.sh), which includes [breaking changes](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).

  `0.4.x` now requires `@rainbow-me/rainbowkit` v2, specifically: `2.x.x`.

## 0.3.4

### Patch Changes

- Peer dependency support for RainbowKit `1.3.x`

- Updated dependencies [9ce75a65]
  - @rainbow-me/rainbowkit@1.3.0

## 0.3.3

### Patch Changes

- 2f56ab23: Adopted `'use client'` directive for safe App Router usage
- 9dfe0531: Added strict peer incompatibility with `next-auth@5`. RainbowKit will support `next-auth` v5 in a future release with improved App Router support.

## 0.3.2

### Patch Changes

- Updated dependencies [ef64a229]
  - @rainbow-me/rainbowkit@1.2.0

## 0.3.1

### Patch Changes

- Peer dependency support for RainbowKit `1.1.x`

- Updated dependencies [b37f5d68]
  - @rainbow-me/rainbowkit@1.1.0

## 0.3.0

### Minor Changes

- 86be3f0: Support for `next-auth` versions `4.21.0` and above.

  **Migration guide**

  1. Upgrade `next-auth` to `~4.22.0`

  2. In your `next-auth` providers `async authorize(credentials)` implementation, alter the parameters passed to `getCsrfToken` like so. Reference our example implementation [here](/examples/with-next-siwe-next-auth).

  ```ts
  - const nonce = await getCsrfToken({ req });
  + const nonce = await getCsrfToken({ req: { headers: req.headers } });
  ```

## 0.2.0

### Minor Changes

- 93b58d0: RainbowKit has reached v1 alongside [wagmi](https://wagmi.sh), which includes [breaking changes](https://wagmi.sh/react/migration-guide#1xx-breaking-changes).

  `0.2.x` now requires `@rainbow-me/rainbowkit` v1, specifically: `1.0.x`.

  While wagmi v1 now relies on `viem` instead of the `ethers` peer dependency, `siwe` will still require `ethers` as a peer dependency. Ensure that you have installed a compatible `ethers` version, including: `^5.6.8 || ^6.0.8`.

## 0.1.10

### Patch Changes

- 865175f: Upgraded minimum `siwe` peer dependency to `^2.1.4` and minimum `ethers` peer dependency to `^5.6.8` to resolve `siwe` peer mismatch.

  Specified maximum `next-auth` peer dependency as `4.20.1` due to known issues introduced in later versions.

  Updated [Authentication docs](https://www.rainbowkit.com/docs/authentication) and examples to support modern `next-auth` types.

## 0.1.9

### Patch Changes

- 532b117: Fixed an issue with peer dependencies versioning

## 0.1.8

### Patch Changes

- Updated dependencies [1876ba0]
  - @rainbow-me/rainbowkit@0.11.0

## 0.1.7

### Patch Changes

- Updated dependencies [355402b]
  - @rainbow-me/rainbowkit@0.10.0

## 0.1.6

### Patch Changes

- Updated dependencies [49f0ec9]
  - @rainbow-me/rainbowkit@0.9.0

## 0.1.5

### Patch Changes

- 6b37050: Added `@rainbow-me/rainbowkit@0.8.x` as a peer dependency

## 0.1.4

### Patch Changes

- 2e6bb8f: Include `v0.7.x` in RainbowKit peer dependency range

## 0.1.3

### Patch Changes

- 62fd332: Include RainbowKit v0.6.x in peer dependency range

## 0.1.2

### Patch Changes

- Updated dependencies [12912b3]
- Updated dependencies [fcfc13d]
- Updated dependencies [3f9013f]
  - @rainbow-me/rainbowkit@0.5.2

## 0.1.1

### Patch Changes

- Updated dependencies [8060ccd]
- Updated dependencies [4dfe834]
- Updated dependencies [8060ccd]
  - @rainbow-me/rainbowkit@0.5.1

## 0.1.0

### Minor Changes

- 737a1d6: Initial release.

### Patch Changes

- Updated dependencies [737a1d6]
- Updated dependencies [488c5a1]
  - @rainbow-me/rainbowkit@0.5.0
