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
  downloadUrls: {
    // We expect Beam to be explicitly installed by the app that uses it, a download URL is not required.
  },
  createConnector: getInjectedConnector({
    flag: "isBeam",
    namespace: "beam.provider",
  }),
});
