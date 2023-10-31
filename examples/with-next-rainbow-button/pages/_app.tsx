import "../styles/global.css";
import "@rainbow-me/rainbow-button/styles.css";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowButtonProvider, RainbowConnector } from "@rainbow-me/rainbow-button";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";

const wagmiClient = createConfig({
  autoConnect: true,
  connectors: [new RainbowConnector({ chains, projectId })],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowButtonProvider>
        <Component {...pageProps} />
      </RainbowButtonProvider>
    </WagmiConfig>
  );
}

export default MyApp;
