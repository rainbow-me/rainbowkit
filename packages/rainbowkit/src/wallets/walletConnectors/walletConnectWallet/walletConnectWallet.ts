import { isIOS } from "../../../utils/isMobile";
import { Wallet } from "../../Wallet";
import { getWalletConnectConnector } from "../../getWalletConnectConnector";

export interface WalletConnectWalletOptions {
  projectId: string;
}

export const walletConnectWallet = ({
  projectId,
}: WalletConnectWalletOptions): Wallet => {
  const ios = isIOS();

  const getUri = (uri: string) => uri;

  return {
    id: "walletConnect",
    name: "WalletConnect",
    iconUrl: async () => (await import("./walletConnectWallet.svg")).default,
    iconBackground: "#3b99fc",
    ...(ios
      ? {}
      : {
          mobile: { getUri },
          qrCode: { getUri },
        }),
    createConnector: () =>
      getWalletConnectConnector({
        projectId,
      }),
  };
};
