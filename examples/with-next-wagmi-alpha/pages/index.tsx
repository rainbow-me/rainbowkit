import type { NextPage } from "next";
import { useConnect, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  const { connectors } = useConnect();
  const { switchChain } = useSwitchChain();
  console.log(connectors);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      {connectors.map((connector) => {
        return (
          <button
            onClick={async () => {
              await connector.connect();
              switchChain({ chainId: 137 });
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
