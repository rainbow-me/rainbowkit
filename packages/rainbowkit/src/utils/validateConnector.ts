import { isAddress } from "viem";
import { ConnectorData } from "wagmi";

export const isValidConnector = ({
  account,
  chain,
}: ConnectorData): boolean => {
  if (!isAddress(account)) return false;
  if (typeof chain?.id !== "number") return false;
  return true;
};
