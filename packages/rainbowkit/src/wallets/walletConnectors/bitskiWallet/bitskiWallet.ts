import { Wallet } from "../../Wallet";

export const bitskiWallet = (): Wallet => ({
  id: "bitski",
  name: "Bitski",
  iconBackground: "#fff",
  downloadUrls: {
    chrome:
      "https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell",
    browserExtension: "https://bitski.com",
  },
  connector: {
    extension: {
      instructions: {
        learnMoreUrl:
          "https://bitski.zendesk.com/hc/articles/12803972818836-How-to-install-the-Bitski-browser-extension",
        steps: [
          {
            description: "wallet_connectors.bitski.extension.step1.description",
            step: "install",
            title: "wallet_connectors.bitski.extension.step1.title",
          },
          {
            description: "wallet_connectors.bitski.extension.step2.description",
            step: "create",
            title: "wallet_connectors.bitski.extension.step2.title",
          },
          {
            description: "wallet_connectors.bitski.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.bitski.extension.step3.title",
          },
        ],
      },
    },
  },
});
