"use client";

import type { NextPage } from "next";
import { useConnect, useSwitchChain } from "wagmi";
import {
  ConnectButton,
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  const { connectors, connect } = useConnect();
  const { switchChain } = useSwitchChain();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        padding: 12,
      }}
    >
      {connectors.map((connector) => {
        return (
          <button
            onClick={async () => {
              connector.connect();
            }}
          >
            {connector.name}
          </button>
        );
      })}
      <ConnectButton
        accountStatus={{
          largeScreen: "full",
          smallScreen: "full",
        }}
        chainStatus={{
          largeScreen: "full",
          smallScreen: "full",
        }}
        showBalance={{
          largeScreen: true,
          smallScreen: true,
        }}
      />
      <button onClick={openAccountModal}>Hey there</button>
    </div>
  );
};

export default Home;
