import { isIOS } from "../../../utils/isMobile";
import { Wallet } from "../../Wallet";
import { getDefaultInjectedConnector } from "../../getInjectedConnector";

export const dawnWallet = (): Wallet => ({
  id: "dawn",
  name: "Dawn",
  iconUrl: async () => (await import("./dawnWallet.svg")).default,
  iconBackground: "#000000",
  installed:
    typeof window !== "undefined" &&
    typeof window.ethereum !== "undefined" &&
    window.ethereum.isDawn,
  hidden: () => !isIOS(),
  downloadUrls: {
    ios: "https://apps.apple.com/us/app/dawn-ethereum-wallet/id1673143782",
    mobile: "https://dawnwallet.xyz",
  },
  createConnector: getDefaultInjectedConnector(),
});
