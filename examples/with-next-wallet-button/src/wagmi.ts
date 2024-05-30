import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { argentWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { coinbaseWallet, metaMask } from 'wagmi/connectors';

const projectId = 'YOUR_PROJECT_ID';
const appName = 'RainbowKit demo';

const connectors = connectorsForWallets(
  [{ groupName: 'Popular', wallets: [rainbowWallet, argentWallet] }],
  {
    projectId,
    appName,
  },
);

export const config = createConfig({
  connectors: [
    ...connectors,
    metaMask({
      dappMetadata: { name: appName },
    }),
    coinbaseWallet({
      appName,
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,
});
