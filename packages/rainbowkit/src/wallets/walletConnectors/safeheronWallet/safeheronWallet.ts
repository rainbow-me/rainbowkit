import { Wallet } from "../../Wallet";

export const safeheronWallet = (): Wallet => ({
  id: "safeheron",
  name: "Safeheron",
  iconBackground: "#fff",
  downloadUrls: {
    chrome:
      "https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh",
    browserExtension: "https://www.safeheron.com/",
  },
  connector: {
    extension: {
      instructions: {
        learnMoreUrl: "https://www.safeheron.com/",
        steps: [
          {
            description:
              "wallet_connectors.safeheron.extension.step1.description",
            step: "install",
            title: "wallet_connectors.safeheron.extension.step1.title",
          },
          {
            description:
              "wallet_connectors.safeheron.extension.step2.description",
            step: "create",
            title: "wallet_connectors.safeheron.extension.step2.title",
          },
          {
            description:
              "wallet_connectors.safeheron.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.safeheron.extension.step3.title",
          },
        ],
      },
    },
  },
});
