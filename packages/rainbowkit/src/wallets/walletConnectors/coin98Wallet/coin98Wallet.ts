import { Wallet } from "../../Wallet";
import {
  getInjectedConnector,
  hasInjectedProvider,
} from "../../getInjectedConnector";
import { getWalletConnectConnector } from "../../getWalletConnectConnector";

declare global {
  interface Window {
    coin98Wallet: Window["ethereum"];
  }
}

export interface Coin98WalletOptions {
  projectId: string;
}

export const coin98Wallet = ({ projectId }: Coin98WalletOptions): Wallet => {
  const isCoin98WalletInjected = hasInjectedProvider("isCoin98");
  const shouldUseWalletConnect = !isCoin98WalletInjected;
  return {
    id: "coin98",
    name: "Coin98 Wallet",
    iconUrl: async () => (await import("./coin98Wallet.svg")).default,
    // Note that we never resolve `installed` to `false` because the
    // Coin98 Wallet provider falls back to other connection methods if
    // the injected connector isn't available
    installed: !shouldUseWalletConnect ? isCoin98WalletInjected : undefined,
    iconAccent: "#CDA349",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=coin98.crypto.finance.media",
      ios: "https://apps.apple.com/vn/app/coin98-super-app/id1561969966",
      mobile: "https://coin98.com/wallet",
      qrCode: "https://coin98.com/wallet",
      chrome:
        "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
      browserExtension: "https://coin98.com/wallet",
    },
    mobile: {
      getUri: shouldUseWalletConnect ? (uri: string) => uri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: "https://coin98.com/wallet",
            steps: [
              {
                description:
                  "wallet_connectors.coin98.qr_code.step1.description",
                step: "install",
                title: "wallet_connectors.coin98.qr_code.step1.title",
              },
              {
                description:
                  "wallet_connectors.coin98.qr_code.step2.description",
                step: "create",
                title: "wallet_connectors.coin98.qr_code.step2.title",
              },
              {
                description:
                  "wallet_connectors.coin98.qr_code.step3.description",
                step: "scan",
                title: "wallet_connectors.coin98.qr_code.step3.title",
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: "https://coin98.com/wallet",
        steps: [
          {
            description: "wallet_connectors.coin98.extension.step1.description",
            step: "install",
            title: "wallet_connectors.coin98.extension.step1.title",
          },
          {
            description: "wallet_connectors.coin98.extension.step2.description",
            step: "create",
            title: "wallet_connectors.coin98.extension.step2.title",
          },
          {
            description: "wallet_connectors.coin98.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.coin98.extension.step3.title",
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
        })
      : getInjectedConnector({ flag: "isCoin98" }),
  };
};
