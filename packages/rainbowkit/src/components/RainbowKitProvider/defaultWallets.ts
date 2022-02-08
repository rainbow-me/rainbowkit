import type { Wallet } from './WalletsContext';
import { wallet } from './wallet';

export const defaultWallets: Wallet[] = [
  wallet.rainbow,
  wallet.coinbase,
  wallet.metamask,
];
