import { describe, expect, expectTypeOf, it } from 'vitest';
import { Wallet } from '../../Wallet';
import { walletConnectWallet, wcId } from './walletConnectWallet';

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

    expect(wallet.id).toBe(wcId);
    expectTypeOf(wallet.createConnector).toMatchTypeOf<
      Wallet['createConnector']
    >();
  });

  it('v2 options', () => {
    const wallet = walletConnectWallet({
      walletConnectParameters: {
        showQrModal: true,
        projectId,
      },
      projectId,
    });

    expect(wallet.id).toBe(wcId);
    expectTypeOf(wallet.createConnector).toMatchTypeOf<
      Wallet['createConnector']
    >();
  });
});
