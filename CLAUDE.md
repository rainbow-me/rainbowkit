# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

RainbowKit uses pnpm as the package manager. Key commands:

### Building & Development
- `pnpm dev` - Start development for all packages (library + example)
- `pnpm dev:lib` - Build library packages in watch mode
- `pnpm dev:example` - Run example app with library watching
- `pnpm build` - Build all packages (excludes template apps)
- `pnpm clean` - Clean all dist folders and reinstall dependencies

### Testing & Quality
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Run Biome linter, format check, and typecheck
- `pnpm lint:fix` - Fix linting and formatting issues
- `pnpm format:check` - Check code formatting with Biome
- `pnpm format:fix` - Auto-fix formatting issues

### Package-Specific Commands
- `pnpm --filter @rainbow-me/rainbowkit [command]` - Run commands in main package
- `pnpm --filter example [command]` - Run commands in example app
- `pnpm --filter site [command]` - Run commands in documentation site

## Project Architecture

### Monorepo Structure
- **packages/rainbowkit/** - Main library with React components and wallet connectors
- **packages/rainbow-button/** - Standalone rainbow button component
- **packages/rainbowkit-siwe-next-auth/** - Sign-In with Ethereum integration
- **packages/create-rainbowkit/** - CLI scaffolding tool
- **examples/** - Integration examples for different frameworks
- **site/** - Documentation website built with Next.js and Contentlayer

### Core Library Architecture

#### Provider System
RainbowKit uses a layered React context provider pattern:
- `RainbowKitProvider` - Root provider wrapping all functionality
- `I18nProvider` - Internationalization support
- `ModalProvider` - Modal state management
- `TransactionStoreProvider` - Recent transaction storage
- Multiple context providers for app metadata, theming, and chain data

#### Wallet Integration
- **Location**: `packages/rainbowkit/src/wallets/`
- **Pattern**: Each wallet implements the `Wallet` interface with desktop/mobile/QR connection methods
- **Key Files**:
  - `Wallet.ts` - Core wallet interface
  - `walletConnectors/` - Individual wallet implementations
  - `connectorsForWallets.ts` - Connector factory function
  - `useWalletConnectors.ts` - Connector hook for connection modals

#### Component System
- **Location**: `packages/rainbowkit/src/components/`
- **Main Components**:
  - `ConnectButton/` - Primary wallet connection interface
  - `WalletButton/` - Individual wallet selection
  - `Modal/` components for different flows (connect, account, chain switching)
  - `Dialog/` - Base modal system with focus management

#### Styling System
- Uses **Vanilla Extract** for CSS-in-JS with type safety
- **Sprinkles** design system in `css/sprinkles.css.ts`
- Pre-built themes: light, dark, midnight in `themes/`
- Theme compilation utilities for runtime theme generation

### Configuration Patterns

#### Standard Setup
```typescript
const config = getDefaultConfig({
  appName: 'My App',
  projectId: 'WALLETCONNECT_PROJECT_ID',
  chains: [mainnet, polygon, optimism],
  // Optional: custom wallets, app metadata
});
```

#### Custom Wallet Configuration
```typescript
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet],
  },
]);
```

## API Stability

**CRITICAL**: Avoid breaking changes for APIs exported in `packages/rainbowkit/src/index.ts`. This includes:
- Component exports: `ConnectButton`, `WalletButton`, `RainbowKitProvider`
- Configuration functions: `getDefaultConfig`, `getDefaultWallets`, `connectorsForWallets`
- Hooks: `useAccountModal`, `useChainModal`, `useConnectModal`, `useAddRecentTransaction`
- Authentication: `RainbowKitAuthenticationProvider`, `createAuthenticationAdapter`
- Themes: `lightTheme`, `darkTheme`, `midnightTheme`, `cssStringFromTheme`, `cssObjectFromTheme`
- TypeScript types: `Wallet`, `WalletList`, `Theme`, `AuthenticationStatus`, `AuthenticationConfig`, `DisclaimerComponent`, `AvatarComponent`, `RainbowKitChain` (exported as `Chain`), `Locale`, etc.

Any changes to these exports must maintain backward compatibility.

## Development Guidelines

### Adding New Wallets
1. Create wallet connector in `src/wallets/walletConnectors/[walletName]/`
2. Implement `Wallet` interface with required connection methods
3. Add wallet assets (icons) to `assets/wallets/`
4. Export from wallet connectors index

### Working with Components
- Components use responsive value system: `{ mobile: 'value1', desktop: 'value2' }`
- All modals use the `Dialog` base component for accessibility
- Use existing CSS tokens from sprinkles system before creating new styles

### Theming
- Extend themes in `src/themes/` following existing patterns
- Use `cssStringFromTheme` or `cssObjectFromTheme` for runtime theme compilation
- All theme values must implement the theme contract

### Testing
- Tests use Vitest with jsdom environment
- Test files co-located with source files using `.test.ts` suffix
- Mock wallet setup available in `test/mockWallet.ts`
- Setup file configures testing environment in `test/setup.ts`

## Build System

### Main Package Build
- **Tool**: ESBuild via custom `build.js` script
- **Outputs**: ESM and CJS bundles with TypeScript declarations
- **CSS**: Separate vanilla-extract CSS compilation

### Development Workflow
1. Run `pnpm dev:lib` to watch library changes
2. Use `pnpm dev:example` to test in example app
3. Run tests with `pnpm test:watch` during development
4. Check quality with `pnpm lint` before commits

### Package Dependencies
- **wagmi** - Ethereum React hooks (peer dependency)
- **viem** - TypeScript Ethereum library (peer dependency)  
- **@tanstack/react-query** - Required by wagmi (peer dependency)
- **@vanilla-extract/css** - CSS-in-JS system

## Common Tasks

### Running Examples
```bash
cd examples/with-next
pnpm dev
```

### Testing CLI
```bash
pnpm test:cli  # Test build process
pnpm test:cli:dev  # Test in development mode
```

### Building for Release
```bash
pnpm release:build  # Full build with linting and tests
```

### Working with Site/Docs
The documentation site uses Contentlayer for MDX processing and supports multiple languages. Content is in `site/data/[locale]/docs/` and `site/data/[locale]/guides/`. Only interact with `en_US.json` locale files, as others are managed automatically.
