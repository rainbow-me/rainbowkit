# @rainbow-me/create-rainbowkit

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
