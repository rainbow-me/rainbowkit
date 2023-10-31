import { Wallet } from "../../Wallet";

export const xdefiWallet = (): Wallet => {
  return {
    id: "xdefi",
    name: "XDEFI Wallet",
    iconBackground: "#fff",
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf",
      browserExtension: "https://xdefi.io",
    },
    connector: {
      extension: {
        instructions: {
          learnMoreUrl: "https://xdefi.io/support-categories/xdefi-wallet/",
          steps: [
            {
              description:
                "wallet_connectors.xdefi.extension.step1.description",
              step: "install",
              title: "wallet_connectors.xdefi.extension.step1.title",
            },
            {
              description:
                "wallet_connectors.xdefi.extension.step2.description",
              step: "create",
              title: "wallet_connectors.xdefi.extension.step2.title",
            },
            {
              description:
                "wallet_connectors.xdefi.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.xdefi.extension.step3.title",
            },
          ],
        },
      },
    },
  };
};
