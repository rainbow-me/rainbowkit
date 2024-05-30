import type { NextPage } from "next";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const [metaMaskConnector, coinbaseConnector] = connectors.slice(2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span>RainbowKit WalletButton</span>

        <WalletButton wallet="rainbow" />

        <span>RainbowKit WalletButton.Custom</span>

        <WalletButton.Custom wallet="argent">
          {({ ready, connect, connector }) => {
            return (
              <button disabled={!ready} onClick={connect}>
                {connector.name}
              </button>
            );
          }}
        </WalletButton.Custom>

        <span>Wagmi Connectors</span>

        <button onClick={() => connect({ connector: metaMaskConnector })} key={metaMaskConnector.id}>
          MetaMask SDK
        </button>

        <button onClick={() => connect({ connector: coinbaseConnector })} key={coinbaseConnector.id}>
          Coinbase SDK
        </button>

        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </div>
    </div>
  );
};

export default Home;
