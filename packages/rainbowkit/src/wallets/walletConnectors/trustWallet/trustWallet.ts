import { Wallet } from "../../Wallet";

export const trustWallet = (): Wallet => {
  return {
    id: "trust",
    name: "Trust Wallet",
    iconAccent: "#3375BB",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
      mobile: "https://trustwallet.com/download",
      qrCode: "https://trustwallet.com/download",
      chrome:
        "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      browserExtension: "https://trustwallet.com/browser-extension",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl: "https://trustwallet.com/",
          steps: [
            {
              description: "wallet_connectors.trust.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.trust.qr_code.step1.title",
            },
            {
              description: "wallet_connectors.trust.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.trust.qr_code.step2.title",
            },
            {
              description: "wallet_connectors.trust.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.trust.qr_code.step3.title",
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl: "https://trustwallet.com/browser-extension",
          steps: [
            {
              description:
                "wallet_connectors.trust.extension.step1.description",
              step: "install",
              title: "wallet_connectors.trust.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.trust.extension.step2.description",
              step: "create",
              title: "wallet_connectors.trust.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.trust.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.trust.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
