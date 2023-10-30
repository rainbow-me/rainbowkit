import { WalletButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

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
          gap: 14
        }}
      >
          <WalletButton wallet='rainbow' />
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
