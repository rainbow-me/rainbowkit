import { Wallet } from "../../Wallet";

export const zealWallet = (): Wallet => ({
  id: "zeal",
  name: "Zeal",
  iconBackground: "#fff0",
  downloadUrls: {
    browserExtension: "https://zeal.app",
  },
  connector: {
    extension: {
      instructions: {
        learnMoreUrl: "https://zeal.app/",
        steps: [
          {
            description: "wallet_connectors.zeal.extension.step1.description",
            step: "install",
            title: "wallet_connectors.zeal.extension.step1.title",
          },
          {
            description: "wallet_connectors.zeal.extension.step2.description",
            step: "create",
            title: "wallet_connectors.zeal.extension.step2.title",
          },
          {
            description: "wallet_connectors.zeal.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.zeal.extension.step3.title",
          },
        ],
      },
    },
  },
});
