import { Wallet } from "../../Wallet";

export const ledgerWallet = (): Wallet => ({
  id: "ledger",
  iconBackground: "#000",
  iconAccent: "#000",
  name: "Ledger",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.ledger.live",
    ios: "https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700",
    mobile: "https://www.ledger.com/ledger-live",
    qrCode: "https://r354.adj.st/?adj_t=t2esmlk",
    windows: "https://www.ledger.com/ledger-live/download",
    macos: "https://www.ledger.com/ledger-live/download",
    linux: "https://www.ledger.com/ledger-live/download",
    desktop: "https://www.ledger.com/ledger-live",
  },
  connector: {
    desktop: {
      instructions: {
        learnMoreUrl:
          "https://support.ledger.com/hc/en-us/articles/4404389503889-Getting-started-with-Ledger-Live",
        steps: [
          {
            description: "wallet_connectors.ledger.desktop.step1.description",
            step: "install",
            title: "wallet_connectors.ledger.desktop.step1.title",
          },
          {
            description: "wallet_connectors.ledger.desktop.step2.description",
            step: "create",
            title: "wallet_connectors.ledger.desktop.step2.title",
          },
          {
            description: "wallet_connectors.ledger.desktop.step3.description",
            step: "connect",
            title: "wallet_connectors.ledger.desktop.step3.title",
          },
        ],
      },
    },
    qrCode: {
      instructions: {
        learnMoreUrl:
          "https://support.ledger.com/hc/en-us/articles/4404389503889-Getting-started-with-Ledger-Live",
        steps: [
          {
            description: "wallet_connectors.ledger.qr_code.step1.description",
            step: "install",
            title: "wallet_connectors.ledger.qr_code.step1.title",
          },
          {
            description: "wallet_connectors.ledger.qr_code.step2.description",
            step: "create",
            title: "wallet_connectors.ledger.qr_code.step2.title",
          },
          {
            description: "wallet_connectors.ledger.qr_code.step3.description",
            step: "scan",
            title: "wallet_connectors.ledger.qr_code.step3.title",
          },
        ],
      },
    },
  },
});
