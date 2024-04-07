import { describe, expect, expectTypeOf, it } from 'vitest';
import { Wallet } from '../../Wallet';
import { walletConnectWallet } from './walletConnectWallet';

describe('walletConnectWallet', () => {
  const projectId = 'test-project-id';

  it("should throw an error when 'projectId' is not provided", () => {
    expect(() =>
      // @ts-ignore
      walletConnectWallet({}),
    ).toThrowError();
  });

  it('should create a wallet with correct id and return wagmi connector type', () => {
    const wallet = walletConnectWallet({ projectId });

    expect(wallet.id).toBe('walletConnect');
    expectTypeOf(wallet.createConnector).toMatchTypeOf<
      Wallet['createConnector']
    >();
  });

  it('should create a wallet with correct id and return wagmi connector type when v2 options are provided', () => {
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
