import type { Wallet } from "../../Wallet";
import {
  getInjectedConnector,
  hasInjectedProvider,
} from "../../getInjectedConnector";

export const beamWallet = (): Wallet => ({
  id: "beam",
  name: "Beam",
  iconUrl: async () => (await import("./beamWallet.svg")).default,
  rdns: "com.onbeam",
  iconBackground: "#000000",
  installed: hasInjectedProvider({
    flag: "isBeam",
    namespace: "beam.provider",
  }),
  createConnector: getInjectedConnector({
    flag: "isBeam",
    namespace: "beam.provider",
  }),
});
