import { AbstractRainbowMiniWallet } from '../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet';

export class RainbowTwitterWallet extends AbstractRainbowMiniWallet {
  readonly id = 'twitter';
  readonly name = 'Twitter';
  readonly loginType = 'twitter';
}
