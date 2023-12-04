import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { RainbowEmailWallet } from "../../../connectors/RainbowEmailWallet/RainbowEmailWallet";
import { Wallet } from "../../Wallet";

export interface EmailWalletOptions {
  chains: Chain[];
}

export const rainbowEmailWallet = ({ chains }: EmailWalletOptions): Wallet => {
  return {
    id: "email",
    name: "Email",
    iconUrl: async () => (await import("./rainbowEmailWallet.svg")).default,
    iconBackground: "#fff",
    installed: true,
    createConnector: () => ({
      connector: new RainbowEmailWallet({
        chains,
        options: {},
      }),
    }),
  };
};
