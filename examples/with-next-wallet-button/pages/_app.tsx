import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { LedgerConnector } from "wagmi/connectors/ledger";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";

const connectors = connectorsForWallets([
  rainbowWallet({ projectId, chains }),
  metaMaskWallet({ projectId, chains }),
]);

const wagmiClient = createConfig({
  autoConnect: true,
  connectors: [
    ...connectors,
    new CoinbaseWalletConnector({
      options: {
        appName: 'RainbowKit Example',
      },
    }),
    new LedgerConnector({
      chains,
      options: { projectId },
    }),
    new WalletConnectConnector({
      options: { projectId },
    })
  ],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
