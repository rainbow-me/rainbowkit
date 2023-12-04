import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { RainbowGoogleWallet } from "../../../connectors/RainbowGoogleWallet/RainbowGoogleWallet";
import { Wallet } from "../../Wallet";

export interface EmailWalletOptions {
  chains: Chain[];
}

export const rainbowGoogleWallet = ({ chains }: EmailWalletOptions): Wallet => {
  return {
    id: "google",
    name: "Google",
    iconUrl: async () => (await import("./rainbowGoogleWallet.svg")).default,
    iconBackground: "#fff",
    installed: true,
    createConnector: () => ({
      connector: new RainbowGoogleWallet({
        chains,
        options: {},
      }),
    }),
  };
};
