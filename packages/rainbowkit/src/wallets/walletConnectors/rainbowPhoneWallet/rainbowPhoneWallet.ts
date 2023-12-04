import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { RainbowPhoneWallet } from "../../../connectors/RainbowPhoneWallet/RainbowPhoneWallet";
import { Wallet } from "../../Wallet";

export interface EmailWalletOptions {
  chains: Chain[];
}

export const rainbowPhoneWallet = ({ chains }: EmailWalletOptions): Wallet => {
  return {
    id: "phone",
    name: "Phone",
    iconUrl: async () => (await import("./rainbowPhoneWallet.svg")).default,
    iconBackground: "#fff",
    installed: true,
    createConnector: () => ({
      connector: new RainbowPhoneWallet({
        chains,
        options: {},
      }),
    }),
  };
};
