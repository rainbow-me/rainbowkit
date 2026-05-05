import type { Wallet } from '../../Wallet';
import {
  type ReadyWalletOptions,
  readyWallet,
} from '../readyWallet/readyWallet';

export type ArgentWalletOptions = ReadyWalletOptions;

/**
 * @deprecated Use {@link readyWallet} instead.
 */
export const argentWallet = (options: ArgentWalletOptions): Wallet => {
  const wallet = readyWallet(options);

  return {
    ...wallet,
    id: 'argent',
  };
};
