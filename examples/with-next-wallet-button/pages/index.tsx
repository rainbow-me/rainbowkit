import type { NextPage } from "next";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WalletButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const wagmiConnectors = connectors.slice(2);

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
        <WalletButton wallet="rainbow" />

        <WalletButton.Custom wallet="metaMask">
          {({ ready, connect, connector }) => {
            return (
              <button disabled={!ready} onClick={connect}>
                {connector.name}
              </button>
            );
          }}
        </WalletButton.Custom>

        {wagmiConnectors.map((connector) => (
          <button onClick={() => connect({ connector })} key={connector.id}>
            {connector.name}
          </button>
        ))}

        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </div>
    </div>
  );
};

export default Home;
