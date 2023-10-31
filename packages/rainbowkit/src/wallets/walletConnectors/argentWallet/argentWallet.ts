import { Wallet } from "../../Wallet";

export const argentWallet = (): Wallet => ({
  id: "argent",
  name: "Argent",
  iconBackground: "#fff",
  downloadUrls: {
    android:
      "https://play.google.com/store/apps/details?id=im.argent.contractwalletclient",
    ios: "https://apps.apple.com/us/app/argent/id1358741926",
    mobile: "https://argent.xyz/download-argent",
    qrCode: "https://argent.link/app",
  },
  connector: {
    qrCode: {
      instructions: {
        learnMoreUrl: "https://argent.xyz/learn/what-is-a-crypto-wallet/",
        steps: [
          {
            description: "wallet_connectors.argent.qr_code.step1.description",
            step: "install",
            title: "wallet_connectors.argent.qr_code.step1.title",
          },
          {
            description: "wallet_connectors.argent.qr_code.step2.description",
            step: "create",
            title: "wallet_connectors.argent.qr_code.step2.title",
          },
          {
            description: "wallet_connectors.argent.qr_code.step3.description",
            step: "scan",
            title: "wallet_connectors.argent.qr_code.step3.title",
          },
        ],
      },
    },
  },
});
