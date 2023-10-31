import { Wallet } from "../../Wallet";

export const rabbyWallet = (): Wallet => ({
  id: "rabby",
  name: "Rabby Wallet",
  iconBackground: "#8697FF",
  downloadUrls: {
    chrome:
      "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
    browserExtension: "https://rabby.io",
  },
  connector: {
    extension: {
      instructions: {
        learnMoreUrl: "https://rabby.io/",
        steps: [
          {
            description: "wallet_connectors.rabby.extension.step1.description",
            step: "install",
            title: "wallet_connectors.rabby.extension.step1.title",
          },
          {
            description: "wallet_connectors.rabby.extension.step2.description",
            step: "create",
            title: "wallet_connectors.rabby.extension.step2.title",
          },
          {
            description: "wallet_connectors.rabby.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.rabby.extension.step3.title",
          },
        ],
      },
    },
  },
});
