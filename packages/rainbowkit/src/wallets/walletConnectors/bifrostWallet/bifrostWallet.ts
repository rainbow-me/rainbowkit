import { Wallet } from "../../Wallet";

export const bifrostWallet = (): Wallet => {
  return {
    id: "bifrostWallet",
    name: "Bifrost Wallet",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.bifrostwallet.app",
      ios: "https://apps.apple.com/us/app/bifrost-wallet/id1577198351",
      qrCode: "https://bifrostwallet.com/#download-app",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl:
            "https://support.bifrostwallet.com/en/articles/6886814-how-to-use-walletconnect",
          steps: [
            {
              description:
                "wallet_connectors.bifrost.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.bifrost.qr_code.step1.title",
            },
            {
              description:
                "wallet_connectors.bifrost.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.bifrost.qr_code.step2.title",
            },
            {
              description:
                "wallet_connectors.bifrost.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.bifrost.qr_code.step3.title",
            },
          ],
        },
      },
    },
  };
};
