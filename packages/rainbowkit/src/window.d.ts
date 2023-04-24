import { Ethereum } from '@wagmi/core';

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
