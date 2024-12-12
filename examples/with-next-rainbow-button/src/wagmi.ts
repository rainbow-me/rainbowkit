import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { rainbowConnector, } from '@rainbow-me/rainbow-button';

export const config = createConfig({
  connectors: [
    rainbowConnector({
      appName: 'RainbowKit demo',
      appUrl: 'https://rainbow.me',
      appIcon: 'https://framerusercontent.com/images/Hml6PtJwt03gwFtTRYmbpo7EarY.png',
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});
