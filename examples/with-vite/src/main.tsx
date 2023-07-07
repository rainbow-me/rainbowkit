import './polyfills';
import './global.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { phantomWallet, desigWallet } from '@rainbow-me/rainbowkit/wallets';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: 'Desig wallet',
//   projectId: '7cf57bc277cddeed55a75ce830b9d6f3',
//   chains,
// });

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      desigWallet({ chains }),
      phantomWallet({ chains }),
      // rabbyWallet({ chains: [] }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
