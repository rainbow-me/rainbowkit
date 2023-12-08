import { AbstractRainbowMiniWallet } from '../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet';

export class RainbowTwitchWallet extends AbstractRainbowMiniWallet {
  readonly id = 'twitch';
  readonly name = 'Twitch';
  readonly loginType = 'twitch';
}
