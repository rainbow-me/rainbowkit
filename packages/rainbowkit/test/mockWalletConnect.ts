/**
 * Mock utilities for testing WalletConnect integration
 *
 * This module provides utilities to mock WalletConnect infrastructure:
 * - MSW server setup for intercepting network requests
 * - Mock handlers for WalletConnect relay and API endpoints
 * - Browser environment mocks (matchMedia, localStorage)
 *
 * Following Wagmi's approach: https://github.com/wevm/wagmi/blob/main/packages/connectors/src/walletConnect.test.ts
 */

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';

// WalletConnect relay and API mock handlers
const handlers = [
  // Mock WalletConnect relay endpoint
  http.get('https://relay.walletconnect.com', async () =>
    HttpResponse.json(
      {
        topic: '222781e3-3fad-4184-acde-077796bf0d3d',
        type: 'sub',
        payload: '',
        silent: true,
      },
      { status: 200 },
    ),
  ),
  http.get('https://relay.walletconnect.org', async () =>
    HttpResponse.json(
      {
        topic: '222781e3-3fad-4184-acde-077796bf0d3d',
        type: 'sub',
        payload: '',
        silent: true,
      },
      { status: 200 },
    ),
  ),
  // Mock WalletConnect registry/explorer API
  http.get('https://api.web3modal.com/*', async () =>
    HttpResponse.json(
      {
        count: 0,
        data: [],
      },
      { status: 200 },
    ),
  ),
  // Mock WalletConnect keys server
  http.get('https://keys.walletconnect.com/*', async () =>
    HttpResponse.json(
      {
        keys: [],
      },
      { status: 200 },
    ),
  ),
];

// Export MSW server instance
export const walletConnectServer = setupServer(...handlers);

/**
 * Mock matchMedia for browser environment
 * Required for WalletConnect's responsive behavior
 */
export const setupMatchMedia = () => {
  const matchMedia = vi.fn().mockImplementation((query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
  vi.stubGlobal('matchMedia', matchMedia);
  return matchMedia;
};

/**
 * Mock localStorage for WalletConnect session storage
 * WalletConnect stores session data in localStorage
 */
export const setupLocalStorage = () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
  return localStorageMock;
};

/**
 * Setup all WalletConnect mocks for testing
 * Convenience function to setup all required mocks at once
 */
export const setupWalletConnectMocks = () => {
  walletConnectServer.listen({
    onUnhandledRequest: 'warn',
  });
  setupMatchMedia();
  setupLocalStorage();
};

/**
 * Cleanup all WalletConnect mocks
 * Should be called in afterEach/afterAll hooks
 */
export const cleanupWalletConnectMocks = () => {
  walletConnectServer.resetHandlers();
  localStorage.clear();
};

/**
 * Close WalletConnect server
 * Should be called in afterAll hook
 */
export const closeWalletConnectServer = () => {
  walletConnectServer.close();
  vi.unstubAllGlobals();
};
