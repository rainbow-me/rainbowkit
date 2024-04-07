import { describe, expectTypeOf, it } from 'vitest';
import { CreateConnectorFn } from 'wagmi';
import { getWalletConnectConnector } from './getWalletConnectConnector';

describe('getWalletConnectConnector', () => {
  const projectId = '21fef48091f12692cad574a6f7753643';

  it('should return wagmi connector type', () => {
    const connector = getWalletConnectConnector({
      projectId,
    });
    expectTypeOf(connector).toMatchTypeOf<CreateConnectorFn>();
  });

  it('should return wagmi connector type with v2 options', () => {
    const connector = getWalletConnectConnector({
      projectId,
      walletConnectParameters: {
        isNewChainsStale: true,
      },
    });
    expectTypeOf(connector).toMatchTypeOf<CreateConnectorFn>();
  });
});
