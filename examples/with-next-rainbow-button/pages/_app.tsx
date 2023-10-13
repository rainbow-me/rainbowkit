import "../styles/global.css";
import "@rainbow-me/button/styles.css";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowButtonProvider, RainbowConnector } from "@rainbow-me/button";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_PROJECT_ID";

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
