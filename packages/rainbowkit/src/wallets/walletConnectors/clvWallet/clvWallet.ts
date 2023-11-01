import { Wallet } from "../../Wallet";

export const clvWallet = (): Wallet => {
  return {
    id: "clv",
    name: "CLV",
    iconBackground: "#fff",
    iconAccent: "#BDFDE2",
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/clv-wallet/nhnkbkgjikgcigadomkphalanndcapjk",
      ios: "https://apps.apple.com/app/clover-wallet/id1570072858",
      mobile: "https://apps.apple.com/app/clover-wallet/id1570072858",
      qrCode: "https://clv.org/",
    },
    connector: {
      extension: {
        instructions: {
          learnMoreUrl: "https://clv.org/",
          steps: [
            {
              description: "wallet_connectors.clv.extension.step1.description",
              step: "install",
              title: "wallet_connectors.clv.extension.step1.title",
            },
            {
              description: "wallet_connectors.clv.extension.step2.description",
              step: "create",
              title: "wallet_connectors.clv.extension.step2.title",
            },
            {
              description: "wallet_connectors.clv.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.clv.extension.step3.title",
            },
          ],
        },
      },
      qrCode: {
        instructions: {
          learnMoreUrl: "https://clv.org/",
          steps: [
            {
              description: "wallet_connectors.clv.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.clv.qr_code.step1.title",
            },
            {
              description: "wallet_connectors.clv.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.clv.qr_code.step2.title",
            },
            {
              description: "wallet_connectors.clv.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.clv.qr_code.step3.title",
            },
          ],
        },
      },
    },
  };
};
