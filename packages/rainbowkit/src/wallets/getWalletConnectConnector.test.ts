import { describe, expect, expectTypeOf, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
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
    it('v2 qrcode defaults', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
      });
      expect(connector.options.showQrModal).toBe(false);
    });
  });

  describe("version '2'", () => {
    it('without options', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
      });
      expect(connector.id).toBe('walletConnect');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
    });
    it('with options', () => {
      const connector = getWalletConnectConnector({
        chains,
        projectId,
        options: {
          showQrModal: true,
        },
      });
      expect(connector.id).toBe('walletConnect');
      expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
    });
  });
});
