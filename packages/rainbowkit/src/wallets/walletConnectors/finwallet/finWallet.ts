import { Wallet } from "../../Wallet";
import {
  getInjectedConnector,
  hasInjectedProvider,
} from "../../getInjectedConnector";

export const finWallet = (): Wallet => {
  const isFinWalletInjected = hasInjectedProvider({
    namespace: "fin.provider",
  });

  return {
    id: "finwhale",
    name: "Fin Wallet",
    iconUrl: async () => (await import("./finWallet.svg")).default,
    installed: isFinWalletInjected,
    iconAccent: "#fff",
    iconBackground: "#36dbcf",
    rdns: "finwallet.com",
    downloadUrls: {
      chrome:
        "https://chromewebstore.google.com/detail/fin-wallet-for-sei/dbgnhckhnppddckangcjbkjnlddbjkna",
      browserExtension: "https://finwallet.com/download",
    },
    extension: {
      instructions: {
        learnMoreUrl: "https://finwallet.com",
        steps: [
          {
            description: "wallet_connectors.fin.extension.step1.description",
            step: "install",
            title: "wallet_connectors.fin.extension.step1.title",
          },
          {
            description: "wallet_connectors.fin.extension.step2.description",
            step: "create",
            title: "wallet_connectors.fin.extension.step2.title",
          },
          {
            description: "wallet_connectors.fin.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.fin.extension.step3.title",
          },
        ],
      },
    },
    createConnector: getInjectedConnector({
      namespace: "fin.provider",
    }),
  };
};