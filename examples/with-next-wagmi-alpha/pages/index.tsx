import type { NextPage } from "next";
import { useConnect, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  const { connectors, connect } = useConnect();
  const { switchChain } = useSwitchChain();

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
              console.log(connector);
              connector.connect();
            }}
          >
            {connector.name}
          </button>
        );
      })}
      <button onClick={openConnectModal}>Hey there</button>
    </div>
  );
};

export default Home;
