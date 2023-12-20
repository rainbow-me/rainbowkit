import "../styles/global.css";
import "@rainbow-me/rainbow-button/styles.css";
import type { AppProps } from "next/app";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import {
  RainbowButtonProvider,
  rainbowConnector,
} from "@rainbow-me/rainbow-button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const projectId = "YOUR_PROJECT_ID";

const wagmiClient = createConfig({
  connectors: [rainbowConnector({ projectId })],
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
        <RainbowButtonProvider>
          <Component {...pageProps} />
        </RainbowButtonProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
