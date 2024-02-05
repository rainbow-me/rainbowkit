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

const appName = "RainbowKit demo";

const config = createConfig({
  connectors: [rainbowConnector({ appName, projectId })],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowButtonProvider>
          <Component {...pageProps} />
        </RainbowButtonProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
