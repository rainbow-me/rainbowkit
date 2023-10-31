import { Wallet } from "../../Wallet";

export const safeWallet = (): Wallet => ({
  id: "safe",
  name: "Safe",
  iconAccent: "#12ff80",
  iconBackground: "#fff",
});
