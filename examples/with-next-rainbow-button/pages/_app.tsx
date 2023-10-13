import "../styles/global.css";
import "@rainbow-me/button/styles.css";
import type { AppProps } from "next/app";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowButtonProvider } from "@rainbow-me/button";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_PROJECT_ID";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RainbowButtonProvider
      projectId={projectId}
      chainProviders={[publicProvider()]}
      chains={[mainnet]}
    >
      <Component {...pageProps} />
    </RainbowButtonProvider>
  );
}

export default MyApp;
