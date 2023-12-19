import { ConnectorData } from "wagmi";
import { isValidConnector } from "./validateConnector";

const storageKey = "rk-mini-wallet-cached-provider";

export const miniWalletConnector = (): ConnectorData | undefined => {
  if (typeof localStorage === "undefined") return;
  const cachedMiniWallet = localStorage.getItem(storageKey);
  if (!cachedMiniWallet) return;
  return JSON.parse(cachedMiniWallet);
};

export const setMiniWalletConnector = ({ account, chain }: ConnectorData) => {
  if (typeof localStorage === "undefined") return;
  const validConnector = isValidConnector({ account, chain });
  if (!validConnector) throw new Error("Not a valid connector");
  localStorage.setItem(storageKey, JSON.stringify({ account, chain }));
};

export const removeMiniWalletConnector = () => {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(storageKey);
};
