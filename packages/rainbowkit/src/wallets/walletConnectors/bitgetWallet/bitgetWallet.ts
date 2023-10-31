import { Wallet } from "../../Wallet";

export const bitgetWallet = (): Wallet => {
  const isBitKeepInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    window.bitkeep !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum.isBitKeep === true;

  const shouldUseWalletConnect = !isBitKeepInjected;

  return {
    id: "bitget",
    name: "Bitget Wallet",
    iconAccent: "#f6851a",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://web3.bitget.com/en/wallet-download?type=0",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      mobile: "https://web3.bitget.com/en/wallet-download?type=2",
      qrCode: "https://web3.bitget.com/en/wallet-download",
      chrome:
        "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
      browserExtension: "https://web3.bitget.com/en/wallet-download",
    },

    connector: {
      extension: {
        instructions: {
          learnMoreUrl: "https://web3.bitget.com/en/academy",
          steps: [
            {
              description:
                "wallet_connectors.bitget.extension.step1.description",
              step: "install",
              title: "wallet_connectors.bitget.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.bitget.extension.step2.description",
              step: "create",
              title: "wallet_connectors.bitget.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.bitget.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.bitget.extension.step3.description",
            },
          ],
        },
      },
      qrCode: shouldUseWalletConnect
        ? {
            instructions: {
              learnMoreUrl: "https://web3.bitget.com/en/academy",
              steps: [
                {
                  description:
                    "wallet_connectors.bitget.qr_code.step1.description",
                  step: "install",
                  title: "wallet_connectors.bitget.qr_code.step1.title",
                },
                {
                  description:
                    "wallet_connectors.bitget.qr_code.step2.description",

                  step: "create",
                  title: "wallet_connectors.bitget.qr_code.step2.title",
                },
                {
                  description:
                    "wallet_connectors.bitget.qr_code.step3.description",
                  step: "scan",
                  title: "wallet_connectors.bitget.qr_code.step3.title",
                },
              ],
            },
          }
        : undefined,
    },
  };
};

/**
 * @deprecated `bitKeepWallet` is now `bitgetWallet`
 */
export const bitKeepWallet = bitgetWallet;
