import { Wallet } from "../../Wallet";
import { getDefaultInjectedConnector } from "../../getInjectedConnector";

export const injectedWallet = (): Wallet => ({
  id: "injected",
  name: "Browser Wallet",
  iconUrl: async () => (await import("./injectedWallet.svg")).default,
  iconBackground: "#fff",
  // @TODO (mago): Figure this out with hidden function...
  hidden: (/* { wallets } */) => false,
  /* wallets.some(
      (wallet) =>
        wallet.installed &&
        wallet.name === wallet.connector.name &&
        (wallet.connector || wallet.id === "coinbase")
    ), */
  createConnector: getDefaultInjectedConnector(),
});
