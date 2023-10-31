import type { Wallet } from "../../Wallet";

export const tokenPocketWallet = (): Wallet => {
  return {
    id: "tokenPocket",
    name: "TokenPocket",
    iconBackground: "#2980FE",
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii",
      browserExtension: "https://extension.tokenpocket.pro/",
      android:
        "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/us/app/tp-global-wallet/id6444625622",
      qrCode: "https://tokenpocket.pro/en/download/app",
      mobile: "https://tokenpocket.pro/en/download/app",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl: "https://help.tokenpocket.pro/en/",
          steps: [
            {
              description:
                "wallet_connectors.token_pocket.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.token_pocket.qr_code.step1.title",
            },
            {
              description:
                "wallet_connectors.token_pocket.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.token_pocket.qr_code.step2.title",
            },
            {
              description:
                "wallet_connectors.token_pocket.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.token_pocket.qr_code.step3.title",
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl:
            "https://help.tokenpocket.pro/en/extension-wallet/faq/installation-tutorial",
          steps: [
            {
              description:
                "wallet_connectors.token_pocket.extension.step1.description",
              step: "install",
              title: "wallet_connectors.token_pocket.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.token_pocket.extension.step2.description",
              step: "create",
              title: "wallet_connectors.token_pocket.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.token_pocket.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.token_pocket.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
