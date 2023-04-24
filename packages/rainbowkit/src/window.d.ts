import { WindowProvider } from 'wagmi';

declare global {
  interface Window {
    ethereum?: WindowProvider;
  }
}
