import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020',
  },
  plugins: [react()],
  resolve: {
    alias: {
      buffer: require.resolve('buffer/'),
      events: require.resolve('events/'),
    },
  },
});
