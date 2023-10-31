import { Wallet } from "../../Wallet";

export const safepalWallet = (): Wallet => {
  return {
    id: "safepal",
    name: "SafePal Wallet",
    iconAccent: "#3375BB",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=io.safepal.wallet&referrer=utm_source%3Drainbowkit%26utm_medium%3Ddisplay%26utm_campaign%3Ddownload",
      ios: "https://apps.apple.com/app/apple-store/id1548297139?pt=122504219&ct=rainbowkit&mt=8",
      mobile: "https://www.safepal.com/en/download",
      qrCode: "https://www.safepal.com/en/download",
      chrome:
        "https://chrome.google.com/webstore/detail/safepal-extension-wallet/lgmpcpglpngdoalbgeoldeajfclnhafa",
      browserExtension: "https://www.safepal.com/download?product=2",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl: "https://safepal.com/",
          steps: [
            {
              description:
                "wallet_connectors.safepal.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.safepal.qr_code.step1.title",
            },
            {
              description:
                "wallet_connectors.safepal.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.safepal.qr_code.step2.title",
            },
            {
              description:
                "wallet_connectors.safepal.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.safepal.qr_code.step3.title",
            },
          ],
        },
      },

      extension: {
        instructions: {
          learnMoreUrl: "https://www.safepal.com/download?product=2",
          steps: [
            {
              description:
                "wallet_connectors.safepal.extension.step1.description",
              step: "install",
              title: "wallet_connectors.safepal.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.safepal.extension.step2.description",
              step: "create",
              title: "wallet_connectors.safepal.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.safepal.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.safepal.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
