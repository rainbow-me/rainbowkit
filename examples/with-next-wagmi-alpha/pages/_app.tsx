import "../styles/global.css";
import type { AppProps } from "next/app";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  argentWallet,
  bifrostWallet,
  bitgetWallet,
  bitskiWallet,
  clvWallet,
  coin98Wallet,
  coreWallet,
  dawnWallet,
  desigWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  imTokenWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  oktoWallet,
  okxWallet,
  omniWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  safeheronWallet,
  safepalWallet,
  subWallet,
  tahoWallet,
  talismanWallet,
  tokenPocketWallet,
  trustWallet,
  uniswapWallet,
  xdefiWallet,
  zealWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  ledger,
  coinbaseWallet,
  walletConnect,
  metaMask,
  injected,
} from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  multiInjectedProviderDiscovery: true,
  connectors: [
    ledger({ projectId: "590c99c1a986405c0ded19c795c8bf1c" }),
    coinbaseWallet({ appName: "RainbowKit Wagmi V2" }),
    walletConnect({
      projectId: "590c99c1a986405c0ded19c795c8bf1c",
    }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const rainbowWallets = connectorsForWallets([
  metaMaskWallet(),
  argentWallet(),
  bifrostWallet(),
  bitgetWallet(),
  bitskiWallet(),
  clvWallet(),
  coin98Wallet(),
  coreWallet(),
  dawnWallet(),
  desigWallet(),
  enkryptWallet(),
  foxWallet(),
  frameWallet(),
  frontierWallet(),
  imTokenWallet(),
  ledgerWallet(),
  mewWallet(),
  oktoWallet(),
  okxWallet(),
  omniWallet(),
  oneKeyWallet(),
  phantomWallet(),
  rabbyWallet(),
  safeheronWallet(),
  safepalWallet(),
  subWallet(),
  tahoWallet(),
  talismanWallet(),
  tokenPocketWallet(),
  trustWallet(),
  uniswapWallet(),
  xdefiWallet(),
  zealWallet(),
  zerionWallet(),
]);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[]} wallets={rainbowWallets}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
