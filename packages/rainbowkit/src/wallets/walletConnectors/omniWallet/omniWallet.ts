import { Wallet } from "../../Wallet";

export const omniWallet = (): Wallet => ({
  id: "omni",
  name: "Omni",
  iconBackground: "#000",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=fi.steakwallet.app",
    ios: "https://itunes.apple.com/us/app/id1569375204",
    mobile: "https://omniwallet.app.link",
    qrCode: "https://omniwallet.app.link",
  },
  connector: {
    qrCode: {
      instructions: {
        learnMoreUrl: "https://omni.app/support",
        steps: [
          {
            description: "wallet_connectors.omni.qr_code.step1.description",
            step: "install",
            title: "wallet_connectors.omni.qr_code.step1.title",
          },
          {
            description: "wallet_connectors.omni.qr_code.step2.description",
            step: "create",
            title: "wallet_connectors.omni.qr_code.step2.title",
          },
          {
            description: "wallet_connectors.omni.qr_code.step3.description",
            step: "scan",
            title: "wallet_connectors.omni.qr_code.step3.title",
          },
        ],
      },
    },
  },
});
