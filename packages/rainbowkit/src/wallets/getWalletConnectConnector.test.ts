import { describe, expect, expectTypeOf, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { getWalletConnectConnector } from './getWalletConnectConnector';

describe('getWalletConnectConnector', () => {
  const chains = [mainnet];
  const projectId = 'test-project-id';

  describe('generic', () => {
    it('without projectId', () => {
      const connector = getWalletConnectConnector({ chains });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
    });
    it('with projectId', () => {
      const connector = getWalletConnectConnector({ chains, projectId });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
    });
  });

  describe("version '1'", () => {
    it('without options', () => {
      const connector = getWalletConnectConnector({
        chains,
        version: '1',
      });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
    });
    it('with options', () => {
      const connector = getWalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          qrcodeModalOptions: {
            desktopLinks: ['ledger'],
            mobileLinks: ['rainbow'],
          },
        },
        version: '1',
      });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
    });
  });

  describe("version '2'", () => {
    it('without options', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
        version: '2',
      });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
    });
    it('with options', () => {
      const connector = getWalletConnectConnector({
        chains,
        options: {
          showQrModal: true,
        },
        projectId,
        version: '2',
      });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
    });
  });
});
