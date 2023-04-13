import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vanillaExtractPlugin() as any], // plugin type is broken, not sure, think it's mismatching vite/vitest versions
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    watch: false,
  },
});
