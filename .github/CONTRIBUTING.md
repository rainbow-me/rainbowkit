# RainbowKit Contribution Guide

RainbowKit uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

Each PR with a user-facing change (API change, bug fix, notable UI update, etc.) should include a “changeset”, which is a markdown file in the `.changeset` directory. This directory acts as a release queue and is automatically cleared out after each release.

Each changeset defines which package(s) should be published and whether the change should be a major/minor/patch release, as well as providing release notes that will be added to the changelog upon release.

To create a new changeset, run `pnpm changeset`. This will run the Changesets CLI, prompting you for details about the change. You’ll be able to edit the file after it’s created — don’t worry about getting everything perfect up front.

Since we’re currently in limited beta, all changes should be marked as a patch release to keep us within the `v0.0.x` range.

Even though you can technically use any markdown formatting you like, headings should be avoided since each changeset will ultimately be nested within a bullet list. Instead, bold text should be used as section headings.

If your PR is making changes to an area that already has a changeset (e.g. there’s an existing changeset covering theme API changes but you’re making further changes to the same API), you should update the existing changeset in your PR rather than creating a new one.

The first time a PR with a changeset is merged after a release, a new PR will automatically be created called `chore: version packages`. Any subsequent PRs with changesets will automatically update this existing version packages PR. Merging this PR is the first step of the release process.

## Releasing to npm

When you’re ready to publish, the `chore: version packages` PR should be reviewed to double check that the version number(s) are correct and that the release notes are correct. Since we’re in limited beta, version numbers should remain within the `v0.0.x` range.

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
