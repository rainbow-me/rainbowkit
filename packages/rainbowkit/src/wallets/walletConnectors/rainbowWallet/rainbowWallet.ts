import { isAndroid, isIOS } from "../../../utils/isMobile";
import { Wallet } from "../../Wallet";
import {
  getInjectedConnector,
  hasInjectedProvider,
} from "../../getInjectedConnector";
import { getWalletConnectConnector } from "../../getWalletConnectConnector";

export interface RainbowWalletOptions {
  projectId: string;
}

export const rainbowWallet = ({ projectId }: RainbowWalletOptions): Wallet => {
  const isRainbowInjected = hasInjectedProvider("isRainbow");
  const shouldUseWalletConnect = !isRainbowInjected;

  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : isIOS()
      ? `rainbow://wc?uri=${encodeURIComponent(uri)}&connector=rainbowkit`
      : `https://rnbwapp.com/wc?uri=${encodeURIComponent(
          uri
        )}&connector=rainbowkit`;
  };

  return {
    id: "rainbow",
    name: "Rainbow",
    iconUrl: async () => (await import("./rainbowWallet.svg")).default,
    iconBackground: "#0c2f78",
    installed: !shouldUseWalletConnect ? isRainbowInjected : undefined,
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=me.rainbow&referrer=utm_source%3Drainbowkit&utm_source=rainbowkit",
      ios: "https://apps.apple.com/app/apple-store/id1457119021?pt=119997837&ct=rainbowkit&mt=8",
      mobile: "https://rainbow.download?utm_source=rainbowkit",
      qrCode:
        "https://rainbow.download?utm_source=rainbowkit&utm_medium=qrcode",
      browserExtension: "https://rainbow.me/extension?utm_source=rainbowkit",
    },
    mobile: { getUri: shouldUseWalletConnect ? getUri : undefined },
    qrCode: shouldUseWalletConnect
      ? {
          getUri,
          instructions: {
            learnMoreUrl:
              "https://learn.rainbow.me/connect-to-a-website-or-app?utm_source=rainbowkit&utm_medium=connector&utm_campaign=learnmore",
            steps: [
              {
                description:
                  "wallet_connectors.rainbow.qr_code.step1.description",
                step: "install",
                title: "wallet_connectors.rainbow.qr_code.step1.title",
              },
              {
                description:
                  "wallet_connectors.rainbow.qr_code.step2.description",
                step: "create",
                title: "wallet_connectors.rainbow.qr_code.step2.title",
              },
              {
                description:
                  "wallet_connectors.rainbow.qr_code.step3.description",
                step: "scan",
                title: "wallet_connectors.rainbow.qr_code.step3.title",
              },
            ],
          },
        }
      : undefined,

    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
        })
      : getInjectedConnector({ flag: "isRainbow" }),
  };
};
