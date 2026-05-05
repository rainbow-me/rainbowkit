import { createRequire } from 'node:module';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
