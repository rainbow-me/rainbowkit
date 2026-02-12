import { describe, expect, it } from 'vitest';
import { createConfig, http, type CreateConnectorFn } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { connectorsForWallets } from '..';
import type { CreateWalletFn, WagmiConnectorInstance } from './Wallet';
import { base, baseAccount } from './walletConnectors/base/base';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
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
        createConnector: () => walletConnect({ projectId: params.projectId }),
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
        createConnector: () => walletConnect({ projectId: params.projectId }),
        hidden: () => true,
        iconBackground: '#fff',
        iconUrl: '/test.png',
        id: 'test-not-installed-wallet',
        installed: false,
        name: 'Test Not Installed Wallet',
      });

      const connectors = connectorsForWallets(
        [{ groupName: 'Test Group 1', wallets: [customWallet] }],
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

  describe('wallet ids', () => {
    const createConfigForWallets = (wallets: CreateWalletFn[]) =>
      createConfig({
        chains: [mainnet],
        connectors: connectorsForWallets(
          [
            {
              groupName: 'Test Group 1',
              wallets,
            },
          ],
          {
            projectId: exampleProjectId,
            appName: 'rainbowkit.com',
          },
        ),
        transports: {
          [mainnet.id]: http(),
        },
      });

    it('preserves the wagmi baseAccount connector id for the renamed base wallet', () => {
      const config = createConfigForWallets([base]);
      const connector = config.connectors[0] as WagmiConnectorInstance;

      expect(config.connectors).toHaveLength(1);
      expect(connector.id).toBe('baseAccount');
      expect(connector.rkDetails?.id).toBe('base');
      expect(connector.rkDetails?.aliases).toEqual(['baseAccount']);
    });

    it('keeps baseAccount as a reference to the canonical base wallet', () => {
      expect(baseAccount).toBe(base);
    });

    it('keeps the legacy coinbaseWallet connector export available', () => {
      const config = createConfigForWallets([coinbaseWallet]);
      const connector = config.connectors[0] as WagmiConnectorInstance;

      expect(config.connectors).toHaveLength(1);
      expect(connector.id).toBe('coinbaseWalletSDK');
      expect(connector.rkDetails?.id).toBe('coinbase');
      expect(connector.rkDetails?.aliases).toEqual(['coinbaseWallet']);
    });
  });
});
