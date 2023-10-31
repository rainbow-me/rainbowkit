import { Wallet } from "../../Wallet";

export const foxWallet = (): Wallet => {
  return {
    id: "foxwallet",
    name: "FoxWallet",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.foxwallet.play",
      ios: "https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231",
      qrCode: "https://foxwallet.com/download",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl: "https://foxwallet.com",
          steps: [
            {
              description: "wallet_connectors.fox.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.fox.qr_code.step1.title",
            },
            {
              description: "wallet_connectors.fox.qr_code.step2.description",

              step: "create",
              title: "wallet_connectors.fox.qr_code.step2.title",
            },
            {
              description: "wallet_connectors.fox.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.fox.qr_code.step3.title",
            },
          ],
        },
      },
    },
  };
};
