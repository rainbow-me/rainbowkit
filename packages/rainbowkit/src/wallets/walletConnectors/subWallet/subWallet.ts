import { Wallet } from "../../Wallet";

export const subWallet = (): Wallet => {
  return {
    id: "subwallet",
    name: "SubWallet",
    iconBackground: "#fff",
    downloadUrls: {
      browserExtension: "https://www.subwallet.app/download",
      chrome:
        "https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/subwallet/",
      edge: "https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn",
      mobile: "https://www.subwallet.app/download",
      android:
        "https://play.google.com/store/apps/details?id=app.subwallet.mobile",
      ios: "https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285",
      qrCode: "https://www.subwallet.app/download",
    },
    connector: {
      qrCode: {
        instructions: {
          learnMoreUrl: "https://www.subwallet.app/",
          steps: [
            {
              description:
                "wallet_connectors.subwallet.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.subwallet.qr_code.step1.title",
            },
            {
              description:
                "wallet_connectors.subwallet.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.subwallet.qr_code.step2.title",
            },
            {
              description:
                "wallet_connectors.subwallet.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.subwallet.qr_code.step3.title",
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl: "https://www.subwallet.app/",
          steps: [
            {
              description:
                "wallet_connectors.subwallet.extension.step1.description",
              step: "install",
              title: "wallet_connectors.subwallet.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.subwallet.extension.step2.description",
              step: "create",
              title: "wallet_connectors.subwallet.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.subwallet.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.subwallet.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
