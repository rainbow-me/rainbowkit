/**
 * Mock utilities for testing Rainbow wallet integration
 *
 * This module provides utilities to mock browser wallet providers for testing purposes:
 * - EIP-1193 provider injection (window.ethereum)
 * - EIP-6963 provider discovery events
 *
 * The actual rainbowWallet connector is imported from the source code,
 * we only mock the browser environment and window providers.
 */

import type { Address } from 'viem';
import { rainbowWallet } from '../src/wallets/walletConnectors/rainbowWallet/rainbowWallet';

// Test accounts for Rainbow wallets
export const rainbowTestAccounts: readonly [Address, ...Address[]] = [
  '0xRainbow1193000000000000000000000000001', // Rainbow EIP-1193 account
  '0xRainbow6963000000000000000000000000002', // Rainbow EIP-6963 account
  '0xRainbowTest3000000000000000000000000003', // Additional test account
];

// Shared request implementation for both EIP-1193 and EIP-6963 providers
const sharedRequest = async ({ method }: { method: string; params?: any }) => {
  switch (method) {
    case 'eth_requestAccounts':
      return [rainbowTestAccounts[0]];
    case 'eth_accounts':
      return [rainbowTestAccounts[0]];
    case 'eth_chainId':
      return '0x1'; // mainnet
    case 'personal_sign':
      return '0xmocked_signature';
    default:
      throw new Error(`Unhandled method: ${method}`);
  }
};

// Mock EIP-1193 provider for Rainbow wallet
export const mockRainbow1193Provider = () => ({
  isRainbow: true,
  isMetaMask: false,
  request: sharedRequest,
  on: () => {},
  removeListener: () => {},
  emit: () => {},
});

// Mock EIP-6963 provider for Rainbow wallet
export const mockRainbow6963Provider = () => ({
  info: {
    uuid: 'rainbow',
    name: 'Rainbow',
    icon: 'data:image/svg+xml;base64,rainbow_icon',
    rdns: 'me.rainbow',
  },
  provider: {
    isRainbow: true,
    request: sharedRequest,
    on: () => {},
    removeListener: () => {},
    emit: () => {},
  },
});

// Export the actual rainbowWallet, only mock the window providers
export { rainbowWallet } from '../src/wallets/walletConnectors/rainbowWallet/rainbowWallet';

// Mock wallet setup functions
export const mockWallet = {
  // Setup EIP-1193 provider in window.ethereum
  setupEIP1193: () => {
    if (typeof window !== 'undefined') {
      (window as any).ethereum = mockRainbow1193Provider();
    }
  },

  // Setup EIP-6963 provider announcement
  setupEIP6963: () => {
    const provider = mockRainbow6963Provider();
    if (typeof window !== 'undefined') {
      const announceProvider = () => {
        const event = new CustomEvent('eip6963:announceProvider', {
          detail: provider,
        });
        window.dispatchEvent(event);
      };

      // Announce immediately and also on request
      announceProvider();
      window.addEventListener('eip6963:requestProvider', announceProvider);

      // Store listener for cleanup
      (window as any).__eip6963Listeners =
        (window as any).__eip6963Listeners || [];
      (window as any).__eip6963Listeners.push(announceProvider);
    }
  },

  // Clean up window mocks
  cleanup: () => {
    if (typeof window !== 'undefined') {
      delete (window as any).ethereum;

      // Clean up EIP-6963 listeners
      const listeners = (window as any).__eip6963Listeners;
      if (listeners) {
        for (const listener of listeners) {
          window.removeEventListener('eip6963:requestProvider', listener);
        }
        delete (window as any).__eip6963Listeners;
      }
    }
  },
};

// Re-export WalletConnect mocking utilities from dedicated module
export {
  walletConnectServer,
  setupMatchMedia,
  setupLocalStorage,
  setupWalletConnectMocks,
  cleanupWalletConnectMocks,
  closeWalletConnectServer,
} from './mockWalletConnect';
