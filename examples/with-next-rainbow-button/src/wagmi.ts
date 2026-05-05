import { rainbowConnector } from '@rainbow-me/rainbow-button';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export const config = createConfig({
  connectors: [
    rainbowConnector({
      appName: 'RainbowKit demo',
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});
