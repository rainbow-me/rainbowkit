import { Wallet } from "../../Wallet";

export const coreWallet = (): Wallet => {
  return {
    id: "core",
    name: "Core",
    iconBackground: "#1A1A1C",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.avaxwallet",
      ios: "https://apps.apple.com/us/app/core-wallet/id6443685999",
      mobile: "https://core.app/?downloadCoreMobile=1",
      qrCode: "https://core.app/?downloadCoreMobile=1",
      chrome:
        "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
      browserExtension: "https://extension.core.app/",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl:
            "https://support.avax.network/en/articles/6115608-core-mobile-how-to-add-the-core-mobile-to-my-phone",
          steps: [
            {
              description: "wallet_connectors.core.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.core.qr_code.step1.title",
            },
            {
              description: "wallet_connectors.core.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.core.qr_code.step2.title",
            },
            {
              description: "wallet_connectors.core.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.core.qr_code.step3.title",
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl: "https://extension.core.app/",
          steps: [
            {
              description: "wallet_connectors.core.extension.step1.description",
              step: "install",
              title: "wallet_connectors.core.extension.step1.title",
            },
            {
              description: "wallet_connectors.core.extension.step2.description",
              step: "create",
              title: "wallet_connectors.core.extension.step2.title",
            },
            {
              description: "wallet_connectors.core.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.core.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
