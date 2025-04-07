import { defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'abi/index.ts',
  contracts: [],
  plugins: [
    foundry({
      project: './',
      include: ['RainbowKitNFT.sol/**'],
    }),
  ],
});
