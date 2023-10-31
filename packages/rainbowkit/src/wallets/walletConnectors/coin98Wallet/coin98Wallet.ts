import { Wallet } from "../../Wallet";

export const coin98Wallet = (): Wallet => {
  return {
    id: "coin98",
    name: "Coin98 Wallet",
    iconAccent: "#CDA349",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=coin98.crypto.finance.media",
      ios: "https://apps.apple.com/vn/app/coin98-super-app/id1561969966",
      mobile: "https://coin98.com/wallet",
      qrCode: "https://coin98.com/wallet",
      chrome:
        "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
      browserExtension: "https://coin98.com/wallet",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl: "https://coin98.com/wallet",
          steps: [
            {
              description: "wallet_connectors.coin98.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.coin98.qr_code.step1.title",
            },
            {
              description: "wallet_connectors.coin98.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.coin98.qr_code.step2.title",
            },
            {
              description: "wallet_connectors.coin98.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.coin98.qr_code.step3.title",
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl: "https://coin98.com/wallet",
          steps: [
            {
              description:
                "wallet_connectors.coin98.extension.step1.description",
              step: "install",
              title: "wallet_connectors.coin98.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.coin98.extension.step2.description",
              step: "create",
              title: "wallet_connectors.coin98.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.coin98.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.coin98.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
