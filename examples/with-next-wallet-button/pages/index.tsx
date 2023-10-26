import { RainbowButton } from "@rainbow-me/rainbow-button";
import { WalletButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

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
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {["rainbow", "metamask", "coinbase", "walletConnect"].map(
            (connectorId) => {
              return <WalletButton key={connectorId} wallet={connectorId} />;
            }
          )}
        </div>
        {isConnected && (
          <button style={{ marginTop: "48px" }} onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
