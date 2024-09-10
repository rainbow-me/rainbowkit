import { describe, expect, expectTypeOf, it } from 'vitest';
import type { Wallet } from '../../Wallet';
import { walletConnectWallet } from './walletConnectWallet';

describe('walletConnectWallet', () => {
  const projectId = 'test-project-id';

  it('without projectId', () => {
    expect(() =>
      // @ts-ignore
      walletConnectWallet({
        /* no project id */
      }),
    ).toThrowError();
  });

  it('with projectId', () => {
    const wallet = walletConnectWallet({ projectId });

    expect(wallet.id).toBe('walletConnect');
    expectTypeOf(wallet.createConnector).toMatchTypeOf<
      Wallet['createConnector']
    >();
  });

  it('v2 options', () => {
    const wallet = walletConnectWallet({
      options: {
        isNewChainsStale: true,
      },
      projectId,
    });

    expect(wallet.id).toBe('walletConnect');
    expectTypeOf(wallet.createConnector).toMatchTypeOf<
      Wallet['createConnector']
    >();
  });
});
