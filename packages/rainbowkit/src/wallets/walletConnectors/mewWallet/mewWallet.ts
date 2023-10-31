import { Wallet } from "../../Wallet";

export const mewWallet = (): Wallet => {
  return {
    id: "mew",
    name: "MEW wallet",
    iconBackground: "#fff",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow",
      ios: "https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow",
      mobile: "https://mewwallet.com",
      qrCode: "https://mewwallet.com",
    },
  };
};
