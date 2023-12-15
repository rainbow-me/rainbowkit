import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { createConfig, http, WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { walletConnect, coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet } from "wagmi/chains";

const projectId = "YOUR_PROJECT_ID";

const connectors = connectorsForWallets([
  rainbowWallet({ projectId }),
  metaMaskWallet({ projectId }),
]);

const wagmiClient = createConfig({
  connectors: [
    ...connectors,
    coinbaseWallet({ appName: "RainbowKit Example" }),
    walletConnect({ projectId }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiClient}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider chains={[mainnet]}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
