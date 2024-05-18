import fs from 'fs';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { configDefaults } from 'vitest/config';

// Custom loader for JSON files
function customJsonLoader() {
  return {
    name: 'custom-json-loader',
    transform(code: any, id: any) {
      if (id.endsWith('.json')) {
        const jsonContent = fs.readFileSync(id, 'utf8');
        return `export default ${JSON.stringify(jsonContent)};`;
      }
      return code;
    },
  };
}

export default {
  plugins: [vanillaExtractPlugin(), customJsonLoader()],
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      '**/ChainModal.test.tsx',
      '**/connectorsForWallets.test.ts',
      '**/getInjectedConnector.test.ts',
      '**/getWalletConnectConnector.test.ts',
      '**/ConnectButton.test.tsx',
      '**/ConnectModal.test.tsx',
      '**/WalletButton.test.tsx',
      '**/walletConnectWallet.test.ts',
    ],
    watch: false,
  },
};
