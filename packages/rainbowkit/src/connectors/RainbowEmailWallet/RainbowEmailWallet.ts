import { AbstractRainbowMiniWallet } from "../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet";

export class RainbowEmailWallet extends AbstractRainbowMiniWallet {
  readonly id = "email";
  readonly name = "Email";
  readonly loginType = "EMAIL";
}
