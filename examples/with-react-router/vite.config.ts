import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    nodePolyfills({
      include: ['buffer', 'events', 'http'],
      globals: {
        Buffer: true,
      },
    }),
  ],
  // server: {
  //   allowedHosts: true, // allow any host (ex. ngrok for testing on mobile)
  // }
});
