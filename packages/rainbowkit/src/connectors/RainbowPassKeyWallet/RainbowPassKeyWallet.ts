import { AbstractRainbowMiniWallet } from '../AbstractRainbowMiniWallet/AbstractRainbowMiniWallet';

export class RainbowPassKeyWallet extends AbstractRainbowMiniWallet {
  readonly id = 'passkey';
  readonly name = 'PassKey';
  readonly loginType = 'PassKey';
}
