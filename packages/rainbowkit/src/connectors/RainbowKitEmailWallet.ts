import { AbstractRainbowKitAuthWallet } from './AbstractRainbowKitAuthWallet';

export class RainbowKitEmailWallet extends AbstractRainbowKitAuthWallet {
  readonly id = 'email';
  readonly name = 'Email';
  readonly loginType = 'rk-password';
}
