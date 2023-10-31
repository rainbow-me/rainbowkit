import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { Wallet } from "../../Wallet";

export interface BraveWalletOptions {
  chains: Chain[];
}

export const braveWallet = (): Wallet => ({
  id: "brave",
  name: "Brave Wallet",
  iconBackground: "#fff",

  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
});
