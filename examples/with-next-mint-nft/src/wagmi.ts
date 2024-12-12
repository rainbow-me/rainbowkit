import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  appUrl: 'https://rainbow.me',
  appIcon: 'https://framerusercontent.com/images/Hml6PtJwt03gwFtTRYmbpo7EarY.png',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  ssr: true,
});
