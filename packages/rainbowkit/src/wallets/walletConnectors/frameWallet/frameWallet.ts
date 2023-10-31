import { Wallet } from "../../Wallet";

export const frameWallet = (): Wallet => ({
  id: "frame",
  name: "Frame",
  iconBackground: "#121C20",
  downloadUrls: {
    browserExtension: "https://frame.sh/",
  },
  connector: {
    extension: {
      instructions: {
        learnMoreUrl:
          "https://docs.frame.sh/docs/Getting%20Started/Installation/",
        steps: [
          {
            description: "wallet_connectors.frame.extension.step1.description",
            step: "install",
            title: "wallet_connectors.frame.extension.step1.title",
          },
          {
            description: "wallet_connectors.frame.extension.step2.description",
            step: "create",
            title: "wallet_connectors.frame.extension.step2.title",
          },
          {
            description: "wallet_connectors.frame.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.frame.extension.step3.title",
          },
        ],
      },
    },
  },
});
