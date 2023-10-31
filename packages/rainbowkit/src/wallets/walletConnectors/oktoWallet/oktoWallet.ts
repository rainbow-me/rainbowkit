import { Wallet } from "../../Wallet";

export const oktoWallet = (): Wallet => ({
  id: "Okto",
  name: "Okto",
  iconBackground: "#fff",
  downloadUrls: {
    android:
      "https://play.google.com/store/apps/details?id=im.okto.contractwalletclient",
    ios: "https://apps.apple.com/in/app/okto-wallet/id6450688229",
    mobile: "https://okto.tech/",
    qrCode: "https://okto.tech/",
  },
  connector: {
    qrCode: {
      instructions: {
        learnMoreUrl: "https://okto.tech/",
        steps: [
          {
            description: "wallet_connectors.okto.qr_code.step1.description",
            step: "install",
            title: "wallet_connectors.okto.qr_code.step1.title",
          },
          {
            description: "wallet_connectors.okto.qr_code.step2.description",
            step: "create",
            title: "wallet_connectors.okto.qr_code.step2.title",
          },
          {
            description: "wallet_connectors.okto.qr_code.step3.description",
            step: "scan",
            title: "wallet_connectors.okto.qr_code.step3.title",
          },
        ],
      },
    },
  },
});
