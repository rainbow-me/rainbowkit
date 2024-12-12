import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { publicActions } from 'viem';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  appUrl: 'https://rainbow.me',
  appIcon: 'https://framerusercontent.com/images/Hml6PtJwt03gwFtTRYmbpo7EarY.png',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

export const publicClient = config.getClient().extend(publicActions);
