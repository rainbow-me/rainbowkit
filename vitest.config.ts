import fs from 'node:fs';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

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
    setupFiles: ['./packages/rainbowkit/test/setup.ts'],
    watch: false,
  },
};
