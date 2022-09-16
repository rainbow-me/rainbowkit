import { describe, expect, it } from 'vitest';
import { chain, Connector } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { connectorsForWallets, wallet } from '..';
import { WalletInstance } from './Wallet';

const getWalletInstances = (
  connector: Connector & { _wallets?: WalletInstance[] }
) => {
  if (!connector._wallets) {
    throw new Error('Wallet instances not found on connector');
  }

  return connector._wallets;
};

describe('connectorsForWallets', () => {
  describe('injected fallback', () => {
    it('includes injected fallback if no wallets using InjectedConnector were provided', () => {
      const chains = [chain.mainnet];
      const connectors = connectorsForWallets([
        {
          groupName: 'Test Group 1',
          wallets: [
            {
              createConnector: () => ({
                connector: new WalletConnectConnector({ chains, options: {} }),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-walletconnect-wallet',
              name: 'Test WalletConnect Wallet',
            },
            wallet.injected({ chains }),
          ],
        },
      ])();

      expect(connectors.length).toBe(2);

      expect(getWalletInstances(connectors[0]).length).toBe(1);
      expect(getWalletInstances(connectors[0])[0].index).toBe(0);
      expect(getWalletInstances(connectors[0])[0].name).toBe(
        'Test WalletConnect Wallet'
      );

      expect(getWalletInstances(connectors[1]).length).toBe(1);
      expect(getWalletInstances(connectors[1])[0].index).toBe(1);
      expect(getWalletInstances(connectors[1])[0].name).toBe('Injected Wallet');
    });

    it('includes injected fallback if no wallets using InjectedConnector are installed', () => {
      const chains = [chain.mainnet];
      const connectors = connectorsForWallets([
        {
          groupName: 'Test Group 1',
          wallets: [
            {
              createConnector: () => ({
                connector: new InjectedConnector(),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-not-installed-wallet',
              installed: false,
              name: 'Test Not Installed Wallet',
            },
            {
              createConnector: () => ({
                connector: new WalletConnectConnector({ chains, options: {} }),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-walletconnect-wallet',
              name: 'Test WalletConnect Wallet',
            },
            wallet.injected({ chains }),
          ],
        },
      ])();

      expect(connectors.length).toBe(3);

      expect(getWalletInstances(connectors[0]).length).toBe(1);
      expect(getWalletInstances(connectors[0])[0].index).toBe(0);
      expect(getWalletInstances(connectors[0])[0].name).toBe(
        'Test Not Installed Wallet'
      );

      expect(getWalletInstances(connectors[1]).length).toBe(1);
      expect(getWalletInstances(connectors[1])[0].index).toBe(1);
      expect(getWalletInstances(connectors[1])[0].name).toBe(
        'Test WalletConnect Wallet'
      );

      expect(getWalletInstances(connectors[2]).length).toBe(1);
      expect(getWalletInstances(connectors[2])[0].index).toBe(2);
      expect(getWalletInstances(connectors[2])[0].name).toBe('Injected Wallet');
    });

    it('includes injected fallback in the same order it was defined if no wallets using InjectedConnector are installed', () => {
      const chains = [chain.mainnet];
      const connectors = connectorsForWallets([
        {
          groupName: 'Test Group 1',
          wallets: [
            wallet.injected({ chains }),
            {
              createConnector: () => ({
                connector: new InjectedConnector(),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-not-installed-wallet',
              installed: false,
              name: 'Test Not Installed Wallet',
            },
          ],
        },
        {
          groupName: 'Test Group 2',
          wallets: [
            {
              createConnector: () => ({
                connector: new WalletConnectConnector({ chains, options: {} }),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-walletconnect-wallet',
              name: 'Test WalletConnect Wallet',
            },
          ],
        },
      ])();

      expect(connectors.length).toBe(3);

      expect(getWalletInstances(connectors[0]).length).toBe(1);
      expect(getWalletInstances(connectors[0])[0].index).toBe(1);
      expect(getWalletInstances(connectors[0])[0].name).toBe(
        'Test Not Installed Wallet'
      );
      expect(getWalletInstances(connectors[0])[0].groupName).toBe(
        'Test Group 1'
      );

      expect(getWalletInstances(connectors[1]).length).toBe(1);
      expect(getWalletInstances(connectors[1])[0].index).toBe(2);
      expect(getWalletInstances(connectors[1])[0].name).toBe(
        'Test WalletConnect Wallet'
      );
      expect(getWalletInstances(connectors[1])[0].groupName).toBe(
        'Test Group 2'
      );

      expect(getWalletInstances(connectors[2]).length).toBe(1);
      expect(getWalletInstances(connectors[2])[0].index).toBe(0); // Note this is now first in the list
      expect(getWalletInstances(connectors[2])[0].name).toBe('Injected Wallet');
      expect(getWalletInstances(connectors[2])[0].groupName).toBe(
        'Test Group 1'
      );
    });

    it('excludes injected fallback if another wallet using InjectedConnector is installed', () => {
      const chains = [chain.mainnet];
      const connectors = connectorsForWallets([
        {
          groupName: 'Test Group 1',
          wallets: [
            {
              createConnector: () => ({
                connector: new InjectedConnector(),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-wallet-installed',
              installed: true,
              name: 'Test Wallet Installed',
            },
          ],
        },
        {
          groupName: 'Test Group 2',
          wallets: [
            wallet.injected({ chains }),
            {
              createConnector: () => ({
                connector: new WalletConnectConnector({ chains, options: {} }),
              }),
              iconBackground: '#fff',
              iconUrl: '/test.png',
              id: 'test-walletconnect-wallet',
              name: 'Test WalletConnect Wallet',
            },
          ],
        },
      ])();

      expect(connectors.length).toBe(2);

      expect(getWalletInstances(connectors[0]).length).toBe(1);
      expect(getWalletInstances(connectors[0])[0].index).toBe(0);
      expect(getWalletInstances(connectors[0])[0].groupName).toBe(
        'Test Group 1'
      );
      expect(getWalletInstances(connectors[0])[0].name).toBe(
        'Test Wallet Installed'
      );

      expect(getWalletInstances(connectors[1]).length).toBe(1);
      expect(getWalletInstances(connectors[1])[0].index).toBe(2);
      expect(getWalletInstances(connectors[1])[0].groupName).toBe(
        'Test Group 2'
      );
      expect(getWalletInstances(connectors[1])[0].name).toBe(
        'Test WalletConnect Wallet'
      );
    });
  });
});
