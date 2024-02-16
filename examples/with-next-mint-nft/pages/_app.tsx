import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  Chain,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rinkeby: Chain = {
  id: 4,
  name: 'Rinkeby',
  nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: { http: ['https://eth-rinkeby.alchemyapi.io/v2'] },
    default: { http: ['https://rpc.ankr.com/eth_rinkeby'] },
    infura: { http: ['https://rinkeby.infura.io/v3'] },
    public: { http: ['https://rpc.ankr.com/eth_rinkeby'] },
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://rinkeby.etherscan.io' },
    default: { name: 'Etherscan', url: 'https://rinkeby.etherscan.io' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 10299530,
    },
  },
  testnet: true,
};

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet],
    },
  ],
  chains: [rinkeby],
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
