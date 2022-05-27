# RainbowKit Contribution Guide

Thanks for your interest in contributing to RainbowKit! Please take a moment to review this document **before submitting a pull request.**

If you want to contribute but aren't sure where to start, you can create a [new discussion](https://github.com/rainbow-me/rainbowkit/discussions).

## Pull requests

**Please ask first before starting work on any significant new features. This includes things like adding new wallets, chains, components, etc.**

It's never a fun experience to have your pull request declined after investing a lot of time and effort into a new feature. To avoid this from happening, we request that contributors create [a feature request](https://github.com/rainbow-me/rainbowkit/discussions/new?category=ideas) to first discuss any API changes or significant new ideas.

## Prerequisites

This project uses [`pnpm`](https://pnpm.io) as a package manager.

## Development environment

To play around with code while making changes, you can run the local development environment:

```bash
pnpm install
pnpm dev
```

This will run an example app on [localhost:3000](http://localhost:3000) and the documentation site on [localhost:3001](http://localhost:3001).

The example app code is located in [`packages/example`](../packages/example). The documentation site code is located in [`site`](../site). Make sure you clean up after yourself before pushing up any changes.

All API changes should also include updates to [`README.md`](../README.md) and the documentation site. Documentation is crucial to helping developers of all experience levels use RainbowKit.

## Coding standards

Our code formatting rules are defined in [`.eslintrc.cjs`](../.eslintrc.cjs). You can check your code against these standards by running:

```bash
pnpm lint
```

To automatically fix any errors in your code, you can run:

```bash
pnpm lint:fix
```

## Running tests

RainbowKit has a suite of unit tests that can be run with the following command:

```bash
pnpm test
```

If snapshot tests fail, you can run the following command to update the snapshots:

```bash
pnpm test:update
```

## Release notes

RainbowKit uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

Each PR with a user-facing change (API change, bug fix, notable UI update, etc.) should include a “changeset”, which is a markdown file in the `.changeset` directory. This directory acts as a release queue and is automatically cleared out after each release.

Each changeset defines which package(s) should be published and whether the change should be a major/minor/patch release, as well as providing release notes that will be added to the changelog upon release.

To create a new changeset, run `pnpm changeset`. This will run the Changesets CLI, prompting you for details about the change. You’ll be able to edit the file after it’s created — don’t worry about getting everything perfect up front.

Since we’re currently in beta, all changes should be marked as a minor/patch release to keep us within the `v0.x` range.

Even though you can technically use any markdown formatting you like, headings should be avoided since each changeset will ultimately be nested within a bullet list. Instead, bold text should be used as section headings.

If your PR is making changes to an area that already has a changeset (e.g. there’s an existing changeset covering theme API changes but you’re making further changes to the same API), you should update the existing changeset in your PR rather than creating a new one.

The first time a PR with a changeset is merged after a release, a new PR will automatically be created called `chore: version packages`. Any subsequent PRs with changesets will automatically update this existing version packages PR. Merging this PR is the first step of the release process.

## Releasing to npm

**This section is only relevant for library maintainers who are releasing new versions of the library.**

When you’re ready to publish, the `chore: version packages` PR should be reviewed to double check that the version number(s) are correct and that the release notes are correct. Since we’re currently in beta, version numbers should remain within the `v0.x` range.

Once you’ve merged the version packages PR, you’ll need to run the release step locally. First ensure you’re in the main branch with the latest changes.

```bash
git checkout main
git pull
```

Next, run the `release:test` script. This will clean the repo and reinstall dependencies, run the automated tests, build packages in release mode and start a local dev server on http://localhost:3000 so you can perform a quick manual smoke test.

```bash
pnpm release:test
```

If everything’s looking good, you can now run the `release` script. Note that the automated `prerelease` script will verify that you’re in the correct branch with no uncommitted changes before testing and rebuilding everything.

```bash
pnpm release
```

Assuming everything went well, the release script will create a new git tag for the latest version, so be sure to push it to GitHub.

```bash
git push --tags
```

Once you’ve pushed the tag, you can create a new release on GitHub.

- Navigate to the [new release form on GitHub.](https://github.com/rainbow-me/rainbowkit/releases/new)
- From the dropdown labelled “Choose a tag”, select the latest version tag for `@rainbow-me/rainbowkit`.
- Set the title to `@rainbow-me/rainbowkit@x.x.x`, substituting the latest version number.
- Copy the Markdown content below the latest version heading from the [RainbowKit changelog.](../packages/rainbowkit/CHANGELOG.md)

If at any stage you’re unsure of the formatting, you can [reference past RainbowKit releases.](https://github.com/rainbow-me/rainbowkit/releases)

That’s it — you’re all done! 🎉
