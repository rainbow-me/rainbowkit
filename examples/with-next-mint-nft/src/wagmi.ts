import {
  getDefaultConfig,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { sepolia } from 'wagmi/chains';

const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet],
    },
  ],
  chains: [sepolia],
  ssr: true,
});
