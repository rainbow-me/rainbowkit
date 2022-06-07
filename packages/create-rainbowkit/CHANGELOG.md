# @rainbow-me/create-rainbowkit

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
