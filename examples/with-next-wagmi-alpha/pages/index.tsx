import type { NextPage } from "next";
import { useConnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Home: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  const { connectors } = useConnect();
/*   connectors.map((connector) => {
    connector.getProvider().then((provider) => {
      console.log(provider);
    });
  }); */
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <button onClick={openConnectModal}>Hey there</button>
    </div>
  );
};

export default Home;
