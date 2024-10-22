
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';
import { 
  metaMaskWallet, 
  safeWallet, 
  rainbowWallet, 
  coinbaseWallet, 
  walletConnectWallet,
  rabbyWallet,
  trustWallet,
  uniswapWallet
} from '@rainbow-me/rainbowkit/wallets';

// Enable Smart Wallet and EOA
// Testing `preference` type
coinbaseWallet.preference = 'all';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  chains: [mainnet, 
    polygon, optimism, arbitrum, base],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        safeWallet,
        rainbowWallet,
        coinbaseWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
    {
      groupName: 'Other',
      wallets: [
        rabbyWallet,
        trustWallet,
        uniswapWallet,
      ],
    },
  ]
});
