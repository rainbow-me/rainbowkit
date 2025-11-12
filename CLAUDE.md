# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

RainbowKit is a pnpm monorepo containing multiple packages:

- **`packages/rainbowkit`** - Core library: React components and hooks for wallet connection UI
- **`packages/rainbow-button`** - Standalone rainbow button component
- **`packages/rainbowkit-siwe-next-auth`** - Sign-In with Ethereum integration with NextAuth.js
- **`packages/create-rainbowkit`** - CLI tool for scaffolding new RainbowKit projects
- **`packages/example`** - Development example app (runs on localhost:3000)
- **`site`** - Documentation site (runs on localhost:3001)
- **`examples/`** - Additional example integrations (Next.js, Vite, Remix, etc.)

## Development Commands

### Setup
```bash
pnpm install  # Install dependencies and generate type definitions from root
```

### Development
```bash
pnpm dev                      # Run example app + site (localhost:3000 and :3001)
pnpm dev:lib                  # Watch and rebuild library packages only
pnpm dev:example              # Run lib + example app only
pnpm dev:site                 # Run lib + docs site only
pnpm dev:cli                  # Watch mode for create-rainbowkit CLI
pnpm dev:template:next-app    # Run Next.js app template directly
```

### Building
```bash
pnpm build                    # Build all packages (excludes template apps)
```

### Testing
```bash
pnpm test                     # Run all unit tests (uses Vitest)
pnpm test:unit run -t "<name>"  # Run specific test by name
pnpm test:update              # Update test snapshots
pnpm test:watch               # Watch mode for tests
pnpm test:cli                 # Test CLI scaffolding (builds template)
pnpm test:cli:dev             # Scaffold template + start dev server
pnpm test:cli:clean           # Remove generated test app
```

### Linting & Formatting
```bash
pnpm lint                     # Check formatting + typecheck all packages
pnpm lint:fix                 # Auto-fix formatting issues
pnpm format:check             # Check Biome formatting only
pnpm format:fix               # Auto-fix Biome formatting (run before commits)
```

## Architecture

### Core Library (`packages/rainbowkit`)

Built with:
- **Styling**: Vanilla Extract for type-safe CSS-in-JS with CSS modules
- **Build**: Custom esbuild setup (`build.js`) with watch mode
- **Bundling**: ESM format with code splitting for tree shaking

Key directories:
- `src/components/` - UI components (ConnectButton, modals, etc.)
- `src/wallets/` - Wallet connector definitions and registry
- `src/themes/` - Theme system (light, dark, midnight)
- `src/locales/` - Internationalization files
- `src/hooks/` - React hooks for wallet interactions
- `src/css/` - Vanilla Extract styles

Build process:
1. TypeScript type generation runs first (`typegen`)
2. esbuild compiles main entry + wallets separately
3. Vanilla Extract processes CSS with autoprefixer and selector prefixing (`[data-rk]`)
4. SVGs are inlined as data URLs, PNGs as base64

Environment variables required (`.env.local`):
- `RAINBOW_PROVIDER_API_KEY` - For enhanced provider features
- `WALLETCONNECT_PROJECT_ID` - For WalletConnect integration

### Testing

- Framework: Vitest with jsdom environment
- Setup: `packages/rainbowkit/test/setup.ts`
- Config: Root `vitest.config.ts` with Vanilla Extract plugin
- Tests located alongside source files (`.test.ts` / `.test.tsx`)

## Commit & Release Workflow

### Commit Format
Follow conventional commits as defined in `commitlint.config.js`:
- Types: `fix`, `feat`, `test`, `tooling`, `refactor`, `revert`, `example`, `docs`, `format`, `chore`
- Example: `fix: resolve wallet disconnect issue`

### Changesets
Always create a changeset for user-facing changes:
```bash
pnpm changeset  # Creates markdown file in .changeset/
```
- Prefer patch versions unless change warrants minor/major
- Never edit CHANGELOG.md files directly (auto-generated)
- Update existing changesets in same area rather than creating duplicates
- Patch bump `@rainbow-me/create-rainbowkit` when template dependencies change

### Git Workflow Tools
Use the following tools for git operations:
- **Graphite (`gt`)** - Preferred tool for all git interactions:
  - **Creating commits**: `gt create -m "commit message"`
  - **Modifying existing commits**: `gt modify`
    - **Prefer this over adding new commits unless explicitly asked**
    - **Need to stage changes with git add or use --all to stage all changes**
    - **Always resubmit after running gt modify** using `gt submit --stack`
  - **Creating branches**: `gt branch create <branch-name>`
  - **Tracking branches**: `gt track` - Always track branches if they aren't already tracked
  - **Moving branches in stack**: `gt move --onto <target-branch>` - Use when repositioning commits/branches
  - **Submitting/updating pull requests**: `gt submit --stack`
  - **Checking out PRs**: `gt checkout <pr-number>`
  - **Resubmitting after changes**: Always run `gt submit --stack` after making changes or commits
  - **Always ask before committing changes or manipulating/resubmitting branches or opening PRs**
  - **Always use gt modify by default when asked to make a commit**
- **GitHub CLI (`gh`)** - For viewing CI/CD status:
  - Use `gh run list` to view workflow runs
  - Use `gh run view` to investigate specific CI failures

### Locale Files
Only modify `en-US.json` locale files. Other language files are managed separately.

## CI Pipeline

See `.github/workflows/ci.yml` for full test plan:
1. Install dependencies
2. Build all packages
3. Run linting and formatting checks
4. Run unit tests (`pnpm test`)
5. Run CLI tests (`pnpm test:cli`)

All checks must pass before merging.

## Working with create-rainbowkit CLI

Template location: `packages/create-rainbowkit/templates/next-app/`

After template changes:
```bash
pnpm test:cli:dev  # Scaffold and test template (updates lockfile)
```
Commit the generated lockfile to keep monorepo in sync.

Link CLI globally for testing:
```bash
pnpm link:cli  # Makes `create-rainbowkit` available system-wide
```

## Additional Notes

- Uses Biome for formatting/linting (replaces ESLint + Prettier)
- React 19 and Next.js 15 compatible
- Built on wagmi v2 and viem 2.x
- Node.js >= 20 required
