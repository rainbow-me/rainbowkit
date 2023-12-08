import { AbstractRainbowMiniWallet } from '../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet';

export class RainbowGoogleWallet extends AbstractRainbowMiniWallet {
  readonly id = 'google';
  readonly name = 'Google';
  readonly loginType = 'google';
}
