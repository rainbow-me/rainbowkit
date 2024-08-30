import { describe, expect, expectTypeOf, it } from 'vitest';
import type { CreateConnector } from './Wallet';
import { getWalletConnectConnector } from './getWalletConnectConnector';

/*
 * Be careful when writing these tests. This util caches the connector
 * results, which can create unexpected issues when testing.
 */

describe('getWalletConnectConnector', () => {
  const projectId = 'test-project-id';

  describe('generic', () => {
    it('without projectId', () => {
      // @ts-expect-error
      expect(() => getWalletConnectConnector()).toThrowError();
    });
    it('with projectId', () => {
      const connector = getWalletConnectConnector({ projectId });
      expectTypeOf(connector).toMatchTypeOf<CreateConnector>();
    });
  });

  describe("version '2'", () => {
    it('without options', () => {
      const connector = getWalletConnectConnector({
        projectId,
      });
      expectTypeOf(connector).toMatchTypeOf<CreateConnector>();
    });
    it('with options', () => {
      const connector = getWalletConnectConnector({
        projectId,
      });
      expectTypeOf(connector).toMatchTypeOf<CreateConnector>();
    });
  });
});
