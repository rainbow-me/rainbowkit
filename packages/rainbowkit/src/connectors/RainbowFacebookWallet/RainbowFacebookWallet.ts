import { AbstractRainbowMiniWallet } from '../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet';

export class RainbowFacebookWallet extends AbstractRainbowMiniWallet {
  readonly id = 'facebook';
  readonly name = 'Facebook';
  readonly loginType = 'facebook';
}
