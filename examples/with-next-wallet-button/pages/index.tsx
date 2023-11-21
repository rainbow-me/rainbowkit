import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WalletButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { connectors, connect } = useConnect();
  const wagmiConnectors = connectors.slice(2);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

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
          gap: 14
        }}
      >
        <WalletButton wallet="rainbow"/>
        <WalletButton.Custom wallet="metaMask">
          {({ ready, connect, connector }) => {
            return (
              <button
                disabled={!ready}
                onClick={connect}
                key={connector.id}
              >
                {connector.name}
              </button>
            );
          }}
        </WalletButton.Custom>
        {isMounted && wagmiConnectors.map((connector) => (
          <button
            disabled={!connector.ready}
            onClick={() => connect({ connector })}
            key={connector.id}
          >
            {connector.name}
          </button>
        ))}
        {isMounted && isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
