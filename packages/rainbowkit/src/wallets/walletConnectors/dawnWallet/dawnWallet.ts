import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { isIOS } from "../../../utils/isMobile";
import { Wallet } from "../../Wallet";

export interface DawnWalletOptions {
  chains: Chain[];
}

export const dawnWallet = (): Wallet => ({
  id: "dawn",
  name: "Dawn",
  iconBackground: "#000000",
  hidden: !isIOS(),
  downloadUrls: {
    ios: "https://apps.apple.com/us/app/dawn-ethereum-wallet/id1673143782",
    mobile: "https://dawnwallet.xyz",
  },
});
