import { Wallet } from "../../Wallet";

export const talismanWallet = (): Wallet => ({
  id: "talisman",
  name: "Talisman",
  iconBackground: "#fff",
  downloadUrls: {
    chrome:
      "https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
    firefox:
      "https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/",
    browserExtension: "https://talisman.xyz/download",
  },
  connector: {
    extension: {
      instructions: {
        learnMoreUrl: "https://talisman.xyz/",
        steps: [
          {
            description:
              "wallet_connectors.talisman.extension.step1.description",
            step: "install",
            title: "wallet_connectors.talisman.extension.step1.title",
          },
          {
            description:
              "wallet_connectors.talisman.extension.step2.description",
            step: "create",
            title: "wallet_connectors.talisman.extension.step2.title",
          },
          {
            description:
              "wallet_connectors.talisman.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.talisman.extension.step3.title",
          },
        ],
      },
    },
  },
});
