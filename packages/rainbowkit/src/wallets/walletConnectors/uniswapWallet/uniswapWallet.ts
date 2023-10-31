import { Wallet } from "../../Wallet";

export const uniswapWallet = (): Wallet => ({
  id: "uniswap",
  name: "Uniswap Wallet",
  iconBackground: "#FFD8EA",
  downloadUrls: {
    ios: "https://apps.apple.com/app/apple-store/id6443944476",
    mobile: "https://wallet.uniswap.org/",
    qrCode: "https://wallet.uniswap.org/",
  },
  connector: {
    qrCode: {
      instructions: {
        learnMoreUrl: "https://wallet.uniswap.org/",
        steps: [
          {
            description: "wallet_connectors.uniswap.qr_code.step1.description",
            step: "install",
            title: "wallet_connectors.uniswap.qr_code.step1.title",
          },
          {
            description: "wallet_connectors.uniswap.qr_code.step2.description",
            step: "create",
            title: "wallet_connectors.uniswap.qr_code.step2.title",
          },
          {
            description: "wallet_connectors.uniswap.qr_code.step3.description",
            step: "scan",
            title: "wallet_connectors.uniswap.qr_code.step3.title",
          },
        ],
      },
    },
  },
});
