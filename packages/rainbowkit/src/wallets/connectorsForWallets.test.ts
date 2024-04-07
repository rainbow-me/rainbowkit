import { describe, expect, expectTypeOf, it } from 'vitest';
import type { CreateConnectorFn } from 'wagmi';
import { connectorsForWallets } from '..';
import { mockWallet } from '../../test/mockWallet';
import { injectedWallet } from './walletConnectors/injectedWallet/injectedWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

// App name and group name
const appName = 'My RainbowKit App';
const groupName = 'Test Group 1';

// Example project id (WalletConnect)
const projectId = '21fef48091f12692cad574a6f7753643';

describe('connectorsForWallets', () => {
  const customWallet = () => ({
    createConnector: mockWallet('custom-wallet', 'Custom Wallet')()
      .createConnector,
    iconBackground: '#fff',
    iconUrl: '',
    id: 'custom-wallet',
    name: 'Custom Wallet',
  });

  const hiddenWallet = () => ({
    createConnector: mockWallet('hidden-wallet', 'Hidden wallet')()
      .createConnector,
    hidden: () => true,
    iconBackground: '#fff',
    iconUrl: '',
    id: 'hidden-wallet',
    name: 'Hidden wallet',
  });

  it('should return custom wallet and injected wallet connectors', () => {
    const connectors = connectorsForWallets(
      [
        {
          groupName,
          wallets: [customWallet, injectedWallet],
        },
      ],
      {
        projectId,
        appName,
      },
    );

    expect(connectors.length).toBe(2);
    expectTypeOf(connectors[0]).toMatchTypeOf<CreateConnectorFn>();
    expectTypeOf(connectors[1]).toMatchTypeOf<CreateConnectorFn>();
  });

  it("should not return connector if 'hidden' returns true", () => {
    const connectors = connectorsForWallets(
      [{ groupName, wallets: [hiddenWallet] }],
      {
        projectId,
        appName,
      },
    );

    expect(connectors.length).toBe(0);
  });

  it('should de-dupe wallets list for a group', () => {
    const connectors = connectorsForWallets(
      [
        {
          groupName,
          wallets: [customWallet, customWallet],
        },
      ],
      {
        projectId,
        appName,
      },
    );

    // Duplicate wallets in a group are de-duped
    expect(connectors.length).toBe(1);
    expectTypeOf(connectors[0]).toMatchTypeOf<CreateConnectorFn>();
  });

  it("should throw an error if 'projectId' is not defined", () => {
    expect(() => {
      connectorsForWallets(
        [
          {
            groupName,
            wallets: [walletConnectWallet],
          },
        ],
        {
          // @ts-expect-error
          projectId: undefined,
          appName,
        },
      );
    }).toThrow(
      'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId',
    );
  });

  it('should throw an error if wallet list is empty', () => {
    expect(() => {
      connectorsForWallets([], {
        projectId,
        appName,
      });
    }).toThrow('No wallet list was provided');
  });

  it('should throw an error when a group has no wallets', () => {
    expect(() => {
      connectorsForWallets(
        [
          {
            groupName,
            wallets: [],
          },
        ],
        {
          projectId,
          appName,
        },
      );
    }).toThrow(`No wallets provided for group: ${groupName}`);
  });
});
