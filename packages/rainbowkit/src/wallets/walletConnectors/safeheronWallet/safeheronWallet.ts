import { Wallet } from "../../Wallet";
import { getInjectedConnector } from "../../getInjectedConnector";

declare global {
  interface Window {
    safeheron: any;
  }
}

export const safeheronWallet = (): Wallet => ({
  id: "safeheron",
  name: "Safeheron",
  installed:
    typeof window !== "undefined" &&
    typeof window.safeheron !== "undefined" &&
    // @ts-ignore
    window.safeheron.isSafeheron === true,
  iconUrl: async () => (await import("./safeheronWallet.svg")).default,
  iconBackground: "#fff",
  downloadUrls: {
    chrome:
      "https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh",
    browserExtension: "https://www.safeheron.com/",
  },
  extension: {
    instructions: {
      learnMoreUrl: "https://www.safeheron.com/",
      steps: [
        {
          description:
            "wallet_connectors.safeheron.extension.step1.description",
          step: "install",
          title: "wallet_connectors.safeheron.extension.step1.title",
        },
        {
          description:
            "wallet_connectors.safeheron.extension.step2.description",
          step: "create",
          title: "wallet_connectors.safeheron.extension.step2.title",
        },
        {
          description:
            "wallet_connectors.safeheron.extension.step3.description",
          step: "refresh",
          title: "wallet_connectors.safeheron.extension.step3.title",
        },
      ],
    },
  },
  createConnector: getInjectedConnector({
    target: typeof window !== "undefined" ? window.safeheron : undefined,
  }),
});
