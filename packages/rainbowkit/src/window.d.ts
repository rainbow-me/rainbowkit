import { Ethereum } from 'wagmi';

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
