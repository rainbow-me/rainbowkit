# Contributor Guide

## Dev Environment Tips
- Run `pnpm install` from the repository root to install all dependencies and generate type definitions.
- Before committing, execute `pnpm format:fix` to automatically correct formatting issues.

## Testing Instructions
- Check the CI configuration under `.github/workflows` to understand the automated plan.
- Use `pnpm test` at the monorepo root to run the full test suite. Your commit must pass these tests before merging.
- To focus on a specific test, run `pnpm test:unit run -t "<test name>"`.
- Keep fixing test or type errors until everything passes.
- After moving files or adjusting imports, run `pnpm lint` to ensure ESLint and TypeScript still succeed.
- Whenever you change code, add or update tests even if not explicitly requested.

## PR Instructions
- Follow the commit style defined in `commitlint.config.js`. Prefix commits and PR titles with a type such as `fix`, `feat`, or `chore`, for example: `fix: resolve login bug`.
- Always run `pnpm changeset` to create a changeset for every affected package. Patch versions are typically preferred unless the change warrants a minor or major bump.
- Never modify any CHANGELOG.md files. These are managed automatically.
- Patch bump `@rainbow-me/create-rainbowkit` whenever template dependencies change.
- Only modify `en-US.json` locale files; never adjust other locale JSON files.
