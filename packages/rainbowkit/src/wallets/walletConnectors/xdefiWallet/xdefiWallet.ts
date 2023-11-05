import { Wallet } from "../../Wallet";
import { getInjectedConnector } from "../../getInjectedConnector";

declare global {
  interface Window {
    xfi: any;
  }
}

export const xdefiWallet = (): Wallet => {
  const isInstalled =
    typeof window !== "undefined" && typeof window?.xfi !== "undefined";
  return {
    id: "xdefi",
    name: "XDEFI Wallet",
    installed: isInstalled,
    iconUrl: async () => (await import("./xdefiWallet.svg")).default,
    iconBackground: "#fff",
    downloadUrls: {
      chrome:
        "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf",
      browserExtension: "https://xdefi.io",
    },
    extension: {
      instructions: {
        learnMoreUrl: "https://xdefi.io/support-categories/xdefi-wallet/",
        steps: [
          {
            description: "wallet_connectors.xdefi.extension.step1.description",
            step: "install",
            title: "wallet_connectors.xdefi.extension.step1.title",
          },
          {
            description: "wallet_connectors.xdefi.extension.step2.description",
            step: "create",
            title: "wallet_connectors.xdefi.extension.step2.title",
          },
          {
            description: "wallet_connectors.xdefi.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.xdefi.extension.step3.title",
          },
        ],
      },
    },
    createConnector: getInjectedConnector({
      target: isInstalled ? (window.xfi?.ethereum as any) : undefined,
    }),
  };
};
