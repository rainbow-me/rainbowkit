import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Chain, defineChain } from 'viem';

const rinkeby: Chain = defineChain({
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
});

const projectId = 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit Mint NFT Demo',
  projectId,
});

const demoAppInfo = {
  appName: 'RainbowKit Mint NFT Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [argentWallet({ projectId }), trustWallet({ projectId })],
  },
]);

const config = createConfig({
  chains: [rinkeby],
  connectors,
  transports: {
    [rinkeby.id]: http(),
  },
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider appInfo={demoAppInfo} chains={[rinkeby]}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
