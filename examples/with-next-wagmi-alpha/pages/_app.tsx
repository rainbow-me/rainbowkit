import "../styles/global.css";
import type { AppProps } from "next/app";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, createConnector, http, WagmiProvider } from "wagmi";
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
  rainbowWallet,
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

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId }),
      bifrostWallet({ projectId }),
      bitgetWallet({ projectId }),
      bitskiWallet(),
      clvWallet({ projectId }),
      coin98Wallet({ projectId }),
      coreWallet({ projectId }),
      dawnWallet(),
      desigWallet(),
      enkryptWallet(),
      foxWallet({ projectId }),
      frameWallet(),
      frontierWallet({ projectId }),
      imTokenWallet({ projectId }),
      ledgerWallet({ projectId }),
      mewWallet(),
      oktoWallet({ projectId }),
      okxWallet({ projectId }),
      omniWallet({ projectId }),
      oneKeyWallet(),
      phantomWallet(),
      rabbyWallet(),
      safeheronWallet(),
      safepalWallet({ projectId }),
      subWallet({ projectId }),
      tahoWallet(),
      talismanWallet(),
      tokenPocketWallet({ projectId }),
      trustWallet({ projectId }),
      uniswapWallet({ projectId }),
      xdefiWallet(),
      zealWallet(),
      zerionWallet({ projectId }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  multiInjectedProviderDiscovery: false,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[]}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
