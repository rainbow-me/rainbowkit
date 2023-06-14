import { describe, expect, expectTypeOf, it } from 'vitest';
import { mainnet, polygon } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { getWalletConnectConnector } from './getWalletConnectConnector';

/*
 * Be careful when writing these tests. This util caches the connector
 * results, which can create unexpected issues when testing.
 */

describe('getWalletConnectConnector', () => {
  const chains = [mainnet];
  const projectId = 'test-project-id';

  describe('generic', () => {
    it('without projectId', () => {
      // eslint-disable-next-line jest/require-to-throw-message
      expect(() => getWalletConnectConnector({ chains })).toThrowError();
    });
    it('with projectId', () => {
      const connector = getWalletConnectConnector({ chains, projectId });
      expect(connector.id).toBe('walletConnect');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
    });
    it('qrcode defaults', () => {
      const connector = getWalletConnectConnector({ chains, projectId });
      expect(connector.options.showQrModal).toBe(false);
    });
    it('v1 qrcode defaults', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
        version: '1',
      });
      expect(connector.options.qrcode).toBe(false);
    });
    it('v2 qrcode defaults', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
        version: '2',
      });
      expect(connector.options.showQrModal).toBe(false);
    });
  });

  describe("version '1'", () => {
    it('without options', () => {
      const connector = getWalletConnectConnector({
        chains: [polygon],
        version: '1',
      });
      expect(connector.id).toBe('walletConnectLegacy');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectLegacyConnector>();
      expect(connector.options.qrcode).toBe(false);
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
      expect(connector.options.qrcode).toBe(true);
    });
  });

  describe("version '2'", () => {
    it('without options', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
        version: '2',
      });
      expect(connector.id).toBe('walletConnect');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
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
      expect(connector.id).toBe('walletConnect');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
    });
  });
});
