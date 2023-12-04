import { AbstractRainbowMiniWallet } from "../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet";

export class RainbowPhoneWallet extends AbstractRainbowMiniWallet {
  readonly id = "phone";
  readonly name = "Phone";
  readonly loginType = "OTP";
}
