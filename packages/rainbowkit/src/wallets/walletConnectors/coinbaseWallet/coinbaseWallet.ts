import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { Wallet } from "../../Wallet";

export interface CoinbaseWalletOptions {
  appName: string;
  chains: Chain[];
}

export const coinbaseWallet = (): Wallet => {
  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    shortName: "Coinbase",
    iconAccent: "#2c5ff6",
    iconBackground: "#2c5ff6",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      mobile: "https://coinbase.com/wallet/downloads",
      qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250",
      chrome:
        "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
      browserExtension: "https://coinbase.com/wallet",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl:
            "https://coinbase.com/wallet/articles/getting-started-mobile",
          steps: [
            {
              description:
                "wallet_connectors.coinbase.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.coinbase.qr_code.step1.title",
            },
            {
              description:
                "wallet_connectors.coinbase.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.coinbase.qr_code.step2.title",
            },
            {
              description:
                "wallet_connectors.coinbase.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.coinbase.qr_code.step3.title",
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl:
            "https://coinbase.com/wallet/articles/getting-started-extension",
          steps: [
            {
              description:
                "wallet_connectors.coinbase.extension.step1.description",
              step: "install",
              title: "wallet_connectors.coinbase.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.coinbase.extension.step2.description",
              step: "create",
              title: "wallet_connectors.coinbase.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.coinbase.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.coinbase.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
