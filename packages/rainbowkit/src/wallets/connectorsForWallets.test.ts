import { describe, expect, it } from 'vitest';
import type { CreateConnectorFn } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { connectorsForWallets } from '..';
import type { CreateWalletFn } from './Wallet';
import { injectedWallet } from './walletConnectors/injectedWallet/injectedWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

const isValidConnector = (connector: CreateConnectorFn): boolean => {
  if (typeof connector !== 'function') {
    throw new Error('Wallet instance is not a function');
  }

  return !!connector;
};

const exampleProjectId = '21fef48091f12692cad574a6f7753643';

describe('connectorsForWallets', () => {
  describe('injected fallback', () => {
    it('should return wallet connect and injected wallet connectors', () => {
      const customWallet: CreateWalletFn = (params) => ({
        createConnector: () => walletConnect({ projectId: params?.projectId! }),
        iconBackground: '#fff',
        iconUrl: '/test.png',
        id: 'test-walletconnect-wallet',
        name: 'Test WalletConnect Wallet',
      });

      const connectors = connectorsForWallets(
        [
          {
            groupName: 'Test Group 1',
            wallets: [customWallet, injectedWallet],
          },
        ],
        {
          projectId: exampleProjectId,
          appName: 'rainbowkit.com',
        },
      );

      expect(connectors.length).toBe(2);

      expect(isValidConnector(connectors[0])).toBe(true);
      expect(isValidConnector(connectors[1])).toBe(true);

      expect(connectors.length).toBe(2);
    });

    it("should not return connector if 'hidden' returns true", () => {
      const customWallet: CreateWalletFn = (params) => ({
        createConnector: () => walletConnect({ projectId: params?.projectId! }),
        hidden: () => true,
        iconBackground: '#fff',
        iconUrl: '/test.png',
        id: 'test-not-installed-wallet',
        installed: false,
        name: 'Test Not Installed Wallet',
      });

      const connectors = connectorsForWallets(
        [{ groupName: 'groupName: "Test Group 1"', wallets: [customWallet] }],
        {
          projectId: exampleProjectId,
          appName: 'rainbowkit.com',
        },
      );

      expect(connectors.length).toBe(0);
    });

    it('should throw if projectId is invalid to wallet connect connector', () => {
      // You can also check the specific error message part, for example:
      expect(() => {
        connectorsForWallets(
          [
            {
              groupName: 'Test Group 1',
              wallets: [
                // @ts-expect-error
                walletConnectWallet({ projectId: undefined }),
              ],
            },
          ],
          {
            projectId: exampleProjectId,
            appName: 'rainbowkit.com',
          },
        );
      }).toThrow(
        'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId',
      );
    });
  });
});
